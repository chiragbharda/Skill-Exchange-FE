import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../common/signup.css";
import LandingNavbar from "../../Pages/LandingNavbar";

const Signup = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user is already logged in by looking for the authToken in localStorage
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true); // Set user as authenticated if token is found
    }
  }, []);

  const submitHandler = async (data) => {
    try {
      data.roleId = "67bd464eeaccb41ab29226ff"; // Role ID for the user

      // Show loading toast while registering user
      const loadingToast = toast.info("🔄 Registering user...", {
        position: "top-center",
        autoClose: false,
        theme: "dark",
      });

      const res = await axios.post("/user", data);
      toast.dismiss(loadingToast); // Dismiss the loading toast

      if (res.status === 201) {
        toast.success("🎉 User registered successfully!", {
          position: "top-center",
          autoClose: 2000,
          theme: "dark",
          transition: Bounce,
        });

        // Redirect to login page after successful registration
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

  const handleLoginRedirect = () => {
    navigate("/login"); // Redirect to the login page
  };

  return (
    <>
      <LandingNavbar />
      <div className="signup-container">
        <ToastContainer position="top-center" autoClose={5000} theme="dark" transition={Bounce} />

        <div className="signup-card">
          <h2 className="signup-title">Create an Account</h2>

          {isAuthenticated ? (
            // Show a message if the user is already signed up
            <div className="already-registered">
              <p>You're already signed up. Please log in.</p>
            </div>
          ) : (
            // Show the signup form if the user is not authenticated
            <form onSubmit={handleSubmit(submitHandler)}>
              <div className="form-group">
                <label htmlFor="full_name">Full Name</label>
                <input
                  id="full_name"
                  type="text"
                  className="form-input"
                  placeholder="Enter your full name"
                  {...register("full_name", { required: "Full name is required" })}
                />
                {errors.full_name && <span className="error-message">{errors.full_name.message}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  className="form-input"
                  placeholder="Enter your email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && <span className="error-message">{errors.email.message}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  className="form-input"
                  placeholder="Create a password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                {errors.password && <span className="error-message">{errors.password.message}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  id="phone"
                  type="text"
                  className="form-input"
                  placeholder="Enter your phone number"
                  {...register("phone", {
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Phone number must be 10 digits",
                    },
                  })}
                />
                {errors.phone && <span className="error-message">{errors.phone.message}</span>}
              </div>

              <button type="submit" className="signup-button">Sign Up</button>
            </form>
          )}

          <div className="login-redirect">
            <p>Already have an account? </p>
            <button type="button"  style={{
                background: "none",
                border: "none",
                color: "lightblue",
                cursor: "pointer",
                textDecoration: "underline",
              }} onClick={handleLoginRedirect}>
              Log in
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
