// console.log ("hello")
// var user =require("./user")
// console.log(user)
// console.log(user.userName)
// console.log(user.userAge)
// user.printUserData()

const express =require("express")
const mongoose =require("mongoose")
const cors = require("cors")
const app =express()
const http = require("http"); 
const { Server } = require("socket.io");

app.use(express.json());
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173", 
      methods: ["GET", "POST"]
    }
  });

  app.use(cors());

//import role routes
const roleRoutes = require("./src/routes/RoleRoutes")
app.use(roleRoutes)

const userRoutes = require("./src/routes/UserRoutes")
app.use(userRoutes)

// const skillRoutes = require("./src/routes/SkillListingRoute");
// app.use(skillRoutes);

// const skillrequestRoutes = require("./src/routes/Skillrequest");
// app.use(skillrequestRoutes);

const reviewRoutes = require("./src/routes/ReviewRoute");
app.use(reviewRoutes);

const reportRoutes = require("./src/routes/ReportRoute");
app.use(reportRoutes);

// const notificationRoute = require("./src/routes/NotificationRoute");
// app.use(notificationRoute);

const SkillListingRoute = require("./src/routes/SkillListingRoute");
app.use (SkillListingRoute)

const ConnectRoute = require("./src/routes/ConnectRoute");
app.use(ConnectRoute)



mongoose.connect("mongodb://localhost:27017/node").then(()=>{
    console.log ("database connected...")
})



io.on("connection", (socket) => {
    console.log("User connected:", socket.id);
  
    socket.on("join_room", (userId) => {
      socket.join(userId);
      console.log(`User ${userId} joined room`);
    });
  
    socket.on("send_message", (data) => {
      console.log("Message sent from frontend:", data);
      io.to(data.receiverId).emit("receive_message", data);
    });
  });
  


// app.get("/test", (req,res)=>{
//     console.log("hello this is test")
//     res.send("hello test api is called")
// })

// app.get("/users",(req,res)=>{
//     res.json({
//         message:"this is users api",
//         data:["chirag", "jeet", "deep"]
//     })

// })
// 

// app.get("/employe", (req,res)=>{
//     res.json( {
//         name: "Chirag",
//         age: 22,
//         position: "Software Developer",
//         department: "IT",
//         salary: 50000
//     }, 
//     
//     {
//         name: "Rohit",
//         age: 30,
//         position: "Marketing Specialist",
//         department: "Marketing",
//         salary: 65000
//     })
// })

const PORT =3000
server.listen(PORT, () => {
    console.log("Server & Socket.IO started on PORT", PORT);
});
