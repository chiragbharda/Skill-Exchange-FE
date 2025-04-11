import { useEffect, useState } from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, Button, TableContainer } from "@mui/material";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";

const AdminPanel = ({ children }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("/users").then((response) => 
    {console.log(response),
      setUsers(response.data.data)});
  }, []);

  const handleDelete = (id) => {
    axios.delete(`/user/${id}`).then(() => {
      setUsers(users.filter((user) => user._id !== id));
    });
  };

  const handleWarning = (id) => {
    axios.post(`/users/${id}/warning`).then(() => {
      setUsers(users.map((user) => (user._id === id ? { ...user, warnings: user.warnings + 1 } : user)));
    });
  };

  return (
    <>
    <AdminNavbar/>
    <div style={{ padding: "20px" }}>
      <TableContainer>
      <Table stickyHeader >
        <TableHead style={{backgroundColor:"rgb(83, 68, 177)", color:"white", textAlign:"left", padding:"12px" , fontSize:"16px"}}
        position="sticky">
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
              <TableCell><Button color="warning" onClick={() => handleWarning(user._id)}>
                  Send Warning
                </Button></TableCell>
              <TableCell>
                
                <Button color="error"  variant="outlined"onClick={() => handleDelete(user._id)}>
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
    </div>
    </>
  );
};

export default AdminPanel;
