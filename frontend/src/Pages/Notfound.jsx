import React from 'react';
import { Box, Typography, Container, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/common/Navbar';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <>
      <NavBar />
      <Container maxWidth="md">
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          minHeight="70vh"
          textAlign="center"
        >
          <Typography variant="h2" gutterBottom>
            404
          </Typography>
          <Typography variant="h5" gutterBottom>
            Page Not Found
          </Typography>
          <Typography variant="body1" mb={3}>
            The page you are looking for doesn’t exist or has been moved.
          </Typography>
          <Button variant="contained" color="primary" onClick={() => navigate('/')}>
            Go to Home
          </Button>
        </Box>
      </Container>
    </>
  );
}
