import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const MapContainer = () => {
    const mapStyles = {
        height: '100vh',
        width: '36%',
    };

    const defaultCenter = {
    lat: 37.7749,
    lng: -122.4194,
    };

    return (
        <LoadScript googleMapsApiKey={process.env.REACT_APP_MAPS_API_KEY}>
            <GoogleMap mapContainerStyle={mapStyles} zoom={13} center={defaultCenter} />
        </LoadScript>
    );
};

export default MapContainer;