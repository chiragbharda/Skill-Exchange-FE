import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  List,
  Button,
  Divider,
  Paper,
} from "@mui/material";
import axios from "axios";
import Navbar from "../components/common/Navbar";

const ChatPage = () => {
  const [tab, setTab] = useState(0);
  const [chatUsers, setChatUsers] = useState([]);
  const [requests, setRequests] = useState([]);
 const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");

  const socket = useRef(null);

  const userId = localStorage.getItem("id");


  const fetchChats = async () => {
    try {
      const res = await axios.get("/users");
      // console.log(res.data.data)
      const allUsers = res.data.data;
  
      
      const loggedInUser = allUsers.find((user) => user._id === userId);
  
      
      if (loggedInUser) {
        const connected = allUsers.filter((user) =>
          loggedInUser.connectedUsers.includes(user._id)
        );
        setChatUsers(connected);
      }
    } catch (err) {
      console.error("Error loading chats", err);
    }
  };
  

 
  const fetchRequests = async () => {
    try {
      const res = await axios.get(`/received/${userId}`);
      setRequests(res.data.requests);
    } catch (err) {
      console.error("Error loading requests", err);
    }
  };

  useEffect(() => {
    fetchChats();
    fetchRequests();
  
    socket.current = io("http://localhost:3000");
  
    socket.current.on("connect", () => {
      console.log("Socket connected ✅", socket.current.id);
    });
  
    socket.current.emit("join_room", userId);
  
    socket.current.on("receive_message", (data) => {
      console.log("Received message 🔥:", data);
      if (selectedChat && data.senderId === selectedChat._id) {
        setMessages((prev) => [...prev, data]);
      }
    });
  
    return () => {
      socket.current.disconnect();
    };
  }, [selectedChat]);
  

  const sendMessage = () => {
    if (!messageInput.trim() || !selectedChat) return;
  
    const msgData = {
      roomId: selectedChat._id,
      senderId: userId,
      receiverId: selectedChat._id,
      text: messageInput,
      time: new Date().toLocaleTimeString(),
    };
  
    console.log("Sending message 🚀:", msgData);
    socket.current.emit("send_message", msgData);
  
    setMessages((prev) => [...prev, msgData]);
    setMessageInput("");
  };
  

  const handleRequestAction = async (id, action) => {
    try {
      await axios.post(`/respond/${id}`, { action });
      setRequests((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error("Action error", err);
    }
  };

  return (
    <>
      <Navbar />
      <Box display="flex" height="calc(96vh - 52px)">
        {/* Sidebar */}
        <Box width="300px" bgcolor="#1e1e1e" color="#fff" p={2}>
          <Tabs
            value={tab}
            onChange={(e, newVal) => setTab(newVal)}
            textColor="inherit"
            TabIndicatorProps={{ style: { backgroundColor: "#26a69a" } }}
          >
            <Tab label="Chat History" />
            <Tab label="Requests" />
          </Tabs>

          <Divider sx={{ my: 2, borderColor: "#444" }} />

          {/* Chat History  */}
          {tab === 0 && (
            <List>
              {chatUsers.map((user) => (
                <Paper
                  key={user._id}
                  sx={{ backgroundColor: "#2c2c2c", p: 1, mb: 1, cursor: "pointer" }}
                  onClick={() => setSelectedChat(user)}
                >
                  <Typography variant="body1">{user.full_name}</Typography>
                </Paper>
              ))}
            </List>
          )}


          {/* Requests Tab */}
          {tab === 1 && (
            <List>
              {requests.map((req) => (
                <Paper key={req._id} sx={{ backgroundColor: "#2c2c2c", p: 1, mb: 1 }}>
                  <Typography variant="body1">{req?.senderId?.full_name}</Typography>
                  <Box mt={1} display="flex" gap={1}>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleRequestAction(req._id, "accept")}
                      sx={{ bgcolor: "green" }}
                    >
                      Accept
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      color="error"
                      onClick={() => handleRequestAction(req._id, "reject")}
                    >
                      Reject
                    </Button>
                  </Box>
                </Paper>
              ))}
            </List>
          )}

        </Box>

        {/* Chat */}
        <Box
          flex={1}
          bgcolor="#fff"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          p={2}
        >
          {selectedChat ? (
            <>
              <Typography variant="h6" gutterBottom>
                Chat with {selectedChat.full_name}
              </Typography>
              <Box flex={1} overflow="auto" mb={2}>
                {messages.map((msg, i) => (
                  <Box
                    key={i}
                    alignSelf={
                      msg.senderId === userId ? "flex-end" : "flex-start"
                    }
                    bgcolor={msg.senderId === userId ? "#26a69a" : "#eee"}
                    p={1}
                    borderRadius={2}
                    m={1}
                    maxWidth="70%"
                  >
                    <Typography variant="body2">{msg.text}</Typography>
                  </Box>
                ))}
              </Box>
              <Box display="flex">
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  style={{ flex: 1, padding: 8 }}
                />
                <Button onClick={sendMessage} variant="contained">
                  Send
                </Button>
              </Box>
            </>
          ) : (
            <Typography variant="h6" color="gray">
              Select a chat to start messaging
            </Typography>
          )}
        </Box>
      </Box>
    </>
  );
};

export default ChatPage;
