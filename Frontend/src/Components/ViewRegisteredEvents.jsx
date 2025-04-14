import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const ViewRegisteredEvents = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate();
  
  const getuserregisteredevent = async () => {
    setisLoading(true);
    const res = await axios.get(
      "/eventregister/registrations/" + localStorage.getItem("id")
    );
    console.log(res.data.data);
    setEvents(res.data.data);
    setisLoading(false);
  };

  const handleSubmit = (eventid) => {
    navigate(`/reviewform/${eventid}`);
  };

  const isPastEvent = (eventDate) =>{
    const today = new Date();
    const eventDay = new Date(eventDate);
    return eventDay < today;
  }

  useEffect(() => {
    getuserregisteredevent();
  }, []);

  return (
    <div className="parent">
      {setisLoading == false ? (
        <Loader></Loader>
      ) : (
        <div className="event-container">
          {events?.map((eventReg) => (
            <div className="event-card" key={eventReg._id}>
              <img
                src={eventReg.eventId?.imageURL}
                alt="Event"
                className="event-image"
              />
              <div className="event-content">
                <Link
                  to={
                    "https://www.google.com/maps/search/?api=1&query=" +
                    eventReg.areaId?.name
                  }
                  target="_blank"
                >
                  <p className="event-date">
                    Date: {eventReg.eventId?.eventDate}
                  </p>
                  <p className="event-title">{eventReg.eventId?.title}</p>
                  <p className="event-description">
                    {eventReg.eventId?.description}
                  </p>
                  <p className="event-meta">
                    Start Time: {eventReg.eventId?.startTime}
                  </p>
                  <p className="event-meta">
                    End Time: {eventReg.eventId?.endTime}
                  </p>
                  <p className="event-attendees">
                    Max People: {eventReg.eventId?.maxAttendees}
                  </p>
                </Link>
                  {/* ✅ Show "Add Review" only if event is completed */}
                  {isPastEvent(eventReg.eventId?.eventDate) && (
                  <button
                    className="event-review"
                    onClick={() => handleSubmit(eventReg.eventId?._id)}
                  >
                    Add Review
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* {events?.map((event) => (
            
            <div className="event-card" key={event._id}>
              <img src={event.eventId.imageURL} alt="Event" className="event-image" />
              <div className="event-content">
              <Link to={'https://www.google.com/maps/search/?api=1&query='+event.areaId}target='blank'>
                <p className="event-date">Date: {event.eventId.eventDate}</p>
                <p className="event-title">{event.eventId.title}</p>
                <p className="event-description">{event.eventId.description}</p>
                <p className="event-meta">Start Time: {event.eventId.startTime}</p>
                <p className="event-meta">End Time: {event.eventId.endTime}</p>
                <p className="event-attendees">
                  Max People: {event.eventId.maxAttendees}
                </p>
                </Link>
                <button className="event-review" onClick={() => handleSubmit(event._id)}>
                  Add Review
                </button>
              </div>
            </div>
          ))} */}
        </div>
      )}
    </div>
  );
};
