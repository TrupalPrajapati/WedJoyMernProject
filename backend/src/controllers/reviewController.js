const reviewModel = require("../models/reviewModel");

const EventRegistrationModel = require("../models/EventRegistrationModel");
const EventModel = require("../models/eventModel");

const addreview = async (req, res) => {
  try {

    const { userId, eventId, rating, comment } = req.body;
    
    // Check if user has attended the event before allowing review
    const event = await EventModel.findById(eventId);
    if (!event) {
      return res.status(403).json({ message: "You must attend the event to review it." });
    }

    console.log("Checking registration for:", { userId, eventId });

    // Allow review if registered or attended
    const hasRegistered = await EventRegistrationModel.findOne({
      eventId,
      userId,
      status: { $in: ["Registered"] },
    });

    
    if (!hasRegistered) {
      return res.status(403).json({
        message: "You must register for the event to leave a review.",
      });
    }
    const newReview = new reviewModel({ userId, eventId, rating, comment });
    await newReview.save();

    res.status(201).json({
      message: "Review stored successfully",
    });
  } catch (error) {
    res.status(400).json({ 
        message: "Review is not stored",
        error: error.message 
    });
  }
};

const getReviewsOfEventId = async (req, res) => {
  try {
    const { eventId } = req.params;

    const reviews = await reviewModel.find({ eventId }).populate("userId", "name");

    if (reviews.length === 0) {
      return res.status(404).json({
        message: "No reviews found for this event",
      });
    }

    res.status(200).json({
      message: "Reviews fetched successfully",
      data: reviews,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching reviews",
      error: error.message,
    });
  }
};

const getAllReview = async (req, res) => {
    try {
      const allreviews = await EventRegistrationModel.find({ eventId: req.params.eventId }).populate("userId");
  
      res.status(200).json({
        message: "Reviews fetched successfully",
        data: allreviews,
      });
    } catch (error) {
      res.status(500).json({ 
        message: "Reviews failed to fetch", 
        error: error.message 
    });
    }
  };


  const getReviewByUserId = async(req,res)=>{
    try {
      const review = await EventRegistrationModel.find({});
  
      res.status(200).json({
        message: "Reviews fetched successfully",
        data: review,
      });
    } catch (error) {
      res.status(500).json({ 
        message: "Reviews failed to fetch", 
        error: error.message 
    });
    }
  }
  

module.exports = {
  addreview,
  getAllReview,
  getReviewByUserId,
  getReviewsOfEventId
};
