const express = require("express");
const { sendConnectionRequest, respondToRequest, getReceivedRequests } = require("../controllers/ConnectController");
const router = express.Router();
//only for request opration
router.post("/request/create", sendConnectionRequest);
router.post("/respond/:id", respondToRequest);
router.get("/received/:userId",getReceivedRequests);

//

module.exports = router;
