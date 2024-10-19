import { getUser, loginUser, registerUser } from "../../controller/user.controller";

import { authMiddleware } from "../../middleware/auth.middleware";
import express from "express";

const userRouter = express.Router();
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/", authMiddleware, getUser);

export default userRouter;
