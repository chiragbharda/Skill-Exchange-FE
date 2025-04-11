import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../common/signup.css";
import LandingNavbar from "../../Pages/LandingNavbar";

const Signup = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const submitHandler = async (data) => {
    try {
      data.roleId = "67bd464eeaccb41ab29226ff";
      // data.roleId = "67c684f33df482ca021b5fca";

      const loadingToast = toast.info("🔄 Registering user...", {
        position: "top-center",
        autoClose: false,
        theme: "dark",
      });

      const res = await axios.post("/user", data);
      toast.dismiss(loadingToast);

      if (res.status === 201) {
        toast.success("🎉 User registered successfully!", {
          position: "top-center",
          autoClose: 2000,
          theme: "dark",
          transition: Bounce,
        });

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        toast.error("❌ User registration failed. Please try again.");
      }
    } catch (error) {
      toast.dismiss();
      toast.error("⚠️ Error: " + (error.response?.data?.message || error.message), {
        position: "top-center",
        autoClose: 4000,
        theme: "dark",
      });
    }
  };

  return (
    <>
    <LandingNavbar></LandingNavbar>
    <div className="signup-container">
      <ToastContainer position="top-center" autoClose={5000} theme="dark" transition={Bounce} />

      <div className="signup-card">
        <h2 className="signup-title">Create an Account</h2>

        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="form-group">
            <label htmlFor="full_name">Full Name</label>
            <input id="full_name" type="text" className="form-input" placeholder="Enter your full name"
              {...register("full_name", { required: true })} />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input id="email" type="email" className="form-input" placeholder="Enter your email"
              {...register("email", { required: true })} />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" className="form-input" placeholder="Create a password"
              {...register("password", { required: true })} />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input id="phone" type="text" className="form-input" placeholder="Enter your phone number"
              {...register("phone")} />
          </div>

          {/* <div className="form-group">
            <label htmlFor="specification">Specification</label>
            <select id="specification" className="form-input" {...register("specification", { required: true })}>
              <option value="">Select an option</option>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="employee">Employee</option>
            </select>
          </div> */}

          <button type="submit" className="signup-button">Sign Up</button>
        </form>
      </div>
    </div>
    </>
  );
};

export default Signup;
