import { Response } from "express";
import { z } from "zod";

import { BAD_REQUEST } from "../constants/httpCodes";

const zodErrorHandler = (res: Response, error: z.ZodError) =>{
  const errors = error.issues.map((err) =>({
    path: err.path.join("."),
    message: err.message
  }));

  return res.status(BAD_REQUEST).json({
    message: errors[0]?.message
  });
};

export default zodErrorHandler;