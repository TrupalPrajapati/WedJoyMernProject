import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "../Components/Styles/navbar.css";

const Navbar = () => {
  const [userRole, setUserRole] = useState(localStorage.getItem("role") || "");
  const navigate = useNavigate();

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

  const handleLogout = () => {
    // Clear localStorage or any tokens
    localStorage.removeItem("id");
    localStorage.removeItem("name");

    // Navigate to login or home
    navigate("/selectrole");

    // Optional: show toast
    // toast.success("Logged out successfully!");
  };

  return (
    <nav>
      <Link to="/" className="nav-logo">
        WedJoy
      </Link>

      <div className="nav-links">
        {/* <Link to="/">Home</Link> */}

        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Home
        </NavLink>

        {/* Event Organizer Links */}
        {userRole === "eventorganizer" && (
          <>
            <NavLink
              to="/addevent"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Add Event
            </NavLink>
            <NavLink
              to="/viewevent"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              My Events
            </NavLink>
            <button onClick={handleLogout} className="nav-btn">
              Logout
            </button>
          </>
        )}

        {/* Event Participant Links */}
        {userRole === "user" && (
          <>
            <NavLink
              to="/vieweventascommunitymember"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              View All Events
            </NavLink>
            <NavLink
              to="/userregisteredevents"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              My Registered Events
            </NavLink>
            <NavLink
              to="/viewallbusiness"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Explore businesses
            </NavLink>
            <NavLink
              to="/newspostfeed"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              News Feed
            </NavLink>
            <NavLink
              to="/create-news-post"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Create News Post
            </NavLink>
            <button onClick={handleLogout} className="nav-btn">
              Logout
            </button>
          </>
        )}

        {/* Business Owner Links */}
        {userRole === "businessowner" && (
          <>
            <NavLink
              to="/busineessownerrolepage"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Business Dashboard
            </NavLink>
            <NavLink
              to="/viewbusiness"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              My Businesses
            </NavLink>
            <button onClick={handleLogout} className="nav-btn">
              Logout
            </button>
          </>
        )}

        <NavLink
          style={{marginRight:"50px"}}
          className={({ isActive }) =>
            `contact nav-link ${isActive ? "active" : ""}`
          }
          to="/contact"
        >
          Contact
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
