import { NOT_FOUND, OK } from "../../../../constants/httpCodes";
import { getUser } from "../../../../dataAccess/users";

import appAssert from "../../../../utils/appAssert";
import errorCatcher from "../../../../utils/errorCatcher";

export const getUserHandler = errorCatcher(async (req, res) =>{
  const user = await getUser(req.userId);
  appAssert(user, NOT_FOUND, "User not found");

  return res.status(OK).json(user.omitPassword());
});