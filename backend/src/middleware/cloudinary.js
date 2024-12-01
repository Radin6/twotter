import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config(); 

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET
});

const cloudinaryImage =  async (req, res, next) => {

    if (!req.file) return next();

    // Upload an image
    try {
        const uploadResult = await cloudinary.uploader.upload(req.file.path)
        req.postImage = uploadResult.url
        console.log("Cloud middleware out: "+uploadResult.url);

    } catch(error) {
        console.log("cloudinary error: ",error);
    }
   
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

    next()
};

export default cloudinaryImage;