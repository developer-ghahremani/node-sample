require("dotenv").config();

import { accessLogStream } from "./config/logger.config";
import express from "express";
import expressListEndpoints from "express-list-endpoints";
import morgan from "morgan";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(morgan("combined", { stream: accessLogStream }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.listen(PORT, () => {
  if (process.env.NODE_ENV === "development") {
    const endpoints = expressListEndpoints(app);
    endpoints
      .filter((item) => item.path.startsWith("/"))
      .forEach((item) => console.log(item.methods + " " + item.path));
  }
  console.log(`Server Run On PORT ${PORT}`);
});
