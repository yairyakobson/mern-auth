import { OK } from "../../../constants/httpCodes";
import { fetchSessions } from "../../../dataAccess/sessions";

import errorCatcher from "../../../utils/errorCatcher";

export const getSessionHandler = errorCatcher(
  async(req, res) =>{
    const sessions = await fetchSessions(
      {
        userId: req.userId,
        expiresAt: { $gt: new Date() }
      },
      {
        _id : 1,
        userAgent: 1,
        createdAt: 1
      },
      {
        sort: { createdAt: -1 } // Descending order (returns the newest session)
      }
    );

    return res.status(OK).json(
      sessions.map((session) =>({
        ...session.toObject(), // Returning each session
        ...(
          session.id === req.sessionId && { // Checking if the id of our session is equal to the current sessionId
            isCurrent: true // Tells which is the current session
          })
      }))
    )
  }
)