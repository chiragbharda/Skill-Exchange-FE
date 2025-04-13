const mongoose = require("mongoose");
const Review = require("../models/ReviewModel");

// POST: Give a rating & review
const giveRating = async (req, res) => {
  try {
    const { rater, ratedUser, stars, review } = req.body;

    // Validation: Check for required fields
    if (!rater || !ratedUser || !stars) {
      return res.status(400).json({ message: "Missing fields: rater, ratedUser, or stars" });
    }

    // Validation: Check if IDs are valid ObjectIds
    if (!mongoose.Types.ObjectId.isValid(rater) || !mongoose.Types.ObjectId.isValid(ratedUser)) {
      return res.status(400).json({ message: "Invalid rater or ratedUser ID" });
    }

    // Validation: Check star rating range
    if (stars < 1 || stars > 5) {
      return res.status(400).json({ message: "Stars must be between 1 and 5" });
    }

    // Check if user has already rated this user
    const existingReview = await Review.findOne({ rater, ratedUser });
    if (existingReview) {
      return res.status(400).json({ message: "You have already rated this user" });
    }

    // Create a new review
    const newReview = new Review({
      rater,
      ratedUser,
      stars,
      review,
    });

    await newReview.save();

    res.status(201).json({
      message: "Rating submitted successfully",
      data: newReview,
    });
  } catch (err) {
    console.error("Error in giveRating:", err);
    res.status(500).json({ message: "Server error while submitting review" });
  }
};

// GET: Get all reviews for a specific user
const getReviewsByUser = async (req, res) => {
  try {
    const {userId} = req.params;
    // console.log("Fetching reviews for userId:", userId); 

    

    // Fetch reviews and populate rater details
    const reviews = await Review.find({ 
      rater: userId })
      .populate("rater", )
     
      // console.log("Fetched reviews: ", reviews);

    res.status(200).json({
      message: "Reviews retrieved successfully",
      data: reviews,
    });
  } catch (err) {
    console.error("Error in getReviewsByUser:", err);
    res.status(500).json({ message: "Server error while fetching reviews" });
  }
};

module.exports = {
  giveRating,
  getReviewsByUser,
};
