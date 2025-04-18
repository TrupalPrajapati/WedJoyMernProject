// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import { FaPhone, FaEnvelope, FaClock, FaBuilding } from "react-icons/fa";
// import "../Components/Styles/businesssdetail.css"

// export const ViewBusinessDetails = () => {

//     const [businessDetails, setbusinessDetails] = useState([]);

//     const id = useParams().id;
//     console.log(id);
    

//     const getBusinessDetails = async()=>{
//         const res = await axios.get(`/business/getbusinessesdetailsbybusinessid/${id}`);
//         console.log(res.data.data);
//         setbusinessDetails(res.data.data);
//     }

//     useEffect(()=>{
//         getBusinessDetails();
//     },[])
   

//   return (
//     <div className="business-details-container animate-fadeInUp">
//       <div className="business-card">
//         <h2 className="business-title">
//           <FaBuilding className="icon" /> {businessDetails.businessname}
//         </h2>
//         <p className="business-category">Category: {businessDetails.category}</p>
//         <p className="business-phone">
//           <FaPhone className="icon" /> {businessDetails.phone_number}
//         </p>
//         <p className="business-email">
//           <FaEnvelope className="icon" /> {businessDetails.businessemail}
//         </p>
//         <p className="business-open">
//           <FaClock className="icon" /> Open At: {businessDetails.startTime}
//         </p>
//         <p className="business-close">
//           <FaClock className="icon" /> Close At: {businessDetails.endTime}
//         </p>
//         <button className="back-button" onClick={() => window.history.back()}>
//           ← Back
//         </button>
//       </div>
//     </div>
//   )
// }

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaPhone, FaEnvelope, FaClock, FaGlobe, FaMapMarkerAlt, FaEdit } from "react-icons/fa";
import "../Components/Styles/businesssdetail.css"

export const ViewBusinessDetails = () => {
    const [businessDetails, setBusinessDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();

    const getBusinessDetails = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get(`/business/getbusinessesdetailsbybusinessid/${id}`);
            setBusinessDetails(res.data.data);
        } catch (error) {
            console.error("Error fetching business details:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = () => {
        navigate(`/editbusiness/${id}`);
    };

    useEffect(() => {
        getBusinessDetails();
    }, [id]);

    if (isLoading) {
        return <div className="details-loading">Loading...</div>;
    }

    if (!businessDetails) {
        return <div className="details-error">Business not found</div>;
    }

    return (
        <div className="details-container">
            <div className="details-header">
                <h2 className="details-title">{businessDetails.businessname}</h2>
                {/* <button 
                    className="details-edit-btn"
                    onClick={handleEdit}
                >
                    <FaEdit /> Edit
                </button> */}
            </div>

            <div className="details-card">
                {businessDetails.imageURL && (
                    <div className="details-main-image-container">
                        <img 
                            src={businessDetails.imageURL} 
                            alt={businessDetails.businessname} 
                            className="details-main-image"
                        />
                    </div>
                )}

                <div className="details-content">
                    <div className="details-meta">
                        <p className="details-category">{businessDetails.category}</p>
                        {businessDetails.logoURL && (
                            <img 
                                src={businessDetails.logoURL} 
                                alt={`${businessDetails.businessname} logo`} 
                                className="details-logo"
                            />
                        )}
                    </div>

                    <p className="details-description">{businessDetails.description}</p>

                    <div className="details-info-grid">
                        <div className="details-info">
                            <FaMapMarkerAlt className="details-icon" />
                            <span>
                                {businessDetails.areaId?.name}, {businessDetails.cityId?.name}, {businessDetails.stateId?.name}
                            </span>
                        </div>

                        <div className="details-info">
                            <FaPhone className="details-icon" />
                            <span>{businessDetails.phone_number}</span>
                        </div>

                        <div className="details-info">
                            <FaEnvelope className="details-icon" />
                            <span>{businessDetails.businessemail}</span>
                        </div>

                        {businessDetails.website && (
                            <div className="details-info">
                                <FaGlobe className="details-icon" />
                                <a href={businessDetails.website} target="_blank" rel="noopener noreferrer">
                                    {businessDetails.website}
                                </a>
                            </div>
                        )}

                        <div className="details-info">
                            <FaClock className="details-icon" />
                            <span>Open: {businessDetails.startTime} - {businessDetails.endTime}</span>
                        </div>
                    </div>
                </div>

                <div className="details-actions">
                    <button 
                        className="details-back-btn"
                        onClick={() => navigate(-1)}
                    >
                        ← Back to List
                    </button>
                </div>
            </div>
        </div>
    );
};