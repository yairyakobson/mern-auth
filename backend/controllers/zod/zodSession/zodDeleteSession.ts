import { z } from "zod";
import errorCatcher from "../../../utils/errorCatcher";
import appAssert from "../../../utils/appAssert";
import { NOT_FOUND, OK } from "../../../constants/httpCodes";
import { deleteSingleSession } from "../../../dataAccess/sessions";

export const deleteSessionHandler = errorCatcher(async(req, res) =>{
  const sessionId = z.string().parse(req.params.id);
  const deletedSession = await deleteSingleSession({
    _id: sessionId,
    userId: req.userId // Making sure not every user can delete a session
  });
  appAssert(deletedSession, NOT_FOUND, "Session not found")
  return res.status(OK).json({
    message: "Session Deleted"
  });
});