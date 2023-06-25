import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createReview, updateReview, fetchReview } from '../../store/reviews';

function ReviewFormPage({ match, history }) {
    const dispatch = useDispatch();
    const reviewId = match.params.reviewId;  // get review id from URL
    const review = useSelector(state => state.reviews[reviewId]);  // get review from Redux store

    // Local state for form inputs
    const [rating, setRating] = useState(review ? review.rating : '');
    const [content, setContent] = useState(review ? review.content : '');

    useEffect(() => {
        if (reviewId) {
            dispatch(fetchReview(reviewId));
        }
    }, [dispatch, reviewId]);

    // Handle form submission
    const handleSubmit = e => {
        e.preventDefault();
        const reviewData = { rating, content };

        if (reviewId) {
            // Update review
            dispatch(updateReview({ ...reviewData, id: reviewId }))
                .then(() => history.push(`/businesses/${review.businessId}`));
        } else {
            // Create new review
            dispatch(createReview(reviewData))
                .then(() => history.push(`/businesses/${review.businessId}`));
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Rating:
                    <input 
                        type="number" 
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                    />
                </label>
                <label>
                    Review:
                    <textarea 
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default ReviewFormPage;
