import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './BusinessShowPage.css';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBusiness} from '../../store/businesses';
import { fetchReviews, getReviews } from '../../store/reviews';
import { Link } from 'react-router-dom';
import ReviewShow from '../ReviewShow';
import { StarRating } from '../StarRating';
import MapShow from '../map/mapShow';

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
    const reviews = useSelector(state => state.reviews);

    useEffect(() => {
        dispatch(fetchBusiness(id));
        dispatch(fetchReviews());
    }, [dispatch, id]);

    const calculateAverageRating = (reviews) => {
        if (reviews.length === 0) {
            return 0;
        }
    
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        return Math.round(totalRating / reviews.length);
    }

    if (business) {
        const headerStyle = {
            backgroundImage: `url(${business.photoUrl})`,
            backgroundSize: 'contain', 
            backgroundPosition: 'center', 
            backgroundRepeat: 'repeat'
        };

        const reviewsForBusiness = Object.values(reviews).filter(review => review.business_id === parseInt(id));
        const averageRating = calculateAverageRating(reviewsForBusiness);

        return (
            <div className='business-page'>
                <div className='business-header' style={headerStyle}>
                    <div className='business-header-content'>
                        <h1>{business.name}</h1>
                        <h2 className='business-review-header'>
                            <StarRating className='star-icon' rating={averageRating}/> {reviews.length} Reviews</h2>
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
                                <Link to={`/reviews/new/${business.id}`}>Write a review</Link>
                            </button>
                        </div>
                        <div className='business-location'>
                            <div className='top-location'>
                                <h2 className='location-hours'>Location & Hours</h2>
                                <button className='suggest-edit'>Suggest an edit</button>
                            </div>
                            <div className='map-time-container'>
                                <div className='map-address-left'>
                                    <MapShow business={business} />
                                    <h2 className='address-line'>{business.address}</h2>
                                    <h2 className='address-line'>San Francisco, CA</h2>
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
                            <div className='review-split'>
                                <h2>All Reviews</h2>
                                <ReviewShow id={id}/>
                                {/* <div>
                                    <img src={business.photoUrl} alt="none"/>
                                </div> */}
                            </div>
                        </div>
                    </div>
                    <div className ='right-bot-half'>
                        <h2>floating scrolling area to put some stuff here</h2>
                    </div>
                </div>
            </div>
        ) 
    } else {
        return <h2>Loading...</h2>
    }
}

export default BusinessShowPage;