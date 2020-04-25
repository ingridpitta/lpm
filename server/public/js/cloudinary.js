import cloudinary from "cloudinary";
import cloudinaryStorage from "multer-storage-cloudinary";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

const storage = cloudinaryStorage({
  cloudinary,
  folder: "lpm/img-profile", // The name of the folder in cloudinary
  allowedFormats: ["jpg", "png"],
  filename: (req, file, cb) => {
    cb(null, file.cloud_name);
    // The file on cloudinary would have the same name as the original file name
  }
});

const uploadCloud = multer({ storage });

export default uploadCloud;
