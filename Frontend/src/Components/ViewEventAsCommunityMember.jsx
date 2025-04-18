import { Loader } from "./Common/Loader";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

export const ViewEventAsCommunityMember = () => {
  const [events, setEvents] = useState([]);
  const [registeredEventIds, setRegisteredEventIds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [eventRegistrations, setEventRegistrations] = useState({});
  const navigate = useNavigate();

  const userId = localStorage.getItem("id");
  console.log("User ID:", userId);

  const registerEvent = async (id) => {
    const event = events.find((event) => event._id === id);

    if (event.registrationCount >= event.maxAttendees) {
      toast.warn("Event is full. Registration closed.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        theme: "dark",
        transition: Bounce,
      });
      return;
    }

    try {
      const res = await axios.post("/eventregister/register", {
        userId,
        eventId: id,
      });
      console.log("Response:", res);

      if (res.status === 201) {
        toast.success("Successfully Registered for Event", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          theme: "dark",
          transition: Bounce,
        });

        // Update registeredEventIds after successful registration
        setRegisteredEventIds((prev) => [...prev, id.toString()]);

        // Update the registration count for the event
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event._id === id
              ? { ...event, registrationCount: event.registrationCount + 1 }
              : event
          )
        );
      }
    } catch (error) {
      if (error.response?.status === 400) {
        toast.warn("You are already registered for this event", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          theme: "dark",
          transition: Bounce,
        });
      } else {
        toast.error("Event Registration Failed!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          theme: "dark",
          transition: Bounce,
        });
      }
    }
  };

  const getAllApprovedEvents = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("/eventregister/getallapprovedevents");
      console.log("All Events:", res.data.data);
      setEvents(res.data.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
    setIsLoading(false);
  };

  const cancelRegistration = async (eventId) => {
    try {
      const res = await axios.delete(
        `/eventregister/cancel/${userId}/${eventId}`
      );

      if (res.status === 200) {
        toast("Registration Canceled!", {
          theme: "dark",
          transition: Bounce,
        });

        // Remove event ID from registeredEventIds state
        setRegisteredEventIds((prev) =>
          prev.filter((id) => id !== eventId.toString())
        );

        // Decrement the registration count for the event
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event._id === eventId
              ? { ...event, registrationCount: event.registrationCount - 1 }
              : event
          )
        );
      }
    } catch (error) {
      toast.error("Cancellation Failed!", {
        theme: "dark",
        transition: Bounce,
      });
    }
  };


  useEffect(() => {
    axios
      .get(`/eventregister/registrations/${userId}`)
      .then((res) => {
        console.log("Registered data:", res.data.data);
        
        // Safely extract event IDs
        const eventIds = res.data.data
          ?.filter(item => item != null) // Filter out null/undefined items
          ?.map(item => {
            // Handle cases where item or eventId might be null/undefined
            if (!item || !item.eventId) return null;
            
            // Handle both object and string eventId cases
            return typeof item.eventId === "object"
              ? item.eventId?._id?.toString()
              : item.eventId?.toString();
          })
          ?.filter(id => id != null); // Filter out any null IDs
        
        setRegisteredEventIds(eventIds || []); // Ensure we always set an array
      })
      .catch((error) => {
        console.error("Error fetching registered events:", error);
        setRegisteredEventIds([]); // Reset on error
      });
  }, [userId]);
  // useEffect(() => {
  //   axios
  //     .get(`/eventregister/registrations/${userId}`)
  //     .then((res) => {
  //       console.log("Registered data:", res.data.data);
  //       const eventIds = res.data.data.map((item) =>
  //         typeof item.eventId === "object"
  //           ? item.eventId._id?.toString()
  //           : item.eventId?.toString()
  //       );
  //       setRegisteredEventIds(eventIds);
  //     })
  //     .catch((error) =>
  //       console.error("Error fetching registered events:", error)
  //     );
  // }, [userId]);

  useEffect(() => {
    getAllApprovedEvents();
  }, []);

  return (
    <div className="animate-fadeInUp">
      <h1>Events</h1>
      <div className="parent">
        {isLoading ? (
          <Loader />
        ) : (
          <div className="event-container">
            {events?.map((event) => {
              const isEventFull = event.registrationCount >= event.maxAttendees;
              const isRegistered = registeredEventIds.includes(event._id);
              return (
                <div className="event-card" key={event._id}>
                  <img
                    src={event.imageURL}
                    alt="Event"
                    className="event-image"
                  />
                  <div className="event-content">
                    {event?.eventDate && <p>Date: {new Date(event.eventDate).toLocaleDateString()}</p>}
                    {/* <p>Date: {new Date(event.date).toLocaleString()}</p> */}
                    <p className="event-title">{event.title}</p>
                    <p className="event-description">{event.description}</p>
                    <p className="event-meta">Start Time: {event.startTime}</p>
                    <p className="event-meta">End Time: {event.endTime}</p>
                    <p className="event-attendees">
                      Max People: {event.maxAttendees}
                    </p>
                    <p className="event-attendees">
                      Registered: {event.registrationCount}
                    </p>
                    {/* <h3>Reviews:</h3>
                      {event.reviews?.length > 0 ? (
                        <ul>
                          {event.reviews.map(review => (
                            <li key={review._id}>
                              <p>Rating: {review.rating}/5</p>
                              <p>{review.comment}</p>
                              <small>{new Date(review.createdAt).toLocaleDateString()}</small>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>No reviews yet</p>
                      )} */}
                    <button
                      className="btn details"
                      onClick={() => navigate(`/event/${event._id}`)}
                    >
                      More Details
                    </button>
                    {/* {isRegistered ? (
                    <div className="button-container">
                      <button className="btn registered">
                        Already Registered
                      </button>
                      <button
                        className="cancel"
                        onClick={() => cancelRegistration(event._id)}
                      >
                        Cancel Registration
                      </button>
                    </div>
                  ) : isEventFull ? (
                    <button className="btn" disabled>
                      Registration Full
                    </button>
                  ) : (
                    <button
                      className="btn"
                      onClick={() => registerEvent(event._id)}
                    >
                      Register
                    </button>
                  )} */}
                    {/* {registeredEventIds.includes(event._id) ? (
                      <div className="button-container">
                        <button className="btn registered">
                          Already Registered
                        </button>
                        <button
                          className="cancel"
                          onClick={() => cancelRegistration(event._id)}
                        >
                          Cancel Registration
                        </button>
                      </div>
                    ) : (
                      <button
                        className="btn"
                        onClick={() => registerEvent(event._id)}
                      >
                        Register
                      </button>
                    )} */}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
