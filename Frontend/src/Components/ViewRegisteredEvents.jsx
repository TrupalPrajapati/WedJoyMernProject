import axios from "axios";
import React, { useEffect, useState } from "react";

export const ViewRegisteredEvents = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  const getuserregisteredevent = async () => {
    setisLoading(true);
    const res = await axios.get(
      "/eventregister/registrations/" + localStorage.getItem("id")
    );
    console.log(res);
    console.log(res.data);
    console.log(res.data.data);
    setEvents(res.data.data);
    setisLoading(false);
  };

  useEffect(() => {
    getuserregisteredevent();
  }, []);

  return (
    <div className="parent">
      {setisLoading == false ? (
        <Loader></Loader>
      ) : (
        <div className="event-container">
          {events?.map((event) => (
            <div className="event-card" key={event.id}>
              <img src={event.eventId.imageURL} alt="Event" className="event-image" />
              <div className="event-content">
                <p className="event-date">Date: {event.eventId.eventDate}</p>
                <p className="event-title">{event.eventId.title}</p>
                <p className="event-description">{event.eventId.description}</p>
                <p className="event-meta">Start Time: {event.eventId.startTime}</p>
                <p className="event-meta">End Time: {event.eventId.endTime}</p>
                <p className="event-attendees">
                  Max People: {event.eventId.maxAttendees}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
