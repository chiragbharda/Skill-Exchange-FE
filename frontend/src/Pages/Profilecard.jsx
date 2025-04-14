import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  Typography,
  Link,
  Chip,
  CircularProgress,
  Avatar,
  Button,
  Box,
} from "@mui/material";
import { Verified, Mail, Phone, LocationOn } from "@mui/icons-material";
import axios from "axios";
import Navbar from "../components/common/Navbar";
import { useParams, useNavigate } from "react-router-dom";

const Profile = () => {
  const {userId} = useParams();
  const loggedInUserId = localStorage.getItem("id");
//   console.log(userId)
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [connectLoading, setConnectLoading] = useState(false);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`/skill/${userId}`);
      // console.log(res.data.data[0].userId._id)
      if (res.data.data.length > 0) {
        setProfile(res.data.data[0]);
      } else {
        setProfile(null);
      }
    } catch (error) {
      console.error("Error fetching skill profile:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [userId]);

  const connectHandler = async () => {
    try {
      setConnectLoading(true);
  
      const senderId = localStorage.getItem("id"); // logged-in user
      const receiverId = profile?.userId?._id;     // viewed user
  
      // Log to check
      console.log("Sender ID:", senderId);
      console.log("Receiver ID:", receiverId);
  
      if (!senderId || !receiverId || senderId.length !== 24 || receiverId.length !== 24) {
        alert("Invalid user ID format");
        return;
      }
  
      const { data } = await axios.post("/request/create", {
        senderId,
        receiverId,
      });
  
      toast.success(data.message);
    } catch (error) {
      toast.error("Failed to send connection request.");
      console.error("Connection error:", error);
    } finally {
      setConnectLoading(false);
    }
  };
  

  if (loading || !profile) {
    return (
      <Typography sx={{ textAlign: "center", mt: 4 }}>
        <CircularProgress />
      </Typography>
    );
  }

  const isOwnProfile = userId === loggedInUserId;

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
                src={profile.userId.profile_image}
                sx={{
                  width: 110,
                  height: 110,
                  margin: "auto",
                  border: "4px solid white",
                }}
              />
            </Grid>
            <Grid item xs={12} md={9}>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {profile.userId.full_name || "User Name"}{" "}
              </Typography>
              <Typography variant="body2" sx={{ color: "#e0e0e0", mt: 1 }}>
                <Mail sx={{ fontSize: 16, verticalAlign: "middle" }} />{" "}
                {profile.userId.email}
              </Typography>
              <Typography variant="body2" sx={{ color: "#e0e0e0", mt: 0.5 }}>
                <Phone sx={{ fontSize: 16, verticalAlign: "middle" }} />{" "}
                {profile.userId.phone}
              </Typography>
              <Typography variant="body2" sx={{ color: "#e0e0e0", mt: 0.5 }}>
                <LocationOn sx={{ fontSize: 16, verticalAlign: "middle" }} />{" "}
                {profile.userId.specification || "N/A"}
              </Typography>

              {!isOwnProfile && (
                <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={connectHandler}
                    disabled={connectLoading}
                  >
                    {connectLoading ? "Connecting..." : "Connect"}
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => navigate(`/report/${profile.userId._id}`)}
                  >
                    Report
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => navigate(`/review/${profile.userId._id}`)}
                  >
                    Rate
                  </Button>
                </Box>
              )}
            </Grid>
          </Grid>
        </Card>

        <Card sx={{ p: 3, mb: 3, borderRadius: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            {profile.userId.email || "User Email"}
          </Typography>

          <Typography sx={{ mt: 1 }}>
            <Link href={profile.linkedin} target="_blank" rel="noopener">
              LinkedIn
            </Link>{" "}
            |{" "}
            <Link href={profile.github} target="_blank" rel="noopener">
              GitHub
            </Link>{" "}
            |{" "}
            <Link href={profile.portfolio} target="_blank" rel="noopener">
              Portfolio
            </Link>
          </Typography>

          <Typography variant="h6" sx={{ mt: 2 }}>
            Proficient Skills
          </Typography>
          {profile.proficientSkills.length > 0 ? (
            profile.proficientSkills.map((skill, index) => (
              <Chip key={index} label={skill} sx={{ m: 0.5 }} />
            ))
          ) : (
            <Typography variant="body2">No proficient skills added.</Typography>
          )}

          <Typography variant="h6" sx={{ mt: 2 }}>
            Skills to Learn
          </Typography>
          {profile.skillsToLearn.length > 0 ? (
            profile.skillsToLearn.map((skill, index) => (
              <Chip
                key={index}
                label={skill}
                color="secondary"
                sx={{ m: 0.5 }}
              />
            ))
          ) : (
            <Typography variant="body2">No skills to learn added.</Typography>
          )}

          <Typography variant="h6" sx={{ mt: 2 }}>
            Education
          </Typography>
          {profile.education ? (
            <>
              <Typography variant="body2">
                {profile.education.institution}
              </Typography>
              <Typography variant="body2">
                {profile.education.degree} ({profile.education.grade})
              </Typography>
              <Typography variant="body2">
                {profile.education.startDate
                  ? new Date(profile.education.startDate).toLocaleDateString()
                  : "N/A"}{" "}
                -{" "}
                {profile.education.endDate
                  ? new Date(profile.education.endDate).toLocaleDateString()
                  : "N/A"}
              </Typography>
            </>
          ) : (
            <Typography variant="body2">
              No education details available.
            </Typography>
          )}
        </Card>
      </Container>
    </>
  );
};

export default Profile;
