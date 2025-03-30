const mongoose = require("mongoose");

const businessListingSchema = new mongoose.Schema(
  {
    userId:{
      type: String,
      required: true,
    },
    businessname: {
      type: String,
      required: [true, "Business name is required"],
      maxlength: 150,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      enum: ["Retail", "Food", "Service", "Technology", "Other"],
      required: [true, "Category is required"],
    },
    stateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "States",
    },
    cityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
    },
    areaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "area",
    },
    phone_number: {
      type: String,
      required: [true, "Phone number is required"],
      match: [/^\d{10}$/, "Phone number must be 10 digits"],
      trim: true,
    },
    businessemail: {
      type: String,
      required: [true, "Business email is required"],
      unique: true,
    },
    startTime: {
      type: String, 
      // required: true,
    },
    endTime: {
      type: String,
      // required: true,
    },
    website: {
      type: String,
    }
  },
  { timestamps: true } // Creates createdAt & updatedAt automatically
);

const Business = mongoose.model("Business", businessListingSchema);

module.exports = Business;
