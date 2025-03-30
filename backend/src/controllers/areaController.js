const areaModel = require("../models/areaModel")

const addArea = async(req,res)=>{

    try{
        const addedArea = await areaModel.create(req.body);
        res.status(200).json({
            message:"Area Added Successfully"
        })
    }catch(error){
        return res.status(400).json({
            msg: error
        });
    }
    
}

const getAllAreas = async(req,res)=>{
    try{
        const allAreas = await areaModel.find().populate("cityId").populate("stateId");

        res.status(200).json({
            message: "Area fetched successfully",
            data: allAreas,
          });
    }catch(error){
        res.status(500).json({ message: error });
    }
   
}

const getAreaByCityId =async(req,res)=>{

    try{
        const getarea = await areaModel.find({cityId: req.params.cityId});
        res.status(200).json({
            msg: "Area found",
            data: getarea
        })
    }catch(error){
        res.status(500).json({
            msg: "Area not found"
        })
    }
    
}

module.exports = {
    addArea,
    getAllAreas,
    getAreaByCityId
}