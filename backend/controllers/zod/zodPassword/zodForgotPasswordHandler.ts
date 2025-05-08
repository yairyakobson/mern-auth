import { zodEmailSchema } from "../../../models/zod/ZodEmail";
import { sendResetPasswordEmail } from "../../mongoose/password/forgotPassword";

import errorCatcher from "../../../utils/errorCatcher";

export const sendResetPasswordEmailHandler = errorCatcher(async(req, res) =>{
  const resetPasswordEmail = zodEmailSchema.parse(req.body.email);
  await sendResetPasswordEmail({
    email: resetPasswordEmail
  });

  return res.status(200).json({
    message: "A reset password email has been sent"
  })
});