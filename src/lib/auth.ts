// src/lib/auth.ts
import NextAuth, {
  NextAuthConfig,
  DefaultSession,
  User as NextAuthUser,
} from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter"; // Import MongoDB Adapter
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google"; // Example: Add Google Provider
import bcrypt from "bcryptjs";

import dbConnect, { clientPromise } from "./dbConnect"; // Import db connection util and clientPromise
import { LoginSchema } from "@/schemas/auth.schema";
import { UserRole } from "@/models/User.model"; // Import the enum from your model file
import { getUserByEmail } from "./actions/User.actions";
// We'll update this helper

// Extend session and user types
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string; // Keep id as string for consistency in session
      role: UserRole; // Use the enum type
    } & DefaultSession["user"];
  }

  // The user object returned by authorize or callbacks
  interface User extends NextAuthUser {
    id: string; // Use string for id in NextAuth context
    role: UserRole;
  }
}

const MONGODB_DB_NAME =
  process.env.MONGODB_URI?.split("/").pop()?.split("?")[0] ||
  "school-management"; // Infer DB name or set default

export const authConfig = {
  // Use MongoDB Adapter
  adapter: MongoDBAdapter(clientPromise, {
    databaseName: MONGODB_DB_NAME, // Specify your database name
    collections: {
      // Optional: custom collection names
      // Users: 'users',
      // Accounts: 'accounts',
      // Sessions: 'sessions',
      // VerificationTokens: 'verification_tokens',
    },
  }),
  session: { strategy: "jwt" }, // JWT is generally recommended with Credentials
  pages: {
    signIn: "/login",
    // error: '/auth/error',
  },
  providers: [
    // Google({ clientId: process.env.GOOGLE_CLIENT_ID, clientSecret: process.env.GOOGLE_CLIENT_SECRET }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await dbConnect(); // Ensure DB connection before authorization logic

        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          // Use Mongoose helper to find user, selecting the password explicitly
          const user = await getUserByEmail(email, true); // Pass flag to select password

          if (!user || !user.password) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) {
            // Return user object matching NextAuth User type
            return {
              id: user._id.toString(), // Convert ObjectId to string for NextAuth user object
              name: user.name,
              email: user.email,
              image: user.image,
              role: user.role, // Include role
            };
          }
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // When user logs in (returned from authorize)
        token.id = user.id; // id is already a string here from authorize's return
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as UserRole;
      }
      return session;
    },
    // signIn callback remains conceptually the same
    async signIn({ user, account, profile, email, credentials }) {
      // Example check (ensure connection first)
      // await dbConnect();
      // if (account?.provider === "credentials" && user.id) {
      // const existingUser = await UserModel.findById(user.id);
      // return !!existingUser?.emailVerified;
      // }
      return true;
    },
  },
  // secret: process.env.AUTH_SECRET, // Handled by NextAuth automatically
  // debug: process.env.NODE_ENV === "development",
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
