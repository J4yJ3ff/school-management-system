import mongoose, { Schema, type Document, models, type Model } from "mongoose";

export interface IVerificationToken extends Document {
  identifier: string;
  token: string;
  expires: Date;
}

const VerificationTokenSchema: Schema<IVerificationToken> = new Schema(
  {
    identifier: { type: String, required: true },
    token: { type: String, unique: true, required: true },
    expires: { type: Date, required: true },
  },
  {
    _id: false, // Use compound key as primary identifier
    timestamps: false, // Not typically needed
  }
);

// Compound index required by NextAuth adapter
VerificationTokenSchema.index({ identifier: 1, token: 1 }, { unique: true });

const VerificationTokenModel: Model<IVerificationToken> =
  models.VerificationToken ||
  mongoose.model<IVerificationToken>(
    "VerificationToken",
    VerificationTokenSchema
  );
export default VerificationTokenModel;
