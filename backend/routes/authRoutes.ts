import { Router } from "express";

import { registrationHandler } from "../controllers/zod/zodAuthentication/zodRegistration";
import { loginHandler } from "../controllers/zod/zodAuthentication/zodLogin";
import { logoutHandler } from "../controllers/zod/zodAuthentication/zodAuthUtils/zodLogout";
import { refreshHandler } from "../controllers/zod/zodAuthentication/zodAuthUtils/zodRefresh";
import { emailVerificationHandler } from "../controllers/zod/zodAuthentication/zodAuthUtils/zodEmailVerification";
import { sendResetPasswordEmailHandler } from "../controllers/zod/zodPassword/zodForgotPasswordHandler";
import { resetPasswordHandler } from "../controllers/zod/zodPassword/zodResetPasswordHandler";

const authRouter = Router();

authRouter.route("/register").post(registrationHandler);
authRouter.route("/login").post(loginHandler);
authRouter.route("/logout").get(logoutHandler);
authRouter.route("/refresh").get(refreshHandler);

authRouter.route("/email/verify/:code").get(emailVerificationHandler);
authRouter.route("/password/forgot").post(sendResetPasswordEmailHandler);
authRouter.route("/password/reset").post(resetPasswordHandler);

export default authRouter;