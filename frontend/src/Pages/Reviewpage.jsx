import React, { useState } from 'react';
import {
  Rating,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ReviewPage = () => {
  const { userId: ratedUserId } = useParams(); 
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const raterId = localStorage.getItem('id'); 

    if (!rating || !reviewText) {
      setErrorMessage('Please provide both a rating and a review.');
      return;
    }

    if (!raterId || !ratedUserId || raterId.length !== 24 || ratedUserId.length !== 24) {
      setErrorMessage('Invalid user ID format. Please try again.');
      return;
    }

    const reviewData = {
      stars: rating,
      review: reviewText,
      rater: raterId,
      ratedUser: ratedUserId,
    };

    console.log("Sending review data to backend:", reviewData);

    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await axios.post('/addreview', reviewData);
      console.log("Response from backend:", response.data);

      alert('Review submitted successfully!');
      navigate(-1);
    } catch (error) {
      console.error('Error submitting review:', error);

      if (error.response) {
        console.error('Error response:', error.response.data);
      }

      setErrorMessage('Error submitting the review. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#1e1e1e',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,
      }}
    >
      <Paper
        elevation={5}
        sx={{
          width: 650,
          padding: 4,
          borderRadius: 3,
          border: '1px solid #f4e04d',
          backgroundColor: '#1b2a2f',
          position: 'relative',
        }}
      >
        {/* Close Button */}
        <IconButton
          onClick={handleClose}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: '#fff',
            backgroundColor: '#2f2f2f',
            '&:hover': { backgroundColor: '#444' },
          }}
        >
          <CloseIcon />
        </IconButton>

      
        <Typography
          variant="h4"
          sx={{ color: '#8ff0a4', fontWeight: 'bold', mb: 2 }}
        >
          Write a Review
        </Typography>

       
        <Typography sx={{ color: '#fff', mb: 1 }}>Rate stars out of 5:</Typography>
        <Rating
          name="user-rating"
          value={rating}
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
          size="large"
        />

       
        <TextField
          placeholder="Write a review..."
          multiline
          rows={3}
          fullWidth
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          sx={{
            mt: 2,
            backgroundColor: '#fff',
            borderRadius: 1,
          }}
        />
        {errorMessage && (
          <Typography sx={{ color: 'red', mt: 1 }}>{errorMessage}</Typography>
        )}

  
        <Button
          variant="contained"
          sx={{
            mt: 2,
            backgroundColor: '#2edba3',
            color: '#000',
            '&:hover': {
              backgroundColor: '#26b98a',
            },
          }}
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? 'Submitting...' : 'Submit'}
        </Button>
      </Paper>
    </Box>
  );
};

export default ReviewPage;
