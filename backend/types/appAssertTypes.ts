import { HttpStatusCode } from "../constants/httpCodes";
import AppErrorCode from "../constants/appErrorCode";

type AppAssert = (
  condition: any,
  httpStatusCode: HttpStatusCode,
  message: string,
  appErrorCode?: AppErrorCode
) => asserts condition;

export default AppAssert;