import { Schema, model, Document } from 'mongoose';

export interface IUserDoc extends Document {
  email: string;
  passwordHash: string;
  refreshTokens: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema = new Schema<IUserDoc>({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  refreshTokens: { type: [String], default: [] }
}, { timestamps: true });

export const UserModel = model<IUserDoc>('User', UserSchema);
