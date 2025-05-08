import { zodLoginSchema } from "./ZodLogin";
import passwordSchema from "./ZodPassword";

export const zodRegisterSchema = zodLoginSchema
  .extend({
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });