import { UNAUTHORIZED } from "../../../../constants/httpCodes";
import { refreshUserAccessToken } from "../../../mongoose/authentication/authUtils/refresh";
import { getAccessTokenCookieOptions } from "../../../../utils/cookies/accessTokenCookie";
import { getRefreshTokenCookieOptions } from "../../../../utils/cookies/refreshTokenCookie";

import appAssert from "../../../../utils/appAssert";
import errorCatcher from "../../../../utils/errorCatcher";

export const refreshHandler = errorCatcher(async(req, res) =>{
  const refreshToken = req.cookies.refreshToken as string | undefined;
  appAssert(refreshToken, UNAUTHORIZED, "Missing Refresh Token");

  const { newAccessToken, newRefreshToken } = await refreshUserAccessToken(refreshToken);

  if(newRefreshToken){
    res.cookie("refreshToken", newRefreshToken, getRefreshTokenCookieOptions());
  }

  return res.status(200).cookie("accessToken", newAccessToken, getAccessTokenCookieOptions()).json({
    message: "We refreshed your session since it was close to be expired. Have a nice day"
  });
});