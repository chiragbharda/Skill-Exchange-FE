// src/pages/NotificationPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Paper, Button } from "@mui/material";
import Navbar from "../components/common/Navbar";
import { useNavigate } from "react-router-dom";

const NotificationPage = () => {
  const userId = localStorage.getItem("id");
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  const fetchNotifications = async () => {
    try {
      const res = await axios.get(`/received/${userId}`);
      setRequests(res.data.requests);
    } catch (err) {
      console.error("Error fetching notifications", err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <>
      <Navbar />
      <Box p={3}>
        <Typography variant="h5" gutterBottom>
          Notifications
        </Typography>

        {/* Connection Requests */}
        {requests.length > 0 ? (
          requests.map((req) => (
            <Paper
              key={req._id}
              sx={{
                p: 2,
                mb: 2,
                backgroundColor: "#f5f5f5",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography>
                <strong>{req.senderId?.full_name}</strong> sent you a connection request.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/chat")} // You can pass selected user via state or query if needed
              >
                Go to Chat
              </Button>
            </Paper>
          ))
        ) : (
          <Typography>No new connection requests.</Typography>
        )}
      </Box>
    </>
  );
};

export default NotificationPage;
