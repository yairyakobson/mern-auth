import bcrypt from "bcrypt";

export const hashValue = async(val: string) =>
  bcrypt.hash(val, 10);

export const compareValue = async (val: string, hashedValue: string) =>
  bcrypt.compare(val, hashedValue).catch(() => false);