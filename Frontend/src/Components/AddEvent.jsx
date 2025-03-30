import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "../Components/Styles/addevent.css";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddEvent = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const [states, setstates] = useState([]);
  const [cities, setcities] = useState([]);
  const [areas, setareas] = useState([]);

  // useEffect(() => {
  //   submitHandler();
  // }, []);

  const submitHandler = async (data) => {
    const id = localStorage.getItem("id");
    data.userId = id;
    console.log(data);
    console.log(data.image[0]);

    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("userId", data.userId);
    formData.append("stateId", data.stateId);
    formData.append("cityId", data.cityId);
    formData.append("areaId", data.areaId);
    formData.append("category", data.category);
    formData.append("image", data.image[0]);
    formData.append("eventDate", data.eventDate);
    formData.append("startTime", data.startTime);
    formData.append("endTime", data.endTime);
    formData.append("maxAttendees", data.maxAttendees);
    formData.append("status", data.status);

    try {
      const res = await axios.post("/event/addeventwithfile", formData);
      console.log(res.data);
      console.log(res.data.data);
      if (res.status === 200) {
        navigate("/viewevent");
        toast.success("Event Added Successfully!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      }
    } catch (err) {
      toast.error("EVent Publish failed! Please try again.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  const getAllStates = async () => {
    const res = await axios.get("state/getstate");
    console.log(res.data);
    setstates(res.data.data);
  };

  const getCityBySateId = async (id) => {
    const res = await axios.get("city/getcitybystate/" + id);
    console.log(res.data);
    setcities(res.data.data);
  };

  const getAreaByCityId = async (id) => {
    const res = await axios.get("area/getareabycity/" + id);
    setareas(res.data.data);
  };

  useEffect(() => {
    getAllStates();
  }, []);

  return (
    <div className="event-container">
      <div className="event-box">
        <h2>Publish an Event</h2>
        <form className="container" onSubmit={handleSubmit(submitHandler)}>
          <input
            type="text"
            {...register("title", { required: true })}
            placeholder="Event Title"
          />
          <textarea
            {...register("description", { required: true })}
            placeholder="Event Description"
          ></textarea>
          <select {...register("category")}>
            <option>Select Event Catgory</option>
            <option value="Sports">Sports</option>
            <option value="Social">Social</option>
          </select>
          <input
            type="file"
            {...register("image", { required: true })}
            placeholder="Event Poster"
          />
          <input
            type="date"
            className=".date-time-group"
            {...register("eventDate", { required: true })}
            placeholder="Date of the EVent"
          />
          <input
            type="time"
            className=".date-time-group"
            {...register("startTime")}
            placeholder="Start Time"
          />
          <input
            type="time"
            className=".date-time-group"
            {...register("endTime")}
            placeholder="End Time"
          />
          <select
            {...register("stateId")}
            onChange={(event) => {
              getCityBySateId(event.target.value);
            }}
          >
            <option value="">Choose State</option>
            {states?.map((state) => {
              return <option value={state._id}>{state.name}</option>;
            })}
          </select>
          <select
            {...register("cityId")}
            onChange={(event) => {
              getAreaByCityId(event.target.value);
            }}
          >
            <option value="">Choose City</option>
            {cities?.map((city) => {
              return <option value={city._id}>{city.name}</option>;
            })}
          </select>
          <select {...register("areaId")}>
            <option value="">Choose Area</option>
            {areas?.map((area) => {
              return <option value={area._id}>{area.name}</option>;
            })}
          </select>
          <input
            type="number"
            {...register("maxAttendees")}
            placeholder="Max Attendees"
          />
          <select {...register("status")}>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
          </select>

          <button type="submit" className="auth-btn">
            Publish Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEvent;
