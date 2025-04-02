// src/schemas/auth.schema.ts
import { UserRole } from "@/database/User.model";
import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Valid email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
  // code: z.optional(z.string()), // Optional: For 2FA
});

export const RegisterSchema = z.object({
  email: z.string().email({ message: "Valid email is required" }),
  password: z.string().min(6, { message: "Minimum 6 characters required" }),
  name: z.string().min(1, { message: "Name is required" }),
  role: z.nativeEnum(UserRole).optional().default(UserRole.STUDENT), // Default to STUDENT if not provided
});

export const ResetPasswordSchema = z.object({
  email: z.string().email({ message: "Valid email is required" }),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(6, { message: "Minimum 6 characters required" }),
  token: z.string().min(1, { message: "Token is required" }), // Hidden input in the form
});
