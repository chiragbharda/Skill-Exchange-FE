const express = require("express");
const skillListingController = require("../controllers/SkillController");
const router = express.Router();

router.post("/add", skillListingController.addSkillListing);
router.get("/user/:userId", skillListingController.getSkillListingsByUser);

module.exports = router;
