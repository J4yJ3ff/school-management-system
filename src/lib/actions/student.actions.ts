"use server";

import dbConnect from "@/lib/dbConnect";
import { StudentModel, UserModel, UserRole } from "@/database";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { StudentSchema } from "@/schemas/student.schema";
import type * as z from "zod";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export async function getStudents() {
  await dbConnect(); // Ensure connection
  const session = await auth();

  if (
    !session?.user ||
    ![UserRole.ADMIN, UserRole.STAFF, UserRole.TEACHER].includes(
      session.user.role as UserRole
    )
  ) {
    return { error: "Unauthorized" };
  }

  try {
    // Use Mongoose find, populate the 'user' field, use lean
    const students = await StudentModel.find({})
      .populate("userId") // Populate the user data
      .sort({ createdAt: -1 }) // Use -1 for descending
      .lean()
      .exec();

    // Convert _id to id string for consistency if needed by frontend (DataTable might expect 'id')
    const formattedStudents = students.map((student) => ({
      ...student,
      id: student._id.toString(), // Add string 'id'
      user: student.userId
        ? {
            // Rename populated field for clarity?
            ...student.userId,
            id: student.userId._id.toString(), // Add string 'id' to user too
          }
        : null,
      userId: student.userId._id.toString(), // Keep original userId as string id
    }));

    return { data: formattedStudents }; // Return plain JS objects
  } catch (error) {
    console.error("Error fetching students:", error);
    return { error: "Failed to fetch students" };
  }
}

// Action to add a new student (using Mongoose Transaction)
export async function addStudent(values: z.infer<typeof StudentSchema>) {
  const session = await auth();

  if (
    !session?.user ||
    ![UserRole.ADMIN, UserRole.STAFF].includes(session.user.role as UserRole)
  ) {
    return { error: "Unauthorized to add students" };
  }

  const validatedFields = StudentSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid student data",
      details: validatedFields.error.flatten().fieldErrors,
    };
  }

  const {
    email,
    password,
    firstName,
    lastName,
    admissionNumber,
    form,
    hostel,
    ...studentData
  } = validatedFields.data;

  await dbConnect(); // Ensure connection

  // Check existing (using Mongoose)
  const existingStudentByAdm = await StudentModel.findOne({
    admissionNumber,
  }).lean();
  if (existingStudentByAdm) return { error: "Admission number already exists" };
  const existingUserByEmail = await UserModel.findOne({ email }).lean();
  if (existingUserByEmail)
    return { error: "Email already linked to another user" };

  const mongoSession = await mongoose.startSession(); // Start a MongoDB session for transaction
  mongoSession.startTransaction();

  try {
    const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

    // Create User within the transaction
    const newUserArray = await UserModel.create(
      [
        {
          email,
          name: `${firstName} ${lastName}`,
          password: hashedPassword,
          role: UserRole.STUDENT,
        },
      ],
      { session: mongoSession }
    ); // Pass the session
    const newUser = newUserArray[0];

    // Create Student within the transaction
    const newStudentArray = await StudentModel.create(
      [
        {
          userId: newUser._id, // Link using the new user's ObjectId
          firstName,
          lastName,
          admissionNumber,
          form,
          hostel,
          ...studentData,
        },
      ],
      { session: mongoSession }
    ); // Pass the session
    const newStudent = newStudentArray[0];

    await mongoSession.commitTransaction(); // Commit transaction

    revalidatePath("/dashboard/students");
    // revalidatePath(`/students/${newStudent._id.toString()}`); // Use _id

    // Return lean object with string IDs
    const createdStudent = await StudentModel.findById(newStudent._id)
      .populate("userId")
      .lean();

    return {
      success: "Student added successfully",
      data: { ...createdStudent, id: createdStudent?._id.toString() },
    };
  } catch (error) {
    await mongoSession.abortTransaction(); // Rollback on error
    console.error("Error adding student:", error);
    return { error: "Database error: Failed to add student" };
  } finally {
    mongoSession.endSession(); // End the session
  }
}
