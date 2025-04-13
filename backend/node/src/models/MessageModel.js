const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new mongoose.Schema({
  roomId: { type: String, required: true },
  senderId: { type: String, required: true },
  receiverId: { type: String, required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }, // Make sure the timestamp is being handled
});

module.exports = mongoose.model("Message", MessageSchema);
