'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { DirectionsRenderer, GoogleMap } from '@react-google-maps/api';

interface Props {
    pickup: google.maps.LatLng;
    dropoff: google.maps.LatLng;
}

const MapWithRoute: React.FC<Props> = ({ pickup, dropoff }) => {
    const [directionsResponse, setDirectionsResponse] = useState<google.maps.DirectionsResult | null>(null);
    const mapRef = useRef<google.maps.Map | null>(null);

    const mapStyles = {
        height: '500px',
        width: '100%',
    };

    const defaultCenter: google.maps.LatLngLiteral = {
        lat: 11.874462907374323,
        lng: 75.37030694602588,
    };

    const fetchRoute = useCallback(() => {
        if (!google.maps) return;

        const directionsService = new google.maps.DirectionsService();
        console.log('direccc');

        directionsService.route(
            {
                origin: { lat: pickup.lat(), lng: pickup.lng() },
                destination: { lat: dropoff.lat(), lng: dropoff.lng() },
                travelMode: google.maps.TravelMode.DRIVING,
            },
            (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    setDirectionsResponse(result);
                } else {
                    console.error(`Error fetching directions: ${status}`);
                }
            },
        );
    }, [pickup, dropoff]);

    useEffect(() => {
        if (!pickup || !dropoff) return;

        fetchRoute();
    }, [pickup, dropoff]);

    return (
        <GoogleMap
            mapContainerStyle={mapStyles}
            center={defaultCenter}
            zoom={9}
            onLoad={(map) => {
                mapRef.current = map;
                // fetchRoute();
            }}
        >
            {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
        </GoogleMap>
    );
};

export default MapWithRoute;
