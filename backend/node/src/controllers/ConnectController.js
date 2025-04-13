const { request } = require("express");
const Connect = require("../models/ConnectModel");


//send request

exports.sendConnectionRequest = async (req, res) => {
    try {
        // console.log("POST Body:", req.body); // ✅ Log the request body here

        const { senderId, receiverId } = req.body;

        if (!senderId || !receiverId) {
            return res.status(400).json({ message: "Both sender and receiver IDs are required." });
        }

        const existingRequest = await Connect.findOne({ senderId, receiverId });
        if (existingRequest) {
            return res.status(400).json({ message: "Connection request already sent." });
        }

        const newRequest = new Connect({ senderId, receiverId, status: "Pending" });
        await newRequest.save();

        res.status(201).json({ message: "Connection request sent successfully!" });
    } catch (error) {
        console.error("Error sending connection request:", error);
        res.status(500).json({ message: "Error sending connection request", error });
    }
};

   
// respond to request 
exports.respondToRequest = async (req, res) => {
    try {
      const requestId = req.params.id;
      const { action } = req.body;
  
      const request = await Connect.findById(requestId).populate("senderId receiverId");
  
      if (!request) return res.status(404).json({ message: "Request not found." });
  
      if (request.status !== "Pending") {
        return res.status(400).json({ message: "Request already responded to." });
      }
  
      if (action === "accept") {
        request.status = "Accepted";
  
        request.senderId.connectedUsers.push(request.receiverId._id);
        request.receiverId.connectedUsers.push(request.senderId._id);
  
        await request.senderId.save();
        await request.receiverId.save();
      } else if (action === "reject") {
        request.status = "Rejected";
      } else {
        return res.status(400).json({ message: "Invalid action." });
      }
  
      await request.save();
      res.status(200).json({ message: `Request ${action}ed successfully.` });
    } catch (error) {
      res.status(500).json({ message: "Error responding to request", error });
    }
  };
//get  recieved request

  exports.getReceivedRequests = async (req, res) => {
    try {
       const { userId } = req.params;
       console.log(userId)
       const requests = await Connect.find({
        
        receiverId: userId,
        status: "Pending",
      }).populate("senderId", );
      console.log(requests)
  
      res.status(200).json({ requests });
    } catch (error) {
        console.error("Error in getReceivedRequests:", error);
      res.status(500).json({ message: "Error fetching requests", error });
    }
  };

