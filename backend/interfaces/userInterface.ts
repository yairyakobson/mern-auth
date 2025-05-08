import mongoose from "mongoose";

export interface UserDocument extends mongoose.Document{
  email: string;
  password: string;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
  twoFactorEnabled: boolean;
  twoFactorSecret: string
  comparePassword(val: string): Promise<boolean>;
  omitPassword(): Pick<
    UserDocument,
    "_id" | "email" | "verified" | "createdAt" | "updatedAt"
  >;
}