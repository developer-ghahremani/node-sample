import * as rfs from "rotating-file-stream";

import path from "path";

export const accessLogStream = rfs.createStream("access.log", {
  interval: "1d", // rotate daily
  path: path.join(__dirname, "..", "log"),
});
