import React, { useState } from "react";
import axios from "axios";
import "../Components/Styles/reviewform.css"
import { useParams } from "react-router-dom";

const ReviewForm = () => {
  const userId = localStorage.getItem("id");  
  const eventId = useParams().eventId;
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const data = {
    userId : userId,
    eventId : eventId,
    rating: rating,
    comment: comment
  }

  const submitReview = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/review/addreview", data);
      alert("Review submitted successfully!");
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <form onSubmit={submitReview} className="review-form">
      <label>Rating:</label>
      <select value={rating} onChange={(e) => setRating(e.target.value)}>
        {[1, 2, 3, 4, 5].map((num) => (
          <option key={num} value={num}>{num} Stars</option>
        ))}
      </select>

      <label>Comment:</label>
      <textarea value={comment} onChange={(e) => setComment(e.target.value)} />

      <button type="submit">Submit Review</button>
    </form>
  );
};

export default ReviewForm;
