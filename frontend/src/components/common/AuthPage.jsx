// import { useState } from "react";
// import { motion } from "framer-motion";
// import axios from "axios";
// import {
//   Box,
//   Card,
//   CardContent,
//   TextField,
//   Button,
//   Typography,
//   Link,
//   Alert,
// } from "@mui/material";

// export default function AuthPage() {
//   const [isLogin, setIsLogin] = useState(true);
//   const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });
//   const [message, setMessage] = useState("");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage(""); // Clear previous message

//     try {
//       const url = isLogin ? "/api/auth/login" : "/api/auth/signup";
//       const res = await axios.post("/user", formData);
//       setMessage(res.data.message);

//       if (isLogin && res.data.token) {
//         localStorage.setItem("token", res.data.token); // Store token
//       }
//     } catch (error) {
//       setMessage(error.response?.data?.message || "Something went wrong");
//     }
//   };

//   return (
//     <Box
//       display="flex"
//       justifyContent="center"
//       alignItems="center"
//       height="100vh"
//       sx={{ background: "linear-gradient(135deg, #1E1E1E, #121212)" }}
//     >
//       <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
//         <Card sx={{ maxWidth: 400, p: 3, backgroundColor: "#1E1E1E", color: "white", borderRadius: 2, boxShadow: "0 4px 10px rgba(255, 255, 255, 0.1)", border: "1px solid #333" }}>
//           <CardContent>
//             <Typography variant="h4" textAlign="center" fontWeight="bold">
//               {isLogin ? "Welcome Back" : "Join Us"}
//             </Typography>
//             <Typography variant="body2" textAlign="center" sx={{ color: "gray", mt: 1 }}>
//               {isLogin ? "Sign in to continue" : "Create an account"}
//             </Typography>

//             {message && <Alert severity="info" sx={{ mt: 2 }}>{message}</Alert>}

//             <Box component="form" mt={3} onSubmit={handleSubmit}>
//               {!isLogin && (
//                 <TextField
//                   fullWidth
//                   name="fullName"
//                   label="Full Name"
//                   variant="outlined"
//                   onChange={handleChange}
//                   sx={{ mb: 2, "& .MuiOutlinedInput-root": { color: "white", "& fieldset": { borderColor: "#555" } } }}
//                 />
//               )}
//               <TextField
//                 fullWidth
//                 name="email"
//                 label="Email"
//                 type="email"
//                 variant="outlined"
//                 onChange={handleChange}
//                 sx={{ mb: 2, "& .MuiOutlinedInput-root": { color: "white", "& fieldset": { borderColor: "#555" } } }}
//               />
//               <TextField
//                 fullWidth
//                 name="password"
//                 label="Password"
//                 type="password"
//                 variant="outlined"
//                 onChange={handleChange}
//                 sx={{ mb: 2, "& .MuiOutlinedInput-root": { color: "white", "& fieldset": { borderColor: "#555" } } }}
//               />

//               <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//                 <Button fullWidth type="submit" variant="contained" sx={{ backgroundColor: "#2979FF", color: "white", py: 1.5, fontWeight: "bold", mt: 1 }}>
//                   {isLogin ? "Login" : "Register"}
//                 </Button>
//               </motion.div>
//             </Box>

//             <Typography textAlign="center" mt={2} sx={{ color: "gray" }}>
//               {isLogin ? "New here?" : "Already have an account?"}{" "}
//               <Link component="button" onClick={() => setIsLogin(!isLogin)} sx={{ color: "#2979FF", cursor: "pointer" }}>
//                 {isLogin ? "Sign up" : "Sign in"}
//               </Link>
//             </Typography>
//           </CardContent>
//         </Card>
//       </motion.div>
//     </Box>
//   );
// }
