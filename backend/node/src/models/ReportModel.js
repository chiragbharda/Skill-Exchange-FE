const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema({
  reporterId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
  reportedUserId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
  reason: { type: String, required: true },
  status: { type: String, enum: ["Pending", "Reviewed"], default: "Pending" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Report", ReportSchema);
