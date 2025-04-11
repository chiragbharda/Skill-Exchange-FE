import React, { useState } from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Divider, Box, Toolbar, Typography } from "@mui/material";
import { Dashboard, Menu, School, Palette, Widgets } from "@mui/icons-material";
import { Link, Outlet } from "react-router-dom";
import Navbar from "../common/Navbar";

const UserSidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
     
      <Navbar />
      <Box sx={{ display: "flex" }}>
   
        <Drawer
          variant="persistent"
          open={isSidebarOpen}
          sx={{
            width: isSidebarOpen ? 250 : 0,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 250,
              boxSizing: "border-box",
            },
          }}
        >
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Skill Exchange
            </Typography>
            <IconButton onClick={toggleSidebar}>
              <Menu />
            </IconButton>
          </Toolbar>
          <Divider />

          
          <List>
            <ListItem button component={Link} to="/dashboard">
              <ListItemIcon>
                <Dashboard />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>

            <ListItem button component={Link} to="/skillListing">
              <ListItemIcon>
                <School />
              </ListItemIcon>
              <ListItemText primary="Skill Listings" />
            </ListItem>

            <ListItem button component={Link} to="/theme">
              <ListItemIcon>
                <Palette />
              </ListItemIcon>
              <ListItemText primary="Theme Generate" />
            </ListItem>

            <ListItem button component={Link} to="/widgets">
              <ListItemIcon>
                <Widgets />
              </ListItemIcon>
              <ListItemText primary="Widgets" />
            </ListItem>
          </List>
        </Drawer>

        {/* Main Content */}
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default UserSidebar;
