"use server";

import UserModel, { IUser } from "@/database/User.model";
import dbConnect from "@/lib/dbConnect";

import mongoose from "mongoose";

export const getUserByEmail = async (
  email: string,
  selectPassword?: boolean
): Promise<IUser | null> => {
  if (!email) return null;
  try {
    await dbConnect(); // Ensure DB connection
    const query = UserModel.findOne({ email });
    if (selectPassword) {
      query.select("+password"); // Explicitly select password if needed
    }
    const user = await query.lean().exec(); // Use lean for plain JS object
    return user ? { ...user, _id: user._id.toString() } : null; // Convert _id if needed elsewhere, lean might do it
  } catch (error) {
    console.error("Error fetching user by email:", error);
    return null;
  }
};

export const getUserById = async (id: string): Promise<IUser | null> => {
  if (!id || !mongoose.Types.ObjectId.isValid(id)) return null; // Validate ObjectId format
  try {
    await dbConnect();
    const user = await UserModel.findById(id).lean().exec();
    return user ? { ...user, _id: user._id.toString() } : null;
  } catch {
    return null;
  }
};
