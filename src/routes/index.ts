import express from "express";
import path from "path";

const router = express.Router();

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});
router.all("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "404.html"));
});

export default router;
