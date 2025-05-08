import { OK } from "../../../constants/httpCodes";
import { zodLoginSchema } from "../../../models/zod/ZodLogin";
import { setAuthCookies } from "../../../utils/cookies/setAuthCookies";
import { login } from "../../mongoose/authentication/login";

import errorCatcher from "../../../utils/errorCatcher";

export const loginHandler = errorCatcher(async(req, res) =>{
  const request = zodLoginSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"] // Postman Parameter
  });
  const { accessToken, refreshToken } = await login(request);

  // set cookies
  setAuthCookies({ res, accessToken, refreshToken });
  return res.status(OK).json({
    message: "Login Successful"
  })
});