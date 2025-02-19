import Image from 'next/image';
import { useEffect, useState } from 'react';

interface Props {
    onSelect: (vehicle: string) => void;
    selected: string;
}

export default function Vehicles({ onSelect, selected }: Props) {
    const [vehicleTypes, setVehicleTypes] = useState([]);

    const getVehicles = async () => {
        try {
            const response = await fetch('/api/vehicles');

            const result = await response.json();

            if (result.status === 'success') {
                setVehicleTypes(result.data);
                onSelect(result.data[0]?.name);
                return;
            }
        } catch {}
    };

    useEffect(() => {
        getVehicles();
    }, []);

    return (
        <div className="flex justify-between">
            {vehicleTypes.map((vehicle, index) => (
                <button
                    key={index}
                    onClick={() => onSelect(vehicle.name)}
                    className={`flex-1 text-center py-2 rounded-md mx-1 border flex justify-center items-center ${
                        selected === vehicle.name ? 'bg-black text-white border-black' : 'bg-gray-100 text-gray-500 border-gray-300'
                    }`}
                >
                    <div className="flex flex-col md:flex-row items-center">
                        <Image width={64} height={64} src={vehicle.icon} className="w-8 h-8  md:mb-0 md:mr-2" alt="SUV" />
                        <span className="text-center md:text-left text-xs">{vehicle.name}</span>
                    </div>
                </button>
            ))}
        </div>
    );
}
