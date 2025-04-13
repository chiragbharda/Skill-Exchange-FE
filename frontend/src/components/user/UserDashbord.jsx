// import React from "react";
// import {
//   Container,
//   Grid,
//   Card,
//   CardContent,
//   Typography,
//   Avatar,
//   Chip,
//   Box,
// } from "@mui/material";
// import { School, Work, CheckCircle } from "@mui/icons-material";
// import Sidebar from "../common/Sidebar";

// const UserDashboard = () => {
//   // Sample user data
//   const user = {
//     name: "Chirag Bharda",
//     profilePic: "https://via.placeholder.com/100",
//     skillsLearned: ["React.js", "Node.js", "MongoDB"],
//     skillRequests: ["Python for Data Analysis"],
//   };

//   // Sample skill listings
//   const skills = [
//     {
//       id: "1",
//       title: "Web Development Bootcamp",
//       category: "Development",
//       mode: "Online",
//     },
//     {
//       id: "2",
//       title: "Graphic Design Fundamentals",
//       category: "Design",
//       mode: "Offline",
//     },
//   ];

//   return (
//     <Grid container>
//       {/* Sidebar */}
//       <Grid item xs={2}>
//         <Sidebar />
//       </Grid>
      
//       {/* Main Content */}
//       <Grid item xs={10}>
//         <Container maxWidth="lg" sx={{ mt: 4 }}>
//           {/* Profile Overview */}
//           <Card sx={{ p: 3, mb: 3, borderRadius: 3 }}>
//             <Grid container spacing={3} alignItems="center">
//               <Grid item xs={12} md={3} textAlign="center">
//                 <Avatar src={user.profilePic} sx={{ width: 100, height: 100, margin: "auto" }} />
//                 <Typography variant="h5" sx={{ mt: 1, fontWeight: "bold" }}>
//                   {user.name}
//                 </Typography>
//               </Grid>
//               <Grid item xs={12} md={9}>
//                 <Typography variant="h6">Skills Learned</Typography>
//                 {user.skillsLearned.map((skill, index) => (
//                   <Chip key={index} label={skill} sx={{ m: 0.5 }} />
//                 ))}
//                 <Typography variant="h6" sx={{ mt: 2 }}>Skill Requests</Typography>
//                 {user.skillRequests.map((request, index) => (
//                   <Chip key={index} label={request} sx={{ m: 0.5 }} />
//                 ))}
//               </Grid>
//             </Grid>
//           </Card>

//           {/* Skill Listings */}
//           <Typography variant="h5" sx={{ fontWeight: "bold" }}>My Skill Listings</Typography>
//           <Grid container spacing={3}>
//             {skills.map((skill) => (
//               <Grid item xs={12} md={6} key={skill.id}>
//                 <Card sx={{ borderRadius: 2, boxShadow: 3, p: 2 }}>
//                   <CardContent>
//                     <Typography variant="h6" sx={{ fontWeight: "bold" }}>{skill.title}</Typography>
//                     <Typography color="textSecondary">{skill.category} • {skill.mode}</Typography>
//                     <CheckCircle sx={{ color: "#3bb4a1", mt: 1 }} />
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         </Container>
//       </Grid>
//     </Grid>
//   );
// };

// export default UserDashboard;
