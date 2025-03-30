const cloudinary = require("cloudinary").v2;

const uploadFileToCloudinary = async(file) =>{
    cloudinary.config({
        cloud_name:"dlh93s2bx",
        api_key:"653422768875723",
        api_secret:"dUT3nvFcOyhobE6kdjChKRSVSxo"
    })

    const cloudinaryResponse = await cloudinary.uploader.upload(file.path);
    return cloudinaryResponse;
};

module.exports = {
    uploadFileToCloudinary
}