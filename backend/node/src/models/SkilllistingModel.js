const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const skillListingSchema = new Schema({
  userId: {
      type: Schema.Types.ObjectId,
      ref: "users", required: true
    },
    profilePic: String, 
  linkedin: { type: String },
  github: { type: String },
  portfolio: { type: String },
  proficientSkills: { type: [String], default: [] },
  skillsToLearn: { type: [String],
    required: true, 
    default: [] },
  education: {
    institution: { type: String },
    degree: { type: String },
    grade: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    description: { type: String },
  },
}, { timestamps: true });

module.exports = mongoose.model("skillListings", skillListingSchema);
