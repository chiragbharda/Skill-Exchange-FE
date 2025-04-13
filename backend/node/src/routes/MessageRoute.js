const express = require("express");
const { sendMessage, getMessages } = require("../controllers/MessageController");

const router = express.Router();

// Route to send a message
router.post("/messages/send", sendMessage);

// Route to get all messages between users
router.get("/messages/:roomId", getMessages);

module.exports = router;
