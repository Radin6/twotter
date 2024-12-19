import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import { CLOUDINARY, PATH_CLOUDINARY_IMAGES } from "../config.js";

// Configure Cloudinary
cloudinary.config({
  cloud_name: CLOUDINARY.CLOUD_NAME,
  api_key: CLOUDINARY.API_KEY,
  api_secret: CLOUDINARY.API_SECRET
});

// Upload Image Function Using `upload_stream`
export const uploadImages = async (fileBuffer) => {
  if (!fileBuffer) {
    throw new Error("File buffer is required");
  }

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: PATH_CLOUDINARY_IMAGES },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error.message, error);
          return reject(new Error("Failed to upload image to Cloudinary"));
        }
        resolve(result);
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

// Delete Image Function (Optional but included for completeness)
export const deleteImage = async (publicId) => {
  if (!publicId) {
    throw new Error("Public ID is required");
  }

  try {
    return await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Error in deleteImage:", error.message);
    throw new Error("Failed to delete image from Cloudinary");
  }
};
