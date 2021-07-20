import mongoose from "mongoose"

const MessageSchema = new mongoose.Schema({
  content: {
    text: {
      type: String,
      required: true,
    },
    attachment: String,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  timestamp: {
    type: Date,
    required: true,
  },
})

export const MessageModel = mongoose.model("Message", MessageSchema)

export default MessageSchema
