import { zodVerificationCodeSchema } from "../../../../models/zod/zodVerificationCode";
import { verifyEmail } from "../../../mongoose/authentication/authUtils/verifyEmail";

import errorCatcher from "../../../../utils/errorCatcher";

export const emailVerificationHandler = errorCatcher(async(req, res) =>{
  const verificationCode = zodVerificationCodeSchema.parse(req.params.code);
  await verifyEmail(verificationCode);

  return res.status(200).json({
    message: "Your email is verified"
  })
});