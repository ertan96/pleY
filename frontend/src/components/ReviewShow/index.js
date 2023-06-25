import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteReview } from '../../store/reviews';
import { Link } from 'react-router-dom';

function ReviewShow({ id }) {
    const dispatch = useDispatch();

    const reviews = useSelector((state) => {
        const reviewsObj = state.reviews;
        const reviewsForThisBusiness = Object.values(reviewsObj).filter(
            (review) => review.business_id === Number(id)
        );
        return reviewsForThisBusiness.sort((a, b) => {
            const dateA = new Date(a.created_at);
            const dateB = new Date(b.created_at);
            return dateB - dateA;
        });
    });

    const handleDelete = (reviewId) => {
        dispatch(deleteReview(reviewId));
    };

    return (
        <div>
        {reviews &&
            reviews.map((review, index) => (
            <div key={index}>
                <h3>Rating: {review.rating}</h3>
                <p>{review.body}</p>
                <button onClick={() => handleDelete(review.id)}>Delete Review</button>
                <button>
                    <Link to={`/reviews/edit/${review.id}`}>Edit Review</Link>
                </button>
            </div>
            ))}
        </div>
    );
}

export default ReviewShow;