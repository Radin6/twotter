import { v2 as cloudinary } from "cloudinary";
import { CLOUDINARY, PATH_CLOUDINARY_IMAGES } from "../config.js";

cloudinary.config({
  cloud_name: CLOUDINARY.CLOUD_NAME,
  api_key: CLOUDINARY.API_KEY,
  api_secret: CLOUDINARY.API_SECRET,
  secure: true,
});

(async () => {
  try {
    const result = await cloudinary.api.ping();
    console.log("Cloudinary configuration is valid:", result);
  } catch (error) {
    console.error("Error testing Cloudinary configuration:", error);
  }
})();

export const uploadImages = async (imagePath) => {
  if (!imagePath) {
    console.error("Image path is required");
  }
  try {
    return await cloudinary.uploader.upload(imagePath, {
      folder: PATH_CLOUDINARY_IMAGES,
    });
  } catch (error) {
    console.error("Error in uploadImages:", error);
  }
};

export const deleteImage = async (publicId) => {
  if (!publicId) {
    console.error("Public ID is required");
  }
  try {
    return await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Error in deleteImage:", error);
  }
};