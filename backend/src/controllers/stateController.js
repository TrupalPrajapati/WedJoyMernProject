const stateModel = require("../models/stateModel")

const addState = async(req,res)=>{

    try{
        const addedState = await stateModel.create(req.body);
        res.status(200).json({
            message:"State Added Successfully"
        })
    }catch(error){
        return res.status(400).json({ msg: error });
    }
    
}

const getAllStates = async(req,res)=>{
    const allStates = await stateModel.find();

    res.json({
        message: "State fetched successfully",
        data: allStates,
      });
}


module.exports = {
    addState,
    getAllStates
}