// import "../Components/Styles/contact.css"

import React from "react";
import { useForm } from "react-hook-form";
import { FaUser, FaEnvelope, FaCommentDots } from "react-icons/fa";
import axios from "axios";
import { Bounce, toast } from "react-toastify";

export const ContactUs = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
    
        const userId = localStorage.getItem("id");
        data.userId = userId;
        console.log(data);
        const res = await axios.post("/contact/contactUs", data);

      if (res.status === 200) {
        toast.success("Message sent successfully!", {
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
        reset();
      }
    } catch (error) {
      toast.error("Failed to send message. Please try again.", {
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

  return (
    <div className="signup-container animate-fadeInUp">
      <div className="signup-box">
        <h2>Contact Us</h2>
        <p>We'd love to hear from you!</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group">
            <FaUser className="icon" />
            <input
              type="text"
              placeholder="Your Name"
              {...register("name", { required: "Name is required*" })}
            />
          </div>
          {errors.name && <span className="error">{errors.name.message}</span>}

          <div className="input-group">
            <FaEnvelope className="icon" />
            <input
              type="email"
              placeholder="Your Email"
              {...register("email", {
                required: "Email is required*",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address*",
                },
              })}
            />
          </div>
          {errors.email && <span className="error">{errors.email.message}</span>}

          <div className="input-group">
            <FaCommentDots className="icon" />
            <textarea
              rows="4"
              placeholder="Your Message"
              {...register("message", {
                required: "Message is required*",
                minLength: {
                  value: 10,
                  message: "Message must be at least 10 characters*",
                },
              })}
            ></textarea>
          </div>
          {errors.message && <span className="error">{errors.message.message}</span>}

          <button type="submit" className="signup-btn">Send Message</button>
        </form>
      </div>
    </div>
  );
};
