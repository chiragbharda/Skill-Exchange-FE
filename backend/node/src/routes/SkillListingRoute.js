const express = require("express");
const skillController = require("../controllers/SkillListingController")
const router = express.Router();
const upload = require("../Middleware/Uplode"); 
const routes = express.Router();

router.post("/addskill", skillController.addSkillListing);
router.get("/skill/:userId",skillController.getSkillListingsByUser);
router.get("/allskill/",skillController.getAllSkill);
routes.put("/skill/update/:userId", upload.single("file"), skillController.updateSkillWithFile);
// router.post("/upload",skillController.addSkillWithFile);
// router.put("/skill/update/:userId", upload.single("image"), updateSkillWithFile);


module.exports = router;