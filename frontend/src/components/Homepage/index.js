import React, {useState, useEffect, useMemo} from 'react';
import './Homepage.css';

function Homepage() {
    const aws_image_urls = useMemo(() => [
        'https://pley1-seeds.s3.us-west-1.amazonaws.com/home1.jpg',
        'https://pley1-seeds.s3.us-west-1.amazonaws.com/home2.jpg',
        'https://pley1-seeds.s3.us-west-1.amazonaws.com/home3.jpg',
        'https://pley1-seeds.s3.us-west-1.amazonaws.com/home4.jpg'
    ], []);

    const image_titles = useMemo(() => ["Swing into Summer", "Road trips await", "Make a splash", "Tell pests to bug off"], []);

    const button_texts = useMemo(() => ["Golf Course", "Oil Change", "Pool Service", "Pest Control"], []);
    
    const [image, setImage] = useState(aws_image_urls[0]);
    const [title, setTitle] = useState(image_titles[0]);
    const [buttonText, setButtonText] = useState(button_texts[0]);

    useEffect(() => {
        const timer = setInterval(() => {
            setImage(prevImage => {
                const newIndex = (aws_image_urls.indexOf(prevImage) + 1) % aws_image_urls.length;  
                setImage(aws_image_urls[newIndex]);
                setTitle(image_titles[newIndex]);
                setButtonText(button_texts[newIndex]);
                return aws_image_urls[newIndex];
            });
        }, 1000000);

        return () => {
            clearInterval(timer);
        };
    }, [aws_image_urls, image_titles, button_texts]);

    return (
        <div className='homepage-wrapper' style={{ backgroundImage: `url(${image})` }}> 
            <h2>{title}</h2>
            <button>{buttonText}</button>
        </div>
    );
}

export default Homepage;
