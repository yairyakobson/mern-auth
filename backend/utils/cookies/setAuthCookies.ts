import { getAccessTokenCookieOptions } from "./accessTokenCookie";
import { getRefreshTokenCookieOptions } from "./refreshTokenCookie";

import Cookies from "../../types/cookieTypes";

export const setAuthCookies = ({ res, accessToken, refreshToken }: Cookies) =>{
  res
  .cookie("accessToken", accessToken, getAccessTokenCookieOptions())
  .cookie("refreshToken", refreshToken, getRefreshTokenCookieOptions());
}