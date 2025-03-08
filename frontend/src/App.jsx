import { Routes, Route, useLocation } from "react-router-dom";
import UserSidebar from "./components/user/UserSidebar";
import "./assets/css/adminlte.css";
import "./assets/css/adminlte.min.css";
import axios from "axios";
import LandingPage from "./Pages/Landing";
import Signup from "./components/common/signup";
import { Login } from "./components/common/Login";
import SkillListing from "./components/user/SkillListing";
import PrivateRoutes from "./hooks/PrivetRoute";


function App() {
  axios.defaults.baseURL = "http://localhost:3000"
  // const location = useLocation();

  // useEffect(() => {
  //   if (location.pathname === "/login" || location.pathname === "/signup") {
  //     document.body.className = ""; // Remove the unwanted class for login and signup
  //   } else {
  //     document.body.className =
  //       "layout-fixed sidebar-expand-lg bg-body-tertiary sidebar-open app-loaded";
  //   }
  // }, [location.pathname]);
  return (
    <Routes>
      <Route path="" element={<PrivateRoutes />}>
        {/* <Route path="/auth" element={<AuthPage />} /> */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashbord" element={<UserSidebar />} >
        <Route path="skillListing" element={<SkillListing />} />
      </Route>
      </Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/login" element={<Login />}></Route>
    </Routes>
  );
}

export default App;
