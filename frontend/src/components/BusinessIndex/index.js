import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBusinesses, getBusinesses } from '../../store/businesses';
import {Link} from 'react-router-dom';
import './BusinessIndex.css';
import { BiMessage } from 'react-icons/bi'

function BusinessIndex() {
    const dispatch = useDispatch();
    const businesses = useSelector(getBusinesses);

    useEffect(() => {
        dispatch(fetchBusinesses());
    }, [dispatch]);

    return (
        <div className="business-list">
            <h1>All Restaurants</h1>
            <div className='business-index-container'>
                <ul>
                        {businesses.map((business, index) => (
                        <Link key={business.id} to={`/businesses/${business.id}`} style={{textDecoration: 'none'}}>
                        <div className='business-each'>
                            <li key={business.id}>
                                <div className='business-each-box'>
                                    <div className='business-photo'>
                                        <p>business photo goes here</p>
                                    </div>
                                    <div className='business-info'>
                                        <h2 className='business-header-font'>{index + 1}. <span className='name-hover'>{business.name}</span></h2>
                                        <p className='ratings-row'>Ratings go here</p>
                                        <p className='dollar-row'><button className='category-font'>{business.category}</button> $$</p>
                                        <p className='open-row'>Open until 9:00 PM</p>
                                        <div className='review-preview-container'>
                                            <p className='text-icon'><BiMessage/></p>
                                            <p className='review-preview-text'>"Reviews go here. Test test test test test test etst est testing testing testing testing testing testing testing testing testing testing testing test..." <span className='more-text'>more</span></p>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </div>
                        </Link>
                        ))}
                </ul>
            </div>
        </div>
    );
}

export default BusinessIndex;