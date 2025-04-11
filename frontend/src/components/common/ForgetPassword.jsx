import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LandingNavbar from "../../Pages/LandingNavbar";

export const ForgetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const { register, handleSubmit } = useForm();

  const submitHandler = async (data) => {
    try {
      const loadingToast = toast.info("🔄 Processing request...", {
        position: "top-center",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });

      await axios.post("/user/forgotpassword", { email: data.email });
      toast.dismiss(loadingToast);

      toast.success("📩 Reset link sent to your email!", {
        position: "top-center",
        autoClose: 4000,
        theme: "dark",
        transition: Bounce,
      });

      setEmail("");
    } catch (error) {
      toast.dismiss();
      toast.error("❌ Error! Please try again.", {
        position: "top-center",
        autoClose: 4000,
        theme: "dark",
      });
    }
  };

  return (
    <>
      <LandingNavbar />
      <div className="signup-container">
        <ToastContainer />

        <div className="signup-card">
          <h1 className="signup-title">Forgot Password</h1>
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="text"
                className="form-input"
                {...register("email")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>

            <div className="button-group">
              
              <button type="submit" className="signup-button">
                Send Reset Link
              </button>
              <button type="button" className="back-button" onClick={() => navigate("/login")}
                style={{
                  background: "none",
                  border: "none",
                  color: "lightblue",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}>
                Back to Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
