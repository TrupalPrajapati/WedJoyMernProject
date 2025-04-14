import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { isValid, parseISO, format } from 'date-fns';
import styles from "../Components/Styles/eventdetail.module.css";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Move fetchEvent outside so we can reuse it
  const fetchEvent = async () => {
    try {
      const res = await axios.get(`/event/geteventbyidwithcount/${id}`);
      console.log("Fetched event:", res.data.data);

      setEvent(res.data.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching event:", err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvent(); // ✅ Initially fetch event
  }, [id]);

  const handleRegister = async () => {
    try {
      const userId = localStorage.getItem("id");
      console.log(userId, id);

      await axios.post("/eventregister/register/", {
        userId,
        eventId: id,
      });

      // ✅ Re-fetch event to update registrationCount
      fetchEvent();
    } catch (err) {
      alert(err.response.data.message || "Error registering");
    }
  };

  const handleCancel = async () => {
    try {
      const userId = localStorage.getItem("id");
      await axios.delete(`/eventregister/cancel/${userId}/${id}`);

      // ✅ Re-fetch event to update registrationCount
      fetchEvent();
    } catch (err) {
      alert(err.response.data.message || "Error canceling");
    }
  };

  const parseAndFormatDate = (dateString) => {
    try {
      const date = parseISO(dateString); // Parse ISO date string
      if (!isValid(date)) {
        return "N/A";
      }
      return format(date, 'MM/dd/yyyy'); // Format the date
    } catch (error) {
      console.error("Error parsing date:", error);
      return "N/A";
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!event) return <p>No event found</p>;

  return (
    <div className={styles.eventContainer}>
      <div className="eventImageWrapper">
        <img
          src={
            event.imageURL ||
            "https://via.placeholder.com/800x400?text=Event+Image"
          }
          alt={event.title}
          className={styles.eventImage}
        />
      </div>

      <h1 className={styles.eventTitle}>{event.title}</h1>

      <p className={styles.eventDescription}>{event.description}</p>

      <p className={styles.eventInfo}>
        <strong>Max Attendees:</strong> {event.maxAttendees}
      </p>

      <p className={styles.eventInfo}>
        <strong>Current Registered:</strong> {event.registrationCount ?? 0}
      </p>

      <p className={styles.eventInfo}>
      <strong>Date:</strong> {event.eventDate ? parseAndFormatDate(event.eventDate) : "N/A"}
      </p>

      {/* ✅ Action Buttons */}
      <button className={styles.btnRegister} onClick={handleRegister}>
        Register for Event
      </button>

      <button className={styles.btnCancel} onClick={handleCancel}>
        Cancel Registration
      </button>
    </div>
  );
};

export default EventDetails;
