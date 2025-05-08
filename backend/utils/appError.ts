import { HttpStatusCode } from "../constants/httpCodes";

import AppErrorCode from "../constants/appErrorCode";

class AppError extends Error{
  constructor(
    public statusCode: HttpStatusCode,
    public message: string,
    public errorCode?: AppErrorCode
  ){
    super(message);
  }
}

export default AppError;