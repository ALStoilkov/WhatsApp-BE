import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		required: true,
		enum: ["Admin", "User"],
		default: "User",
	},
	avatar: {
		type: String,
		required: true,
		default: "https://image.flaticon.com/icons/png/512/5173/5173555.png",
	},
});

UserSchema.pre('save', async function (next) {
  const newUser = this;
  const plainPw = newUser.password;

  if (newUser.isModified('password')) {
    newUser.password = await bcrypt.hash(plainPw, 10);
  }
  next();
});

export default mongoose.model("User", UserSchema);
