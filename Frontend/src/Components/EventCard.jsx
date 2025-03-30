import React from "react";
// import "./EventCard.css"; // Import external CSS

const EventCard = () => {
  const event = {
    _id: "67d9b70cc0e5b7d83fe3e4d5",
    title: "Launch a New Product",
    description:
      "LED TV - List of all the latest and upcoming LED TVs available from various brands.",
    userId: "67d983e34c972a8f9029b815",
    category: "Social",
    stateId: "67c851b7d000a35013f2225d",
    cityId: "67c85a908d310de14e4b12bc",
    areaId: "67c85d48cd9020615e4a3f0d",
    imageURL:
      "https://res.cloudinary.com/dlh93s2bx/image/upload/v1742321419/szblggsg...",
    eventDate: "2025-03-25",
    startTime: "10:59",
    endTime: "23:59",
    maxAttendees: "5000",
    status: "approved",
  };

  return (
    <div className="event-card">
      <img src={event.imageURL} alt={event.title} className="event-image" />
      <div className="event-content">
        <h2 className="event-title">{event.title}</h2>
        <p className="event-description">{event.description}</p>
        <p className="event-category">Category: {event.category}</p>
        <p className="event-date">
          Date: {event.eventDate} | Time: {event.startTime} - {event.endTime}
        </p>
        <p className="event-attendees">Max Attendees: {event.maxAttendees}</p>
        <p className={`event-status ${event.status}`}>Status: {event.status}</p>
      </div>
    </div>
  );
};

export default EventCard;
