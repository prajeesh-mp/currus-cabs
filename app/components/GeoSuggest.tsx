import React, { useEffect, useRef, useState } from 'react';

interface GeoSuggestProps {
    placeholder?: string;
    onPlaceSelected: (place: google.maps.places.PlaceResult) => void;
}

const GeoSuggest: React.FC<GeoSuggestProps> = ({ placeholder, onPlaceSelected }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [address, setAddress] = useState('');

    const handlePlaceChanged = async (autocomplete: google.maps.places.Autocomplete) => {
        const place = autocomplete.getPlace();

        if (!place || !place.geometry) {
            return;
        }

        const selectedLocation = {
            formatted_address: place.formatted_address || '',
            lat: place.geometry.location?.lat(),
            lng: place.geometry.location?.lng(),
        };

        // Update input field with the selected address
        setAddress(selectedLocation.formatted_address);

        // Call parent callback
        onPlaceSelected(place);

        console.log(selectedLocation, 'Selected Place');
    };

    useEffect(() => {
        // if (!isLoaded || loadError) {
        //     return;
        // }

        const options = {
            componentRestrictions: { country: 'in' },
            fields: ['formatted_address', 'geometry'],
        };

        const autocomplete = new google.maps.places.Autocomplete(inputRef.current!, options);
        autocomplete.addListener('place_changed', () => handlePlaceChanged(autocomplete));
    }, []);

    return (
        <>
            <input
                ref={inputRef}
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder={placeholder || 'Search location'}
                className="bg-transparent outline-none text-sm flex-grow dark:text-black"
            />
            <button
                className="text-gray-400"
                onClick={() => {
                    setAddress('');
                    localStorage.removeItem('selectedLocation'); // Clear stored location
                }}
            >
                ✕
            </button>
        </>
    );
};

export default GeoSuggest;
