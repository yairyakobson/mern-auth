import verificationCodeSchema from "../models/mongoose/VerificationCode";

export const createVerificationCode = async(query: {
  userId: unknown;
  type: string;
  expiresAt: Date;
}) =>{
  return await verificationCodeSchema.create(query);
}

export const createVerificationEmail = async(query: {
  _id: string;
  type: string;
  expiresAt: { $gt: Date };
}) =>{
  return await verificationCodeSchema.findOne(query);
}

export const resetPasswordEmail = async(query: {
  userId: unknown;
  type: string;
  createdAt: { $gt: Date }
}) =>{
  return await verificationCodeSchema.countDocuments(query);
}

export const resetPasswordCode = async(query: {
  userId: unknown;
  type: string;
  expiresAt: Date;
}) =>{
  return await verificationCodeSchema.create(query);
}

export const resetCodeValidate = async (query: {
  resetCodeId: string;
  type: string;
}) => {
  return await verificationCodeSchema.findOne({
    _id: query.resetCodeId,
    type: query.type,
    expiresAt: { $gt: new Date() }
  });
};