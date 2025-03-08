import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../common/signup.css";

const Signup = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const nextStep = () => setStep(2);
  const prevStep = () => setStep(1);

  const submitHandler = async (data) => {
    try {
      data.roleId = "67bd464eeaccb41ab29226ff";

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
    <div className="signup-container">
      <ToastContainer position="top-center" autoClose={5000} theme="dark" transition={Bounce} />

      <div className="signup-card">
        <h2 className="signup-title">Create an Account</h2>

        <form onSubmit={handleSubmit(submitHandler)}>
          {step === 1 && (
            <div className="form-section">
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

              <div className="form-group">
                <label htmlFor="bio">Bio</label>
                <textarea id="bio" className="form-input" placeholder="Tell us about yourself"
                  {...register("bio")} />
              </div>

              <button type="button" className="next-button" onClick={nextStep}>Next →</button>
            </div>
          )}

          {step === 2 && (
            <div className="form-section">
              <div className="form-group">
                <label htmlFor="skills_offered">Skills Offered</label>
                <input id="skills_offered" type="text" className="form-input" placeholder="Skills you can teach"
                  {...register("skills_offered")} />
              </div>

              <div className="form-group">
                <label htmlFor="skills_needed">Skills Needed</label>
                <input id="skills_needed" type="text" className="form-input" placeholder="Skills you want to learn"
                  {...register("skills_needed")} />
              </div>

              <div className="form-group">
                <label htmlFor="profile_image">Profile Image</label>
                <input id="profile_image" type="text" className="form-input" placeholder="Profile image URL"
                  {...register("profile_image")} />
              </div>

              <div className="button-group">
                <button type="button" className="back-button" onClick={prevStep}>← Back</button>
                <button type="submit" className="signup-button">Sign Up</button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Signup;
