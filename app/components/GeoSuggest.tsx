import { useLoadScript } from '@react-google-maps/api';
import React, { useEffect, useRef, useState } from 'react';

interface GeoSuggestProps {
    placeholder?: string;
    onPlaceSelected: (place: google.maps.places.PlaceResult) => void;
    apiKey: string;
}

const libraries: Array<'drawing' | 'places' | 'geometry'> = ['drawing', 'places', 'geometry'];

const GeoSuggest: React.FC<GeoSuggestProps> = ({ placeholder, onPlaceSelected, apiKey }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    // const [isLoaded, setIsLoaded] = useState(false);
    const [input, setInput] = useState({});

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: apiKey,
        libraries,
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInput((values) => ({ ...values, [name]: value }));
    };

    const handlePlaceChanged = async (address) => {
        if (!isLoaded) return;
        const place = address.getPlace();

        if (!place || !place.geometry) {
            setInput({});
            return;
        }

        onPlaceSelected(place);

        console.log(place, 'place');
    };

    useEffect(() => {
        if (!isLoaded || loadError) {
            console.log(loadError);
            console.log(isLoaded);

            return;
        }

        console.log(isLoaded, 'isLoaded');

        const options = {
            componentRestrictions: { country: 'in' },
            fields: ['address_components', 'geometry'],
        };

        const autocomplete = new google.maps.places.Autocomplete(inputRef.current, options);
        autocomplete.addListener('place_changed', () => handlePlaceChanged(autocomplete));

        // return () => autocomplete.removeListener("place_changed", handlePlaceChanged);
    }, [isLoaded, loadError]);

    return (
        <>
            <input
                ref={inputRef}
                type="text"
                placeholder={placeholder || 'Search location'}
                className="bg-transparent outline-none text-sm flex-grow"
                onChange={handleChange}
            />
            <button className="text-gray-400">✕</button>
        </>
    );
};

export default GeoSuggest;
