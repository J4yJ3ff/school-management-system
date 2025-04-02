import mongoose, { Schema, Document, models, Model } from "mongoose";

export interface IAccount extends Document {
  userId: mongoose.Types.ObjectId;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token?: string;
  access_token?: string;
  expires_at?: number;
  token_type?: string;
  scope?: string;
  id_token?: string;
  session_state?: string;
  // user: mongoose.Types.ObjectId; // Ref back to User
}

export const AccountSchema: Schema<IAccount> = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, required: true },
    provider: { type: String, required: true },
    providerAccountId: { type: String, required: true },
    refresh_token: { type: String },
    access_token: { type: String },
    expires_at: { type: Number },
    token_type: { type: String },
    scope: { type: String },
    id_token: { type: String },
    session_state: { type: String },
    // user: { type: Schema.Types.ObjectId, ref: 'User' }
  },
  {
    timestamps: true,
    _id: false, // Part of the compound key, Mongoose handles this for us
    id: false,
  }
);

// Compound index required by NextAuth adapter
AccountSchema.index({ provider: 1, providerAccountId: 1 }, { unique: true });

const AccountModel: Model<IAccount> =
  models.Account || mongoose.model<IAccount>("Account", AccountSchema);
export default AccountModel;
