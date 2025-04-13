const express = require("express");
const reviewController = require("../controllers/ReviewController");
const router = express.Router();

router.post("/addreview", reviewController.giveRating );
router.get("/getreview/:userId", reviewController.getReviewsByUser);
// router.get("/user/:userId", reviewController.getReviewsByUser);

module.exports = router;
