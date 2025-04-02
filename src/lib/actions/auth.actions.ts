// src/lib/actions/auth.actions.ts
"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import mongoose from "mongoose";

import { signIn, signOut as nextAuthSignOut } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect"; // Import Mongoose connect utility
import UserModel, { UserRole } from "@/models/User.model"; // Import Mongoose User model
import { LoginSchema, RegisterSchema } from "@/schemas/auth.schema";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { getUserByEmail } from "./User.actions";

export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null
) => {
  await dbConnect(); // Ensure DB connection

  const validatedFields = LoginSchema.safeParse(values);
  // ... validation ...
  const { email, password } = validatedFields.data;

  // getUserByEmail already calls dbConnect and handles password selection
  const existingUser = await getUserByEmail(email, true); // Request password

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Invalid credentials!" };
  }
  // ... rest of the logic using existingUser ...

  try {
    // signIn logic remains the same, relies on authorize in auth.ts
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
    return { success: "Login successful! Redirecting..." }; // May not be reached
  } catch (error) {
    // Error handling remains the same
    if (error instanceof AuthError) {
      /* ... */
    }
    console.error("Login Action Error:", error);
    return { error: "An unexpected error occurred during login." };
  }
};

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  await dbConnect(); // Ensure DB connection

  const validatedFields = RegisterSchema.safeParse(values);
  // ... validation ...
  const { email, password, name, role } = validatedFields.data;

  const existingUser = await getUserByEmail(email); // Check if email exists
  if (existingUser) {
    return { error: "Email already in use!" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Use Mongoose UserModel to create
    await UserModel.create({
      name,
      email,
      password: hashedPassword,
      role: role || UserRole.STUDENT, // Use enum from model
      // emailVerified: new Date(), // Or handle verification separately
    });

    // ... verification email logic (optional) ...
    return { success: "Registration successful! Please log in." };
  } catch (error) {
    console.error("Registration Error:", error);
    // Check for specific Mongoose errors if needed (e.g., duplicate key)
    if (error instanceof mongoose.Error.ValidationError) {
      return { error: "Validation failed.", details: error.errors };
    }
    return { error: "Registration failed. Please try again." };
  }
};

export const signOut = async () => {
  // Logic remains the same
  await nextAuthSignOut({ redirectTo: "/login" });
};
