// import React, { useEffect, useState } from "react";
// import { Loader } from "../Components/Common/Loader";
// import { FaPhone, FaEnvelope, FaClock } from "react-icons/fa";
// import axios from "axios";
// import "./Styles/viewbusiness.css"; // Import external CSS

// export const ViewBusiness = () => {
//   const [businesses, setBusinesses] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const getAllBusinesses = async () => {
//     setIsLoading(true);
//     try {
//       const res = await axios.get(
//         `/business/getbusinessesbyuserid/${localStorage.getItem("id")}`
//       );
//       console.log(res.data);
//       setBusinesses(res.data.data);
//     } catch (error) {
//       console.error("Error fetching businesses:", error);
//     }
//     setIsLoading(false);
//   };

//   useEffect(() => {
//     getAllBusinesses();
//   }, []);

//   return (
//     <div className="parent animate-fadeInUp">
//       {isLoading ? (
//         <Loader />
//       ) : businesses.length === 0 ? (
//         <p className="no-business-message">No businesses found.</p>
//       ) :  (
//         <div className="business-container">
//           {businesses?.map((business) => (
//             <div className="business-card" key={business._id}>
//               <div className="business-content">
//                 <h3 className="business-title">{business.businessname}</h3>
//                 <p className="business-category">{business.category}</p>

//                 <div className="business-info">
//                   <FaPhone className="icon" />
//                   <span>{business.phone_number}</span>
//                 </div>

//                 <div className="business-info">
//                   <FaEnvelope className="icon" />
//                   <span>{business.businessemail}</span>
//                 </div>

//                 <div className="business-info">
//                   <FaClock className="icon" />
//                   <span>
//                     {business.startTime} - {business.endTime}
//                   </span>
//                 </div>

//                 <button className="view-details">View Details</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

import React, { useEffect, useState } from "react";
import { Loader } from "../Components/Common/Loader";
import { FaPhone, FaEnvelope, FaClock, FaGlobe, FaMapMarkerAlt, FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Styles/viewbusiness.css";

export const ViewBusiness = () => {
  const [businesses, setBusinesses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const getAllBusinesses = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `/business/getbusinessesbyuserid/${localStorage.getItem("id")}`
      );
      console.log(res.data.data);
      setBusinesses(res.data.data);
    } catch (error) {
      console.error("Error fetching businesses:", error);
    }
    setIsLoading(false);
  };

  const handleViewDetails = (id) => {
    navigate(`/viewbusinessdeatils/${id}`);
  };

  const handleEditBusiness = (id) => {
    navigate(`/editbusiness/${id}`);
  };

  const handleDeleteBusiness = async (id) => {
    if (window.confirm("Are you sure you want to delete this business?")) {
      try {
        await axios.delete(`/business/${id}`);
        getAllBusinesses(); // Refresh the list after deletion
      } catch (error) {
        console.error("Error deleting business:", error);
      }
    }
  };

  useEffect(() => {
    getAllBusinesses();
  }, []);

  return (
    <div className="parent animate-fadeInUp">
      <div className="header-container">
        <h2>My Businesses</h2>
        <button 
          className="add-business-btn"
          onClick={() => navigate("/busineessownerrolepage")}
        >
          Add New Business
        </button>
      </div>

      {isLoading ? (
        <Loader />
      ) : businesses.length === 0 ? (
        <div className="no-business-container">
          <p className="no-business-message">No businesses found.</p>
          <button 
            className="add-business-btn"
            onClick={() => navigate("/busineessownerrolepage")}
          >
            Add Your First Business
          </button>
        </div>
      ) : (
        <div className="business-container">
          {businesses?.map((business) => (
            <div className="business-card" key={business._id}>
              {business.logoURL && (
                <div className="business-logo-container">
                  <img 
                    src={business.logoURL} 
                    alt={`${business.businessname} logo`} 
                    className="business-logo"
                  />
                </div>
              )}
              <div className="business-content">
                <h3 className="business-title">{business.businessname}</h3>
                <p className="business-category">{business.category}</p>
                <p className="business-description">{business.description}</p>

                {/* ADDED LOCATION DISPLAY */}
                <div className="business-info">
                  <FaMapMarkerAlt className="icon" />
                  <span>
                    {business.areaId?.name && `${business.areaId.name}, `}
                    {business.cityId?.name && `${business.cityId.name}, `}
                    {business.stateId?.name}
                  </span>
                </div>

                <div className="business-info">
                  <FaPhone className="icon" />
                  <span>{business.phone_number}</span>
                </div>

                <div className="business-info">
                  <FaEnvelope className="icon" />
                  <span>{business.businessemail}</span>
                </div>

                {business.website && (
                  <div className="business-info">
                    <FaGlobe className="icon" />
                    <a href={business.website} target="_blank" rel="noopener noreferrer">
                      {business.website}
                    </a>
                  </div>
                )}

                <div className="business-info">
                  <FaClock className="icon" />
                  <span>
                    {business.startTime} - {business.endTime}
                  </span>
                </div>

                <div className="business-actions">
                  <button 
                    className="view-details" 
                    onClick={() => handleViewDetails(business._id)}
                  >
                    View Details
                  </button>
                  <button 
                    className="edit-btn"
                    onClick={() => handleEditBusiness(business._id)}
                  >
                    <FaEdit />
                  </button>
                  <button 
                    className="delete-btn"
                    onClick={() => handleDeleteBusiness(business._id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};