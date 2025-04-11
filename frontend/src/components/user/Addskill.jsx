import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import navigation hook
import {
  TextField,
  Button,
  Autocomplete,
  Chip,
  Container,
  Box,
  Typography,
  Tabs,
  Tab,
} from "@mui/material";
import { DatePicker } from "@mui/lab";
import axios from "axios";

const skillOptions = ["React", "Node.js", "Express", "MongoDB", "Flask", "JPA", "Clustering"];

const AddSkill = () => {
  const navigate = useNavigate(); // Initialize navigation
  const [tab, setTab] = useState(0);
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [proficientSkills, setProficientSkills] = useState([]);
  const [skillsToLearn, setSkillsToLearn] = useState([]);
  const [institution, setInstitution] = useState("");
  const [degree, setDegree] = useState("");
  const [grade, setGrade] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [description, setDescription] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [preview, setPreview] = useState(null);


  const userId = localStorage.getItem("id");

  useEffect(() => {
    if (!userId) {
      navigate("/login"); // Redirect to login if user is not logged in
    } else {
      checkIfSkillsExist();
    }
  }, [userId]);

  const checkIfSkillsExist = async () => {
    try {
      const response = await axios.get(`/skill/${userId}`);
      // console.log(response.data.data.length)
      if (response.data.data.length != 0) {
        navigate("/homepage"); // Redirect to home if skills exist
      }
    } catch (error) {
      console.error("Error checking skills:", error);
    }
  };

  const handleSubmit = async () => {
    
    if (skillsToLearn.length === 0) {
      alert("Please add at least one skill to submit form'");
      return;
    }
    const userData = {
      userId,
      linkedin,
      github,
      portfolio,
      proficientSkills,
      skillsToLearn,
      education: {
        institution,
        degree,
        grade,
        startDate,
        endDate,
        description,
      },
    };

    try {
      await axios.post("/addskill", userData);
      alert("Profile saved successfully!");
      navigate("/homepage");
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Failed to save profile");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, p: 3, bgcolor: "#f4f4f4", borderRadius: 2 }}>
      <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)}>
        <Tab label="Registration" />
        <Tab label="Education" />
        <Tab label="Review & Submit" />
      </Tabs>

      {tab === 0 && (
        <>
          <Typography variant="h5" gutterBottom>Add Details</Typography>
          <TextField fullWidth label="LinkedIn Link" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} margin="normal" />
          <TextField fullWidth label="GitHub Link" value={github} onChange={(e) => setGithub(e.target.value)} margin="normal" />
          <TextField fullWidth label="Portfolio Link" value={portfolio} onChange={(e) => setPortfolio(e.target.value)} margin="normal" />
          <Autocomplete
            multiple options={skillOptions} value={proficientSkills}
            onChange={(event, newValue) => setProficientSkills(newValue)}
            renderTags={(value, getTagProps) => value.map((option, index) => (
              <Chip label={option} {...getTagProps({ index })} key={option} />
            ))}
            renderInput={(params) => <TextField {...params} label="Skills Proficient At" margin="normal" />}
          />
          <Autocomplete
            multiple options={skillOptions} value={skillsToLearn}
            onChange={(event, newValue) => setSkillsToLearn(newValue)}
            renderTags={(value, getTagProps) => value.map((option, index) => (
              <Chip label={option} {...getTagProps({ index })} key={option} />
            ))}
            renderInput={(params) => <TextField {...params} label="Skills to Learn" margin="normal" />}
          />
        </>
      )}

      {tab === 1 && (
        <>
          <Typography variant="h5" gutterBottom>Education Details</Typography>
          <TextField fullWidth label="Institution Name" value={institution} onChange={(e) => setInstitution(e.target.value)} margin="normal" />
          <TextField fullWidth label="Degree" value={degree} onChange={(e) => setDegree(e.target.value)} margin="normal" />
          <TextField fullWidth label="Grade/Percentage" value={grade} onChange={(e) => setGrade(e.target.value)} margin="normal" />
          <DatePicker label="Start Date" value={startDate} onChange={(date) => setStartDate(date)} renderInput={(params) => <TextField {...params} fullWidth margin="normal" />} />
          <DatePicker label="End Date" value={endDate} onChange={(date) => setEndDate(date)} renderInput={(params) => <TextField {...params} fullWidth margin="normal" />} />
          <TextField fullWidth label="Description" value={description} onChange={(e) => setDescription(e.target.value)} margin="normal" />
        </>
      )}

      {tab === 2 && (
        <>
          <Typography variant="h5" gutterBottom>Review & Submit</Typography>
          <Typography variant="body1">LinkedIn: {linkedin}</Typography>
          <Typography variant="body1">GitHub: {github}</Typography>
          <Typography variant="body1">Portfolio: {portfolio}</Typography>
          <Typography variant="body1">Proficient Skills: {proficientSkills.join(", ")}</Typography>
          <Typography variant="body1">Skills to Learn: {skillsToLearn.join(", ")}</Typography>
          <Typography variant="body1">Institution: {institution}</Typography>
          <Typography variant="body1">Degree: {degree}</Typography>
          <Typography variant="body1">Grade: {grade}</Typography>
          <Typography variant="body1">Start Date: {startDate ? startDate.toISOString().split("T")[0] : "N/A"}</Typography>
          <Typography variant="body1">End Date: {endDate ? endDate.toISOString().split("T")[0] : "N/A"}</Typography>
          <Typography variant="body1">Description: {description}</Typography>

          <Box display="flex" justifyContent="center" mt={3}>
            <Button variant="contained" color="success" onClick={handleSubmit}>
              Submit
            </Button>
          </Box>
        </>
      )}

      <Box display="flex" justifyContent="space-between" mt={3}>
        {tab > 0 && <Button variant="contained" color="secondary" onClick={() => setTab(tab - 1)}>Back</Button>}
        {tab < 2 && <Button variant="contained" color="primary" onClick={() => setTab(tab + 1)}>Next</Button>}
      </Box>
    </Container>
  );
};

export default AddSkill;
