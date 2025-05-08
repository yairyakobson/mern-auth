import { CREATED } from "../../../constants/httpCodes";
import { createAccount } from "../../mongoose/authentication/registration";
import { zodRegisterSchema } from "../../../models/zod/ZodRegister";
import { setAuthCookies } from "../../../utils/cookies/setAuthCookies";

import errorCatcher from "../../../utils/errorCatcher";

export const registrationHandler = errorCatcher(async(req, res) =>{
  const request = zodRegisterSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"] // Postman Parameter
  });
  const { user, accessToken, refreshToken } = await createAccount(request);
  
  setAuthCookies({ res, accessToken, refreshToken });
  return res.status(CREATED).json(user)
});