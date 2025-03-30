import React from "react";
import { useForm } from "react-hook-form";
import { FaUser, FaEnvelope, FaLock, FaPhoneAlt } from "react-icons/fa";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import "./signup.css";
import axios from "axios";
import { Bounce, toast } from "react-toastify";

export const SignupUser = () => {

  const location = useLocation();
  const role = location.state?.role || "user";
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = async(data) => {
    data.role = role;
    console.log(data);
    
    try{
      const res = await axios.post("/signup",data)
      console.log(res) //axiosobjec
      // console.log(res.data) //api response...
     
      if(res.status===200){
        navigate(`/login/${role}`);
        toast.success('Successfully signed up!', {
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

    }catch(error){
      toast.error('Signup failed! Please try again.', {
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
    <div className="signup-container">
      <div className="signup-box">
        <h2>Sign Up As a User</h2>
        <p>Create your account to get started.</p>
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="input-group">
            <FaUser className="icon" />
            <input
              type="text"
              placeholder="Name"
              {...register("name", { required: "Name is required*" })}
            />
          </div>
          {errors.name && <span className="error">{errors.name.message}</span>}

          <div className="input-group">
            <FaEnvelope className="icon" />
            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: "Email is required*" })}
            />
          </div>
          {errors.email && (
            <span className="error">{errors.email.message}</span>
          )}

          <div className="input-group">
            <FaLock className="icon" />
            <input
              type="password"
              placeholder="Password"
              {...register("password", { required: "Password is required*" })}
            />
          </div>
          {errors.password && (
            <span className="error">{errors.password.message}</span>
          )}

          <div className="input-group">
            <FaPhoneAlt className="icon"  />
            <input
              type="text"
              placeholder="Contact"
              {...register("phonenumber", { required: "Contact number is required*" })}
            />
          </div>
          {errors.phonenumber && (
            <span className="error">{errors.phonenumber.message}</span>
          )}

          <button type="submit" className="signup-btn">
            Sign Up
          </button>
        </form>
        <p className="login-link">
          Already have an account? <Link to="/login/user">Login</Link>
        </p>
      </div>
    </div>
  );
};
