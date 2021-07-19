import { Router } from "express";
import RoomModel from "../../models/Room/index.js";
import createError from "create-error";

const roomsRouter = Router();

roomsRouter.post("/", async (req, res) => {
  const newRoom = new RoomModel(req.body);
  await newRoom.save();
  res.status(201).send(newRoom);
});
roomsRouter.get("/:roomID", async (req, res) => {
  try {
    const room = await RoomModel.findOne({ _id: req.params.roomID });

    if (room) {
      res.status(200).send(room);
    }
    res.send(createError(404, "No user found"));
  } catch (error) {
    console.log(error);
  }
});

export default roomsRouter;
