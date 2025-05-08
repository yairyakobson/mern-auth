import jwt, { VerifyOptions } from "jsonwebtoken";

import { AccessTokenPayload } from "../../types/accessTokenTypes";
import { JWT_SECRET } from "../../constants/env";

import defaults from "./main";

export const verifyToken = <TPayload extends Object = AccessTokenPayload>(
  token: string,
  options?: VerifyOptions & { secret: string }
) =>{
    const { secret = JWT_SECRET, ...verifyOptions } = options || {}
    try{
      const payload = jwt.verify(token, secret, {
        ...defaults,
        ...verifyOptions
      }) as TPayload;
      return { payload }
    }
    catch(error: any){
      return{ error: error.message }
    }
  }