import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBusinesses, getBusinesses } from '../../store/businesses';
import { fetchReviews } from '../../store/reviews';
import { StarRating } from '../StarRating';
import {Link} from 'react-router-dom';
import './BusinessIndex.css';
import { BiMessage } from 'react-icons/bi';
import MapContainer from '../map/map';


function BusinessIndex() {
    const dispatch = useDispatch();
    const businesses = useSelector(getBusinesses);
    const reviews = useSelector(state => state.reviews); 
    const businessesArray = Object.values(businesses)


    useEffect(() => {
        dispatch(fetchBusinesses());
        dispatch(fetchReviews());
    }, [dispatch]);

    const businessAverage = (businessId) => {
        const relevantReviews = Object.values(reviews).filter(review => review.business_id === businessId);
    
        const average = relevantReviews.length > 0
            ? Math.round(relevantReviews.reduce((sum, review) => sum + review.rating, 0) / relevantReviews.length)
            : 0;
    
        return {
            averageRating: average,
            reviewCount: relevantReviews.length,
        };
    }

    return (
        <div className="business-list">
            <h1>All Restaurants</h1>
            <div className='business-index-container'>
                <ul>
                    {businesses.map((business, index) => {
                        let firstReviewText = 'No reviews yet.';
                        for (let reviewId in reviews){
                            if (reviews[reviewId].business_id === business.id){
                                firstReviewText = reviews[reviewId].body;
                                break;
                            }
                        }
                        const businessStats = businessAverage(business.id)
                        return (
                            <Link key={business.id} to={`/businesses/${business.id}`} style={{textDecoration: 'none'}}>
                                <div className='business-each'>
                                    <li key={business.id}>
                                        <div className='business-each-box'>
                                            <div className='business-photo'>
                                                {business.photosUrls && business.photosUrls.length > 0 && 
                                                    <div className='business-photo-item'>
                                                        <img src={business.photosUrls[0]} alt="business" />
                                                    </div>
                                                }
                                            </div>
                                            <div className='business-info'>
                                                <h2 className='business-header-font'>{index + 1}. <span className='name-hover'>{business.name}</span></h2>
                                                <p className='ratings-row'>
                                                    <StarRating rating={businessStats.averageRating} />{businessStats.reviewCount}
                                                </p>
                                                <p className='dollar-row'><button className='category-font'>{business.category}</button> $$</p>
                                                <p className='open-row'>Open until 9:00 PM</p>
                                                <div className='review-preview-container'>
                                                    <p className='text-icon'><BiMessage/></p>
                                                    <p className='review-preview-text'>{firstReviewText} <span className='more-text'>more</span></p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </div>
                            </Link>
                        );
                    })}
                </ul>
                <div className='map-sticky'>
                    <MapContainer businesses={businessesArray}/>
                </div>
            </div>
        </div>
    );
}

export default BusinessIndex;
