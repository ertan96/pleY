import React from 'react';
import { Link } from 'react-router-dom';
import './HomepagePhoto.css';

function HomepagePhoto() {
    return (
        <div>
            <Link to="/businesses">
                <button>View All Businesses</button>
            </Link>
        </div>
    );
}

export default HomepagePhoto;