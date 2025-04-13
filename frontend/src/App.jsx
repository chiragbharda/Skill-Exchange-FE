import { Routes, Route, useLocation } from "react-router-dom";
import axios from "axios";
import LandingPage from "./Pages/Landing";
import Signup from "./components/common/signup";
import { Login } from "./components/common/Login";
import SkillListing from "./components/user/SkillListing";
import PrivateRoutes from "./hooks/PrivetRoute";
import Navbar from "./components/common/Navbar";
import UserProfile from "./components/user/UserProfile"
import HomePage from "./Pages/HomePage";
// import Message from "./components/messaage/Message"
import Profile from "./Pages/Profilecard";
import DashboardPage from "./components/user/DashbordPage";
import { ResetPassword } from "./components/common/Resetpassword";
import  AddSkill  from "./components/user/Addskill";
import  UpdateProfile  from "./Pages/UpdateProfile";
import {ForgetPassword } from "./components/common/ForgetPassword";
// import { RequestSkill } from "./components/user/RequestSkill";
import MySkills from "./components/user/MySkill";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminHomepage from "./components/admin/AdminHomepage";
import AdminNavbar from "./components/admin/AdminNavbar";
import ReviewPage from "./Pages/Reviewpage";
import ChatPage from "./Pages/Chat";
import Alluser from "./components/admin/Alluser";
import ReportPage from "./Pages/ReportPgae";
import AdminReportsPage from "./components/admin/AdminReportPage";
// import UserNotification from "./components/layouts/NotificationPage";


// import { Explore } from "@mui/icons-material";
// import Sidebar from "./components/common/Sidebar";
// import UserDashboard from "./components/user/UserDashbord";


function App() {
  axios.defaults.baseURL = "http://localhost:3000"

  return (
    <Routes>

      <Route path="/" element={<LandingPage />} />
      <Route path="" element={<PrivateRoutes />}>
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/dashboard2" element={<DashboardPage />} />
        <Route path="/addskill" element={<AddSkill />} />
        <Route path="/updateprofile" element={<UpdateProfile />} />
        <Route path="/chat" element={<ChatPage/>} />
        {/* <Route path="/requestskill" element={<RequestSkill />} /> */}
        {/* <Route path="/notification" element={<UserNotification/>}></Route> */}
        <Route path="/navbar" element={<Navbar />} />
        
        <Route path="/profile/:userId" element={<Profile/>} />
        <Route path="/review/:userId" element={<ReviewPage/>} />
        {/* <Route path="/sidebar" element={<Sidebar />} /> */}
        {/* <Route path="/navbar" element={<Navbar />} > */}
        <Route path="/admin" element={<AdminNavbar />} />
        <Route path="/allusers" element={<Alluser />} />
        <Route path="/allreport" element={<AdminReportsPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/ahomepage" element={<AdminHomepage />} />
        
        <Route path="/HomePage" element={<HomePage />}/>
        <Route path="/report/:userId" element={<ReportPage/>}></Route>
          {/* <Route path="skillListing" element={<SkillListing />}/> */}
          {/* </Route> */}
        {/* </Route> */}
      </Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/resetpassword/:token" element={<ResetPassword />}></Route>
      <Route path= "/forgotpassword" element={<ForgetPassword/>}></Route>
    </Routes>

  );
}

export default App;
