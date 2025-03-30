import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FaPhone, FaEnvelope, FaClock, FaBuilding } from "react-icons/fa";
import "../Components/Styles/businesssdetail.css"

export const ViewBusinessDetails = () => {

    const [businessDetails, setbusinessDetails] = useState([]);

    const id = useParams().id;
    console.log(id);
    

    const getBusinessDetails = async()=>{
        const res = await axios.get(`/business/getbusinessesdetailsbybusinessid/${id}`);
        console.log(res.data.data);
        setbusinessDetails(res.data.data);
    }

    useEffect(()=>{
        getBusinessDetails();
    },[])
   

  return (
    <div className="business-details-container">
      <div className="business-card">
        <h2 className="business-title">
          <FaBuilding className="icon" /> {businessDetails.businessname}
        </h2>
        <p className="business-category">Category: {businessDetails.category}</p>
        <p className="business-phone">
          <FaPhone className="icon" /> {businessDetails.phone_number}
        </p>
        <p className="business-email">
          <FaEnvelope className="icon" /> {businessDetails.businessemail}
        </p>
        <p className="business-open">
          <FaClock className="icon" /> Open At: {businessDetails.startTime}
        </p>
        <p className="business-close">
          <FaClock className="icon" /> Close At: {businessDetails.endTime}
        </p>
        <button className="back-button" onClick={() => window.history.back()}>
          ← Back
        </button>
      </div>
    </div>
  )
}
