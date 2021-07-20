import { Router } from "express"
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

usersRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body
    console.log(email)
    const user = await UserModel.checkCredentials(email, password)

    if (user) {
      console.log("credentials are fine")
      const accessToken = await JWTAuthenticate(user)
      console.log("token", accessToken)
      res.send({ accessToken })
    } else {
      next(createError(401))
    }
  } catch (error) {
    next(error)
  }
})

export default usersRouter
