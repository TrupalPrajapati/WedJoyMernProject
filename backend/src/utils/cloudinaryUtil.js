const cloudinary = require("cloudinary").v2;

// const uploadFileToCloudinary = async(file) =>{
//     cloudinary.config({
//         cloud_name:"dlh93s2bx",
//         api_key:"653422768875723",
//         api_secret:"dUT3nvFcOyhobE6kdjChKRSVSxo"
//     })

//     const cloudinaryResponse = await cloudinary.uploader.upload(file.path);
//     return cloudinaryResponse;
// };

// Initialize with environment variables (recommended) or direct values
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dlh93s2bx",
    api_key: process.env.CLOUDINARY_API_KEY || "653422768875723",
    api_secret: process.env.CLOUDINARY_API_SECRET || "dUT3nvFcOyhobE6kdjChKRSVSxo",
    secure: true
  });
  
  const uploadFileToCloudinary = async (file) => {
    try {
      const result = await cloudinary.uploader.upload(file.path, {
        resource_type: "auto",
        allowed_formats: ["jpg", "png", "webp", "avif", "heic", "tiff"],
        quality: "auto"
      });
      return result;
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      throw error; // Re-throw for controller handling
    }
  };

const deleteFromCloudinary = async (publicId) => {
    try {
      if (!publicId) return;
      const result = await cloudinary.uploader.destroy(publicId);
      return result;
    } catch (error) {
      console.error("Error deleting from Cloudinary:", error);
      throw error;
    }
  };

module.exports = {
    uploadFileToCloudinary,
    deleteFromCloudinary
}