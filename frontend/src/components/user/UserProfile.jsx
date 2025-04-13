import React, { useEffect, useState } from "react";
import { Container, Grid, Card, Typography, Link, Chip, CircularProgress, Avatar, Button } from "@mui/material";
import { Verified, Mail, Phone, LocationOn } from "@mui/icons-material";
import { Rating } from "@mui/material"; // Import Rating component
import axios from "axios";
import Navbar from "../common/Navbar";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const userId = localStorage.getItem("id");
  const [profile, setProfile] = useState(null);
  const [detail, setDetail] = useState({});
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  const fetchUserData = async () => {
    try {
      const [userRes, skillRes, reviewsRes] = await Promise.all([
        axios.get(`/user/${userId}`),
        axios.get(`/skill/${userId}`),
        axios.get(`/getreview/${userId}`),
      ]);

      setDetail(userRes.data.data);
      setProfile(skillRes.data.data.length > 0 ? skillRes.data.data[0] : null);
      setReviews(reviewsRes.data.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [userId]);

  if (!profile) return <Typography sx={{ textAlign: "center", mt: 4 }}><CircularProgress /></Typography>;

  const getAvatarUrl = (gender) => {
    const avatarMap = {
      male: "https://via.placeholder.com/100/0000FF/808080?Text=Male",
      female: "https://via.placeholder.com/100/FF69B4/FFFFFF?Text=Female",
      default: "https://via.placeholder.com/100/808080/FFFFFF?Text=User",
    };
    return avatarMap[gender] || avatarMap.default;
  };

  const highestRating = reviews.reduce((max, review) => (review.stars > max.stars ? review : max), reviews[0] || null);

  return (
    <>
      <Navbar />
      <Container maxWidth="md" sx={{ mt: 3 }}>
        {/* Profile Card */}
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
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={12} sm={4} md={3} textAlign="center">
              <Avatar
                src={getAvatarUrl(detail.gender)}
                sx={{
                  width: { xs: 90, sm: 110 },
                  height: { xs: 90, sm: 110 },
                  margin: "auto",
                  border: "4px solid white",
                }}
              />
            </Grid>

            <Grid item xs={12} sm={8} md={9}>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {detail.full_name || "User Name"} 
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

              {/* User Ratings Section */}
              <Grid item xs={12} sx={{ mt: 2 }}>
                <Typography variant="body2" sx={{ color: "#e0e0e0", fontWeight: "bold" }}>
                  User Ratings:
                </Typography>

                {!highestRating ? (
                  <Typography variant="body2" sx={{ color: "#e0e0e0" }}>
                    No ratings yet.
                  </Typography>
                ) : (
                  <div style={{ marginBottom: "16px" }}>
                    <Rating
                      value={highestRating.stars}
                      readOnly
                      precision={0.5}
                      size="small"
                      sx={{ color: "#FFD700", mr: 1 }}
                    />
                    <Typography variant="body2" sx={{ color: "#e0e0e0" }}>
                      {highestRating.review}
                    </Typography>
                  </div>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Card>

        {/* Skills & Education Section */}
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
          {profile.proficientSkills?.length > 0 ? (
            profile.proficientSkills.map((skill, index) => (
              <Chip key={index} label={skill} sx={{ m: 0.5 }} />
            ))
          ) : (
            <Typography variant="body2">No proficient skills added.</Typography>
          )}

          <Typography variant="h6" sx={{ mt: 2 }}>Skills to Learn</Typography>
          {profile.skillsToLearn?.length > 0 ? (
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
                {profile.education.startDate ? new Date(profile.education.startDate).toLocaleDateString() : "N/A"} -{" "}
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
