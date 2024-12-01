import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import multer from 'multer';

dotenv.config(); 

// Multer Configuration (Memory Storage)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

// Middleware
const cloudinaryImage = async (req, res, next) => {
  console.log("Starts cloudinary proccess")
  try {
    // Handle file upload using Multer
    const uploadMiddleware = upload.single('postImage');
    await new Promise((resolve, reject) => {
      uploadMiddleware(req, res, (err) => {
        if (err) return reject(err);
        resolve();
      });
    });

    console.log("File uploaded by multer: ",!req.file)

    // If no file is uploaded, proceed to the next middleware
    if (!req.file) return next();

    const image = './images/my_image.jpg';

cloudinary.uploader.upload(image).then(result => {
  console.log(result);
})

    // Upload file to Cloudinary using buffer
    const uploadResult = await cloudinary.uploader.upload_stream(
      { folder: "uploads" },
      (error, result) => {
        if (error) {
          console.error("Cloudinary Error:", error);
          return res.status(500).json({ error: "Failed to upload image" });
        }
        req.postImage = result.secure_url;
        console.log("Uploaded to Cloudinary:", result.secure_url);
        next();
      }
    );

    // Write the file buffer to the upload stream
    const stream = uploadResult;
    stream.end(req.file.buffer);
  } catch (error) {
    console.error("Error in Cloudinary Middleware:", error);
    return res.status(500).json({ error: "An error occurred while processing the image." });
  }
};

export default cloudinaryImage;


    // // Optimize delivery by resizing and applying auto-format and auto-quality
    // const optimizeUrl = cloudinary.url('shoes', {
    //     fetch_format: 'auto',
    //     quality: 'auto'
    // });

    // console.log(optimizeUrl);

    // // Transform the image: auto-crop to square aspect_ratio
    // const autoCropUrl = cloudinary.url('shoes', {
    //     crop: 'auto',
    //     gravity: 'auto',
    //     width: 500,
    //     height: 500,
    // });

    // console.log(autoCropUrl);
