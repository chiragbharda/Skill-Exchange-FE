const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const mailUtil = require("../utils/MailUtil");
const jwt = require("jsonwebtoken");
const SkilllistingModel = require("../models/SkilllistingModel");
const secret = "secret";
const { uploadFileToCloudinary } = require("../utils/CloudanryUtil");

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const foundUser = await UserModel.findOne({ email }).populate("roleId");
    if (!foundUser) {
      return res.status(404).json({ message: "Email not found." });
    }

    const isMatch = bcrypt.compareSync(password, foundUser.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }
    const data = {
      
    }

    res.status(200).json({
      message: "Login successful",
      data: foundUser,
      
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error logging in", error });
  }
};


const signup = async (req, res) => {
  try {
    const { full_name, email, password, phone, bio, specification, roleId } = req.body;

    if (!full_name || !email || !password) {
      return res.status(400).json({ message: "Full name, email, and password are required." });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists." });
    }

    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    const newUser = await UserModel.create({
      full_name,
      email,
      password: hashedPassword,
      phone,
      bio,
      roleId,
      
    });

    // Send welcome email
    await mailUtil.sendingMail(
      newUser.email,
      "Welcome to Skill Exchange",
      `Hello ${newUser.full_name},\n\nWelcome to Skill Exchange! We’re excited to have you on board.\n\nBest Regards,\nSkill Exchange Team`
    );

    res.status(201).json({ message: "User registered successfully", data: newUser });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating user", error });
  }
};

const addUser = async (req, res) => {
  try {
    const savedUser = await UserModel.create(req.body);
    res.status(201).json({ message: "User saved successfully", data: savedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding user", error });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find().populate("roleId");
    res.status(200).json({ message: "Users fetched successfully", data: users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching users", error });
  }
};


const getUserById = async (req, res) => {
  try {
    const foundUser = await UserModel.findById(req.params.id);
    if (!foundUser) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json({ message: "User fetched successfully", data: foundUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching user", error });
  }
};

// const UpdateUserById = asyc (req.res)=>{

// }
const deleteUserById = async (req, res) => {
  try {
    const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json({ message: "User deleted successfully", data: deletedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting user", error });
  }
};
const sendWarning = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    user.warnings += 1;
    await user.save();
    res.status(200).json({ message: "Warning sent successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error sending warning" });
  }
};

const forgotPassword = async (req, res) => {
  const email = req.body.email;
  const foundUser = await UserModel.findOne({ email: email });
  // console.log('aaa', req)
  // console.log('aaa', email)
  // console.log('aaa', foundUser)
  if (foundUser) {
    const token = jwt.sign(foundUser.toObject(), secret);
    console.log(token);
    const url = `http://localhost:5173/resetpassword/${token}`;
    const mailContent = `<html>
                          <a href ="${url}">rest password</a>
                          </html>`;
    //email...
    await mailUtil.sendingMail(foundUser.email, "reset password", mailContent);
    res.json({
      message: "reset password link sent to mail.",
    });
  } else {
    res.json({
      message: "user not found register first..",
    });
  }
};

const resetpassword = async (req, res) => {
  const token = req.body.token; 
  const newPassword = req.body.password;

  const userFromToken = jwt.verify(token, secret);
  //object -->email,id..
  //password encrypt...
  const salt = bcrypt.genSaltSync(10);
  const hashedPasseord = bcrypt.hashSync(newPassword,salt);

  const updatedUser = await UserModel.findByIdAndUpdate(userFromToken._id, {
    password: hashedPasseord,
  });
  res.json({
    message: "password updated successfully..",
  });
};

// Update User Profile
const updateUserProfile = async (req, res) => {
  try {
    const { full_name, phone } = req.body;

    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    user.full_name = full_name || user.full_name;
    user.phone = phone || user.phone;

    // Handle profile picture upload
    if (req.file) {
      console.log("🖼 Profile picture received:", req.file.originalname);
      const cloudinaryRes = await uploadFileToCloudinary(req.file);
      user.profile_image = cloudinaryRes.secure_url; // Save uploaded image URL
    }

    const updatedUser = await user.save();
    res.status(200).json({ message: "Profile updated successfully", data: updatedUser });
  } catch (error) {
    console.error("🔥 Error updating profile:", error);
    res.status(500).json({ message: "Error updating profile", error });
  }
};

// const SearchSkill = async (req, res) => {
//   try {
//       const { text } = req.params;
//       // console.log("Searching for skill:", text);
//   if(text == "chirag") {
//     const data = await SkilllistingModel.find()
//     // console.log(data)
//     res.json(data)

//   }else{
//  // 🔹 Search by title (since title stores the skill name)
//       const skills = await SkilllistingModel.find({
//           title: { $regex: text, $options: "i" } 
//       }).populate("userId", "name email"); 

//       // console.log("Matching Skills:", skills); 

//       if (!skills.length) {
//           return res.status(404).json({ message: "No users found with this skill." });
//       }

//       res.json(skills);}
//   } catch (error) {
//       console.error("SearchSkill Error:", error);
//       res.status(500).json({ message: "Server error while searching skills." });
//   }
// };


module.exports = {
  addUser,
  getAllUsers,
  getUserById,
  deleteUserById,
  signup,
  loginUser,
  forgotPassword,
  resetpassword,
  updateUserProfile,
  // SearchSkill,
  sendWarning
};
