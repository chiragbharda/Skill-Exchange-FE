import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear admin auth (Assuming JWT stored in localStorage)
    localStorage.removeItem("adminToken");
    navigate("/login"); // Redirect to login
  };

  return (
    <AppBar position="sticky" sx={{ bgcolor: "black", padding: "8px 0" }}>
      <Toolbar>
        {/* <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton> */}
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold", cursor: "pointer",}} onClick={() => navigate("/admin")}>
                    Skill🗲Exchange
        </Typography>
        <Typography variant="h7" sx={{ flexGrow: 8 }}>
          Admin Panel
        </Typography>
        <Button color="inherit" onClick={() => navigate("/admin/dashboard")}>
          Dashboard
        </Button>
        <Button color="inherit" onClick={() => navigate("/admin/users")}>
          Users profile
        </Button>
        <Button color="inherit" onClick={() => navigate("/admin/reports")}>
          Reports
        </Button>
        <Button variant="outlined" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default AdminNavbar;
