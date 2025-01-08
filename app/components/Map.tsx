'use client';
import React, { useRef, useState } from 'react';
import { GoogleMap, LoadScript, DirectionsRenderer } from '@react-google-maps/api';

const MapWithRoute: React.FC = () => {
    const [directionsResponse] = useState<google.maps.DirectionsResult | null>(null);
    const mapRef = useRef<google.maps.Map | null>(null);

    const mapStyles = {
        height: '500px',
        width: '100%',
    };

    const defaultCenter: google.maps.LatLngLiteral = {
        lat: 37.7749, // San Francisco
        lng: -122.4194,
    };

    // const fetchRoute = useCallback(() => {
    //     if (!google.maps) return;

    //     const directionsService = new google.maps.DirectionsService();
    //     console.log('direccc');

    //     directionsService.route(
    //         {
    //             origin: 'San Francisco, CA',
    //             destination: 'Los Angeles, CA',
    //             travelMode: google.maps.TravelMode.DRIVING,
    //         },
    //         (result, status) => {
    //             if (status === google.maps.DirectionsStatus.OK) {
    //                 setDirectionsResponse(result);
    //             } else {
    //                 console.error(`Error fetching directions: ${status}`);
    //             }
    //         },
    //     );
    // }, []);

    return (
        <LoadScript googleMapsApiKey="AIzaSyDrBctR4cVrI6srdCwQ2oAwLMa9NvDfyt0">
            <GoogleMap
                mapContainerStyle={mapStyles}
                center={defaultCenter}
                zoom={8}
                onLoad={(map) => {
                    mapRef.current = map;
                    // fetchRoute();
                }}
            >
                {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
            </GoogleMap>
        </LoadScript>
    );
};

export default MapWithRoute;
