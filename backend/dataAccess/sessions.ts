import mongoose, {
  FilterQuery,
  ProjectionType,
  QueryOptions
} from "mongoose";

import sessionSchema from "../models/mongoose/Session";

export const createLoginSession = async(data: {
  userId: unknown,
  userAgent: string | undefined
}) =>{
  return await sessionSchema.create(data);
}

export const createRegisterSession = async(data: {
  userId: unknown,
  userAgent: string | undefined
}) =>{
  return await sessionSchema.create(data);
}

export const refreshUserAccessTokenSession = async(query: unknown) =>{
  return await sessionSchema.findById(query);
}

export const logoutSession = async(query: unknown) =>{
  return await sessionSchema.findByIdAndDelete(query);
}

export const deleteSingleSession = async(data: {
  _id: string
  userId: mongoose.Types.ObjectId
}) =>{
  return await sessionSchema.findOneAndDelete(data);
}

export const deleteAllSessions = async(query: {
  userId: mongoose.Types.ObjectId
}) =>{
  return await sessionSchema.deleteMany(query);
}

export const fetchSessions = async(
  query: FilterQuery<typeof sessionSchema>,
  projection: ProjectionType<typeof sessionSchema>,
  options: QueryOptions
) =>{
  return await sessionSchema.find(query, projection, options);
};