import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../Components/Styles/addbusiness.css"

const AddBusiness = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);

  const submitHandler = async (data) => {
    const id = localStorage.getItem("id");
    data.userId = id;
    try {
        console.log(data);
        
      const res = await axios.post("/business/addbusiness", data);
      if (res.status === 201) {
        navigate("/viewbusiness");
        toast.success("Business Added Successfully!");
      }
    } catch (err) {
      toast.error("Failed to add business. Please try again.");
    }
  };

  const getAllStates = async () => {
    const res = await axios.get("state/getstate");
    setStates(res.data.data);
  };

  const getCityByStateId = async (id) => {
    const res = await axios.get(`city/getcitybystate/${id}`);
    setCities(res.data.data);
  };

  const getAreaByCityId = async (id) => {
    const res = await axios.get(`area/getareabycity/${id}`);
    setAreas(res.data.data);
  };

  useEffect(() => {
    getAllStates();
  }, []);

  return (
    <div className="business-container">
      <div className="business-box">
        <h2>Add Your Business</h2>
        <form className="container" onSubmit={handleSubmit(submitHandler)}>
          <input type="text" {...register("businessname", { required: true })} placeholder="Business Name" />
          <textarea {...register("description")} placeholder="Business Description"></textarea>
          <select {...register("category", { required: true })}>
            <option value="">Select Business Category</option>
            <option value="Retail">Retail</option>
            <option value="Food">Food</option>
            <option value="Service">Service</option>
            <option value="Technology">Technology</option>
            <option value="Other">Other</option>
          </select>
          <input type="text" {...register("phone_number", { required: true })} placeholder="Contact Number" />
          <input type="text" {...register("businessemail", { required: true })} placeholder="Business Email" />
          <input type="text" {...register("website")} placeholder="Website (optional)" />
          <input
            type="time"
            className=".date-time-group"
            {...register("startTime")}
            placeholder="Open at"
          />
          <input
            type="time"
            className=".date-time-group"
            {...register("endTime")}
            placeholder="Cosed at"
          />

          <select {...register("stateId", { required: true })} onChange={(e) => getCityByStateId(e.target.value)}>
            <option value="">Choose State</option>
            {states?.map((state) => (
              <option key={state._id} value={state._id}>{state.name}</option>
            ))}
          </select>

          <select {...register("cityId", { required: true })} onChange={(e) => getAreaByCityId(e.target.value)}>
            <option value="">Choose City</option>
            {cities?.map((city) => (
              <option key={city._id} value={city._id}>{city.name}</option>
            ))}
          </select>

          <select {...register("areaId", { required: true })}>
            <option value="">Choose Area</option>
            {areas?.map((area) => (
              <option key={area._id} value={area._id}>{area.name}</option>
            ))}
          </select>

          <button type="submit" className="auth-btn">Add Business</button>
        </form>
      </div>
    </div>
  );
};

export default AddBusiness;
