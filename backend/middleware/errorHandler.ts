import { ErrorRequestHandler, Response } from "express";
import { z } from "zod";

import { CONFLICT, INTERNAL_SERVER_ERROR } from "../constants/httpCodes";
import { refreshPath } from "../utils/cookies/main";
import { clearAuthCookies } from "../utils/cookies/clearAuthCookies";

import zodErrorHandler from "./zodErrorHandler";
import AppError from "../utils/appError";

const appErrorHandler = (res: Response, error: AppError) =>{
  return res.status(error.statusCode).json({
    error: error?.message,
    errorCode: error?.errorCode
  });
}

const errorHandler: ErrorRequestHandler = (error, req, res, next) =>{
  console.log(`PATH ${req.path}`, {
    message: error.message
  });

  if(req.path === refreshPath){
    clearAuthCookies(res) // Clears cookies in case an error is thrown in the refresh path
  }

  if(error instanceof z.ZodError){
    zodErrorHandler(res, error);
    return;
  }
  if(error instanceof AppError){
    appErrorHandler(res, error);
    return;
  }
  if(error.code === 11000){
    const message = "Email Address already exists";
    res.status(CONFLICT).send({ message });
    return;
  }

  res.status(INTERNAL_SERVER_ERROR).json({
    message: error.message
  });
  return;
};

export default errorHandler;