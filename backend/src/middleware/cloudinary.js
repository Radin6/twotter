import fileUpload from "express-fileupload";
import { PATH_TEMP_IMAGES } from "../config.js";

export const uploadImages = fileUpload({
  useTempFiles: false, // Ensure temporary files aren't needed
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit to 10 MB
  abortOnLimit: true,
})