import express from "express";

import authRoutes from "./authRoutes";
import sessionRoutes from "./sessionRoutes";
import userRoutes from "./userRoutes";
import authenticate from "../middleware/authenticate";

const router = express.Router();
router.use(authRoutes);
router.use(authenticate, sessionRoutes);
router.use(authenticate, userRoutes);

export default router;