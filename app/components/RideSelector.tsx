'use client';
import { useEffect, useState } from 'react';
import PickPoints from './PickPoints';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Area } from '../lib/models/serviceArea';
import { motion } from 'framer-motion';
import OTPInput from 'react-otp-input';
import { useRouter } from 'next/navigation';
import Vehicles from './Vehicles';

export default function RideSelector({
    onRouteSelected,
}: {
    onRouteSelected: (pickup: google.maps.LatLng, dropoff: google.maps.LatLng) => void;
}) {
    const router = useRouter();

    const [activeTab, setActiveTab] = useState('drop-off');
    const [selectedVehicle, setSelectedVehicle] = useState('SUV');
    const [selectedRateType, setSelectedRateType] = useState(8);
    const [startDate, setStartDate] = useState(new Date());
    const [noOfDays, setNoOfDays] = useState('');
    const [distance, setDistance] = useState('0 km');
    const [taxiFare, setTaxiFare] = useState(0);
    const [bookingFare, setBookingFare] = useState(0);
    const [pickup, setPickup] = useState<google.maps.LatLng | null>(null);
    const [dropoff, setDropoff] = useState<google.maps.LatLng | null>(null);
    const [area, setArea] = useState<Area | null>(null);
    const [price, setPrice] = useState(null);
    const [error, setError] = useState('');
    const [showRegistration, setShowRegistration] = useState(false);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [txnId, setTxnId] = useState('');

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

                    onRouteSelected(pickup, dropoff);
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
        let totalPurchaseFare = 0;

        const { baseSellingRate, distanceSellingRate, basePurchaseRate, distancePurchaseRate } = pricing;

        // Single-side trip calculation (dropoff or one-way in round trip)
        const calculateBaseFare = (tripDistance: number) => {
            let fare = baseSellingRate;
            let purchaseFare = basePurchaseRate;
            if (tripDistance > pricing.distance) {
                fare += (tripDistance - pricing.distance) * distanceSellingRate;
                purchaseFare += (tripDistance - pricing.distance) * distancePurchaseRate;
            }

            return {
                fare,
                purchaseFare,
            };
        };

        // Drop-off (one-way)
        if (activeTab === 'drop-off') {
            totalFare = distance * distanceSellingRate;
            totalPurchaseFare = distance * distancePurchaseRate;
            // totalFare = _fare.fare;
            // totalPurchaseFare = _fare.purchaseFare;
        }
        // Round Trip (two-way)
        else if (activeTab === 'round-trip') {
            const _fare = calculateBaseFare(distance);
            totalFare = _fare.fare * 2;
            totalPurchaseFare = _fare.purchaseFare * 2;
        }
        // Package Trip (multi-day)
        else if (activeTab === 'package') {
            totalFare = baseSellingRate * Number(noOfDays); // Assuming 8-hour 80 km package per day
            totalPurchaseFare = basePurchaseRate * Number(noOfDays);
        }

        setTaxiFare(totalFare);
        setBookingFare(totalFare - totalPurchaseFare);

        console.log(totalFare);
    };

    const handleRegistration = async () => {
        try {
            if (!area || !pickup || !dropoff || !bookingFare) {
                setError('Please fill the reqiured fields');
                return;
            }

            setShowRegistration(true);
            setIsOtpSent(false);
        } catch {
            setError('Sorry, Something went wrong');
        }
    };

    const handleBooking = async () => {
        try {
            if (!area || !pickup || !dropoff || !bookingFare || name.length < 1 || phone.length < 1) {
                setError('Please fill the reqiured fields');
                return;
            }

            setError('');

            const data = {
                name,
                phone,
                pickupPoint: {
                    type: 'Point',
                    coordinates: [pickup.lat(), pickup.lng()],
                },
                dropOffPoint: {
                    type: 'Point',
                    coordinates: [dropoff.lat(), dropoff.lng()],
                },
                pickupPointName: '',
                dropOffPointName: '',
                tripType: activeTab,
                vehicleType: selectedVehicle.toLowerCase(),
                tripStartDateTime: startDate,
                tripDistance: distance.split(' ')[0],
                basePurchaseRate: price?.basePurchaseRate,
                baseSellingRate: price?.baseSellingRate,
                hourlyPurchaseRate: price?.hourlyPurchaseRate,
                hourlySellingRate: price?.hourlySellingRate,
                distancePurchaseRate: price?.distancePurchaseRate,
                distanceSellingRate: price?.distanceSellingRate,
                tripRate: taxiFare,
                tripBookingRate: bookingFare,
                tripBookingDate: startDate,
                transactionId: '',
                otp: '',
                isPaid: false,
                isVerified: false,
            };

            const response = await fetch('/api/booking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (result.status === 'success') {
                setIsOtpSent(true);
                setTxnId(result.data.transactionId);
                return;
            }

            console.log('failed', result);
        } catch {
            setError('Sorry, Something went wrong');
        }
    };

    const handlePayment = async () => {
        try {
            setError('');

            const response = await fetch('/api/payment', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phone,
                    otp,
                    transactionId: txnId,
                }),
            });

            const result = await response.json();

            if (result.status === 'success') {
                router.push(`/booked?id=${txnId}`);
                return;
            }

            if (result.status === 'failed') {
                setError(result.error);
            }
        } catch {
            setError('Error occured while booking, Please try again!');
        }
    };

    useEffect(() => {
        calculateDistance(area, pickup, dropoff);
    }, [selectedVehicle, selectedRateType, activeTab, noOfDays]);

    return (
        <div className="max-w-md mx-auto p-4 bg-white">
            <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: !showRegistration ? 'auto' : 0, opacity: !showRegistration ? 1 : 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="overflow-hidden"
            >
                <div className="">
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

                    <PickPoints calculateDistance={calculateDistance} />

                    {activeTab === 'package' && (
                        <div className="flex items-center space-x-3 mb-4">
                            <span className="w-3 h-3 bg-black rounded-sm"></span>
                            <div className="flex-1 bg-gray-100 px-4 py-2 rounded-md flex justify-between items-center">
                                <input
                                    type="number"
                                    min={1}
                                    className="bg-transparent outline-none text-sm flex-grow dark:text-black"
                                    placeholder="No of days"
                                    onChange={(e) => setNoOfDays(e.target.value)}
                                />
                                <button className="text-gray-400">✕</button>
                            </div>
                        </div>
                    )}

                    <div className="mb-6">
                        {/* <h3 className="text-sm font-semibold text-gray-700 mb-2">Select Vehicle:</h3> */}
                        <Vehicles onSelect={setSelectedVehicle} selected={selectedVehicle} />
                    </div>

                    {activeTab === 'round-trip' && (
                        <div className="mb-6">
                            <div className="flex justify-between">
                                <button
                                    onClick={() => setSelectedRateType(4)}
                                    className={`flex-1 text-center py-2 rounded-md mx-1 border flex justify-center items-center ${
                                        selectedRateType === 4
                                            ? 'bg-black text-white border-black'
                                            : 'bg-gray-100 text-gray-500 border-gray-300'
                                    }`}
                                >
                                    <div className="flex flex-col md:flex-column items-center">
                                        <span className="text-center text-xs md:text-left">4 Hour /</span>
                                        <span className="text-center text-xs md:text-left">40 Kilometers</span>
                                    </div>
                                </button>
                                <button
                                    onClick={() => setSelectedRateType(8)}
                                    className={`flex-1 text-center py-2 rounded-md mx-1 border flex justify-center items-center ${
                                        selectedRateType === 8
                                            ? 'bg-black text-white border-black'
                                            : 'bg-gray-100 text-gray-500 border-gray-300'
                                    }`}
                                >
                                    <div className="flex flex-col md:flex-column items-center">
                                        <span className="text-center text-xs md:text-left">8 Hour /</span>
                                        <span className="text-center text-xs md:text-left">80 Kilometers</span>
                                    </div>
                                </button>
                                <button
                                    onClick={() => setSelectedRateType(12)}
                                    className={`flex-1 text-center py-2 rounded-md mx-1 border flex justify-center items-center ${
                                        selectedRateType === 12
                                            ? 'bg-black text-white border-black'
                                            : 'bg-gray-100 text-gray-500 border-gray-300'
                                    }`}
                                >
                                    <div className="flex flex-col md:flex-column items-center">
                                        <span className="text-center text-xs md:text-left">12 Hour /</span>
                                        <span className="text-center text-xs md:text-left">120 Kilometers</span>
                                    </div>
                                </button>
                            </div>
                            {taxiFare > 0 && (
                                <span className="text-gray-400 mt-2 text-sm">
                                    Extra KM will be calculated at the rate of Rs.{price.distanceSellingRate}/KM
                                </span>
                            )}
                        </div>
                    )}

                    <div className="flex space-x-4 mb-6">
                        <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-md flex-1">
                            <span>📅</span>
                            <span className="text-sm">
                                <DatePicker
                                    selected={startDate}
                                    onChange={(date: Date) => {
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
                                    className="bg-gray-100 dark:text-black"
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
                                    onChange={(date: Date) => setStartDate(date)}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={15}
                                    timeCaption="Time"
                                    dateFormat="h:mm aa"
                                    className="bg-gray-100 dark:text-black"
                                    minTime={
                                        startDate?.toDateString() === new Date().toDateString() ? new Date() : new Date(0, 0, 0, 0, 0, 0)
                                    } // Restrict past times only for today
                                    maxTime={new Date(0, 0, 0, 23, 59, 59)} // Allow full selection for any day
                                />
                            </span>
                        </button>
                    </div>

                    {taxiFare > 0 && (
                        <div className="bg-white shadow-md rounded-lg p-4 mb-4">
                            <div className="flex justify-around ">
                                <div>
                                    <p className="text-xs text-gray-500">Distance</p>
                                    <p className="text-lg md:text-xl font-bold dark:text-black">
                                        {activeTab === 'round-trip' ? Number(distance.split(' ')[0]) * 2 : Number(distance.split(' ')[0])}{' '}
                                        km
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">Total Fare</p>
                                    <p className="text-lg md:text-xl font-bold dark:text-black">₹{taxiFare.toFixed(2)}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">Booking Fare</p>
                                    <p className="text-lg md:text-xl font-bold dark:text-black">₹{bookingFare.toFixed(2)}</p>
                                </div>
                            </div>
                            <p className="text-center mt-2 text-sm text-gray-500">
                                Book now by paying ₹{bookingFare.toFixed(2)}, pay the rest later
                            </p>
                        </div>
                    )}

                    <button className="w-full bg-black text-[#c9d302] py-3 rounded-md font-semibold" onClick={handleRegistration}>
                        Book now
                    </button>
                    <div className="text-sm text-red-500 text-center">{error}</div>
                </div>
            </motion.div>

            <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: showRegistration ? 'auto' : 0, opacity: showRegistration ? 1 : 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="overflow-hidden"
            >
                <button
                    onClick={() => setShowRegistration(false)}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-300 text-gray-800 rounded-md shadow-md transition mb-3"
                >
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"></path>
                    </svg>
                    <span>Back</span>
                </button>
                <div className="bg-white shadow-md rounded-lg p-4 mb-4">
                    <div className="flex justify-around">
                        <div>
                            <p className="text-xs text-gray-500">Distance</p>
                            <p className="text-lg md:text-xl font-bold dark:text-black">
                                {activeTab === 'round-trip' ? Number(distance.split(' ')[0]) * 2 : Number(distance.split(' ')[0])} km
                            </p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Total Fare</p>
                            <p className="text-lg md:text-xl font-bold dark:text-black">₹{taxiFare.toFixed(2)}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Booking Fare</p>
                            <p className="text-lg md:text-xl font-bold dark:text-black">₹{bookingFare.toFixed(2)}</p>
                        </div>
                    </div>
                    <p className="text-center mt-2 text-sm text-gray-500">
                        Book now by paying ₹{bookingFare.toFixed(2)}, pay the rest later
                    </p>
                </div>

                <div className="flex items-center space-x-3 mb-4">
                    <div className="flex-1">
                        <label className="text-sm font-medium text-gray-700 mb-1 block">Name</label>
                        <div className="bg-gray-100 px-4 py-2 rounded-md flex justify-between items-center">
                            <input
                                type="text"
                                className="bg-transparent outline-none text-sm flex-grow dark:text-black"
                                placeholder="Enter your name"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex items-center space-x-3 mb-4">
                    <div className="flex-1">
                        <label className="text-sm font-medium text-gray-700 mb-1 block">Phone</label>
                        <div className="bg-gray-100 px-4 py-2 rounded-md flex justify-between items-center ">
                            <input
                                type="number"
                                className="bg-transparent outline-none text-sm flex-grow dark:text-black"
                                placeholder="Phone number"
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {!isOtpSent && (
                    <button className="w-full bg-black text-[#c9d302] py-3 rounded-md font-semibold" onClick={handleBooking}>
                        Request OTP
                    </button>
                )}

                {isOtpSent && (
                    <div className="flex flex-1 flex-col justify-center items-center">
                        <div className="mx-4 text-gray-500 text-center mb-2">Didn&apos;t receive OTP?</div>
                        <button type="button" className="text-gray-800 bg-gray-100">
                            Resend OTP
                        </button>
                    </div>
                )}

                {isOtpSent && (
                    <>
                        <p className="text-gray-400 text-sm mb-2 text-center">Enter the OTP we’ve sent to your phone number</p>
                        <OTPInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={4}
                            inputType="number"
                            renderInput={(props) => (
                                <input
                                    {...props}
                                    style={{ width: '45px' }}
                                    className="w-[45px] h-[60px] border border-gray-300 rounded-lg text-center text-gray-800 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-gray-400"
                                />
                            )}
                            containerStyle="flex justify-center space-x-4 mb-4"
                        />

                        <button className="w-full bg-black text-[#c9d302] py-3 rounded-md font-semibold" onClick={handlePayment}>
                            Continue to Payment
                        </button>
                        <div className="text-sm text-red-500 text-center">{error}</div>
                    </>
                )}
            </motion.div>

            <p className="text-[14px] text-gray-600 mt-3">
                * All applicable charges, including permits, tolls, parking fees, and other government-mandated costs, are the
                responsibility of the passenger.
            </p>
        </div>
    );
}
