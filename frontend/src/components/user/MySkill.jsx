import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../common/Navbar";
import { Card, CardContent, Typography, Grid, Container, Chip } from "@mui/material";
import { motion } from "framer-motion";

const MySkills = () => {
  const [learnedSkills, setLearnedSkills] = useState([]);
  const [requestedSkills, setRequestedSkills] = useState([]);

  useEffect(() => {
    fetchMySkills();
  }, []);

  const fetchMySkills = async () => {
    try {
      const userId = localStorage.getItem("id");
      const learnedRes = await axios.get(`/skill/${userId}`);
    //   console.log("Learned Skills Response:", learnedRes.data);
      const requestedRes = await axios.get(`/request/${userId}`);
      setLearnedSkills(learnedRes.data.data);
      setRequestedSkills(requestedRes.data.data);
    } catch (error) {
    //   console.error("Error fetching skills", error);
    }
  };

  return (
    <>
      <Navbar />
      <Container sx={{ mt: 5 }}>
        <Typography variant="h4" align="center" gutterBottom>
          My Skills
        </Typography>
        <Grid container spacing={4}>
          {/* Learned Skills */}
          <Grid item xs={12} md={6}>
            <Typography variant="h5" align="center" gutterBottom>
              Learned Skills
            </Typography>
            {learnedSkills.length > 0 ? (
              learnedSkills.map((skill) => (
                <motion.div
                  key={skill._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card sx={{ mb: 2, boxShadow: 3 }}>
                    <CardContent>
                      <Typography variant="h6">{skill.title}</Typography>
                      <Typography variant="body2" color="textSecondary" gutterBottom>
                        {skill.description}
                      </Typography>
                      <Chip label={`Duration: ${skill.duration} hrs`} sx={{ mr: 1 }} />
                      <Chip label={`Mode: ${skill.mode}`} sx={{ mr: 1 }} />
                      <Chip label={`Status: ${skill.status}`} color={skill.status === "Active" ? "success" : "warning"} />
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : (
              <Typography align="center" color="textSecondary">
                No learned skills yet.
              </Typography>
            )}
          </Grid>

          {/* Requested Skills */}
          <Grid item xs={12} md={6}>
            <Typography variant="h5" align="center" gutterBottom>
              Requested Skills
            </Typography>
            {requestedSkills.length > 0 ? (
              requestedSkills.map((skill) => (
                <motion.div
                  key={skill._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card sx={{ mb: 2, boxShadow: 3 }}>
                    <CardContent>
                      <Typography variant="h6">{skill.title}</Typography>
                      <Typography variant="body2" color="textSecondary" gutterBottom>
                        {skill.description}
                      </Typography>
                      <Chip label={`Duration: ${skill.duration} hrs`} sx={{ mr: 1 }} />
                      <Chip label={`Mode: ${skill.mode}`} sx={{ mr: 1 }} />
                      <Chip label={`Status: ${skill.status}`} color={skill.status === "Active" ? "success" : "warning"} />
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : (
              <Typography align="center" color="textSecondary">
                No requested skills yet.
              </Typography>
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default MySkills;
