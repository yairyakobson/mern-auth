import { NOT_FOUND, INTERNAL_SERVER_ERROR } from "../../../../constants/httpCodes";
import { updateUserStatus } from "../../../../dataAccess/users";
import { createVerificationEmail } from "../../../../dataAccess/verification";

import VerificationCodeType from "../../../../constants/verificationCodeType";
import appAssert from "../../../../utils/appAssert";

export const verifyEmail = async(code: string) =>{
  const validCode = await createVerificationEmail({
    _id: code,
    type: VerificationCodeType.EmailVerification,
    expiresAt: { $gt: new Date() }
  });
  appAssert(validCode, NOT_FOUND, "Invalid or expired verification code");

  const updatedUser = await updateUserStatus(
    validCode.userId,
    { verified: true },
    { new: true }
  )
  appAssert(updatedUser, INTERNAL_SERVER_ERROR, "Email verification failed");
  await validCode.deleteOne();

  return{
    user: updatedUser.omitPassword()
  }
};