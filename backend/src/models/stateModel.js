const mongoose = require("mongoose");


const stateSchema = new mongoose.Schema(
  {
    name:{
        type:String,
        required: true,
        unique: true
    }
  },
  (timetstamp = true)
);

const States = mongoose.model("States", stateSchema);

module.exports = States;
