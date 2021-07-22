import { Router } from "express"
import createError from "http-errors"
import UserModel from "../../models/User/index.js"
import { JWTAuthenticate } from "../../auth/tools.js"

const usersRouter = Router()

usersRouter.post("/", async (req, res) => {
  try {
    const newUser = new UserModel(req.body)
    const { _id } = await newUser.save()

    res.status(201).send(_id)
  } catch (error) {
    console.log(error)
    next(createError(500, "An error occurred while saving new author"))
  }
})

usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await UserModel.find()
    res.status(200).send(users)
  } catch (error) {
    next(createError(500, { message: error.message }))
  }
})

usersRouter.get("/:username", async (req, res, next) => {
  try {
    const users = await UserModel.find(
      { username: req.params.username },
      { email: 0 }
    )

    if (users) {
      res.status(200).send(users)
    }
    res.send(createError(404, "No user found"))
  } catch (error) {
    next(error)
  }
})

// usersRouter.get('/:id', async (req, res, next) => {
//   try {
//     const user = await UserModel.findById(req.params.id);
//     if (!user) next(createError(404, `ID ${req.params.id} was not found`));
//     else res.status(200).send(user);
//   } catch (error) {
//     next(error);
//   }
// });

usersRouter.put("/:id", async (req, res, next) => {
  try {
    const updateUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { runValidators: true, new: true }
    )
    res.status(201).send(updateUser)
  } catch (error) {
    next(error)
  }
})

usersRouter.delete("/:id", async (req, res, next) => {
  try {
    const deleteUser = await UserModel.findByIdAndDelete(req.params.id)
    if (deleteUser) res.status(201).send("Profile deleted")
    else next(createError(400, "Bad Request"))
  } catch (error) {
    next(error)
  }
})

usersRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body
    console.log(email)
    const user = await UserModel.checkCredentials(email, password)

    if (user) {
      console.log("credentials are fine")
      const accessToken = await JWTAuthenticate(user)
      console.log("token", accessToken)
      res.send({ accessToken, userId: user._id })
    } else {
      next(createError(401))
    }
  } catch (error) {
    next(error)
  }
})

export default usersRouter
