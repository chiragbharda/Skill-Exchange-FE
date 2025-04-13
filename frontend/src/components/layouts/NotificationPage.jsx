// // pages/UserNotification.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Card, CardContent, Typography, List, ListItem, ListItemText, Divider } from "@mui/material";
// import Navbar from "../common/Navbar";

// const UserNotification = ({ userId }) => {
//   const [notifications, setNotifications] = useState([]);

//   useEffect(() => {
//     axios.get(`/api/notifications/${userId}`)
//       .then(res => setNotifications(res.data))
//       .catch(err => console.error("Error fetching notifications:", err));
//   }, [userId]);

//   return (
//     <>
//     <Navbar></Navbar>
//     <div className="container mt-5">
//       <Typography variant="h4" gutterBottom>
//         Notifications
//       </Typography>
//       <Card>
//         <CardContent>
//           <List>
//             {notifications.length === 0 ? (
//               <Typography>No notifications yet.</Typography>
//             ) : (
//               notifications.map((note, index) => (
//                 <div key={note._id}>
//                   <ListItem>
//                     <ListItemText
//                       primary={note.type === "connection-request" ? "Connection Request" :
//                                note.type === "admin-warning" ? "Admin Warning" :
//                                "System Notification"}
//                       secondary={note.message}
//                     />
//                   </ListItem>
//                   {index !== notifications.length - 1 && <Divider />}
//                 </div>
//               ))
//             )}
//           </List>
//         </CardContent>
//       </Card>
//     </div>
//     </>
//   );
// };

// export default UserNotification;
