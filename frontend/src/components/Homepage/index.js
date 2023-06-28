import React, { useState, useEffect, useMemo } from 'react';
import './Homepage.css';
import { FiSearch } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviews } from '../../store/reviews';


function Homepage() {
    // const aws_image_urls = useMemo(() => [
    //     'https://pley1-seeds.s3.us-west-1.amazonaws.com/home1.jpg',
    //     'https://pley1-seeds.s3.us-west-1.amazonaws.com/home2.jpg',
    //     'https://pley1-seeds.s3.us-west-1.amazonaws.com/home3.jpg',
    //     'https://pley1-seeds.s3.us-west-1.amazonaws.com/home4.jpg'
    // ],[]);

    // const image_titles = useMemo(() => [
    //     'Swing into Summer',
    //     'Road trips await',
    //     'Make a splash',
    //     'Tell pests to bug off'
    // ], []);

    // const button_texts = useMemo(() => [
    //     'Golf courses', 
    //     'Oil change', 
    //     'Pool service', 
    //     'Pest control'
    // ],[]);

    const dispatch = useDispatch();
    const reviews = useSelector(state => state.reviews); 
    const reviewsArray = Object.values(reviews);
    const twelveReviews = reviewsArray.slice(0, 12);


    // const [imageIndex, setImageIndex] = useState(0);

    // useEffect(() => {
    //     const timer = setInterval(() => {
    //         setImageIndex((prevIndex) => (prevIndex + 1) % aws_image_urls.length);
    //     }, 50000000);

    //     return () => {
    //         clearInterval(timer);
    //     };
    // }, [aws_image_urls]);

    useEffect(() => {
        dispatch(fetchReviews());
    }, [dispatch])

    return (
        <>
        <div className="homepage-wrapper">
            {/* {aws_image_urls.map((imageUrl, index) => (
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
            </div> */}
        </div>
        <div className='homepage-bottom-wrapper'>
            <div className='recent-activity-container'>
                Recent Activity
                <div className='grid-container'>
                {twelveReviews.map((review, i) => (
                    <div key={i} className='review-box'>
                        <div className='review-user-name'>{review.user_info}</div>
                        <div className='review-business-name'>{review.business_name}</div>
                        <div className='review-rating'>{review.rating}</div>
                        <div className='review-body'>{review.body}</div>
                    </div>
                ))}
                </div>
            </div>

        </div>
        </>
    );
}

export default Homepage;
