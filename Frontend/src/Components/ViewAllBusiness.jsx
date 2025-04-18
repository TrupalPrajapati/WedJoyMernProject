import axios from "axios";
import React, { useEffect, useState } from "react";
import { Loader } from "./Common/Loader";
import { FaPhone, FaEnvelope, FaClock, FaGlobe, FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../Components/Styles/viewallbusiness.css"

export const ViewAllBusiness = () => {
  const [businesses, setBusinesses] = useState([]);
  const [filteredBusinesses, setFilteredBusinesses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const navigate = useNavigate();

  const categories = ["All", "Retail", "Food", "Service", "Technology", "Other"];

  const getAllBusinesses = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`/business/getbusinesses`);
      setBusinesses(res.data.data);
      setFilteredBusinesses(res.data.data);
    } catch (error) {
      console.error("Error fetching businesses:", error);
    }
    setIsLoading(false);
  };

  const handleSearch = () => {
    let filtered = businesses;
    
    if (searchTerm) {
      filtered = filtered.filter(business => 
        business.businessname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        business.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        business.category.toLowerCase().includes(searchTerm.toLowerCase())
      ); 
    }
    
    if (categoryFilter !== "All") {
      filtered = filtered.filter(business => 
        business.category === categoryFilter)
    }
    
    setFilteredBusinesses(filtered);
  };

  const handleViewDetails = (id) => {  
    navigate(`/viewbusinessdetails/${id}`);
  }

  useEffect(() => {
    getAllBusinesses();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchTerm, categoryFilter, businesses]);

  return (
    <div className="viewallbusiness-parent viewallbusiness-animate-fadeInUp">
      <div className="viewallbusiness-search-filter-container">
        <div className="viewallbusiness-search-bar">
          <FaSearch className="viewallbusiness-search-icon" />
          <input
            type="text"
            placeholder="Search businesses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="viewallbusiness-category-filter">
          <select 
            value={categoryFilter} 
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      {isLoading ? (
        <Loader />
      ) : filteredBusinesses.length === 0 ? (
        <p className="viewallbusiness-no-business-message">No businesses found matching your criteria.</p>
      ) : (
        <div className="viewallbusiness-business-container">
          {filteredBusinesses?.map((business) => (
            <div className="viewallbusiness-business-card" key={business._id}>
              {business.logoURL && (
                <div className="viewallbusiness-business-logo-container">
                  <img 
                    src={business.logoURL} 
                    alt={`${business.businessname} logo`} 
                    className="viewallbusiness-business-logo"
                  />
                </div>
              )}
              <div className="viewallbusiness-business-content">
                <h3 className="viewallbusiness-business-title">{business.businessname}</h3>
                <p className="viewallbusiness-business-category">{business.category}</p>
                <p className="viewallbusiness-business-description">{business.description?.substring(0, 100)}...</p>

                <div className="viewallbusiness-business-info">
                  <FaMapMarkerAlt className="viewallbusiness-icon" />
                  <span>{business.areaId?.name}, {business.cityId?.name}, {business.stateId?.name}</span>
                </div>

                <div className="viewallbusiness-business-info">
                  <FaPhone className="viewallbusiness-icon" />
                  <span>{business.phone_number}</span>
                </div>

                <div className="viewallbusiness-business-info">
                  <FaEnvelope className="viewallbusiness-icon" />
                  <span>{business.businessemail}</span>
                </div>

                {business.website && (
                  <div className="viewallbusiness-business-info">
                    <FaGlobe className="viewallbusiness-icon" />
                    <a href={business.website} target="_blank" rel="noopener noreferrer">
                      {business.website}
                    </a>
                  </div>
                )}

                <div className="viewallbusiness-business-info">
                  <FaClock className="viewallbusiness-icon" />
                  <span>
                    {business.startTime} - {business.endTime}
                  </span>
                </div>

                <button 
                  className="viewallbusiness-view-details" 
                  onClick={() => handleViewDetails(business._id)}
                >
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