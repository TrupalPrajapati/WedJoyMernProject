const Contact = require("../models/contactModel");

const postContactMessage = async (req, res) => {
  try {
    const { userId, name, email, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newContact = await Contact.create({userId, name, email, message });

    res.status(200).json({
      message: "Message sent successfully!",
      data: newContact
    });
  } catch (error) {
    console.error("Contact form error:", error.message);
    res.status(500).json({ message: "Server error. Try again later." });
  }
};

module.exports = {
  postContactMessage
};
