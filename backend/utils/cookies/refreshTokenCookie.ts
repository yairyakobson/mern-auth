import { CookieOptions } from "express";

import defaults, { refreshPath } from "./main";
import { thirtyDaysFromNow } from "../date";

export const getRefreshTokenCookieOptions = (): CookieOptions =>({
  ...defaults,
  expires: thirtyDaysFromNow(),
  path: refreshPath
});