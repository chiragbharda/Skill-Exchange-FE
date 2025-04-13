const SkillRequest = require("../models/SkillrequestModel");

// Create a Skill Request
const createSkillRequest = async (req, res) => {
  try {
    console.log(req.body)
    const skillRequest = await SkillRequest.create(req.body);
    console.log(req.body)
    res.status(201).json({ message: "Skill request created successfully", data: skillRequest });
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: err.message });
  }
};

// Get Skill Requests by User
const getSkillRequestsByUser = async (req, res) => {
  try {
     const { userId } = req.params;
 
     const Skillrequest = await SkillRequest.find({ userId }).populate("userId", "name email");
 
     res.status(200).json({
       success: true,
       message: "Skill request retrieved successfully",
       data: Skillrequest,
     });
   } catch (error) {
     console.error("Error retrieving skill request:", error);
 
     res.status(500).json({
       success: false,
       message: "Error retrieving skill request",
       error: error.message,
     });
   }
 };

// Update Skill Request Status
const updateSkillRequestStatus = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { status } = req.body;
    const updatedRequest = await SkillRequest.findByIdAndUpdate(requestId, { status }, { new: true });
    res.status(200).json({ message: "Skill request updated successfully", data: updatedRequest });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createSkillRequest, getSkillRequestsByUser, updateSkillRequestStatus };
