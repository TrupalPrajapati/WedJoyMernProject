import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../Components/Styles/navbar.css";

const Navbar = () => {
  const [userRole, setUserRole] = useState(localStorage.getItem("role") || "");

  useEffect(() => {
    // Function to handle localStorage changes
    const handleStorageChange = () => {
      setUserRole(localStorage.getItem("role") || "");
    };

    // Listen for changes in localStorage (from login or other places)
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
  return (
    <nav>
      <Link to="/" className="nav-logo">WedJoy</Link>

      <div className="nav-links">
        <Link to="/">Home</Link>

        {/* Event Organizer Links */}
        {userRole === "eventorganizer" && (
          <>
            <Link to="/addevent">Add Event</Link>
            <Link to="/viewevent">My Events</Link>
          </>
        )}

        {/* Event Participant Links */}
        {userRole === "user" && (
          <>
            <Link to="/vieweventascommunitymember">View All Events</Link>
            <Link to="/userregisteredevents">My Registered Events</Link>
            <Link to="/viewallbusiness">Explore businesses</Link>
          </>
        )}

        {/* Business Owner Links */}
        {userRole === "businessowner" && (
          <>
            <Link to="/busineessownerrolepage">Business Dashboard</Link>
            <Link to="/viewbusiness">My Businesses</Link>
          </>
        )}

        <Link className="contact" to="/contact">Contact</Link>
      </div>
    </nav>
  );
};

export default Navbar;
