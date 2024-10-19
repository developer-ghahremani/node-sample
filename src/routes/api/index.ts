import express from "express";
import userRouter from "./user";

const apiRouter = express.Router();

apiRouter.use("/user", userRouter);

apiRouter.all("*", (req, res) => {
  res.status(404).json({ message: "404 occurred" });
});

export default apiRouter;
