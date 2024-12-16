import 'dotenv/config';

export const FRONTEND_URL = (process.env.NODE_ENV === "dev") ? process.env.FRONTEND_URL_DEV : process.env.FRONTEND_URL_PROD;
export const DB_HOST = (process.env.NODE_ENV === "dev") ? process.env.DB_HOST_DEV : process.env.DB_HOST_PROD;
export const DB_USER = (process.env.NODE_ENV === "dev") ? process.env.DB_USER_DEV : process.env.DB_USER_PROD;
export const DB_PASSWORD = (process.env.NODE_ENV === "dev") ? process.env.DB_PASSWORD_DEV : process.env.DB_PASSWORD_PROD;
export const DB_PORT = (process.env.NODE_ENV === "dev") ? process.env.DB_PORT_DEV : process.env.DB_PORT_PROD;
export const DB_DATABASE = (process.env.NODE_ENV === "dev") ? process.env.DB_DATABASE_DEV : process.env.DB_DATABASE_PROD;

// Cloudinary
export const PATH_TEMP_IMAGES = process.env.PATH_TEMP_IMAGES || 'temp_images';
export const PATH_CLOUDINARY_IMAGES = process.env.PATH_CLOUDINARY_PRODUCT_IMAGES || "images";
export const CLOUDINARY = {
  CLOUD_NAME : process.env.CLOUD_NAME,
  API_KEY : process.env.CLOUD_KEY,
  API_SECRET : process.env.CLOUD_SECRET
}