const express = require("express");
const skillRequestController = require("../controllers/SkillrequestController");
const router = express.Router();

router.post("/addrequest", skillRequestController.createSkillRequest);
router.get("/request/:userId", skillRequestController.getSkillRequestsByUser);


module.exports = router;
