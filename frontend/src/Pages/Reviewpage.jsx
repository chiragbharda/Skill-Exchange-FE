import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ReviewPage = () => {
  const { userId } = useParams(); // ID of the user being reviewed
  const reviewerId = localStorage.getItem("id"); // current logged-in user ID

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/review/addreview", {
        reviewedUserId: userId,
        reviewerId,
        rating,
        comment,
      });

      alert("Review submitted successfully!");
      setComment("");
      setRating(5);
      fetchReviews(); 
    } catch (error) {
      alert("Error submitting review");
      console.error(error);
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`/review/getreview/${userId}`);
      setReviews(res.data.data);
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [userId]);

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Leave a Review</h2>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label className="block font-medium">Rating:</label>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="border rounded p-2"
          >
            {[1, 2, 3, 4, 5].map((r) => (
              <option key={r} value={r}>
                {r} Star{r > 1 ? "s" : ""}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block font-medium">Comment:</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full border rounded p-2"
            rows={4}
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit Review
        </button>
      </form>

      <h3 className="text-xl font-semibold mb-2">Reviews</h3>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <ul className="space-y-4">
          {reviews.map((review) => (
            <li key={review._id} className="border p-3 rounded shadow">
              <p className="font-semibold">Rating: {review.rating} ⭐</p>
              <p>{review.comment}</p>
              <p className="text-sm text-gray-500">By: {review.reviewerId}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReviewPage;
