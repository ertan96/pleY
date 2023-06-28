import React, {useState, useEffect } from 'react';
import './Homepage.css';

function Homepage() {
    const aws_image_urls = [
        'https://pley1-seeds.s3.us-west-1.amazonaws.com/home1.jpg',
        'https://pley1-seeds.s3.us-west-1.amazonaws.com/home2.jpg',
        'https://pley1-seeds.s3.us-west-1.amazonaws.com/home3.jpg',
        'https://pley1-seeds.s3.us-west-1.amazonaws.com/home4.jpg'
    ]

    const [image, setImage] = useState(aws_image_urls[0]);
    // const [imageIndex, setImageIndex] = useState(0);

    // useEffect(() => {
    //     const timer = setInterval(() => {
    //         setImageIndex((prevIndex) => {
    //             const newIndex = (prevIndex + 1) % aws_image_urls.length;  
    //             setImage(aws_image_urls[newIndex]);
    //             return newIndex;
    //         });
    //     }, 5000);

    //     return () => {
    //         clearInterval(timer);
    //     };
    // }, [aws_image_urls]);

    return (
        <div className='homepage-wrapper' style={{ backgroundImage: `url(${image})` }}> 
        </div>
    );
}

export default Homepage;