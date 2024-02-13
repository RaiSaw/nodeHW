import { Router } from "express";
import usersRouter from "./user.mjs";
import cookieRouter from "./cookie.mjs";
import authRouter from "./auth.mjs";
import modelsRouter from "./model.mjs";

const router = Router();

router.use(usersRouter);
router.use(cookieRouter);
router.use(authRouter);
router.use(modelsRouter);

export default router;