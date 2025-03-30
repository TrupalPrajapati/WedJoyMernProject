import axios from "axios";
import React, { useEffect, useState } from "react";
import { Loader } from "./Common/Loader";
import { FaPhone, FaEnvelope, FaClock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const ViewAllBusiness = () => {
  const [businesses, setBusinesses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const getAllBusinesses = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`/business/getbusinesses`);
      console.log(res.data);
      setBusinesses(res.data.data);
    } catch (error) {
      console.error("Error fetching businesses:", error);
    }
    setIsLoading(false);
  };

  const handleSubmit = async(id)=> {  
    try{
        navigate(`/viewbusinessdeatils/${id}`);
    }catch(error){
        console.log(error);
    }
  }

  useEffect(() => {
    getAllBusinesses();
  }, []);
  return (
    <div className="parent">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="business-container">
          {businesses?.map((business) => (
            <div className="business-card" key={business._id}>
              <div className="business-content">
                <h3 className="business-title">{business.businessname}</h3>
                <p className="business-category">{business.category}</p>

                <div className="business-info">
                  <FaPhone className="icon" />
                  <span>{business.phone_number}</span>
                </div>

                <div className="business-info">
                  <FaEnvelope className="icon" />
                  <span>{business.businessemail}</span>
                </div>

                <div className="business-info">
                  <FaClock className="icon" />
                  <span>
                    {business.startTime} - {business.endTime}
                  </span>
                </div>

                <button className="view-details" onClick={() => handleSubmit(business._id)}>
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
