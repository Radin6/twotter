import multer from "multer";
import path from "path";

// Define storage (saving to /tmp)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "/tmp"); // Temporary folder for Vercel
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

// Multer instance
export const uploadImages = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit to 10 MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Invalid file type. Only JPEG, PNG, and GIF are allowed."));
    }
    cb(null, true);
  },
});
