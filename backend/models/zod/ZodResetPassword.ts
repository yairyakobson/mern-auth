import { z } from "zod";

import { zodVerificationCodeSchema } from "./zodVerificationCode";
import zodPasswordSchema from "./ZodPassword";

export const zodResetPasswordSchema = z.object({
  verificationCode: zodVerificationCodeSchema,
  password: zodPasswordSchema
});