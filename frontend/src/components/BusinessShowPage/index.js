import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function BusinessShowPage() {
    const [business, setBusiness] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        fetch(`/api/businesses/${id}`)
            .then(response => response.json())
            .then(data => setBusiness(data))
            .catch(error => console.error('Error fetching business:', error));
    }, [id]);

    if (business) {
        return (
            <div>
                <h1>{business.name}</h1>
                <p>Address: {business.address}</p>
                <p>Latitude: {business.latitude}</p>
                <p>Longitude: {business.longitude}</p>
                <p>Category: {business.category}</p>
            </div>
        ) 
    } else {
        return <p>Loading...</p>
    }
}

export default BusinessShowPage;