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
  Dashboard,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationCount, setNotificationCount] = useState(0);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleProfileClick = (event) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  const handleLogout = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const getActiveTab = () => {
    if (location.pathname.includes("/homepage")) return 0;
    if (location.pathname.includes("/dashboard")) return 1;
    if (location.pathname.includes("/notification")) return 2;
    if (location.pathname.includes("/chat")) return 3;
    return null;
  };

  useEffect(() => {
    const fetchNotificationCount = async () => {
      try {
        const userId = localStorage.getItem("id");
        const res = await axios.get(`/received/${userId}`);
        const unread = res.data.filter((n) => !n.isRead).length;
        setNotificationCount(unread);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
    fetchNotificationCount();
  }, []);

  const tabItems = [
    { label: "Home", icon: <Home />, path: "/homepage" },
    { label: "Tranding", icon: <Dashboard />, path: "/dashboard" },
    {
      label: "Notification",
      icon:
        notificationCount > 0 ? (
          <Badge badgeContent={notificationCount} color="error">
            <NotificationAdd />
          </Badge>
        ) : (
          <NotificationAdd />
        ),
      path: "/notification",
    },
    { label: "Chat", icon: <Chat />, path: "/chat" },
  ];

  return (
    <>
      <AppBar position="sticky" sx={{ bgcolor: "black", padding: "8px 0" }}>
        <Toolbar>
          <IconButton
            edge="start"
            sx={{ display: { xs: "block", md: "none" }, color: "white" }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            sx={{ flexGrow: 1, fontWeight: "bold", cursor: "pointer" }}
            onClick={() => navigate("/homepage")}
          >
            Skill🗲Exchange
          </Typography>

          <Box sx={{ display: { xs: "none", md: "flex" }, ml: 3 }}>
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
                  px: 2,
                  "&:hover": { bgcolor: "#3498DB", color: "white" },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          <IconButton onClick={handleProfileClick}>
            <Avatar sx={{ bgcolor: "#3bb4a1", cursor: "pointer" }}>C</Avatar>
          </IconButton>

          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
            <MenuItem
              onClick={() => {
                navigate("/profile");
                handleCloseMenu();
              }}
            >
              <ListItemIcon>
                <AccountCircle />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={mobileOpen} onClose={handleDrawerToggle}>
        <Box sx={{ width: 250 }}>
          <List>
            {tabItems.map((item, index) => (
              <ListItem
                button
                key={index}
                onClick={() => {
                  navigate(item.path);
                  setMobileOpen(false);
                }}
                sx={{
                  bgcolor: getActiveTab() === index ? "#2C3E50" : "transparent",
                  color: getActiveTab() === index ? "white" : "inherit",
                  borderRadius: "5px",
                  "&:hover": { bgcolor: "#3498DB", color: "white" },
                }}
              >
                <ListItemIcon
                  sx={{ color: getActiveTab() === index ? "white" : "inherit" }}
                >
                  {item.icon}
                </ListItemIcon>
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
