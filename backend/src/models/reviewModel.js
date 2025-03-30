const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  businessId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "businesses",
    default: null, 
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Events",
    default: null,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5, 
  },
  comment: {
    type: String,
    default: "", 
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const review = mongoose.model("Review", reviewSchema);
module.exports = review;
