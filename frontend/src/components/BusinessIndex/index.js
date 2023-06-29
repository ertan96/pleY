import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBusinesses, fetchSearch, getBusinesses } from '../../store/businesses';
import { fetchReviews } from '../../store/reviews';
import { StarRating } from '../StarRating';
import {Link} from 'react-router-dom';
import './BusinessIndex.css';
import { BiMessage } from 'react-icons/bi';
import MapContainer from '../map/map';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Filters from '../Filters';


function BusinessIndex() {
    const { term } = useParams();
    const dispatch = useDispatch();
    const businesses = useSelector(state => getBusinesses(state));
    const reviews = useSelector(state => state.reviews); 
    const businessesArray = Object.values(businesses)
    let sortedBusinessesArray = [...businessesArray].sort((a, b) => a.id - b.id);


    useEffect(() => {
        if (term) {
            dispatch(fetchSearch(term));
        } else {
            dispatch(fetchBusinesses());
        }
        dispatch(fetchReviews());
    }, [dispatch, term]);

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
    console.log('none')
    return (
        <div className="business-list">
            {Object.keys(businesses).length > 0 ? (
                <>
                    <div className='business-index-container'>
                        <div>
                            <Filters/>
                        </div>
                        <div className='left-container'>
                            <h1 className='left-header-text'>
                                {term ? `All "${term}" results in San Francisco, California` : "All results in San Francisco, California"}
                            </h1>
                            <ul>
                                {sortedBusinessesArray.map((business, index) => {
                                    let firstReviewText = 'No reviews yet.';
                                    let latestReviewId = null;
                                    for (let reviewId in reviews){
                                        if (reviews[reviewId].business_id === business.id){
                                            if (latestReviewId === null || reviews[reviewId].id > latestReviewId) {
                                                latestReviewId = reviews[reviewId].id;
                                                if (reviews[reviewId].body.length < 100) {
                                                    firstReviewText = reviews[reviewId].body;
                                                } else {
                                                    firstReviewText = `"${reviews[reviewId].body.substring(0, 100)}..."`;
                                                }
                                            }
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
                                                            <h2 className='ratings-row'>
                                                                <StarRating rating={businessStats.averageRating} size={20} />{businessStats.reviewCount}
                                                            </h2>
                                                            <h2 className='dollar-row'><button className='category-font'>{business.category}</button> $$</h2>
                                                            <h2 className='open-row'><span className='green-open-2'>Open</span>until 9:00 PM</h2>
                                                            <div className='review-preview-container'>
                                                                <h2 className='text-icon'><BiMessage/></h2>
                                                                <h2 className='review-preview-text'>{firstReviewText} <span className='more-text'> more</span></h2>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </ul>
                        </div>
                        <div className='map-sticky'>
                            <MapContainer businesses={businessesArray}/>
                        </div>
                    </div>
                </>
            ) : (
                <div className='no-result-container'>
                        <h2 className='no-result-header'> No results for {term} </h2>
                    <ul>
                        <li className='suggestion-row'>Suggestions for improving your results:</li>
                        <li className='tip-rows'>● Try a different location</li>
                        <li className='tip-rows'>● Check the spelling or try alternate spellings</li>
                        <li className='tip-rows'>● Try a more general search, e.g. "pizza" instead of "pepperoni"</li>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default BusinessIndex;
