import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Paper,
} from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ReportPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userId: reportedUserId } = useParams();  // Fetching userId from URL params

  const reporterId = localStorage.getItem("id");
  const [reason, setReason] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { reportedUsername = 'Unknown User' } = location.state || {}; 

  const handleSubmit = async () => {
   

    
    if (!reason) {
      setErrorMessage("Reason is required to submit a report.");
      return;
    }

    if (!reporterId || !reportedUserId || reporterId.length !== 24 || reportedUserId.length !== 24) {
      setErrorMessage("Invalid user IDs. Please try again.");
      return;
    }

    const reportData = {
      reporterId,
      reportedUserId,
      reason,
    };

    console.log("Report Data to be submitted:", reportData); 

    setIsLoading(true);
    setErrorMessage("");

    try {
    
      const response = await axios.post("/report/create", reportData);
      // console.log("Response from backend:", response.data);

      // Handle success
      alert(response.data.message || "Report submitted successfully!");
      navigate(-1);
    } catch (error) {
      
      console.error("Error submitting report:", error);
      // console.error("Error details:", error.response?.data);

      const errorMsg =
        error.response?.data?.message || "Error submitting the report. Please try again.";
      setErrorMessage(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f4f4f4",
        padding: 3,
      }}
    >
      <Paper
        elevation={5}
        sx={{
          maxWidth: 600,
          width: "100%",
          padding: 4,
          borderRadius: 3,
          backgroundColor: "#fff",
        }}
      >
        <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
          Report User
        </Typography>
        {reportedUsername && (
          <Typography variant="body1" sx={{ mb: 2 }}>
            Reporting: <strong>{reportedUsername}</strong>
          </Typography>
        )}
        <TextField
          label="Reason for Report"
          placeholder="Provide details about the issue..."
          multiline
          rows={4}
          fullWidth
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          sx={{ mb: 2 }}
        />
        {errorMessage && (
          <Typography color="error" variant="body2" sx={{ mb: 2 }}>
            {errorMessage}
          </Typography>
        )}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="outlined"
            color="error"
            onClick={() => navigate(-1)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : "Submit Report"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default ReportPage;
