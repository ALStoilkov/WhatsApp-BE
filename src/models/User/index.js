import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  jwt: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: "https://via.placeholder.com/150",
  },
  status: {
    type: String,
    enum: ["Online", "Offline"],
    default: "Offline",
  },
});

export default mongoose.model("User", UserSchema);
