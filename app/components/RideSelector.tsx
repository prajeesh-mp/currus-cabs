'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import PickPoints from './PickPoints';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Area } from '../lib/models/serviceArea';

export default function RideSelector() {
    const [activeTab, setActiveTab] = useState('drop-off');
    const [selectedVehicle, setSelectedVehicle] = useState('SUV');
    const [selectedRateType, setSelectedRateType] = useState(4);
    const [startDate, setStartDate] = useState(new Date());
    const [noOfDays, setNoOfDays] = useState('');
    const [distance, setDistance] = useState('0 km');
    const [taxiFare, setTaxiFare] = useState(0);
    const [pickup, setPickup] = useState<google.maps.LatLng | null>(null);
    const [dropoff, setDropoff] = useState<google.maps.LatLng | null>(null);
    const [area, setArea] = useState<Area | null>(null);
    const [price, setPrice] = useState<any>(null);
    const [error, setError] = useState('');

    const calculateDistance = (area: Area, pickup: google.maps.LatLng, dropoff: google.maps.LatLng) => {
        if (!pickup || !dropoff || !area) return;

        setPickup(pickup);
        setDropoff(dropoff);
        setArea(area);

        const service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
            {
                origins: [pickup],
                destinations: [dropoff],
                travelMode: google.maps.TravelMode.DRIVING,
            },
            (response, status) => {
                if (status === google.maps.DistanceMatrixStatus.OK) {
                    const distanceText = response.rows[0].elements[0].distance.text;
                    setDistance(distanceText);

                    calculateTripRate(area, selectedVehicle, Number(distanceText.split(' ')[0]), selectedRateType);

                    console.log(distanceText);
                } else {
                    console.error('Error fetching distance:', status);
                }
            },
        );
    };

    const calculateTripRate = (serviceArea: Area, vehicleType, distance, rateType): number | null => {
        console.log(serviceArea, vehicleType, distance, rateType);

        // Find pricing details for the selected vehicle type
        const pricing = serviceArea.pricing.find((p) => p.vehicleType === vehicleType && p.time === rateType);
        if (!pricing) {
            console.error('No pricing found for the selected vehicle type.');
            return null;
        }

        setPrice(pricing);

        let totalFare = 0;

        const { baseSellingRate, distanceSellingRate, basePurchaseRate, distancePurchaseRate } = pricing;

        // Single-side trip calculation (dropoff or one-way in round trip)
        const calculateBaseFare = (tripDistance: number) => {
            let fare = baseSellingRate;
            if (tripDistance > pricing.distance) {
                fare = fare + (tripDistance - pricing.distance) * distanceSellingRate;
            }

            return fare;
        };

        // Drop-off (one-way)
        if (activeTab === 'drop-off') {
            totalFare = calculateBaseFare(distance);
        }
        // Round Trip (two-way)
        else if (activeTab === 'round-trip') {
            totalFare = calculateBaseFare(distance) * 2;
        }
        // Package Trip (multi-day)
        else if (activeTab === 'package') {
            totalFare = baseSellingRate * Number(noOfDays); // Assuming 8-hour 80 km package per day
        }

        setTaxiFare(totalFare);

        console.log(totalFare);
    };

    useEffect(() => {
        calculateDistance(area, pickup, dropoff);
    }, [selectedVehicle, selectedRateType, activeTab, noOfDays]);

    return (
        <div className="max-w-md mx-auto p-4 bg-white">
            <div className="flex justify-around mb-6">
                <button
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
                        activeTab === 'drop-off' ? 'bg-gray-200 text-black font-semibold' : 'text-gray-400'
                    }`}
                    onClick={() => setActiveTab('drop-off')}
                >
                    <span>Drop Off</span>
                </button>
                <button
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
                        activeTab === 'round-trip' ? 'bg-gray-200 text-black font-semibold' : 'text-gray-400'
                    }`}
                    onClick={() => setActiveTab('round-trip')}
                >
                    <span>Round Trip</span>
                </button>
                <button
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
                        activeTab === 'package' ? 'bg-gray-200 text-black font-semibold' : 'text-gray-400'
                    }`}
                    onClick={() => {
                        setActiveTab('package');
                        setSelectedRateType(8);
                    }}
                >
                    <span>Package</span>
                </button>
            </div>

            <div>
                <PickPoints calculateDistance={calculateDistance} />

                {activeTab === 'package' && (
                    <div className="flex items-center space-x-3 mb-4">
                        <span className="w-3 h-3 bg-black rounded-sm"></span>
                        <div className="flex-1 bg-gray-100 px-4 py-2 rounded-md flex justify-between items-center">
                            <input
                                type="number"
                                min={1}
                                className="bg-transparent outline-none text-sm flex-grow"
                                placeholder="No of days"
                                onChange={(e) => setNoOfDays(e.target.value)}
                            />
                            <button className="text-gray-400">✕</button>
                        </div>
                    </div>
                )}

                <div className="mb-6">
                    {/* <h3 className="text-sm font-semibold text-gray-700 mb-2">Select Vehicle:</h3> */}
                    <div className="flex justify-between">
                        <button
                            onClick={() => setSelectedVehicle('SUV')}
                            className={`flex-1 text-center py-2 rounded-md mx-1 border flex justify-center items-center ${
                                selectedVehicle === 'SUV' ? 'bg-black text-white border-black' : 'bg-gray-100 text-gray-500 border-gray-300'
                            }`}
                        >
                            <div className="flex flex-col md:flex-row items-center">
                                <Image width={64} height={64} src="/suv.png" className="w-8 h-8  md:mb-0 md:mr-2" alt="SUV" />
                                <span className="text-center md:text-left">SUV</span>
                            </div>
                        </button>
                        <button
                            onClick={() => setSelectedVehicle('Sedan')}
                            className={`flex-1 text-center py-2 rounded-md mx-1 border flex justify-center items-center ${
                                selectedVehicle === 'Sedan'
                                    ? 'bg-black text-white border-black'
                                    : 'bg-gray-100 text-gray-500 border-gray-300'
                            }`}
                        >
                            <div className="flex flex-col md:flex-row items-center">
                                <Image width={64} height={64} src="/sedan.png" className="w-8 h-8 me-2" alt="Sedan" />
                                <span className="text-center md:text-left">Sedan</span>
                            </div>
                        </button>

                        <button
                            onClick={() => setSelectedVehicle('Hatchback')}
                            className={`flex-1 text-center py-2 rounded-md mx-1 border flex justify-center items-center ${
                                selectedVehicle === 'Hatchback'
                                    ? 'bg-black text-white border-black'
                                    : 'bg-gray-100 text-gray-500 border-gray-300'
                            }`}
                        >
                            <div className="flex flex-col md:flex-row items-center">
                                <Image width={64} height={64} src="/hatchback.png" className="w-8 h-8 me-2" alt="Sedan" />
                                <span className="text-center md:text-left">Hatchback</span>
                            </div>
                        </button>
                    </div>
                </div>

                <div className="mb-6">
                    {/* <h3 className="text-sm font-semibold text-gray-700 mb-2">Select Vehicle:</h3> */}
                    <div className="flex justify-between">
                        {activeTab !== 'package' && (
                            <button
                                onClick={() => setSelectedRateType(4)}
                                className={`flex-1 text-center py-2 rounded-md mx-1 border flex justify-center items-center ${
                                    selectedRateType === 4
                                        ? 'bg-black text-white border-black'
                                        : 'bg-gray-100 text-gray-500 border-gray-300'
                                }`}
                            >
                                <div className="flex flex-col md:flex-row items-center">
                                    <span className="text-center md:text-left">4 Hour / 40 Kilometers</span>
                                </div>
                            </button>
                        )}
                        <button
                            onClick={() => setSelectedRateType(8)}
                            className={`flex-1 text-center py-2 rounded-md mx-1 border flex justify-center items-center ${
                                selectedRateType === 8 ? 'bg-black text-white border-black' : 'bg-gray-100 text-gray-500 border-gray-300'
                            }`}
                        >
                            <div className="flex flex-col md:flex-row items-center">
                                <span className="text-center md:text-left">8 Hour / 80 Kilometers</span>
                            </div>
                        </button>
                    </div>
                    {taxiFare > 0 && (
                        <span className="text-gray-400 mt-2 text-sm">
                            Extra KM will be calculated at the rate of Rs.{price.distanceSellingRate}/KM
                        </span>
                    )}
                </div>

                <div className="flex space-x-4 mb-6">
                    <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-md flex-1">
                        <span>📅</span>
                        <span className="text-sm">
                            <DatePicker
                                selected={startDate}
                                onChange={(date: any) => {
                                    const today = new Date();

                                    console.log(date, today);
                                    if (date.toDateString() === today.toDateString()) {
                                        // If user switches back to today, reset the time to the current time
                                        setStartDate(new Date());
                                        return;
                                    }
                                    setStartDate(date);
                                }}
                                // timeInputLabel="Time:"
                                dateFormat="dd MMM yyyy"
                                // showTimeInput
                                className="bg-gray-100"
                                minDate={new Date()}
                                maxDate={new Date(new Date().setDate(new Date().getDate() + 30))}
                            />
                        </span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-md flex-1">
                        <span>⏰</span>
                        <span className="text-sm">
                            <DatePicker
                                selected={startDate}
                                onChange={(date: any) => setStartDate(date)}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={15}
                                timeCaption="Time"
                                dateFormat="h:mm aa"
                                className="bg-gray-100"
                                minTime={startDate?.toDateString() === new Date().toDateString() ? new Date() : new Date(0, 0, 0, 0, 0, 0)} // Restrict past times only for today
                                maxTime={new Date(0, 0, 0, 23, 59, 59)} // Allow full selection for any day
                            />
                        </span>
                    </button>
                </div>

                {taxiFare > 0 && (
                    <div className="bg-white shadow-md rounded-lg p-4 flex justify-around mb-4">
                        <div>
                            <p className="text-xs text-gray-500">Distance</p>
                            <p className="text-lg md:text-xl font-bold">
                                {activeTab === 'round-trip' ? Number(distance.split(' ')[0]) * 2 : Number(distance.split(' ')[0])} km
                            </p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Fare</p>
                            <p className="text-lg md:text-xl font-bold">₹{taxiFare.toFixed(2)}</p>
                        </div>
                    </div>
                )}

                <button className="w-full bg-black text-[#c9d302] py-3 rounded-md font-semibold">Book now</button>
            </div>

            <p className="text-[14px] text-gray-600 mt-3">
                * All applicable charges, including permits, tolls, parking fees, and other government-mandated costs, are the
                responsibility of the passenger.
            </p>
        </div>
    );
}
