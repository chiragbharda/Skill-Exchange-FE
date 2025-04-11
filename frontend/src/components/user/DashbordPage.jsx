import React, { useState } from "react";
import { Box, CssBaseline, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, AppBar, IconButton, Avatar, Tabs, Tab, Button } from "@mui/material";
import { Menu, Home, Dashboard, Explore, Groups, AccountCircle, Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Navbar from "../common/Navbar";

const drawerWidth = 240;

const DashboardPage = () => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("/dashboard2"); // Default to Dashboard

  // Sidebar Toggle
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  // Handle Navigation
  const handleNavigation = (path) => {
    setSelectedTab(path);
    navigate(path);
  };

  // Logout Function
  const handleLogout = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("role");
    navigate("/login");
  };

  // Sidebar Content
  const drawer = (
    <Box sx={{ width: drawerWidth, bgcolor: "#f5f5f5", height: "100vh" }}>
      <Toolbar />
      <List>
        {[
          { text: "Home", icon: <Home />, path: "/homepage" },
          { text: "Dashboard", icon: <Dashboard />, path: "/dashboard2" },
          { text: "Explore", icon: <Explore />, path: "/explore" },
          { text: "Groups", icon: <Groups />, path: "/groups" },
          { text: "Profile", icon: <AccountCircle />, path: "/profile" },
        ].map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => handleNavigation(item.path)}
            sx={{
              bgcolor: selectedTab === item.path ? "#2C3E50" : "transparent",
              color: selectedTab === item.path ? "white" : "black",
              "&:hover": { bgcolor: "#34495E", color: "white" },
            }}
          >
            <ListItemIcon sx={{ color: selectedTab === item.path ? "white" : "black" }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        <ListItem button onClick={handleLogout}>
          <ListItemIcon><Logout /></ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
    {/* <Navbar></Navbar> */}
    {/* <Navbar/> */}
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* Navbar */}
      {/* <AppBar position="fixed" sx={{ bgcolor: "black", zIndex: 1201 }}> */}
        {/* <Toolbar>
          <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { md: "none" } }}>
            <Menu />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold", cursor: "pointer" }} onClick={() => handleNavigation("/homepage")}>
            Skill🗲Exchange
          </Typography>
          <Tabs value={selectedTab} onChange={(event, newValue) => setSelectedTab(newValue)} textColor="inherit">
            <Tab label="Home" value="/homepage" onClick={() => handleNavigation("/homepage")} />
            <Tab label="Dashboard" value="/dashboard2" onClick={() => handleNavigation("/dashboard2")} />
            <Tab label="Explore" value="/explore" onClick={() => handleNavigation("/explore")} />
            <Tab label="Groups" value="/groups" onClick={() => handleNavigation("/groups")} />
            <Tab label="Profile" value="/profile" onClick={() => handleNavigation("/profile")} />
          </Tabs>
          <IconButton onClick={() => handleNavigation("/profile")}>
            <Avatar sx={{ bgcolor: "#3bb4a1", cursor: "pointer" }}>C</Avatar>
          </IconButton>
          <Button variant="contained" color="error" sx={{ ml: 2 }} onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar> */}
      {/* </AppBar> */}

      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
          display: { xs: "none", md: "block" },
        }}
        open
      >
        {drawer}
      </Drawer>

      {/* Mobile Sidebar */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: "block", md: "none" },
          [`& .MuiDrawer-paper`]: { width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>

      {/* Dashboard Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        <Typography variant="h4" fontWeight="bold">
          Dashboard
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          This is your main dashboard where you can track progress, manage tasks, and more.
        </Typography>
      </Box>
    </Box>
    </>
  );
};

export default DashboardPage;
