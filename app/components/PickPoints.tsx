import { useEffect, useState } from 'react';
import GeoSuggest from './GeoSuggest';
import { Area } from '../lib/models/serviceArea';

export default function PickPoints({
    calculateDistance,
}: {
    calculateDistance: (area: Area, pickup: google.maps.LatLng, dropoff: google.maps.LatLng) => void;
}) {
    const [pickup, setPickup] = useState<google.maps.LatLng | null>(null);
    const [dropoff, setDropoff] = useState<google.maps.LatLng | null>(null);
    const [error, setError] = useState('');
    const [area, setArea] = useState<Area | null>(null);

    const fetchServiceArea = async (point: { lat: number; lng: number }, placeName) => {
        try {
            setError('');

            const response = await fetch('/api/service-area', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(point),
            });

            const result = await response.json();

            if (result.status === 'success') {
                console.log(result.data);
                setArea(result.data);
                return;
            }

            setError("Sorry, We don't have service in " + placeName);

            console.log('failed', result);
        } catch (error) {
            console.log(error, 'area');
        }
    };

    const handlePickupSelected = async (place: google.maps.places.PlaceResult) => {
        console.log(place, 'pic');

        if (place.geometry) {
            setPickup(place.geometry.location);
            await fetchServiceArea(
                {
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                },
                place.address_components?.[0].long_name,
            );
        }
    };

    const handleDropoffSelected = (place: google.maps.places.PlaceResult) => {
        if (place.geometry) {
            setDropoff(place.geometry.location);
        }
    };

    useEffect(() => {
        if (pickup && dropoff) {
            calculateDistance(area, pickup, dropoff);
        }
    }, [pickup, dropoff]);

    return (
        <>
            <div className="flex items-center space-x-3 mb-4">
                <span className="w-3 h-3 bg-black rounded-full"></span>
                <div className="flex-1 bg-gray-100 px-4 py-2 rounded-md flex justify-between items-center">
                    {/* <input type="text" className="bg-transparent outline-none text-sm flex-grow" placeholder="Pickup location" /> */}
                    <GeoSuggest
                        placeholder="Pickup location"
                        onPlaceSelected={handlePickupSelected}
                        apiKey={'AIzaSyB61L4am51qSd55nPMrHA6VLzujwsIApVc'}
                    />
                </div>
            </div>

            <div className="flex items-center space-x-3 mb-4">
                <span className="w-3 h-3 bg-black rounded-sm"></span>
                <div className="flex-1 bg-gray-100 px-4 py-2 rounded-md flex justify-between items-center">
                    {/* <input type="text" className="bg-transparent outline-none text-sm flex-grow" placeholder="Dropoff location" /> */}
                    <GeoSuggest
                        placeholder="Dropoff location"
                        onPlaceSelected={handleDropoffSelected}
                        apiKey={'AIzaSyB61L4am51qSd55nPMrHA6VLzujwsIApVc'}
                    />
                </div>
            </div>
            <div className="text-red-400 text-sm text-center font-semibold">{error}</div>
        </>
    );
}
