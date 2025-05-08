import { Router } from "express";

import { getSessionHandler } from "../controllers/mongoose/session/getSession";
import { deleteSessionHandler } from "../controllers/zod/zodSession/zodDeleteSession";

const sessionRouter = Router();

sessionRouter.route("/sessions").get(getSessionHandler);
sessionRouter.route("/sessions/:id").delete(deleteSessionHandler);

export default sessionRouter;