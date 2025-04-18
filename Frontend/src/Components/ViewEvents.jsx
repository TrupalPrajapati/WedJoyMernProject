import React, { useEffect, useState } from "react";
import { Loader } from "../Components/Common/Loader";
import axios from "axios";
import "./Styles/eventcard.css";
import { Link, useNavigate } from "react-router-dom";

export const ViewEvents = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate();
  const getAllMyEventsByUserId = async () => {
    setisLoading(true);
    const res = await axios.get(
      "/event/geteventsbyuserid/" + localStorage.getItem("id")
    );
    console.log(res.data);
    setEvents(res.data.data);
    setisLoading(false);
  };

  const handleSubmit =(eventid)=> {
    navigate(`/reviewform/${eventid}`)
  }

  useEffect(() => {
    getAllMyEventsByUserId();
  }, []);

  return (
    <div className="parent animate-fadeInUp">
      {(setisLoading == false) ? (
        <Loader></Loader>
      ) : (
        <div className="event-container">
          {events?.map((event) => (
            <div className="event-card" key={event.id}>
              <img src={event.imageURL} alt="Event" className="event-image" />
              <div className="event-content">
                {/* <Link to={'https://www.google.com/maps/search/?api=1&query='+event.areaId.name}target='blank'> */}
                <p className="event-date">Date: {event.eventDate}</p>
                <p className="event-title">{event.title}</p>
                <p className="event-description">{event.description}</p>
                <p className="event-meta">Start Time: {event.startTime}</p>
                <p className="event-meta">End Time: {event.endTime}</p>
                <p className="event-attendees">
                  Max People: {event.maxAttendees}
                </p>
                {/* </Link> */}
                {/* <button className="event-review" onClick={() => handleSubmit(event.id)}>
                  Add Review
                </button> */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>

  );
};
