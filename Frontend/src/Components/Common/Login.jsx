import React from "react";
import { useForm } from "react-hook-form";
import { FaEnvelope, FaLock } from "react-icons/fa";
import "./login.css"
import { Link } from "react-router-dom";

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = (data) => {
    console.log(data);
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
          {errors.email && <span className="error">{errors.email.message}</span>}

          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type="password"
              placeholder="Password"
              {...register("password", { required: "Password is required*" })}
            />
          </div>
          {errors.password && <span className="error">{errors.password.message}</span>}

          {/* <select {...register("role", { required: "Please select a role" })} className="role-select">
            <option value="">Select Role</option>
            <option value="organizer">Event Organizer</option>
            <option value="user">User</option>
          </select>
          {errors.role && <span className="error">{errors.role.message}</span>} */}

          <button type="submit" className="auth-btn">Login</button>
        </form>
        <p className="auth-footer">Don't have an account? <Link to="/signup">Sign up</Link></p>
      </div>
    </div>
  );
};
