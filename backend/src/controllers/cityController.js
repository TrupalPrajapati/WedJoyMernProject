const cityModel = require("../models/cityModel")

const addCity = async(req,res)=>{

    try{
        const addedCity = await cityModel.create(req.body);
        res.status(200).json({
            message:"City Added Successfully"
        })
    }catch(error){
        return res.status(400).json({ msg: error });
    }
    
}

const getAllCities = async(req,res)=>{
    try{
        const allCities = await cityModel.find().populate("stateId");

        res.json({
            message: "City fetched successfully",
            data: allCities,
          });
    }catch(error){
        res.status(500).json({ message: err });
    }
  
}

const getCityByStateId =async(req,res)=>{

    try{
        const getcity = await cityModel.find({stateId: req.params.stateId});
        res.status(200).json({
            msg: "city found",
            data: getcity
        })
    }catch(error){
        res.status(500).json({
            msg: "city not found"
        })
    }
    
}

module.exports = {
    addCity,
    getAllCities,
    getCityByStateId
}