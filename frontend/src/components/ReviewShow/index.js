import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteReview } from '../../store/reviews';
import { Link } from 'react-router-dom';
import { BsThreeDots, BsPersonCircle } from 'react-icons/bs';
import { StarRating } from '../StarRating';

function ReviewShow({ id }) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            const dropdownElement = document.querySelector(".edit-dropdown-container");

            if (dropdownElement && !dropdownElement.contains(e.target)) {
                setShowMenu(false);
            }

            setShowMenu(false);
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
                <div key={index}>
                    {console.log(user)}
                    <h2><BsPersonCircle/>{review.user_info}</h2>
                    <h3>Rating: <StarRating rating={review.rating} size={20}/> </h3>
                    <h2>Review date: {new Date(review.created_at).toLocaleDateString()}</h2>
                    <h2>{review.body}</h2>
                    { user && user.id === review.user_id && (
                        <div className='edit-dropdown-container'>
                            <button onClick={openMenu}><BsThreeDots/></button>
                            {showMenu && (
                                <ul className="edit-dropdown">
                                    <li>
                                        <Link to={`/reviews/edit/${review.id}`}>Edit Review</Link>
                                    </li>
                                    <li>
                                        <button onClick={() => handleDelete(review.id)}>Delete Review</button>
                                    </li>
                                </ul>
                            )}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default ReviewShow;