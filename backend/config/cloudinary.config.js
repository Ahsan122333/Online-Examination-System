import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (image) => {
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };
  try {
    const result = await cloudinary.uploader.upload(image.path, options);
    if (result && result.url) {
      return result.url;
    } else {
      console.error("Upload result does not contain URL");
      return null;
    }
  } catch (error) {
    console.error(error, "in pic upload err");
    return null;
  }
};
