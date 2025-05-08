import { RequestHandler } from "express";
import mongoose from "mongoose";

import { UNAUTHORIZED } from "../constants/httpCodes";
import { verifyToken } from "../utils/jwt/verifyToken";

import AppErrorCode from "../constants/appErrorCode";
import appAssert from "../utils/appAssert";

const authenticate: RequestHandler = async(req, res, next) =>{
  try{
    const accessToken = req.cookies.accessToken as string | undefined;
    appAssert(
      accessToken,
      UNAUTHORIZED,
      "Not authorized",
      AppErrorCode.InvalidAccessToken
    );
  
    const { error, payload } = verifyToken(accessToken);
    appAssert(
      payload,
      UNAUTHORIZED,
      error === "jwt expired" ? "Token expired" : "Invalid token",
      AppErrorCode.InvalidAccessToken
    );
    req.userId = payload.userId as mongoose.Types.ObjectId;
    req.sessionId = payload.sessionId as mongoose.Types.ObjectId;
    next();
  }
  catch(error){
    next(error);
  }
};

export default authenticate;