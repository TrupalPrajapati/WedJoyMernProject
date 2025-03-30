import React, { useEffect, useState } from "react";
import axios from "axios";

const EventReviews = ({ eventId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const res = await axios.get(`/review/event-reviews/${eventId}`);
      setReviews(res.data.reviews);
    };
    fetchReviews();
  }, [eventId]);

  return (
    <div className="reviews-container">
      <h3>Reviews:</h3>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        reviews.map((review) => (
          <div key={review._id} className="review-card">
            <p><strong>{review.userId.name}</strong>: {review.comment}</p>
            <p>⭐ {review.rating} Stars</p>
          </div>
        ))
      )}
    </div>
  );
};

export default EventReviews;
