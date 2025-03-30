const mongoose = require("mongoose");


const eventSchema = new mongoose.Schema(
  {
    // organizer_id: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'User', 
    //   required: true,
    // }
    // ,
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    userId:{
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["Sports", "Social"],
      required: true,
    },
    stateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "States", 
      required: true,
    },
    cityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City", 
      required: true,
    },
    areaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "area",
      required: true,
    },
    imageURL:{
      type: String,
    },
    eventDate: {
      type: Date,
      // required: true,
    },
    startTime: {
      type: String, 
      // required: true,
    },
    endTime: {
      type: String,
      // required: true,
    },
    maxAttendees: {
      type: Number,
      required: true,  
    },
    status: {
      type: String,
      enum: ["approved", "pending"],
    },
  },
  { timestamps: true }
);

const Events = mongoose.model("Events", eventSchema);

module.exports = Events;
