const mongoose = require("mongoose");

const eventRegistrationSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Events",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["Registered", "Canceled", "Attended"],
      default: "Registered",
    },
    stateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "States",
      // required: true,
    },
    cityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
      // required: true,
    },
    areaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "area",
      // required: true,
    },
    registrationCount: {
      type: Number,
      default: 0, // ✅ Automatically start with 0
    }
  }
);

const EventRegistration = mongoose.model(
  "EventRegistration",
  eventRegistrationSchema
);

module.exports = EventRegistration;
