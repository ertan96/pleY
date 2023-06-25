import React from 'react';
import { useSelector } from 'react-redux';

function ReviewShow({ businessId }) {
    const reviews = useSelector((state) => {
        const reviewsArray = Object.values(state.reviews.byId);
        return reviewsArray.sort((a, b) => {
            const dateA = new Date(a.created_at);
            const dateB = new Date(b.created_at);
            return dateB - dateA;
        });
    });

    return (
        <div>
            {reviews && reviews.map((review, index) => (
                <div key={index}>
                <h3>Rating: {review.rating}</h3>
                <p>{review.body}</p>
                </div>
            ))}
        </div>
    );
}

export default ReviewShow;