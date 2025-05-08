import { Response } from "express";

import { refreshPath } from "./main";

export const clearAuthCookies = (res: Response): Response =>{
  return res
  .clearCookie("accessToken")
  .clearCookie("refreshToken", {
    path: refreshPath
  });
}