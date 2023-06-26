import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapShow = ({business}) => {
    const mapStyles = {
        height: '50vh',
        width: '100%',
    };

    const defaultCenter = {
        lat: business.lat,
        lng: business.lng,
    };

    return (
        <LoadScript googleMapsApiKey={process.env.REACT_APP_MAPS_API_KEY}>
            <GoogleMap mapContainerStyle={mapStyles} zoom={13} center={defaultCenter}>
                <Marker 
                    key={business.id}
                    position={{ lat: business.lat, lng: business.lng }}
                />
            </GoogleMap>
        </LoadScript>
    );
};

export default MapShow;