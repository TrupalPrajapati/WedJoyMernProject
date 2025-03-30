const eventModel = require("../models/eventModel");
const multer = require("multer");
const path = require("path");
const cloudinaryUtil = require("../utils/cloudinaryUtil")

//storage engine:
const storage = multer.diskStorage({
  destination:'./uploads',
  filename: function (req,file,cb) {
    cb(null, file.originalname);
  }
});

//multter obj:
const upload = multer({
    storage: storage,
    //if we want to filter file type then we write that login here
}).single("image");

const addEventWithFile = async(req, res)=> {
    upload(req,res,async (err)=>{
        if(err){
            res.status(500).json({
                message: err.message,
            })
        }
        else{
            //data store at cloudinary
            const cloudinaryResponse = await cloudinaryUtil.uploadFileToCloudinary(req.file);
            console.log(cloudinaryResponse);
            console.log(req.body);
            req.body.imageURL = cloudinaryResponse.secure_url
            const savedImage = await eventModel.create(req.body);

            res.status(200).json({
                message:"Event Added with file Successfully",
                data: savedImage,
            })
        }
    })
}

const addEvents = async(req,res)=>{

    try{
        const addedEvent = await eventModel.create(req.body);
        res.status(201).json({
            message:"Event Added Successfully"
        })
    }catch(error){
        return res.status(400).json({ msg: "Event publish is failed!" });
    }
    
}

const getAllEVentsByuserId = async(req,res)=>{

    try{
        const events = await eventModel.find({userId:req.params.userId}).populate("stateId cityId areaId userId");
        if( events.length === 0 ){
            res.status(404).json({
                message:"No EVent Founds"
            })
        }
        else{
            res.status(200).json({
                message: "Events fetched successfully",
                data: events,
              });
        }
    }catch(err){
        res.status(500).json({
              message: err.message
        })
    }
    
   
}

const getAllEVents = async(req,res)=>{
    const allevents = await eventModel.find();


    res.json({
        message: "Events fetched successfully",
        data: allevents,
      });
}

const getApprovedEvents = async (req, res) => {
  try {
    const events = await eventModel.find({ status: "approved" });

    res.status(200).json({
      message: "Approved events fetched successfully",
      data: events,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching events",
      error: error.message,
    });
  }
};


  

  
module.exports = {
    addEvents,
    getAllEVents,
    addEventWithFile,
    getAllEVentsByuserId,
    
    getApprovedEvents
}