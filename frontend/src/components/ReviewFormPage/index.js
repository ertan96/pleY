import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createReview, updateReview, fetchReview } from '../../store/reviews';
import { useParams } from 'react-router-dom';
import { StarInput } from '../StarRating';
import { fetchBusiness } from '../../store/businesses';

function ReviewFormPage({ history }) {
    const dispatch = useDispatch();
    const { reviewId, businessId } = useParams();
    const review = useSelector(state => state.reviews[reviewId]);
    const business = useSelector(state => state.businesses[businessId]);


    const [rating, setRating] = useState(review ? review.rating : '');
    const [body, setBody] = useState(review ? review.body : '');

    const user = useSelector(state => state.session.user);
    const isLoggedIn = !!user;

    useEffect(() => {
        if (reviewId) {
            dispatch(fetchReview(reviewId));
        } else if (businessId) {
            dispatch(fetchBusiness(businessId))
        }
    }, [dispatch, reviewId, businessId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isLoggedIn) {
            console.log('User is not logged in');
        return;
        }

        const reviewData = {
            rating,
            body,
            user_id: user.id,
            business_id: businessId
        };

        if (reviewId) {
            dispatch(updateReview({ ...reviewData, id: reviewId }))
                .then(updatedReview => {
                    dispatch(fetchReview(updatedReview.id));
                    history.push(`/businesses/${review.business_id}`);
                })
                .catch(error => {
                    console.log(error);
                });
        } else {
            dispatch(createReview(reviewData))
                .then(createdReview => {
                    dispatch(fetchReview(createdReview.id));
                    history.push(`/businesses/${businessId}`);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    };

    return (
        <div>
            
            <form onSubmit={handleSubmit}>
                <div>{review ? review.business_name : business.name}</div>
                <label>
                    <StarInput
                        rating={rating}
                        setRating={setRating}
                    />
                </label>
                <label>Review:
                    <textarea
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    />
                </label>
                {!isLoggedIn && <h2>You must be logged in to make a review.</h2>}
                <button type="submit">Submit</button>
            </form>
            
        </div>
    );
}

export default ReviewFormPage;