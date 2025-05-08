import { Router } from "express";

import { getUserHandler } from "../controllers/mongoose/authentication/authUtils/getUser";

const userRouter = Router();

userRouter.route("/user").get(getUserHandler);

export default userRouter;