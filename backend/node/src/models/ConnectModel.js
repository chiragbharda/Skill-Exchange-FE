const mongoose = require("mongoose");

const ConnectSchema = new mongoose.Schema({
    senderId: { type: mongoose.Schema.Types.ObjectId,
         ref: "users", 
         required: true },
    receiverId: { type: mongoose.Schema.Types.ObjectId, 
        ref: "users",
         required: true },
    status: { type: String, 
        enum: ["Pending", "Accepted", "Rejected"],
         default: "Pending" },
}, { timestamps: true });

module.exports = mongoose.model("Connect", ConnectSchema);
