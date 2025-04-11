import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LandingNavbar from "../../Pages/LandingNavbar";

export const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const submitHandler = async (data) => {
    try {
      const obj = {
        token: token,
        password: data.password,
      };

      const loadingToast = toast.info("🔄 Resetting password...", {
        position: "top-center",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });

      await axios.post("/user/resetpassword", obj);
      toast.dismiss(loadingToast);

      toast.success("✅ Password reset successful!", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
        transition: Bounce,
      });

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      toast.dismiss();
      toast.error("❌ Password reset failed. Please try again.", {
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
          <h1 className="signup-title">Reset Password</h1>
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="form-group">
              <label>New Password</label>
              <input
                type="password"
                className="form-input"
                {...register("password", { required: true })}
                placeholder="Enter new password"
              />
            </div>

            <div className="button-group">
              <button type="button" className="back-button" onClick={() => navigate("/login")}>
                Back to Login
              </button>
              <button type="submit" className="signup-button">
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
