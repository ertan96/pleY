import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import './map.css';
import { Link } from 'react-router-dom';

const MapContainer = ({businesses}) => {
    const [selected, setSelected] = useState(null);

    const onSelect = (business) => {
        setSelected(business);
    };

    const mapStyles = {
        height: '100vh',
        width: '100%',
    };

    const defaultCenter = {
    lat: 37.7749,
    lng: -122.4194,
    };

    return (
        <LoadScript googleMapsApiKey={process.env.REACT_APP_MAPS_API_KEY}>
            <GoogleMap mapContainerStyle={mapStyles} zoom={13} center={defaultCenter} mapContainerClassName='map-container'>
                {businesses.map((business, index) => {
                return (
                    <Marker 
                        key={business.id}
                        position={{ lat: business.lat, lng: business.lng }}
                        onClick={() => onSelect(business)}
                        label={(index + 1).toString()}
                    >
                    {selected === business && (
                        <InfoWindow
                            position={{ lat: business.lat, lng: business.lng }}
                            onCloseClick={() => setSelected(null)}
                        >
                            <Link to={`/businesses/${business.id}`}>
                                <div>
                                    <h3>{business.name}</h3>
                                    <p>{business.address}</p>
                                </div>
                            </Link>
                        </InfoWindow>
                    )}
                    </Marker>
                );
                })}
            </GoogleMap>
        </LoadScript>
    );
    };

export default MapContainer;