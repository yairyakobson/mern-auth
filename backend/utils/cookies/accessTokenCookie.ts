import { CookieOptions } from "express";

import { fifteenMinutesFromNow } from "../date";
import defaults from "./main";

export const getAccessTokenCookieOptions = (): CookieOptions =>({
  ...defaults,
  expires: fifteenMinutesFromNow(),
});