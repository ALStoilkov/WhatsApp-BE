import { Router } from "express";
import UserModel from "../../models/User/index.js";
import { JWTAuthenticate } from "../../auth/tools.js";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const usersRouter = Router();

usersRouter.post("/", async (req, res) => {
  const newUser = new UserModel(req.body);
  await newUser.save();

  res.status(201).send(newUser);
});

//------------------------------------CLOUDINARY---

    const cloudinaryStorage = new CloudinaryStorage({
			cloudinary,
			params: { folder: "whatsapp" },
		})

		const upload = multer({
			storage: cloudinaryStorage,
		}).single("image")

		usersRouter.post("/:id/upload", upload, async (req, res, next) => {
			try {
				const data = await user.update(
					{ imageUrl: req.file.path },
					{
						where: { _id: req.params.id },
						returning: true,
					}
          )
          console.log(data)
				if (data[0] === 1) res.send(data[1][0])
				else res.status(404).send("ID not found")
			} catch (error) {
				next(error.message)
			}
		})

export default usersRouter;
