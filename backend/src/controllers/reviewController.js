const reviewModel = require("../models/reviewModel");

const EventRegistrationModel = require("../models/EventRegistrationModel");

const addreview = async (req, res) => {
  try {

    const { userId, eventId, rating, comment } = req.body;
    
    // Check if user has attended the event before allowing review
    const event = await Event.findById(eventId);
    if (!event || !event.attendees.includes(userId)) {
      return res.status(403).json({ message: "You must attend the event to review it." });
    }

    const newReview = new Review({ userId, eventId, rating, comment });
    await newReview.save();

    res.status(201).json({
      message: "Review stored successfully",
      data: review,
    });
  } catch (error) {
    res.status(400).json({ 
        message: "Review is not stored",
        error: error.message 
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
  getReviewByUserId
};
