import React from "react";
import { useForm } from "react-hook-form";
import { FaEnvelope, FaLock } from "react-icons/fa";
import "./login.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Bounce, toast } from "react-toastify";

export const LoginBusinessOwner = () => {
  const { role } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = async (data) => {
    try {
      data.role = role;
      const res = await axios.post("/login", data);
      console.log(res); //axiosobjec
      console.log(res.data); //api response...

      if (res.status === 200) {
        //user added..
        toast.success("Login Successful!", {
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
        // save role dat in local storage
        console.log(res.data.data.role);
        localStorage.setItem("role", res.data.data.role);
        localStorage.setItem("id", res.data.data._id);
        window.dispatchEvent(new Event("storage")); // Notify Navbar to update

        //naviget
        navigate("/busineessownerrolepage");
      }
    } catch (error) {
      toast.error("Login failed! Please try again.", {
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
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>
        <p>Welcome back! Please login to your account.</p>
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="input-group">
            <FaEnvelope className="input-icon" />
            <input
              type="text"
              placeholder="Email"
              {...register("email", { required: "Email is required*" })}
            />
          </div>
          {errors.email && (
            <span className="error">{errors.email.message}</span>
          )}

          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type="password"
              placeholder="Password"
              {...register("password", { required: "Password is required*" })}
            />
          </div>
          {errors.password && (
            <span className="error">{errors.password.message}</span>
          )}

          <button type="submit" className="auth-btn">
            Login
          </button>
        </form>
        <p className="auth-footer">
          Don't have an account? <Link to="/signup/businessowner">Sign up</Link>
        </p>
      </div>
    </div>
  );
};
