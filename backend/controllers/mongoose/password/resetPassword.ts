import { INTERNAL_SERVER_ERROR, NOT_FOUND } from "../../../constants/httpCodes";
import { deleteAllSessions } from "../../../dataAccess/sessions";
import { newUserPassword } from "../../../dataAccess/users";
import { resetCodeValidate } from "../../../dataAccess/verification";
import { hashValue } from "../../../utils/bcrypt";

import VerificationCodeType from "../../../constants/verificationCodeType";
import ResetPasswordTypes from "../../../types/resetPasswordTypes";
import appAssert from "../../../utils/appAssert";

export const resetPassword = async(data: ResetPasswordTypes) =>{
  const validCode = await resetCodeValidate({
    resetCodeId: data.verificationCode,
    type: VerificationCodeType.PasswordReset
  });
  appAssert(validCode, NOT_FOUND, "The link and/or code are expired and/or invalid");

  const updatedUser = await newUserPassword(
    validCode.userId,
    { password: await hashValue(data.password) }
  )
  appAssert(updatedUser, INTERNAL_SERVER_ERROR, "Failed to reset password");

  await validCode.deleteOne();

  // delete all sessions
  await deleteAllSessions({ userId: validCode.userId });

  return { user: updatedUser.omitPassword() }
}