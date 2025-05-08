import { z } from "zod";

import { zodEmailSchema } from "./ZodEmail";
import zodPasswordSchema from "./ZodPassword";

export const zodLoginSchema = z.object({
  email: zodEmailSchema,
  password: zodPasswordSchema,
  userAgent: z.string().optional()
});