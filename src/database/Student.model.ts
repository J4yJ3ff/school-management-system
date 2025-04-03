import mongoose, { Schema, type Document, models, type Model } from "mongoose";
import type { IUser } from "./User.model"; // Import User interface if needed

export interface IStudent extends Document {
  userId: mongoose.Types.ObjectId | IUser; // Can hold ObjectId or populated User object
  admissionNumber: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: Date;
  gender?: string; // Consider Enum: MALE, FEMALE, OTHER
  address?: string;
  parentContact?: string; // Consider a separate Parent model later
  enrollmentDate: Date;
  form: string; // e.g., "Form 1", "Form 4" -> Consider Class relationship instead
  hostel?: string; // Consider Hostel model later

  // Relationships - these would be populated
  // enrollments?: any[]; // Placeholder for populated enrollments
  // attendances?: any[];
  // grades?: any[];

  createdAt: Date;
  updatedAt: Date;
}

const StudentSchema: Schema<IStudent> = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User", // Link to the User model
      required: true,
      unique: true,
    },
    admissionNumber: { type: String, unique: true, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dateOfBirth: { type: Date },
    gender: { type: String },
    address: { type: String },
    parentContact: { type: String },
    enrollmentDate: { type: Date, default: Date.now },
    form: { type: String, required: true },
    hostel: { type: String },
    // Define refs for relationships if needed for population, e.g.:
    // enrollments: [{ type: Schema.Types.ObjectId, ref: 'Enrollment' }],
  },
  {
    timestamps: true,
  }
);

const StudentModel: Model<IStudent> =
  models.Student || mongoose.model<IStudent>("Student", StudentSchema);
export default StudentModel;
