import { useEffect, useState } from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, Button, TableContainer, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar } from "@mui/material";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";

const AdminPanel = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    axios.get("/users").then((response) => {
      console.log(response);
      setUsers(response.data.data);
    });
  }, []);

  const handleDeleteClick = (id) => {
    setUserToDelete(id);
    setOpenDialog(true); // Open the confirmation dialog
  };

  const handleDeleteConfirm = () => {
    axios.delete(`/user/${userToDelete}`).then(() => {
      setUsers(users.filter((user) => user._id !== userToDelete));
      setOpenDialog(false);
      setSnackbarMessage("User removed successfully.");
      setOpenSnackbar(true); // Show success message
    });
  };

  const handleWarning = (id) => {
    axios.post(`/users/${id}/warning`).then(() => {
      setUsers(users.map((user) => (user._id === id ? { ...user, warnings: user.warnings + 1 } : user)));
    });
  };

  const handleDialogClose = () => {
    setOpenDialog(false); // Close the confirmation dialog without doing anything
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false); // Close the Snackbar
  };

  return (
    <>
      <AdminNavbar />
      <div style={{ padding: "20px" }}>
        <TableContainer>
          <Table stickyHeader>
            <TableHead style={{ backgroundColor: "rgb(83, 68, 177)", color: "white", textAlign: "left", padding: "12px", fontSize: "16px" }} position="sticky">
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Warnings</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.full_name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Button color="warning" onClick={() => handleWarning(user._id)}>
                      Send Warning
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button color="error" variant="outlined" onClick={() => handleDeleteClick(user._id)}>
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <p>Do you really want to remove this user?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="secondary">
            Yes, Remove
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for Success Message */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </>
  );
};

export default AdminPanel;
