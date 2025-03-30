const mongoose = require("mongoose");


const citySchema = new mongoose.Schema(
  {
    name:{
        type:String,
        required: true,
    },
    stateId:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"States",
  }
  },
  (timetstamp = true)
);

const city = mongoose.model("City", citySchema);

module.exports = city;
