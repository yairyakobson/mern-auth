import jwt from "jsonwebtoken";

import { AccessTokenPayload } from "../../types/accessTokenTypes";
import { RefreshTokenPayload } from "../../types/refreshTokenTypes";

import SignOptionsAndSecret from "../../types/signOptionsTypes";
import defaults from "./main";
import accessTokenSignOptions from "./accessTokenSignOptions";

export const signToken = (
  payload: AccessTokenPayload | RefreshTokenPayload,
  options?: SignOptionsAndSecret
) =>{
  const { secret, ...signOptions } = options || accessTokenSignOptions
  return jwt.sign(payload, secret, {
    ...defaults,
    ...signOptions,
  });
}