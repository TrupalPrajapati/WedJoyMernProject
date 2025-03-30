const mongoose = require("mongoose");

const areaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    cityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
    },
    stateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "States",
    },
    pincode: {
      type: Number,
      required: true,
      unique: true,
    },
  },
  (timetstamp = true)
);

const area = mongoose.model("area", areaSchema);

module.exports = area;
