import { Request, Response } from "express";

import bcrypt from "bcrypt";
import fsPromises from "fs/promises";
import jsonwebtoken from "jsonwebtoken";
import path from "path";
import users from "./../model/user.json";

export const registerUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ message: "username and password is required" });
    return;
  }
  const currentUser = users.find((item) => item.username === username);
  if (currentUser) {
    res.status(400).json({ message: "username is already exists" });
    return;
  }

  try {
    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "user.json"),
      JSON.stringify([...users, { username, password: bcrypt.hashSync(password, 10) }])
    );
    res.status(201).json({ message: "User created" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ message: "username and password is required" });
    return;
  }
  const currentUser = users.find((item) => item.username === username);
  if (!currentUser) {
    res.status(400).json({ message: "username or password is wrong" });
    return;
  }
  if (!bcrypt.compareSync(password, currentUser.password)) {
    res.status(400).json({ message: "username or password is wrong" });
    return;
  }
  const token = jsonwebtoken.sign({ username }, process.env.JWT_SECRET_KET || "", {
    expiresIn: "1d",
  });
  res.cookie("jwt", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
  res.status(200).json({ message: "You successfully log in" });
};

export const getUser = async (req: Request, res: Response) => {
  res.json({ user: {} });
};
