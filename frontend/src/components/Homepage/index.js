import React, { useState, useEffect, useMemo } from 'react';
import './Homepage.css';
import { FiSearch } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviews } from '../../store/reviews';
import { BsPersonCircle, BsLightbulb } from 'react-icons/bs';
import { BiHappy, BiCool } from 'react-icons/bi';
import { StarRating } from '../StarRating';
import { Link } from 'react-router-dom';


function Homepage() {
    const aws_image_urls = useMemo(() => [
        'https://pley1-seeds.s3.us-west-1.amazonaws.com/home1.jpg',
        'https://pley1-seeds.s3.us-west-1.amazonaws.com/home2.jpg',
        'https://pley1-seeds.s3.us-west-1.amazonaws.com/home3.jpg',
        'https://pley1-seeds.s3.us-west-1.amazonaws.com/home4.jpg'
    ],[]);

    const image_titles = useMemo(() => [
        'Swing into Summer',
        'Road trips await',
        'Make a splash',
        'Tell pests to bug off'
    ], []);

    const button_texts = useMemo(() => [
        'Golf courses', 
        'Oil change', 
        'Pool service', 
        'Pest control'
    ],[]);

    const dispatch = useDispatch();
    const reviews = useSelector(state => state.reviews); 
    const reviewsArray = Object.values(reviews);
    const twelveReviews = reviewsArray.slice(0, 12);


    const [imageIndex, setImageIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setImageIndex((prevIndex) => (prevIndex + 1) % aws_image_urls.length);
        }, 5000);

        return () => {
            clearInterval(timer);
        };
    }, [aws_image_urls]);

    useEffect(() => {
        dispatch(fetchReviews());
    }, [dispatch])

    return (
        <>
            <div className="homepage-wrapper">
                {aws_image_urls.map((imageUrl, index) => (
                    <div
                        key={index}
                        className={`splash-image ${imageIndex === index ? 'active' : ''}`}
                        style={{ backgroundImage: `url(${imageUrl})` }}
                    />
                ))}
                <div className="splash-text-button-container">
                    <h2 className="splash-text">{image_titles[imageIndex]}</h2>
                    <button className="splash-button">
                        <FiSearch size={24} />
                        {button_texts[imageIndex]}
                    </button>
                </div>
            </div>
            <div className='homepage-bottom-wrapper'>
                <div className='recent-activity-container'>
                    <div className='recent-act-text'>
                        Recent Activity
                    </div>
                    <div className='grid-container'>
                    {twelveReviews.map((review, i) => (
                        <div key={i} className='review-box'>
                            <div className='review-margins'> 
                                <div className='activity-header'>
                                    <BsPersonCircle size={40}/>
                                    <div className='name-text'> 
                                        <div className='review-user-name'>{review.user_info}</div>
                                        <div className='review-text'>Wrote a review </div>
                                    </div>
                                </div>
                                <div className='review-bot-text'> 
                                    <div className='review-business-name'>
                                        <Link to={`/businesses/${review.business_id}`} className='review-link-reroute'>
                                            {review.business_name}
                                        </Link>
                                    </div>
                                    <div className='review-rating'>
                                        <StarRating size={20} rating={review.rating}/>
                                    </div>
                                    <div className='review-body'>{review.body.length > 300 ? `${review.body.substring(0, 300)}...` : review.body}</div>
                                </div>
                                <div className='reaction-buttons'>
                                    <BsLightbulb size={24}/>
                                    <BiHappy size={24}/>
                                    <BiCool size={24}/>
                                </div>
                            </div>
                        </div>
                    ))}
                    </div>
                </div>

            </div>
        </>
    );
}

export default Homepage;
