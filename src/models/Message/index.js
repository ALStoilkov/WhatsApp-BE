import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  content: {
    text: {
      type: String,
      required: true,
    },
    attachment: String,
  },
  sender: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
});

export const MessageModel = mongoose.model("Message", MessageSchema);

export default MessageSchema;
