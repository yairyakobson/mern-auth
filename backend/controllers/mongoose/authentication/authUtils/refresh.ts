import { UNAUTHORIZED } from "../../../../constants/httpCodes";
import { RefreshTokenPayload } from "../../../../types/refreshTokenTypes";
import { ONE_DAY_MS, thirtyDaysFromNow } from "../../../../utils/date";
import { refreshTokenSignOptions } from "../../../../utils/jwt/refreshTokenSignOptions";
import { signToken } from "../../../../utils/jwt/signToken";
import { verifyToken } from "../../../../utils/jwt/verifyToken";
import { refreshUserAccessTokenSession } from "../../../../dataAccess/sessions";

import appAssert from "../../../../utils/appAssert";

export const refreshUserAccessToken = async(refreshToken: string) =>{
  const { payload } = verifyToken<RefreshTokenPayload>(refreshToken, {
    secret: refreshTokenSignOptions.secret
  });
  appAssert(payload, UNAUTHORIZED, "Invalid Refresh Token"); // Validate if there are errors with the refresh tokens

  const session = await refreshUserAccessTokenSession(payload.sessionId);
  const currentTime = Date.now()
  appAssert(
    session && session.expiresAt.getTime() > currentTime, // Check if the session exists
    UNAUTHORIZED,
    "Session Expired"
  );

  // Refreshes the session if it expires in the next 24 hours
  const sessionNeedsRefresh = session.expiresAt.getTime() - currentTime <= ONE_DAY_MS;

  if(sessionNeedsRefresh){
    session.expiresAt = thirtyDaysFromNow();
    await session.save();
  }
  const newRefreshToken = sessionNeedsRefresh ? signToken(
    {
      sessionId: session?._id
    },
    refreshTokenSignOptions
  )
  : undefined;

  const newAccessToken = signToken({
    userId: session?.userId,
    sessionId: session?._id
  });
  return{
    newAccessToken,
    newRefreshToken,
    message: "Your session has been refreshed"
  }
}