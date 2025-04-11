import React, { useEffect, useState } from "react";
import { Container, Grid, Card, Typography, Link, Chip, CircularProgress, Avatar, Button } from "@mui/material";
import { Verified, Mail, Phone, LocationOn } from "@mui/icons-material";
import axios from "axios";
import Navbar from "../common/Navbar";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const userId = localStorage.getItem("id");
  const [profile, setProfile] = useState(null);
  const [detail, setDetail] = useState({});
   const navigate = useNavigate();

  const getDetails = async () => {
    try {
      const res = await axios.get("/user/" + userId);
      setDetail(res.data.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    getDetails();
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`/skill/${userId}`);
        // console.log("Profile API Response:", res.data.data);

        if (res.data.data.length > 0) {
          setProfile(res.data.data[0]);
        } else {
          setProfile(null);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [userId]);

  if (!profile) return <Typography sx={{ textAlign: "center", mt: 4 }}><CircularProgress /></Typography>;

  return (
    <>

      <Navbar />
      <Container maxWidth="md" sx={{ mt: 3 }}>
        <Card
          sx={{
            p: 3,
            mb: 3,
            borderRadius: 3,
            background: "#2C3E50",
            color: "white",
            boxShadow: 5,
          }}
        >
          <Grid container alignItems="center">
            <Grid item xs={12} md={3} textAlign="center">
              <Avatar
                src="https://via.placeholder.com/100"
                sx={{ width: 110, height: 110, margin: "auto", border: "4px solid white" }}
              />
            </Grid>
            <Grid item xs={12} md={9}>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {detail.full_name || "User Name"} <Verified sx={{ color: "#FFD700", fontSize: 22 }} />
              </Typography>
              <Typography variant="body2" sx={{ color: "#e0e0e0", mt: 1 }}>
                <Mail sx={{ fontSize: 16, verticalAlign: "middle" }} /> {detail.email}
              </Typography>
              <Typography variant="body2" sx={{ color: "#e0e0e0", mt: 0.5 }}>
                <Phone sx={{ fontSize: 16, verticalAlign: "middle" }} /> {detail.phone}
              </Typography>
              <Typography variant="body2" sx={{ color: "#e0e0e0", mt: 0.5 }}>
                <LocationOn sx={{ fontSize: 16, verticalAlign: "middle" }} /> {detail.specification}
              </Typography>
            </Grid>
          </Grid>
        </Card>

        <Card sx={{ p: 3, mb: 3, borderRadius: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            {profile.userId?.email || "User Email"}
          </Typography>
          <Typography sx={{ mt: 1 }}>
            <Link href={profile.linkedin} target="_blank" rel="noopener">LinkedIn</Link>{" | "}
            <Link href={profile.github} target="_blank" rel="noopener">GitHub</Link>{" | "}
            <Link href={profile.portfolio} target="_blank" rel="noopener">Portfolio</Link>
          </Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>Proficient Skills</Typography>
          {profile.proficientSkills.length > 0 ? (
            profile.proficientSkills.map((skill, index) => (
              <Chip key={index} label={skill} sx={{ m: 0.5 }} />
            ))
          ) : (
            <Typography variant="body2">No proficient skills added.</Typography>
          )}
          <Typography variant="h6" sx={{ mt: 2 }}>Skills to Learn</Typography>
          {profile.skillsToLearn.length > 0 ? (
            profile.skillsToLearn.map((skill, index) => (
              <Chip key={index} label={skill} color="secondary" sx={{ m: 0.5 }} />
            ))
          ) : (
            <Typography variant="body2">No skills to learn added.</Typography>
          )}
          <Typography variant="h6" sx={{ mt: 2 }}>Education</Typography>
          {profile.education ? (
            <>
              <Typography variant="body2">{profile.education.institution}</Typography>
              <Typography variant="body2">{profile.education.degree} ({profile.education.grade})</Typography>
              <Typography variant="body2">
                {profile.education.startDate ? new Date(profile.education.startDate).toLocaleDateString() : "N/A"} - {" "}
                {profile.education.endDate ? new Date(profile.education.endDate).toLocaleDateString() : "N/A"}
              </Typography>
              <br />
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#3498DB",
                  color: "white",
                  fontWeight: "bold",
                  "&:hover": { bgcolor: "#2980B9" },
                }}
                onClick={() => navigate(`/updateprofile`)}
              >
                Update Profile
              </Button>
            </>
          ) : (
            <Typography variant="body2">No education details available.</Typography>
          )}
        </Card>

      </Container>
    </>
  );
};

export default Profile;
