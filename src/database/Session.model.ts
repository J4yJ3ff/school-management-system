import mongoose, { Schema, type Document, models, type Model } from "mongoose";

export interface ISession extends Document {
  sessionToken: string;
  userId: mongoose.Types.ObjectId;
  expires: Date;
  // user: mongoose.Types.ObjectId; // Ref back to User
}

export const SessionSchema: Schema<ISession> = new Schema(
  {
    sessionToken: { type: String, unique: true, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    expires: { type: Date, required: true },
    // user: { type: Schema.Types.ObjectId, ref: 'User' }
  },
  {
    timestamps: true,
  }
);

const SessionModel: Model<ISession> =
  models.Session || mongoose.model<ISession>("Session", SessionSchema);
export default SessionModel;
