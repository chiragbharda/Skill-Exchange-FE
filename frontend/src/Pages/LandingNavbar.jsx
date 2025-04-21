import React from "react";
import { Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import AppBar from '@mui/material/AppBar';

const LandingNavbar = () => {
  const location = useLocation();

  // Check if the current page is any of the login, signup, forgot password, or reset password pages
  const isAuthPage = ['/login', '/signup', '/forgotpassword', '/reset-password'].includes(location.pathname);

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

        {/* Show buttons only if not on the authentication pages */}
        {!isAuthPage && (
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
            <Button component="a" href="#features" sx={{ color: "white", fontWeight: "bold" }}>
              Features
            </Button>

            <Button component="a" href="#about" sx={{ color: "white", fontWeight: "bold" }}>
              About
            </Button>

            <Button component="a" href="#contact" sx={{ color: "white", fontWeight: "bold" }}>
              Contact
            </Button>
          </Box>
        )}

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
