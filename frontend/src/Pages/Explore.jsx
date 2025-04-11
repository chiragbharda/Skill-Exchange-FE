import { useState,useEffect } from "react";
import Navbar from "../components/common/Navbar";
import * as React from 'react';
// import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';

import Avatar from '@mui/material/Avatar';

import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { useParams } from "react-router-dom";
import axios from "axios";
import { Grid } from "@mui/material";



const Explore = () => {
    const [users, setUsers] = useState([]);
    const text = useParams().text
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    };
    const searchSkill = async () => {
     // Prevent empty search requests
        try {
            const { data } = await axios.get(`/search/${text}`);
            // console.log(data)
            setUsers(data)
            console.log("hj",users)
            
            // onSearchResult(data); 
            // navigate(`/explore/${search}`)
            // Pass results to parent component
        } catch (error) {
            console.error("Search error:", error);
        }
    };
    
        useEffect( ()=>{
        searchSkill() 
      
        },[] )
    

    return (
        <>
        <Navbar></Navbar>
        <div style={{ width: "100vw", padding: "40px", marginTop: "25px" }}>
      <Grid container spacing={3} justifyContent="center">
        {users.map((user, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <Card
              sx={{
                maxWidth: 345,
                borderRadius: "15px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                transition: "0.3s",
                '&:hover': { transform: "scale(1.05)" },
              }}
            >
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }}>
                    {user.title.charAt(0).toUpperCase()}
                  </Avatar>
                }
                title={user.title}
                subheader={`Created on: ${formatDate(user.createdAt)}`}
              />
              <CardMedia
                component="img"
                height="194"
                image="/static/images/cards/paella.jpg"
                alt="Paella dish"
                style={{ borderRadius: "10px" }}
              />
              <CardContent>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {user.description}
                </Typography>
                <Typography variant="body2"><strong>Duration:</strong> {user.duration} months</Typography>
                <Typography variant="body2"><strong>Mode:</strong> {user.mode}</Typography>
                <Typography variant="body2"><strong>Price:</strong> {user.price === 0 ? "Free" : `$${user.price}`}</Typography>
                <Typography variant="body2" color={user.status === "Active" ? "green" : "red"}>
                  <strong>Status:</strong> {user.status}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
        </>
    );
};

export default Explore;
