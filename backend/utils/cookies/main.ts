import { CookieOptions } from "express";

export const refreshPath = "/api/v1/refresh";
// const secure = process.env.NODE_ENV !== "development";

const defaults: CookieOptions = {
  sameSite: "strict",
  httpOnly: true,
  secure: true
};

export default defaults;