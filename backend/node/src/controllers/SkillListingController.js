const SkillListing = require("../models/SkilllistingModel");
const multer = require("multer");
const path = require("path");
const cloudinaryUtil = require("../utils/CloudanryUtil");
const SkilllistingModel = require("../models/SkilllistingModel");

// Multer Setup for In-Memory Storage
// const upload = multer({
//    storage: multer.memoryStorage() }).single("image");
//storage
const storage = multer.diskStorage({
  destination: "./upload",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

//multer object....
const upload = multer({
  storage: storage,
  //fileFilter:
}).single("image");

// Add Skill Listing
const addSkillListing = async (req, res) => {
  try {
    const { linkedin,
      github,
      portfolio,
      proficientSkills,
      skillsToLearn,
      education, userId, } = req.body;
     console.log(req.body)
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const skillListing = new SkillListing({
      linkedin,
      github,
      portfolio,
      proficientSkills,
      skillsToLearn,
      education,
      userId,
    });

    await skillListing.save();
    res.status(201).json({ message: "Skill listing added successfully", data: skillListing });

  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Error adding skill listing", error: error.message });
  }
};

// Get Skill Listings by User
const getSkillListingsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const skillListings = await SkillListing.find({ userId:userId }).populate("userId");

    
    res.status(200).json({
      success: true,
      message: "Skill listings retrieved successfully",
      data: skillListings,
    });
  } catch (error) {
    console.error("Error retrieving skill listings:", error);

    res.status(500).json({
      success: false,
      message: "Error retrieving skill listings",
      error: error.message,
    });
  }
};

// get all skill

const getAllSkill = async (req, res) => {
  try {
    
    const skillListings = await SkillListing.find().populate("userId");
    
  
    res.status(200).json({
      success: true,
      message: "Skill listings retrieved successfully",
      data: skillListings,
    });
  } catch (error) {
    console.error("Error retrieving skill listings:", error);

    res.status(500).json({
      success: false,
      message: "Error retrieving skill listings",
      error: error.message,
    });
  }
};

// const addSkillWithFile = async (req, res) => {
//   try {
//     upload(req, res, async (err) => {
//       if (err) {
//         console.log(err);
//         return res.status(500).json({
//           message: err.message,
//         });
//       }

//       // Upload to Cloudinary
//       const cloudinaryResponse = await cloudinaryUtil.uploadFileToCloudinary(
//         req.file
//       );
//       console.log("Cloudinary Response:", cloudinaryResponse);

//       // Store URL in database
//       req.body.imageURL = cloudinaryResponse.secure_url;
//       const savedImage = await SkillListing.create(req.body);
//       console.log("Saved Data:", savedImage);

//       res.status(200).json({
//         message: "file saved successfully",
//         data: savedImage,
//       });
//     });
//   } catch (error) {
//     console.error("Error in addFile:", error);
//     res.status(500).json({
//       message: "Internal Server Error",
//     });
//   }
// };

// const addSkillWithFile = async (req, res) => {
//   upload(req, res, async (err) => {
//     if (err) {
//       console.log(err);
//       return res.status(500).json({ message: err.message });
//     }

//     try {
//       const {
//         linkedin,
//         github,
//         portfolio,
//         proficientSkills,
//         skillsToLearn,
//         education,
//         userId,
//       } = req.body;

//       if (!userId) {
//         return res.status(400).json({ message: "User ID is required" });
//         console.log(res.status)
//       }

//       // Upload file to Cloudinary
//       const cloudinaryResponse = await cloudinaryUtil.uploadFileToCloudinary(req.file);
//       console.log("Cloudinary Response:", cloudinaryResponse);

//       // Create SkillListing with image
//       const skillListing = new SkillListing({
//         linkedin,
//         github,
//         portfolio,
//         proficientSkills: JSON.parse(proficientSkills),
//         skillsToLearn: JSON.parse(skillsToLearn),
//         education: JSON.parse(education),
//         userId,
//       });

//       // Save profilePic in userId field
//       skillListing.userId = {
//         _id: userId,
//         profilePic: cloudinaryResponse.secure_url,
//       };

//       await skillListing.save();

//       res.status(201).json({
//         success: true,
//         message: "Skill listing with image uploaded successfully",
//         data: skillListing,
//       });
//     } catch (error) {
//       console.error("Error in addSkillWithFile:", error);
//       res.status(500).json({
//         success: false,
//         message: "Error uploading skill with image",
//         error: error.message,
//       });
//     }
//   });
// };

const updateSkillWithFile = async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!userId) {
      console.error("❌ Missing userId in request params");
      return res.status(400).json({ message: "User ID is required" });
    }

    // Parse fields
    const proficientSkills = req.body.proficientSkills ? JSON.parse(req.body.proficientSkills) : [];
    const skillsToLearn = req.body.skillsToLearn ? JSON.parse(req.body.skillsToLearn) : [];
    const education = req.body.education ? JSON.parse(req.body.education) : {};

    const updateData = {
      linkedin: req.body.linkedin,
      github: req.body.github,
      portfolio: req.body.portfolio,
      proficientSkills,
      skillsToLearn,
      education,
    };

    // Handle image upload
    if (req.file) {
      console.log("🖼 Skill image received:", req.file.originalname);
      const cloudinaryRes = await cloudinaryUtil.uploadFileToCloudinary(req.file);
      updateData.image = cloudinaryRes.secure_url;
    }

    const updatedSkill = await SkillListing.findOneAndUpdate(
      { userId },
      updateData,
      { new: true }
    );

    if (!updatedSkill) {
      return res.status(404).json({ message: "Skill listing not found" });
    }

    res.status(200).json({
      message: "✅ Skill listing updated successfully",
      data: updatedSkill,
    });
  } catch (error) {
    console.error("🔥 Error updating skill:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};





module.exports = { addSkillListing, getSkillListingsByUser,updateSkillWithFile, getAllSkill };
