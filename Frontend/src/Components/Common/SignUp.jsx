import React from "react";
import { useForm } from "react-hook-form";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import "./signup.css";
import { Link } from "react-router-dom";

export const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = async(data) => {
    console.log(data);
    // localStorage.setItem("userRole", data.role); // Save role in localStorage
    const res = await axios.post("/signup",data)
    console.log(res) //axiosobjec
    console.log(res.data) //api response...
    if(res.status===201){
   
    }
    else{
     
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Sign Up</h2>
        <p>Create your account to get started.</p>
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="input-group">
            <FaUser className="icon" />
            <input type="text" placeholder="Name" {...register("name", { required: "Name is required*" })} />
          </div>
          {errors.name && <span className="error">{errors.name.message}</span>}

          <div className="input-group">
            <FaEnvelope className="icon" />
            <input type="email" placeholder="Email" {...register("email", { required: "Email is required*" })} />
          </div>
          {errors.email && <span className="error">{errors.email.message}</span>}

          <div className="input-group">
            <FaLock className="icon" />
            <input type="password" placeholder="Password" {...register("password", { required: "Password is required*" })} />
          </div>
          {errors.password && <span className="error">{errors.password.message}</span>}

          {/* <select {...register("role", { required: "Please select a role" })} className="role-select">
            <option value="">Select Role</option>
            <option value="organizer">Event Organizer</option>
            <option value="user">User</option>
          </select>
          {errors.role && <span className="error">{errors.role.message}</span>} */}

          <button type="submit" className="signup-btn">Sign Up</button>
        </form>
        <p className="login-link">Already have an account? <Link to="/">Login</Link></p>
      </div>
    </div>
  );
};

