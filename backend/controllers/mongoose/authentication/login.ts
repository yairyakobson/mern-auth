import { UNAUTHORIZED } from "../../../constants/httpCodes";
import { loginUser } from "../../../dataAccess/users";
import { Authentication } from "../../../types/authenticationTypes";
import { signToken } from "../../../utils/jwt/signToken";
import { refreshTokenSignOptions } from "../../../utils/jwt/refreshTokenSignOptions";

import { createLoginSession } from "../../../dataAccess/sessions";
import appAssert from "../../../utils/appAssert";

export const login = async({
    email,
    password,
    userAgent
}: Authentication) =>{
    const user = await loginUser(email);
    appAssert(user, UNAUTHORIZED, "Invalid email or password");
    
    const isValid = await user.comparePassword(password);
    appAssert(isValid, UNAUTHORIZED, "Invalid email or password");

    const userId = user._id;
    const session = await createLoginSession({
      userId,
      userAgent
    });

    const sessionInfo = {
      sessionId: session?._id
    }
    
    const refreshToken = signToken(sessionInfo, refreshTokenSignOptions)
    
    const accessToken = signToken({
      ...sessionInfo,
      userId
    })

    return{
      user: user.omitPassword(),
      refreshToken,
      accessToken
    }
}