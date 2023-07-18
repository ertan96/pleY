import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createReview, updateReview, fetchReview } from '../../store/reviews';
import { useParams } from 'react-router-dom';
import { StarInput } from '../StarRating';
import { fetchBusiness } from '../../store/businesses';
import './ReviewFormPage.css';

function ReviewFormPage({ history }) {
    const dispatch = useDispatch();
    const { reviewId, businessId } = useParams();
    const review = useSelector(state => state.reviews[reviewId]);
    const business = useSelector(state => state.businesses[businessId]);
    const [errors, setErrors] = useState([]);


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
    }, [dispatch, reviewId, businessId, review, business]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let errors = [];

        if (!rating) {
            errors.push("Rating is required");
        }

        if (!body) {
            errors.push("Review is required");
        }

        if (!isLoggedIn) {
            errors.push("You must be logged in to make a review.")
        }

        if (errors.length) {
            setErrors(errors);
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
                    setErrors([]);
                })
                .catch(error => {
                    setErrors([error.message]);
                });
        } else {
            dispatch(createReview(reviewData))
                .then(createdReview => {
                    dispatch(fetchReview(createdReview.id));
                    history.push(`/businesses/${businessId}`);
                    setErrors([]); 
                })
                .catch(error => {
                    setErrors([error.message]);
                });
        }
    };

    return (
        <div className='review-form-container'>
            <form onSubmit={handleSubmit}>
                <div className='review-form-contents'>
                    <div className='review-form-business-name'>{review ? review.business_name : business?.name}</div>
                    <div className='text-area-container'>
                        <div className='rating-text-row'>
                            <StarInput
                                rating={rating}
                                setRating={setRating}
                            /> <span className='select-row'>Select your rating</span>
                        </div>
                        <div className='text-area-box'>
                            <textarea
                                value={body}
                                maxLength='800'
                                onChange={(e) => setBody(e.target.value)}
                                className='text-area-style'
                                placeholder="I was so impressed with the level of service at this store. The staff was friendly and helpful, and I got exactly what I wanted. I'll be back!"
                            />
                        </div>
                    </div>
                    {errors.map((error, idx) => (
                        <div key={idx}>{error}</div>
                    ))}
                    <button type="submit" className='review-form-button'>Post Review</button>
                </div>
            </form>
        </div>
    );
}

export default ReviewFormPage;