const businessListingModel = require("../models/businessListingModel");
const cloudinaryUtil = require("../utils/cloudinaryUtil");
const multer = require("multer");
const fs = require('fs');
const path = require('path');


// Configure storage
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// File filter to only allow images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {  // Accept ANY image type
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({ 
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
}).fields([
  { name: 'logo', maxCount: 1 },
  { name: 'image', maxCount: 1 }
]);

const addBusinessListingWithImage = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ message: 'File size too large. Max 5MB allowed.' });
      }
      return res.status(400).json({ message: err.message });
    }

    try {
      const files = req.files;
      let logoUrl = "", imageUrl = "";
      let cloudinaryLogoId = "", cloudinaryImageId = "";

      // Upload logo if present
      if (files.logo && files.logo[0]) {
        const logoUpload = await cloudinaryUtil.uploadFileToCloudinary(files.logo[0]);
        logoUrl = logoUpload.secure_url;
        cloudinaryLogoId = logoUpload.public_id;
        fs.unlinkSync(files.logo[0].path);
      }

      // Upload image if present
      if (files.image && files.image[0]) {
        const imageUpload = await cloudinaryUtil.uploadFileToCloudinary(files.image[0]);
        imageUrl = imageUpload.secure_url;
        cloudinaryImageId = imageUpload.public_id;
        fs.unlinkSync(files.image[0].path);
      }

      const businessData = {
        ...req.body,
        logoURL: logoUrl,
        imageURL: imageUrl,
        cloudinaryLogoId,
        cloudinaryImageId
      };

      const savedBusiness = await businessListingModel.create(businessData);
      
      res.status(201).json({
        message: "Business listing created successfully",
        data: savedBusiness,
      });

    } catch (error) {
      console.error("Full error:", error);
      return res.status(400).json({ 
        message: error.message.includes("api_key") 
          ? "Server configuration error" 
          : "Upload failed",
        error: error.message 
      });
    }
  });
};

const addBusiness = async(req,res)=>{
  try{
      const addedBusiness = await businessListingModel.create(req.body);
      res.status(201).json({
          message:"Business Added Successfully"
      })
  }catch(error){
      return res.status(400).json({ msg: "Business listing is failed!", error: error.message });
  }
}

const deleteBusiness = async (req, res) => {
  try {
    const business = await businessListingModel.findById(req.params.id);
    
    if (!business) {
      return res.status(404).json({ message: "Business not found" });
    }

    // Delete associated images from Cloudinary
    if (business.cloudinaryLogoId) {
      await cloudinaryUtil.deleteFromCloudinary(business.cloudinaryLogoId);
    }
    if (business.cloudinaryImageId) {
      await cloudinaryUtil.deleteFromCloudinary(business.cloudinaryImageId);
    }

    // Delete the business record
    await businessListingModel.findByIdAndDelete(req.params.id);

    res.status(200).json({ 
      message: "Business and associated images deleted successfully" 
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Error deleting business", 
      error: error.message 
    });
  }
};

// ✅ Get All Businesses
const getAllBusinesses = async (req, res) => {
  try {
    const allBusinesses = await businessListingModel.find();

    res.status(200).json({
      message: "Listed businesses fetched successfully",
      data: allBusinesses,
    });
  } catch (error) {
    console.error("Error fetching businesses:", error);
    res.status(500).json({
      msg: "Could not fetch businesses",
      error: error.message,
    });
  }
};

const getBusinessesByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Fetch businesses that belong to the user
    const businesses = await businessListingModel.find({ userId });

    if (!businesses || businesses.length === 0) {
      return res.status(404).json({ msg: "No businesses found for this user." });
    }

    res.status(200).json({ success: true, data: businesses });
  } catch (error) {
    console.error("Error fetching businesses:", error);
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

const getBusinessesDetailsByBusinessId = async(req,res) =>{
  try {
       
   const businesses = await businessListingModel.findById(req.params._id);

    if (!businesses) {
      return res.status(404).json({ message: "Business not found" });
    }

    res.status(200).json({ 
      success: true,
      data: businesses 
    });

  } catch (error) {
    console.error("Error fetching businesses:", error);
    res.status(500).json({ msg: "Server error", error: error.message });
  }
}

const updateBusinessImages = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    try {
      const business = await businessListingModel.findById(req.params.id);
      if (!business) {
        return res.status(404).json({ message: "Business not found" });
      }

      const files = req.files;
      const updates = { ...req.body };

      // Handle logo update
      if (files.logo && files.logo[0]) {
        // Delete old logo if exists
        if (business.cloudinaryLogoId) {
          await cloudinaryUtil.deleteFromCloudinary(business.cloudinaryLogoId);
        }
        
        const logoUpload = await cloudinaryUtil.uploadFileToCloudinary(files.logo[0]);
        updates.logoURL = logoUpload.secure_url;
        updates.cloudinaryLogoId = logoUpload.public_id;
        fs.unlinkSync(files.logo[0].path);
      }

      // Handle image update
      if (files.image && files.image[0]) {
        // Delete old image if exists
        if (business.cloudinaryImageId) {
          await cloudinaryUtil.deleteFromCloudinary(business.cloudinaryImageId);
        }
        
        const imageUpload = await cloudinaryUtil.uploadFileToCloudinary(files.image[0]);
        updates.imageURL = imageUpload.secure_url;
        updates.cloudinaryImageId = imageUpload.public_id;
        fs.unlinkSync(files.image[0].path);
      }

      const updatedBusiness = await businessListingModel.findByIdAndUpdate(
        req.params.id,
        updates,
        { new: true }
      );

      res.status(200).json({
        message: "Business images updated successfully",
        data: updatedBusiness
      });
    } catch (error) {
      // Cleanup uploaded files if error occurs
      if (req.files) {
        Object.values(req.files).forEach(files => {
          files.forEach(file => {
            if (fs.existsSync(file.path)) {
              fs.unlinkSync(file.path);
            }
          });
        });
      }
      res.status(500).json({ 
        message: "Error updating business images", 
        error: error.message 
      });
    }
  });
};

module.exports = {
  addBusiness,
  getAllBusinesses,
  getBusinessesByUserId,
  getBusinessesDetailsByBusinessId,
  addBusinessListingWithImage,
  deleteBusiness,
  updateBusinessImages
};
