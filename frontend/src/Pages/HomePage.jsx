import React, { useState } from "react";
import { Container, Typography, Button, Box, Grid, Card, Avatar, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { Bounce, ToastContainer } from "react-toastify";
import { LocationOn, Mail, Phone, Verified,  } from "@mui/icons-material";
import { Chip } from "@mui/material"; // ✔ correct

import { useEffect } from "react";
import axios from "axios";

const HomePage = () => {
  const navigate = useNavigate();
  const [details, setdetails] = useState([])
  const loggedInUserId = localStorage.getItem("id");
  const [selectedSkill, setSelectedSkill] = useState("");
 const [allSkills, setAllSkills] = useState([]);



  const getDetails = async () => {
    try {
      const res = await axios.get("/allskill");
      const data = res.data.data
      setdetails(data);

      const skills = Array.from(
        new Set(
          data.flatMap((item) => item.proficientSkills || [])
        )
      );
      setAllSkills(skills);

    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  useEffect(() => {
    getDetails();
  }, [])

  return (
    <Box sx={{ bgcolor: "#f4f4f4", minHeight: "100vh", display: "flex", flexDirection: "column" }}>

      <Navbar />
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
      <Box sx={{ flexGrow: 1 }}>
      {/* Hero Section */}
      <Container sx={{ textAlign: "center", paddingTop: 8 }}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Welcome to Skill Exchange
        </Typography>
        <Typography variant="h6" color="textSecondary" sx={{ maxWidth: "600px", margin: "auto" }}>
          Learn, Teach, and Connect with like-minded individuals worldwide.
        </Typography>
      </Container>

      <Container sx={{ mt: 4 }}>
        <FormControl fullWidth sx={{ maxWidth: 300, margin: "auto" }}>
          <InputLabel>Filter by Skill</InputLabel>
          <Select
            value={selectedSkill}
            label="Filter by Skill"
            onChange={(e) => setSelectedSkill(e.target.value)}
          >
            
            <MenuItem value="">All Skills</MenuItem>
            {allSkills.map((skill, idx) => (
              <MenuItem key={idx} value={skill}>
                {skill}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Container>



      {/* profile card */}
      <Container sx={{ mt: 6 }} >
        <Grid container spacing={3} justifyContent="center" sx={{ mt: 6 }}>
          {details
            .filter((detail) => detail.userId._id !== loggedInUserId)
            .filter((detail) =>
              selectedSkill === "" || (detail.proficientSkills || []).includes(selectedSkill)
            )
            .map((detail) => (



              <Grid item xs={12} sm={6} md={4} key={detail.id} sx={{ display: "flex" }}>
                <Card
                  sx={{
                    p: 3,
                    width: "100%",
                    height: "100%",
                    borderRadius: 3,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    background: "#FFFFFF",
                    color: "#2C3E50",
                    boxShadow: 3,
                    textAlign: "center",
                    transition: "0.3s",
                    "&:hover": { boxShadow: 6 },
                  }}
                >
                  <Box sx={{ flexGrow: 1 }}>
                    <Avatar
                      src={detail.userId.profile_image}
                      sx={{ width: 90, height: 90, margin: "auto", border: "3px solid #3498DB" }}
                    />

                    <Typography variant="h6" sx={{ fontWeight: "bold", mt: 2 }}>
                      {detail.userId.full_name || "User Name"} <Verified sx={{ color: "#3498DB", fontSize: 18 }} />
                    </Typography>

                    <Typography variant="body2" sx={{ color: "#555", mt: 1 }}>
                      <Mail sx={{ fontSize: 16, verticalAlign: "middle", color: "#3498DB" }} /> {detail.userId.email}
                    </Typography>

                    <Typography variant="body2" sx={{ color: "#555", mt: 0.5 }}>
                      <Phone sx={{ fontSize: 16, verticalAlign: "middle", color: "#27AE60" }} /> {detail.userId.phone}
                    </Typography>


                    {/* Proficient Skills */}
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body2" sx={{ color: "#555", fontWeight: 500 }}>
                        <Verified sx={{ fontSize: 18, verticalAlign: "middle", color: "#27AE60", mr: 1 }} />
                        Proficient Skills:
                      </Typography>

                      <Box sx={{ mt: 1, display: "flex", flexWrap: "wrap", gap: 1, justifyContent: "center" }}>
                        {detail.proficientSkills?.slice(0, 3).map((skill, index) => (
                          <Chip
                            key={index}
                            label={skill}
                            color="primary"
                            variant="outlined"
                            icon={<Verified sx={{ fontSize: 18 }} />}
                          />
                        ))}
                      </Box>
                    </Box>
                  </Box>
                  {/* Buttons */}
                  <Grid container spacing={1} sx={{ mt: 2 }} justifyContent="center">
                    <Grid item>
                      <Button
                        variant="contained"
                        sx={{
                          bgcolor: "#3498DB",
                          color: "white",
                          fontWeight: "bold",
                          "&:hover": { bgcolor: "#2980B9" },
                        }}
                        onClick={() => navigate(`/profile/${detail.userId._id}`)}
                      >
                        View Profile
                      </Button>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Container>

      </Box>
      {/* Movable Sections (Swiper Slider) */}
      <Container sx={{ marginTop: 10, mb: 6 }}>
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop={true}
          spaceBetween={20}
          slidesPerView={1}
        >
          <SwiperSlide>
            <Box sx={{ bgcolor: "#ffeb3b", padding: 4, borderRadius: 2, textAlign: "center" }}>
              <Typography variant="h5" fontWeight="bold">📚 Learn from Experts</Typography>
              <Typography variant="body1">Find top mentors in various fields.</Typography>
            </Box>
          </SwiperSlide>

          <SwiperSlide>
            <Box sx={{ bgcolor: "#03a9f4", padding: 4, borderRadius: 2, textAlign: "center", color: "white" }}>
              <Typography variant="h5" fontWeight="bold">🧑‍🏫 Teach Your Skills</Typography>
              <Typography variant="body1">Share your knowledge and help others grow.</Typography>
            </Box>
          </SwiperSlide>

          <SwiperSlide>
            <Box sx={{ bgcolor: "#8bc34a", padding: 4, borderRadius: 2, textAlign: "center", color: "white" }}>
              <Typography variant="h5" fontWeight="bold">🌍 Global Community</Typography>
              <Typography variant="body1">Connect with learners and experts worldwide.</Typography>
            </Box>
          </SwiperSlide>

          <SwiperSlide>
            <Box sx={{ bgcolor: "#e91e63", padding: 4, borderRadius: 2, textAlign: "center", color: "white" }}>
              <Typography variant="h5" fontWeight="bold">💼 Job & Internship Opportunities</Typography>
              <Typography variant="body1">Enhance your career with real-world projects.</Typography>
            </Box>
          </SwiperSlide>
        </Swiper>
      </Container>
    </Box>
  );
};

export default HomePage;
