const SkillListing = require("../models/SkillModel");
const multer = require("multer");
const cloudinaryUtil = require("../utils/CloudanryUtil");

const upload = multer({ storage: multer.memoryStorage() }).single("image");

const addSkillListing = async (req, res) => {
  try {
    const skillListing = await SkillListing.create(req.body);
    res.status(201).json({ message: "Skill listing added successfully", data: skillListing });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSkillListingsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const skillListings = await SkillListing.find({ userId }).populate("category subcategory");
    res.status(200).json({ message: "Skill listings retrieved successfully", data: skillListings });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addSkillWithFile = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    try {
      const cloudinaryResponse = await cloudinaryUtil.uploadFileToCloudinary(req.file);
      req.body.imageURL = cloudinaryResponse.secure_url;
      const savedSkill = await SkillListing.create(req.body);

      res.status(201).json({ message: "Skill saved successfully", data: savedSkill });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
};

module.exports = { addSkillListing, getSkillListingsByUser, addSkillWithFile };
