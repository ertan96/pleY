import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './BusinessShowPage.css';

const BUSINESS_HOURS = `
Mon: 08:00 AM - 09:00 PM
Tue: 08:00 AM - 09:00 PM
Wed: 08:00 AM - 09:00 PM
Thu: 08:00 AM - 09:00 PM
Fri: 08:00 AM - 09:00 PM
Sat: 08:00 AM - 09:00 PM
Sun: 08:00 AM - 09:00 PM
`;

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
            <div className='business-page'>
                <div className='business-header'>
                    <h1>{business.name}</h1>
                </div>
                <div className='business-location'>
                    <h2 className=''>Location & Hours</h2>
                    <p>Address: {business.address}</p>
                    <pre className='business-hours'>{BUSINESS_HOURS}</pre>
                </div>
            </div>
        ) 
    } else {
        return <p>Loading...</p>
    }
}

export default BusinessShowPage;