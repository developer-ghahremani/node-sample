import { NextFunction, Request, Response } from "express";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log("I recieved to the middle ware", req.signedCookies);

  next();
};
