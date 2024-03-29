import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './BusinessShowPage.css';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { AiOutlineStar } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBusiness, clearBusinesses } from '../../store/businesses';
import { fetchReviews} from '../../store/reviews';
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

    useEffect(() => {
        return () => {
            dispatch(clearBusinesses());
        };
    }, [dispatch]);

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
                    <div className='business-header-blur'> </div>
                    <div className='business-header-content'>
                        <h1>{business.name}</h1>
                        <h2 className='business-review-header'>
                            <StarRating className='star-icon' rating={averageRating}/> {reviewsForBusiness.length} Reviews</h2>
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
                                <Link to={`/reviews/new/${business.id}`} className='write-a-review'><AiOutlineStar size={24} />Write a review</Link>
                            </button>
                        </div>
                        <div className='business-location'>
                            <div className='top-location'>
                                <h2 className='location-hours'>Location & Hours</h2>
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
                            <h2 className='header-all-reviews'>All Reviews</h2>
                            <div className='review-split'>
                                <ReviewShow id={id}/>
                            </div>
                        </div>
                    </div>
                    <div className='right-bot-half'>
                        <div className='contact-container'>
                            <h2 className='contact-text'>Contact Me</h2>
                            <h3 className='title-text'>Full Stack Software Engineer</h3>
                            <div className='contact-links'>
                                <a href="https://www.linkedin.com/in/ernest-tan3/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                                <a href="https://github.com/ertan96" target="_blank" rel="noopener noreferrer">Github</a>
                                <a href="https://wellfound.com/u/ernest-tan-6" target="_blank" rel="noopener noreferrer">Wellfound</a>
                            </div>
                            <div className='resume-link'>
                                <a href="https://pley1-seeds.s3.us-west-1.amazonaws.com/resume+aA+v4.pdf" target="_blank" rel="noopener noreferrer" class="resume-button">Resume</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ) 
    } else {
        return <h2>Loading...</h2>
    }
}

export default BusinessShowPage;