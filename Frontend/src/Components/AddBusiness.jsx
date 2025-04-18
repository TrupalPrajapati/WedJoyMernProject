// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import "../Components/Styles/addbusiness.css"

// const AddBusiness = () => {
//   const { register, handleSubmit } = useForm();
//   const navigate = useNavigate();

//   const [states, setStates] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [areas, setAreas] = useState([]);

//   const submitHandler = async (data) => {
//     const id = localStorage.getItem("id");
//     data.userId = id;
//     try {
//         console.log(data);
        
//       const res = await axios.post("/business/addbusiness", data);
//       if (res.status === 201) {
//         navigate("/viewbusiness");
//         toast.success("Business Added Successfully!");
//       }
//     } catch (err) {
//       toast.error("Failed to add business. Please try again.");
//     }
//   };

//   const getAllStates = async () => {
//     const res = await axios.get("state/getstate");
//     setStates(res.data.data);
//   };

//   const getCityByStateId = async (id) => {
//     const res = await axios.get(`city/getcitybystate/${id}`);
//     setCities(res.data.data);
//   };

//   const getAreaByCityId = async (id) => {
//     const res = await axios.get(`area/getareabycity/${id}`);
//     setAreas(res.data.data);
//   };

//   useEffect(() => {
//     getAllStates();
//   }, []);

//   return (
//     <div className="business-container animate-fadeInUp">
//       <div className="business-box">
//         <h2>Add Your Business</h2>
//         <form className="container" onSubmit={handleSubmit(submitHandler)}>
//           <input type="text" {...register("businessname", { required: true })} placeholder="Business Name" />
//           <textarea {...register("description")} placeholder="Business Description"></textarea>
//           <select {...register("category", { required: true })}>
//             <option value="">Select Business Category</option>
//             <option value="Retail">Retail</option>
//             <option value="Food">Food</option>
//             <option value="Service">Service</option>
//             <option value="Technology">Technology</option>
//             <option value="Other">Other</option>
//           </select>
//           <input type="text" {...register("phone_number", { required: true })} placeholder="Contact Number" />
//           <input type="text" {...register("businessemail", { required: true })} placeholder="Business Email" />
//           <input type="text" {...register("website")} placeholder="Website (optional)" />
//           <input
//             type="time"
//             className=".date-time-group"
//             {...register("startTime")}
//             placeholder="Open at"
//           />
//           <input
//             type="time"
//             className=".date-time-group"
//             {...register("endTime")}
//             placeholder="Cosed at"
//           />

//           <select {...register("stateId", { required: true })} onChange={(e) => getCityByStateId(e.target.value)}>
//             <option value="">Choose State</option>
//             {states?.map((state) => (
//               <option key={state._id} value={state._id}>{state.name}</option>
//             ))}
//           </select>

//           <select {...register("cityId", { required: true })} onChange={(e) => getAreaByCityId(e.target.value)}>
//             <option value="">Choose City</option>
//             {cities?.map((city) => (
//               <option key={city._id} value={city._id}>{city.name}</option>
//             ))}
//           </select>

//           <select {...register("areaId", { required: true })}>
//             <option value="">Choose Area</option>
//             {areas?.map((area) => (
//               <option key={area._id} value={area._id}>{area.name}</option>
//             ))}
//           </select>

//           <button type="submit" className="auth-btn">Add Business</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddBusiness;

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FiUpload, FiX } from "react-icons/fi";
import "../Components/Styles/addbusiness.css";

const AddBusiness = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [logoFile, setLogoFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const formData = new FormData();
    
    // Append all form data
    Object.keys(data).forEach(key => {
      if (key !== 'logo' && key !== 'image') {
        formData.append(key, data[key]);
      }
    });
    
    formData.append("userId", localStorage.getItem("id"));
    
    // Append files if they exist
    if (logoFile) {
      formData.append("logo", logoFile);
    }
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const res = await axios.post("/business/addbusinesswithimage", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      
      if (res.status === 201) {
        toast.success("Business added successfully!");
        navigate("/viewbusiness");
      }
    } catch (error) {
      console.error("Error adding business:", error);
      toast.error(error.response?.data?.message || "Failed to add business");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 5 * 1024 * 1024) { // 5MB limit
      setLogoFile(file);
    } else {
      toast.error("Logo must be less than 5MB");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 5 * 1024 * 1024) { // 5MB limit
      setImageFile(file);
    } else {
      toast.error("Image must be less than 5MB");
    }
  };

  const removeLogo = () => {
    setLogoFile(null);
  };

  const removeImage = () => {
    setImageFile(null);
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

  useEffect(() => {
    getAllStates();
  }, []);

  return (
    <div className="add-business-container animate-fadeInUp">
      <div className="add-business-card">
        <h2 className="add-business-title">Add New Business</h2>
        
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
              type="submit"
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save Business"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBusiness;