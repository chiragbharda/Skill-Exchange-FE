import React from "react";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import Navbar from "../common/Navbar";

const DashboardPage = () => {
  return (
    <Box sx={{ bgcolor: "#f4f4f4", minHeight: "100vh" }}>
      <Navbar />

      {/* Dashboard Layout */}
      <Box sx={{ display: "flex", paddingTop: 8, maxWidth: "1100px", margin: "auto" }}>
        
        {/* Sidebar (Always Visible) */}
        <Box
          sx={{
            width: "300px",
            bgcolor: "white",
            padding: 3,
            borderRadius: 1,
            boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Dashboard
          </Typography>

          <List>
            <ListItem button component={Link} to="/addskill">
              <ListItemText primary="📜 Add Skills" />
            </ListItem>
            <ListItem button component={Link} to="/requestskill">
              <ListItemText primary="📜 Request Skills" />
            </ListItem>
            <ListItem button component={Link} to="/my-skills">
              <ListItemText primary="📜 My Skills" />
            </ListItem>
            <ListItem button component={Link} to="/dashboard/learning-progress">
              <ListItemText primary="🧑‍💻 Learning Progress" />
            </ListItem>
            <ListItem button component={Link} to="/dashboard/community">
              <ListItemText primary="🌍 Community Updates" />
            </ListItem>
            <ListItem button component={Link} to="/dashboard/messages">
              <ListItemText primary="📩 Messages" />
            </ListItem>
          </List>
        </Box>

        {/* Main Content (Right Section Updates) */}
        <Box sx={{ flexGrow: 1, paddingLeft: 2 }}>
          <Outlet /> {/* Renders selected page dynamically */}
        </Box>

      </Box>
    </Box>
  );
};

export default DashboardPage;
