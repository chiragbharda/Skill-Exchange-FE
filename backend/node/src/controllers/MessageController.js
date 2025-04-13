const Message = require("../models/MessageModel");

// Save a Message to the Database
const saveMessageToDB = async (msgData) => {
  const newMessage = new Message(msgData);
  await newMessage.save();
};

// Send a Message
const sendMessage = async (req, res) => {
  const { roomId, senderId, receiverId, text } = req.body;

  try {
    // Make sure the fields are correctly received
    console.log(req.body);  // Debugging line to check the received data

    const message = new Message({ roomId, senderId, receiverId, text });
    await message.save();  // Saving message to database

    res.status(201).json({ success: true, message });
  } catch (err) {
    console.error("Error saving message:", err);  // Log the error for debugging
    res.status(500).json({ success: false, error: err.message });
  }
};


// Get Messages by Room ID
const getMessages = async (req, res) => {
  const { roomId } = req.params;
  try {
    const messages = await Message.find({ roomId }).sort({ timestamp: 1 });
    res.status(200).json({ success: true, messages });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = { sendMessage, getMessages };
