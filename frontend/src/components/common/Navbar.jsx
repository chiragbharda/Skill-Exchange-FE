import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Avatar,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Badge,
} from "@mui/material";
import {
  Home,
 AccountCircle,
 Logout,
Menu as MenuIcon,
Chat,
NotificationAdd,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationCount, setNotificationCount] = useState(0);


  const getActiveTab = () => {
    if (location.pathname.includes("/homepage")) return 0;
    // if (location.pathname.includes("/dashboard2")) return 1;
    if (location.pathname.includes("/notifiaction")) return 1;
    if (location.pathname.includes("/chat")) return 2;
    if (location.pathname.includes("/profile")) return 3;
    return null;
  };

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleLogout = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const searchSkill = async () => {
    if (!search) return;
    try {
      await axios.get(`/search/${search}`);
      navigate(`/homepage/${search}`);
    } catch (error) {
      console.error("Search error:", error);
    }
  };
  useEffect(() => {
    const fetchNotificationCount = async () => {
      try {
        const userId = localStorage.getItem("id"); // or use getLoggedUserId()
        const res = await axios.get(`/api/notifications/${userId}`);
        const unread = res.data.filter(n => !n.isRead).length;
        setNotificationCount(unread);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotificationCount();
  }, []);


  const handleProfileClick = (event) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  const tabItems = [
    { label: "Home", icon: <Home />, path: "/homepage" },
    // { label: "Dashboard", icon: <Dashboard />, path: "/dashboard2" },
    {
      label: "Notification",
      icon: (
        <Badge badgeContent={notificationCount} color="error">
          <NotificationAdd />
        </Badge>
      ),
      path: "/notification",
    },
    ,
    { label: "Chat", icon: <Chat />, path: "/chat" },
  ];

  return (
    <>
      <AppBar position="sticky" sx={{ bgcolor: "black", padding: "8px 0" }}>
        <Toolbar>
          {/* Drawer Toggle Button */}
          <IconButton edge="start" sx={{ display: { xs: "block", md: "none" } }} onClick={handleDrawerToggle}>
            <MenuIcon sx={{ color: "white" }} />
          </IconButton>

          {/* Logo */}
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold", cursor: "pointer" }} onClick={() => navigate("/homepage")}>
            Skill🗲Exchange
          </Typography>

          {/* Search Bar */}
          {/* <Box sx={{ position: "relative", bgcolor: "white", borderRadius: 1, paddingX: 2, display: { xs: "none", sm: "block" } }}>
            <InputBase
              placeholder="Search Skills"
              sx={{ width: "200px" }}
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <button onClick={searchSkill}>
              <Search sx={{ position: "absolute", right: 10, top: 6, color: "gray" }} />
            </button>
          </Box> */}

          {/* Desktop Navigation Buttons */}
          <Box sx={{ display: { xs: "none", md: "flex" }, marginLeft: 3 }}>
            {tabItems.map((item, index) => (
              <Button
                key={index}
                startIcon={item.icon}
                onClick={() => navigate(item.path)}
                sx={{
                  transition: "0.3s",
                  bgcolor: getActiveTab() === index ? "#2C3E50" : "transparent",
                  color: getActiveTab() === index ? "white" : "inherit",
                  borderRadius: "5px",
                  paddingX: 2,
                  "&:hover": { bgcolor: "#3498DB", color: "white" },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          {/* Profile Icon (Click to Open Menu) */}
          <IconButton onClick={handleProfileClick}>
            <Avatar sx={{ bgcolor: "#3bb4a1", cursor: "pointer" }}>C</Avatar>
          </IconButton>

          {/* Profile Menu */}
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
            <MenuItem onClick={() => { navigate("/profile"); handleCloseMenu(); }}>
              <ListItemIcon><AccountCircle /></ListItemIcon>
              <ListItemText primary="Profile" />
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ListItemIcon><Logout /></ListItemIcon>
              <ListItemText primary="Logout" />
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Drawer (Sidebar) */}
      <Drawer anchor="left" open={mobileOpen} onClose={handleDrawerToggle}>
        <Box sx={{ width: 250 }}>
          <List>
            {tabItems.map((item, index) => (
              <ListItem
                key={index}
                button
                onClick={() => navigate(item.path)}
                sx={{
                  bgcolor: getActiveTab() === index ? "#2C3E50" : "transparent",
                  color: getActiveTab() === index ? "white" : "inherit",
                  borderRadius: "5px",
                  "&:hover": { bgcolor: "#3498DB", color: "white" },
                }}
              >
                <ListItemIcon sx={{ color: getActiveTab() === index ? "white" : "inherit" }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
