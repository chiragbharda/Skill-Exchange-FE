const mongoose = require("mongoose");
const Schema =mongoose.Schema;

const ReviewSchema = new mongoose.Schema({
  rater: { type:Schema.Types.ObjectId, ref: 'users', required: true }, // Who gave the rating
  ratedUser: { type: Schema.Types.ObjectId, ref: 'users', required: true }, // Who is being rated
  stars: { type: Number, required: true, min: 1, max: 5 },
  review: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Review", ReviewSchema);
