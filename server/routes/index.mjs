import { Router } from "express";
import usersRouter from "./user.mjs";
import cookieRouter from "./cookie.mjs";
import modelsRouter from "./models.mjs";
import jwtRouter from "./jwt.mjs";

const router = Router();

router.use(usersRouter);
router.use(cookieRouter);
router.use(jwtRouter);
router.use(modelsRouter);

export default router;

/* "Admin"
Admin123.
"admin@email.com" */