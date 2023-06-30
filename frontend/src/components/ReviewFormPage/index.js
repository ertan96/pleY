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
        <div className='review-form-container'>
            <form onSubmit={handleSubmit}>
                <div className='review-form-contents'>
                    <div className='review-form-business-name'>{review ? review.business_name : business.name}</div>
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
                    {!isLoggedIn && <h2>You must be logged in to make a review.</h2>}
                    <button type="submit" className='review-form-button'>Post Review</button>
                </div>
            </form>
        </div>
    );
}

export default ReviewFormPage;