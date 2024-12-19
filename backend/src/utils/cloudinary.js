import { v2 as cloudinary } from "cloudinary";
import { CLOUDINARY, PATH_CLOUDINARY_IMAGES } from "../config.js";

// Cloudinary configuration
cloudinary.config({
  cloud_name: CLOUDINARY.CLOUD_NAME,
  api_key: CLOUDINARY.API_KEY,
  api_secret: CLOUDINARY.API_SECRET
});

// Cloudinary image upload function
export const uploadImages = async (imagePath) => {
  if (!imagePath) {
    throw new Error("Image path is required");
  }
  try {
    // Upload image to Cloudinary with a custom folder path
    return await cloudinary.uploader.upload(imagePath, {
      folder: PATH_CLOUDINARY_IMAGES,  // Example folder path
    });
  } catch (error) {
    console.error("Cloudinary upload error:", error.message);
    throw new Error("Failed to upload image to Cloudinary");
  }
};
