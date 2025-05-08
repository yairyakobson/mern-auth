import { zodResetPasswordSchema } from "../../../models/zod/ZodResetPassword";
import { clearAuthCookies } from "../../../utils/cookies/clearAuthCookies";
import { resetPassword } from "../../mongoose/password/resetPassword";

import errorCatcher from "../../../utils/errorCatcher";

export const resetPasswordHandler = errorCatcher(async(req, res) =>{
  const resetPasswordRequest = zodResetPasswordSchema.parse(req.body);
  await resetPassword(resetPasswordRequest);

  return clearAuthCookies(res.status(200).json({
    message: "Your password reset was successful"
  }));
});