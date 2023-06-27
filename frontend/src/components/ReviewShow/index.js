import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteReview } from '../../store/reviews';
import { Link } from 'react-router-dom';
import { BsThreeDots, BsPersonCircle } from 'react-icons/bs';
import { StarRating } from '../StarRating';
import './ReviewShow.css';

function ReviewShow({ id }) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = (id) => {
        if (showMenu === id) return;
        setShowMenu(id);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            const dropdownElement = document.querySelector(".edit-dropdown-container");

            if (dropdownElement && !dropdownElement.contains(e.target)) {
                setShowMenu(null);
            }

            setShowMenu(null);
        };

        document.addEventListener('click', closeMenu);
        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);


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
            {reviews && reviews.map((review, index) => (
                <div key={index} className='review-container'>
                    <div className='review-header'>
                        <h2 className='avatar-header'><BsPersonCircle size={64}/>
                            {review.user_info}
                        </h2>
                    { user && user.id === review.user_id && (
                        <div className='edit-dropdown-container'>
                            <div onClick={() => openMenu(review.id)}>
                                <BsThreeDots size={24} className='dots-style'/>
                            </div>
                            {showMenu === review.id && (
                                <ul className="edit-dropdown">
                                    <li className='li-drop'>
                                        <Link to={`/reviews/edit/${review.id}`} className='edit-review-button'>Edit Review</Link>
                                    </li>
                                    <li className='li-drop'>
                                        <div onClick={() => handleDelete(review.id)} className='remove-review-button'>Remove Review</div>
                                    </li>
                                </ul>
                            )}
                        </div>
                    )}
                    </div>
                    <div className='review-date-row'><StarRating rating={review.rating} size={20}/>{new Date(review.created_at).toLocaleDateString()}</div>
                    <h2 className='review-body-style'>{review.body}</h2>
                </div>
            ))}
        </div>
    );
}

export default ReviewShow;