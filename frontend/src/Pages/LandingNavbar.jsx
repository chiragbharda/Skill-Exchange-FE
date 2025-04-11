import React from "react";
import {  Toolbar, Typography, Button, Box, IconButton, } from "@mui/material";
import { Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';

const LandingNavbar = () => {
  return (
    <AppBar position="sticky" sx={{ bgcolor: "black", padding: "8px 0" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>

        {/* Logo */}
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", cursor: "pointer", color: "white" }}
        >
         <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            Skill🗲Exchange
          </Link>

        </Typography>

        {/* Navigation Links */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
          <Button component="a" href="#features" sx={{ color: "white", fontWeight: "bold" }}>
            Features
          </Button>
          <Button component="a" href="#community" sx={{ color: "white", fontWeight: "bold" }}>
            Community
          </Button>
          <Button component="a" href="#about" sx={{ color: "white", fontWeight: "bold" }}>
            About
          </Button>
          <Button component="a" href="#contact" sx={{ color: "white", fontWeight: "bold" }}>
            Contact
          </Button>
        </Box>

        {/* Login Button */}
        <Link to="/login">
          <Button variant="contained" color="primary">
            Login
          </Button>
        </Link>
        
      </Toolbar>
    </AppBar>
  );
};

export default LandingNavbar;
