const EventRegistrationModel = require("../models/EventRegistrationModel");
const Event = require("../models/eventModel");

const registerForEvent = async (req, res) => {
  try {
    const { userId, eventId} = req.body;

    // Validate input
    if (!userId || !eventId) {
      return res.status(400).json({ message: "User ID and Event ID are required" });
    }

    // Find the event
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Count current registrations
    const registrationCount = await EventRegistrationModel.countDocuments({ eventId });

    // Check if maxAttendees limit is reached
    if (registrationCount >= event.maxAttendees) {
      return res.status(400).json({ message: "Event is full. Registration closed." });
    }

    // Check if the user is already registered for the event
    const existingRegistration = await EventRegistrationModel.findOne({ userId, eventId });
    if (existingRegistration) {
      return res.status(400).json({ message: "You are already registered for this event" });
    }

    // Create a new registration
    const newRegistration = await EventRegistrationModel.create({ userId, eventId});

    // ✅ Increment the registrationCount in the Event model
    await Event.findByIdAndUpdate(eventId, {
      $inc: { registrationCount: 1 },
    });

    res.status(201).json({
      message: "User registered for the event successfully",
      data: newRegistration,
    });

  } catch (error) {
    console.error("Error during event registration:", error.message);
    res.status(500).json({ 
      message: "Registration failed due to a server error",
      error: error.message 
    });
  }
};

const getAllApprovedEvents = async (req, res) => {
  try {
    // Fetch all approved events
    const events = await Event.find({ status: "approved" });

    // For each event, count the number of registrations
    const eventsWithRegistrationCount = await Promise.all(
      events.map(async (event) => {
        const registrationCount = await EventRegistrationModel.countDocuments({
          eventId: event._id,
        });
        return {
          ...event.toObject(), // Convert Mongoose document to plain object
          registrationCount, // Add registration count to the event object
        };
      })
    );

    res.status(200).json({
      message: "Events fetched successfully",
      data: eventsWithRegistrationCount,
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({
      message: "Error fetching events",
      error: error.message,
    });
  }
};


const getAllRegistrationsbyUserId = async (req, res) => {
    try {
      const registrations = await EventRegistrationModel.find({userId:req.params.userId}).populate("eventId userId").populate("stateId").populate("cityId").populate("areaId")  // Fetch only 'name'
      .populate("cityId", "name")
      .populate("areaId", "name");
      if( registrations.length === 0 ){
        return res.status(404).json({
            message:"No EVent Founds"
        })
    }
    else{
        res.status(200).json({
            message: "Events fetched successfully",
            data: registrations,
          });
    }
  
    } catch (error) {
      res.status(500).json({ 
        message: "Error fetching registrations", 
        error: error.message 
    });
    }
  };



  const cancelRegistration = async (req, res) => {
    try {
      const { userId, eventId } = req.params;
  
      // Find and delete the registration
      const deletedRegistration = await EventRegistrationModel.findOneAndDelete({
        userId,
        eventId,
      });
  
      if (!deletedRegistration) {
        return res.status(404).json({ message: "Registration not found!" });
      }

      // ✅ [NEW] Decrease registration count
      await Event.findByIdAndUpdate(eventId, {
        $inc: { registrationCount: -1 },
      });
  
      res.status(200).json({ message: "Registration canceled successfully!" });
  
    } catch (error) {
      console.error("Error canceling registration:", error.message);
      res.status(500).json({ 
        message: "Error canceling registration", 
        error: error.message 
      });
    }
  };

  

module.exports = {
  registerForEvent,
  getAllRegistrationsbyUserId,
  cancelRegistration,
  getAllApprovedEvents,
};
