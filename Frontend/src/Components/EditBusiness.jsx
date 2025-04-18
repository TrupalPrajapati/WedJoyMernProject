import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { FiUpload, FiX } from "react-icons/fi";
import { FaPhone, FaEnvelope, FaClock, FaGlobe, FaMapMarkerAlt } from "react-icons/fa";
import "../Components/Styles/editbusiness.css";

const EditBusiness = () => {
  const { id } = useParams();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [logoFile, setLogoFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [existingLogo, setExistingLogo] = useState("");
  const [existingImage, setExistingImage] = useState("");

  useEffect(() => {
    const fetchBusinessData = async () => {
      try {
        const res = await axios.get(`/business/getbusinessesdetailsbybusinessid/${id}`);
        const business = res.data.data;
        
        // Set form values
        Object.keys(business).forEach(key => {
          if (key !== '_id' && key !== '__v' && key !== 'createdAt' && key !== 'updatedAt') {
            setValue(key, business[key]);
          }
        });

        if (business.logoURL) setExistingLogo(business.logoURL);
        if (business.imageURL) setExistingImage(business.imageURL);
        
        // Fetch location data if available
        if (business.stateId) {
          getCityByStateId(business.stateId);
          if (business.cityId) {
            getAreaByCityId(business.cityId);
          }
        }

      } catch (error) {
        console.error("Error fetching business data:", error);
        toast.error("Failed to load business data");
        navigate("/viewbusiness");
      }
    };

    fetchBusinessData();
    getAllStates();
  }, [id, setValue, navigate]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const formData = new FormData();
    
    // Append all form data
    Object.keys(data).forEach(key => {
      if (key !== 'logo' && key !== 'image') {
        formData.append(key, data[key]);
      }
    });
    
    // Append files if they exist
    if (logoFile) {
      formData.append("logo", logoFile);
    }
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const res = await axios.put(`/business/${id}/images`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      
      if (res.status === 200) {
        toast.success("Business updated successfully!");
        navigate("/viewbusiness");
      }
    } catch (error) {
      console.error("Error updating business:", error);
      toast.error(error.response?.data?.message || "Failed to update business");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 5 * 1024 * 1024) {
      setLogoFile(file);
      setExistingLogo("");
    } else {
      toast.error("Logo must be less than 5MB");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 5 * 1024 * 1024) {
      setImageFile(file);
      setExistingImage("");
    } else {
      toast.error("Image must be less than 5MB");
    }
  };

  const removeLogo = () => {
    setLogoFile(null);
    setExistingLogo("");
  };

  const removeImage = () => {
    setImageFile(null);
    setExistingImage("");
  };

  const getAllStates = async () => {
    try {
      const res = await axios.get("/state/getstate");
      setStates(res.data.data);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const getCityByStateId = async (stateId) => {
    try {
      if (stateId) {
        const res = await axios.get(`/city/getcitybystate/${stateId}`);
        setCities(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const getAreaByCityId = async (cityId) => {
    try {
      if (cityId) {
        const res = await axios.get(`/area/getareabycity/${cityId}`);
        setAreas(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching areas:", error);
    }
  };

  return (
    <div className="edit-business-container animate-fadeInUp">
      <div className="edit-business-card">
        <h2 className="edit-business-title">Edit Business</h2>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-section">
            <h3 className="section-title">Basic Information</h3>
            
            <div className="form-group">
              <label>Business Name*</label>
              <input
                type="text"
                {...register("businessname", { required: "Business name is required" })}
                className={errors.businessname ? "error" : ""}
              />
              {errors.businessname && (
                <span className="error-message">{errors.businessname.message}</span>
              )}
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                {...register("description")}
                rows={4}
              />
            </div>

            <div className="form-group">
              <label>Category*</label>
              <select
                {...register("category", { required: "Category is required" })}
                className={errors.category ? "error" : ""}
              >
                <option value="">Select category</option>
                <option value="Retail">Retail</option>
                <option value="Food">Food</option>
                <option value="Service">Service</option>
                <option value="Technology">Technology</option>
                <option value="Other">Other</option>
              </select>
              {errors.category && (
                <span className="error-message">{errors.category.message}</span>
              )}
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-title">Contact Information</h3>
            
            <div className="form-group">
              <label>Phone Number*</label>
              <input
                type="text"
                {...register("phone_number", { 
                  required: "Phone number is required",
                  pattern: {
                    value: /^\d{10}$/,
                    message: "Invalid phone number (10 digits required)"
                  }
                })}
                className={errors.phone_number ? "error" : ""}
              />
              {errors.phone_number && (
                <span className="error-message">{errors.phone_number.message}</span>
              )}
            </div>

            <div className="form-group">
              <label>Email*</label>
              <input
                type="email"
                {...register("businessemail", { 
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
                className={errors.businessemail ? "error" : ""}
              />
              {errors.businessemail && (
                <span className="error-message">{errors.businessemail.message}</span>
              )}
            </div>

            <div className="form-group">
              <label>Website</label>
              <input
                type="url"
                {...register("website")}
                placeholder="https://example.com"
              />
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-title">Business Hours</h3>
            
            <div className="time-input-group">
              <div className="form-group">
                <label>Opening Time</label>
                <input
                  type="time"
                  {...register("startTime")}
                />
              </div>

              <div className="form-group">
                <label>Closing Time</label>
                <input
                  type="time"
                  {...register("endTime")}
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-title">Location</h3>
            
            <div className="form-group">
              <label>State*</label>
              <select
                {...register("stateId", { required: "State is required" })}
                onChange={(e) => getCityByStateId(e.target.value)}
                className={errors.stateId ? "error" : ""}
              >
                <option value="">Select state</option>
                {states.map((state) => (
                  <option key={state._id} value={state._id}>
                    {state.name}
                  </option>
                ))}
              </select>
              {errors.stateId && (
                <span className="error-message">{errors.stateId.message}</span>
              )}
            </div>

            <div className="form-group">
              <label>City*</label>
              <select
                {...register("cityId", { required: "City is required" })}
                onChange={(e) => getAreaByCityId(e.target.value)}
                className={errors.cityId ? "error" : ""}
                disabled={!cities.length}
              >
                <option value="">Select city</option>
                {cities.map((city) => (
                  <option key={city._id} value={city._id}>
                    {city.name}
                  </option>
                ))}
              </select>
              {errors.cityId && (
                <span className="error-message">{errors.cityId.message}</span>
              )}
            </div>

            <div className="form-group">
              <label>Area*</label>
              <select
                {...register("areaId", { required: "Area is required" })}
                className={errors.areaId ? "error" : ""}
                disabled={!areas.length}
              >
                <option value="">Select area</option>
                {areas.map((area) => (
                  <option key={area._id} value={area._id}>
                    {area.name}
                  </option>
                ))}
              </select>
              {errors.areaId && (
                <span className="error-message">{errors.areaId.message}</span>
              )}
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-title">Business Images</h3>
            
            <div className="file-upload-group">
              <div className="form-group">
                <label>Logo</label>
                <div className="file-upload-box">
                  {logoFile ? (
                    <div className="file-preview">
                      <img 
                        src={URL.createObjectURL(logoFile)} 
                        alt="Logo preview" 
                      />
                      <button 
                        type="button" 
                        className="remove-file-btn"
                        onClick={removeLogo}
                      >
                        <FiX />
                      </button>
                    </div>
                  ) : existingLogo ? (
                    <div className="file-preview">
                      <img 
                        src={existingLogo} 
                        alt="Current logo" 
                      />
                      <button 
                        type="button" 
                        className="remove-file-btn"
                        onClick={removeLogo}
                      >
                        <FiX />
                      </button>
                    </div>
                  ) : (
                    <label className="file-upload-label">
                      <FiUpload className="upload-icon" />
                      <span>Click to upload logo</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoChange}
                        style={{ display: "none" }}
                      />
                    </label>
                  )}
                </div>
                <p className="file-hint">Recommended: Square aspect ratio, max 5MB</p>
              </div>

              <div className="form-group">
                <label>Business Image</label>
                <div className="file-upload-box">
                  {imageFile ? (
                    <div className="file-preview">
                      <img 
                        src={URL.createObjectURL(imageFile)} 
                        alt="Business preview" 
                      />
                      <button 
                        type="button" 
                        className="remove-file-btn"
                        onClick={removeImage}
                      >
                        <FiX />
                      </button>
                    </div>
                  ) : existingImage ? (
                    <div className="file-preview">
                      <img 
                        src={existingImage} 
                        alt="Current business image" 
                      />
                      <button 
                        type="button" 
                        className="remove-file-btn"
                        onClick={removeImage}
                      >
                        <FiX />
                      </button>
                    </div>
                  ) : (
                    <label className="file-upload-label">
                      <FiUpload className="upload-icon" />
                      <span>Click to upload image</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: "none" }}
                      />
                    </label>
                  )}
                </div>
                <p className="file-hint">Recommended: Landscape orientation, max 5MB</p>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate("/viewbusiness")}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Updating..." : "Update Business"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBusiness;