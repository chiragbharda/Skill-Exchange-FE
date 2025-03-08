import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const submitHandler = async (data) => {
    try {
    
      const loadingToast = toast.info("🔄 Logging in...", {
        position: "top-center",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });

      const res = await axios.post("/user/login", data);
      toast.dismiss(loadingToast); 

      if (res.status === 200) {
        toast.success("🎉 Login Successful!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
          transition: Bounce,
        });

        localStorage.setItem("id", res.data.data._id);
        localStorage.setItem("role", res.data.data.roleId.role);

        setTimeout(() => {
          if (res.data.data.roleId.role === "USER") {
            navigate("/dashbord");
          }
          // if(res.data.data.roleId.name ==="Admin"){
          //   navigate("/admin") 
          // }
        }, 2000);
      }
    } catch (error) {
      toast.dismiss();
      toast.error("❌ Login Failed! Invalid credentials.", {
        position: "top-center",
        autoClose: 4000,
        theme: "dark",
      });
    }
  };

  return (
    <div className="signup-container">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />

      <div className="signup-card">
        <h1 style={{ color: "white" }}>LOGIN USER</h1>
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="form-group">
            <label>EMAIL</label>
            <input
              type="text"
              className="form-input"
              {...register("email")}
              placeholder="Enter email"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-input"
              {...register("password")}
              placeholder="Enter password"
            />
          </div>
          <button type="submit" className="signup-button">
            Submit
          </button>
        </form>
        <p style={{ color: "white", marginTop: "10px" }}>
          Not signed up yet?{" "}
          <button
            className="signup-link"
            onClick={() => navigate("/signup")}
            style={{
              background: "none",
              border: "none",
              color: "lightblue",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};
