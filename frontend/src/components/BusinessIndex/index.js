import React, { useEffect, useState } from 'react';
import './BusinessIndex.css';

function BusinessIndex() {
    const [businesses, setBusinesses] = useState([]);

    useEffect(() => {
        fetch('/api/businesses')
            .then(response => response.json())
            .then(data => setBusinesses(data))
            .catch(error => console.error('Error fetching businesses:', error));
    }, []);

    return (
        <div className="business-list">
            <h1>All Businesses</h1>
            <ul>
                {businesses.map((business) => (
                    <li key={business.id}>
                        <h2>{business.name}</h2>
                        <p>Address: {business.address}</p>
                        <p>Category: {business.category}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default BusinessIndex;