const businessListingModel = require("../models/businessListingModel");

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

module.exports = {
  addBusiness,
  getAllBusinesses,
  getBusinessesByUserId,
  getBusinessesDetailsByBusinessId
};
