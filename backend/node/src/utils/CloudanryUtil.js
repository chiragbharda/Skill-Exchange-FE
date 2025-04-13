const cloudinary = require("cloudinary").v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload File to Cloudinary
const uploadFileToCloudinary = async (file) => {
  try {
    if (!file || !file.path) {
      throw new Error("Invalid file or file path.");
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(file.path, {
      folder: "uploads", // Optional: Specify folder in Cloudinary
      resource_type: "auto", // Automatically detect file type
    });

    return cloudinaryResponse;
  } catch (error) {
    console.error("❌ Error uploading file to Cloudinary:", error.message);
    throw new Error("Failed to upload file to Cloudinary.");
  }
};

module.exports = {
  uploadFileToCloudinary,
};
