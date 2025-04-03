import mongoose, { Schema, type Document, models, type Model } from "mongoose";
import { UserRole } from "@/types"; // Import from types file instead of defining here

export interface IUser extends Document {
  name?: string;
  email?: string | null;
  emailVerified?: Date | null;
  image?: string | null;
  password?: string | null; // For Credentials provider
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
  // Virtuals or methods can be added here if needed
  // Relationships are typically handled via refs
  accounts?: mongoose.Types.ObjectId[]; // Ref to Account model (handled by NextAuth adapter)
  sessions?: mongoose.Types.ObjectId[]; // Ref to Session model (handled by NextAuth adapter)
}

const UserSchema: Schema<IUser> = new Schema(
  {
    name: { type: String },
    email: { type: String, unique: true, sparse: true }, // Sparse index allows multiple nulls
    emailVerified: { type: Date },
    image: { type: String },
    password: { type: String, select: false }, // Exclude password by default
    role: {
      type: String,
      enum: Object.values(UserRole), // Use enum values
      default: UserRole.STUDENT,
      required: true,
    },
    // --- NextAuth fields (managed by adapter, but schema needs them) ---
    accounts: [{ type: Schema.Types.ObjectId, ref: "Account" }],
    sessions: [{ type: Schema.Types.ObjectId, ref: "Session" }],
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

// Prevent model overwrite during hot-reloading
const UserModel: Model<IUser> =
  models.User || mongoose.model<IUser>("User", UserSchema);

export default UserModel;
