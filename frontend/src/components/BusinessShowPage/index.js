import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './BusinessShowPage.css';

const BUSINESS_HOURS = [
    { day: 'Mon', hours: '08:00 AM - 09:00 PM' },
    { day: 'Tue', hours: '08:00 AM - 09:00 PM' },
    { day: 'Wed', hours: '08:00 AM - 09:00 PM' },
    { day: 'Thu', hours: '08:00 AM - 09:00 PM' },
    { day: 'Fri', hours: '08:00 AM - 09:00 PM' },
    { day: 'Sat', hours: '08:00 AM - 09:00 PM' },
    { day: 'Sun', hours: '08:00 AM - 09:00 PM' },
];

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
                <div className='bottom-half-component'>
                    <div className='left-bot-half'>
                        <div className='create-review-container'>
                            <button className='review-button'>Write a review</button>
                        </div>
                        <div className='business-location'>
                            <div className='top-location'>
                                <h2 className='location-hours'>Location & Hours</h2>
                                <button className='suggest-edit'>Suggest an edit</button>
                            </div>
                            <div className='map-time-container'>
                                <div className='map-address-left'>
                                    <p className='address-line'>{business.address}</p>
                                    <p className='address-line'>San Francisco, CA</p>
                                </div>
                                <div className='time-right'>
                                    <table className='business-hours'>
                                        <tbody>
                                            {BUSINESS_HOURS.map((item, index) => (
                                                <tr key={index}>
                                                <td>{item.day}</td>
                                                <td>{item.hours}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className='review-section-container'>
                            <h2>All Reviews</h2>
                            <p>Reviews go here</p>
                        </div>
                    </div>
                    <div className ='right-bot-half'>
                        <p>floating scrolling area to put some stuff here</p>
                    </div>
                </div>
            </div>
        ) 
    } else {
        return <p>Loading...</p>
    }
}

export default BusinessShowPage;