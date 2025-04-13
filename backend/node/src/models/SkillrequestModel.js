const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SkillrequestSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users", required: true
  }, 
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: false
  },
  subcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subcategory",
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },

  education: [
    {
      institution: {
        type: String,
        default: "",
      },
      degree: {
        type: String,
        default: "",
      },
      startDate: {
        type: Date,
        default: null,
      },
      endDate: {
        type: Date,
        default: null, 
      },
      score: {
        type: Number,
        default: 0,
      },
      description: {
        type: String,
        default: "",
      },
    },
  ],
});

module.exports = mongoose.model("SkillRequest", SkillrequestSchema);
