import { OK } from "../../../../constants/httpCodes";
import { clearAuthCookies } from "../../../../utils/cookies/clearAuthCookies";
import { verifyToken } from "../../../../utils/jwt/verifyToken";

import { logoutSession } from "../../../../dataAccess/sessions";
import errorCatcher from "../../../../utils/errorCatcher";

export const logoutHandler = errorCatcher(async(req, res) =>{
  const accessToken = req.cookies.accessToken;
  const { payload } = verifyToken(accessToken);

  if(payload){
    await logoutSession(payload.sessionId);
  }
  return clearAuthCookies(res).status(OK).json({
    message: "Logout successful"
  });
});