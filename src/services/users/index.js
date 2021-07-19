import { Router } from "express";
import UserModel from "../../models/User/index.js";

const usersRouter = Router();

usersRouter.post("/", async (req, res) => {
  const newUser = new UserModel(req.body);
  await newUser.save();

  res.status(201).send(newUser);
});

export default usersRouter;
