require("dotenv").config();

import { accessLogStream } from "./config/logger.config";
import apiRouter from "./routes/api";
import express from "express";
import expressListEndpoints from "express-list-endpoints";
import mongoose from "mongoose";
import morgan from "morgan";
import path from "path";
import router from "./routes";

const app = express();
const PORT = process.env.PORT || 3000;
mongoose
  .connect(
    "mongodb+srv://rghahremani:5iR6gbMDYvhVRpj@cluster0.y4vqo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .catch((error) => console.log(error, "ERROR"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(morgan("combined", { stream: accessLogStream }));

app.use("/api", apiRouter);
app.use("/", router);

mongoose.connection.once("open", () => {
  app.listen(PORT, () => {
    if (process.env.NODE_ENV === "development") {
      const endpoints = expressListEndpoints(app);
      endpoints
        .filter((item) => item.path.startsWith("/"))
        .forEach((item) => console.log(item.methods + " " + item.path));
    }
    console.log(`Server Run On PORT ${PORT}`);
  });
});
