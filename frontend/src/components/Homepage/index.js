import React, { useState, useEffect, useMemo } from 'react';
import './Homepage.css';
import { FiSearch } from 'react-icons/fi';

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

    const [imageIndex, setImageIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setImageIndex((prevIndex) => (prevIndex + 1) % aws_image_urls.length);
        }, 50000000);

        return () => {
            clearInterval(timer);
        };
    }, [aws_image_urls]);

    return (
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
    );
}

export default Homepage;
