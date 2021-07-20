import { Router } from "express"
import RoomModel from "../../models/Room/index.js"
import createError from "create-error"
import { JWTAuthMiddleware } from "../../auth/middlewares.js"

const roomsRouter = Router()

roomsRouter.post("/", JWTAuthMiddleware, async (req, res) => {
  try {
    const newRoom = new RoomModel(req.body)
    newRoom.users.push(req.user)
    const response = await newRoom.save()
    res.status(201).send(response._id)
  } catch (error) {
    console.log(error)
    if (error.name === "ValidationError") {
      next(createError(400, error))
    } else {
      next(createError(500, error))
    }
  }
})

roomsRouter.post(
  "/:id/addUser/:userId",
  JWTAuthMiddleware,
  async (req, res) => {
    try {
      const room = await RoomModel.findById(req.params.id)
      if (room) {
        const updateRoomUsers = await RoomModel.findByIdAndUpdate(
          req.params.id,
          {
            $push: {
              users: req.params.userId,
            },
          },
          {
            runValidators: true,
            new: true,
          }
        )
        res.status(201).send(updateRoomUsers)
      } else {
        next(createError(404, "post not found"))
      }
    } catch (error) {
      next(createError(500, "an error occurred while adding a user to a room"))
    }
  }
)

roomsRouter.get("/myRooms", JWTAuthMiddleware, async (req, res) => {
  try {
    const rooms = await RoomModel.find({ users: req.user })
    if (rooms) {
      res.status(200).send(rooms)
    }
    res.send(createError(404, "No user found"))
  } catch (error) {
    console.log(error)
  }
})

export default roomsRouter
