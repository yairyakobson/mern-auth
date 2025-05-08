import mongoose, { QueryOptions, UpdateQuery } from "mongoose";

import { Authentication } from "../types/authenticationTypes";
import userSchema from "../models/mongoose/User";

export const createUser = async(userData: Authentication) =>{
  return await userSchema.create(userData);
}

export const loginUser = async(email: string) =>{
  return await userSchema.findOne({ email });
}

export const getUser = async(query: mongoose.Types.ObjectId) =>{
  return await userSchema.findById(query);
}

export const updateUserStatus = async(
  query: mongoose.Types.ObjectId,
  verified: UpdateQuery<typeof userSchema>,
  newStatus: QueryOptions<typeof userSchema>
) =>{
  return await userSchema.findByIdAndUpdate(query, verified, newStatus);
}

export const sendForgotPasswordEmailToUser = async(email: string) =>{
  return await userSchema.findOne({ email });
}

export const newUserPassword = async(
  query: mongoose.Types.ObjectId,
  newPassword: UpdateQuery<typeof userSchema>,
) =>{
  return await userSchema.findByIdAndUpdate(query, newPassword);
}