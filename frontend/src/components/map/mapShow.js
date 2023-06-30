import React from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';

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
        <GoogleMap mapContainerStyle={mapStyles} zoom={13} center={defaultCenter}>
            <Marker 
                key={business.id}
                position={{ lat: business.lat, lng: business.lng }}
            />
        </GoogleMap>
    );
};

export default MapShow;