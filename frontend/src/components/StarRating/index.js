import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

export function StarRating({ rating }) {
    return (
        <div>
            {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;
                return (
                    <label key={i}>
                        <FaStar
                            color={ratingValue <= rating ? "#ffc107" : "#e4e5e9"}
                            size={30}
                        />
                    </label>
                );
            })}
        </div>
    );
}

export function StarInput({rating, setRating}) {
    const [hover, setHover] = useState(null);

    return (
        <div>
            {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;
                
                return (
                    <label key={i}>
                        <input 
                            type="radio" 
                            name="rating" 
                            value={ratingValue} 
                            onClick={() => setRating(ratingValue)}
                            style={{display: 'none'}}
                        />
                        <FaStar 
                            size={30} 
                            color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(null)}
                        />
                    </label>
                );
            })}
        </div>
    );
}
