import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './BusinessShowPage.css';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBusiness, getBusiness } from '../../store/businesses';
import { Link } from 'react-router-dom';


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
    const dispatch = useDispatch();
    const { id } = useParams();
    const business = useSelector(state => state.businesses[id]);

    useEffect(() => {
        dispatch(fetchBusiness(id));
    }, [dispatch, id]);

    if (business) {
        const headerStyle = {
            backgroundImage: `url(${business.photoUrl})`,
            backgroundSize: 'contain', // this will make sure that the background image covers the whole area
            backgroundPosition: 'center', // this centers the image in the div
            backgroundRepeat: 'repeat'
            // add any other styles you want
        };

        return (
            <div className='business-page'>
                <div className='business-header' style={headerStyle}>
                    <div className='business-header-content'>
                        <h1>{business.name}</h1>
                        <h2 className='business-review-header'>Reviews go here 324 Reviews</h2>
                        <h2 className='claimed-row'>
                            <span className='claimed-style'>
                                <BsFillCheckCircleFill /> Claimed  
                            </span>
                            <span className='bullet-point'> &bull; </span>
                            $$ 
                            <span className='bullet-point'> &bull; </span>
                            {business.category}
                        </h2>
                        <h3 className='store-hour-row'>
                            <span className='green-open'>Open</span>
                            8:00 AM - 9:00 PM
                        </h3>
                    </div>
                    <div className='business-photo-row'>
                        {business.photosUrls && business.photosUrls.map((url, index) => (
                            <div key={index} className='business-photo-item'>
                                <img src={url} alt="business" />
                            </div>
                        ))}
                    </div>
                </div>
                <div className='bottom-half-component'>
                    <div className='left-bot-half'>
                        <div className='create-review-container'>
                            <button className='review-button'>
                                <Link to='/reviews/new'>Write a review</Link>
                            </button>
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
                            
                            {/* <div>
                                <img src={business.photoUrl} alt="none"/>
                            </div> */}
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