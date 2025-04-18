import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Components/Styles/selectRole.css"; 
import { Footer } from "./Common/Footer";

const SelectRole = () => {
  const navigate = useNavigate();
  
  const handleRoleSelection = (role) => {
    navigate(`/signup/${role}`, { state: { role } }); // Pass role using state
  };

  useEffect(() => {
    localStorage.removeItem("role"); // Clear role when visiting home
    window.dispatchEvent(new Event("storage")); // Notify Navbar to update
  }, []);
  

  return (
    <div className="bg-decor animate-fadeInUp">
    <div className="role-selection-container">
      <h2>Select Your Role</h2>
      <div className="role-buttons">
        <button onClick={() => handleRoleSelection("eventorganizer")}>Event Organizer</button>
        <button onClick={() => handleRoleSelection("businessowner")}>Business Owner</button>
        <button onClick={() => handleRoleSelection("user")}>Event Participant</button>
      </div>
    </div>
      {/* <Footer></Footer> */}
    </div>
  );
};

export default SelectRole;
