import React, { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
  Avatar,
} from "@mui/material";
import axios from "axios";
import Navbar from "../components/common/Navbar";


const UpdateProfile = () => {
  const userId = localStorage.getItem("id");
 

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    specification: "",
    linkedin: "",
    github: "",
    portfolio: "",
    institution: "",
    degree: "",
    grade: "",
    startDate: "",
    endDate: "",
  });

  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`/skill/${userId}`);
        const skillData = res.data.data[0];
        console.log(res.data.data[0])

        setFormData({
          full_name: skillData.userId?.full_name || "",
          email: skillData.userId?.email || "",
          phone: skillData.userId?.phone || "",
        //   specification: skillData.userId?.specification || "",
          linkedin: skillData.linkedin || "",
          github: skillData.github || "",
          portfolio: skillData.portfolio || "",
          institution: skillData.education?.institution || "",
          degree: skillData.education?.degree || "",
          grade: skillData.education?.grade || "",
          startDate: skillData.education?.startDate?.substring(0, 10) || "",
          endDate: skillData.education?.endDate?.substring(0, 10) || "",
        });

        setPreview(skillData.userId?.profilePic || null);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [userId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpdate = async () => {
    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    if (profilePic) data.append("profilePic", profilePic);

    try {
      await axios.put(`/user/update/${userId}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Update failed.");
    }
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Paper elevation={4} sx={{ p: 3, borderRadius: 3 }}>
          <Typography variant="h5" gutterBottom>
            Update Profile
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} textAlign="center">
              <Avatar
                src={preview}
                sx={{ width: 100, height: 100, margin: "auto" }}
              />
              <Button variant="outlined" component="label" sx={{ mt: 1 }}>
                Upload Photo
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </Button>
            </Grid>

            {/* Basic Info */}
            {[
              "full_name",
              "email",
              "phone",
            //   "specification",
              "linkedin",
              "github",
              "portfolio",
            ].map((field) => (
              <Grid item xs={12} key={field}>
                <TextField
                  label={field.replace(/_/g, " ").toUpperCase()}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
            ))}

            {/* Education Section */}
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mt: 2 }}>
                Education
              </Typography>
            </Grid>

            {["institution", "degree", "grade"].map((field) => (
              <Grid item xs={12} key={field}>
                <TextField
                  label={field.toUpperCase()}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
            ))}

            <Grid item xs={12}>
              <TextField
                label="START DATE"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="END DATE"
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpdate}
                fullWidth
              >
                Update
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
};

export default UpdateProfile;
