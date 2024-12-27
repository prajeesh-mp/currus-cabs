'use client';
import { useState } from 'react';

export default function RideSelector() {
    const [activeTab, setActiveTab] = useState('drop-off');
    const [selectedVehicle, setSelectedVehicle] = useState('suv');

    return (
        <div className="max-w-md mx-auto p-4 bg-white">
            <div className="flex justify-around mb-6">
                <button
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
                        activeTab === 'drop-off' ? 'bg-gray-200 text-black font-semibold' : 'text-gray-400'
                    }`}
                    onClick={() => setActiveTab('drop-off')}
                >
                    {/* <span className="w-5 h-5 bg-gray-100 rounded flex justify-center items-center">🚗 Replace with an icon</span> */}
                    <span>Drop Off</span>
                </button>
                <button
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
                        activeTab === 'round-trip' ? 'bg-gray-200 text-black font-semibold' : 'text-gray-400'
                    }`}
                    onClick={() => setActiveTab('round-trip')}
                >
                    {/* <span className="w-5 h-5 bg-gray-100 rounded flex justify-center items-center">📦 Replace with an icon</span> */}
                    <span>Round Trip</span>
                </button>
                <button
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
                        activeTab === 'package' ? 'bg-gray-200 text-black font-semibold' : 'text-gray-400'
                    }`}
                    onClick={() => setActiveTab('package')}
                >
                    {/* <span className="w-5 h-5 bg-gray-100 rounded flex justify-center items-center">📦 Replace with an icon</span> */}
                    <span>Package</span>
                </button>
            </div>

            {/* Ride Details */}
            {activeTab === 'drop-off' && (
                <div>
                    {/* From Input */}
                    <div className="flex items-center space-x-3 mb-4">
                        <span className="w-3 h-3 bg-black rounded-full"></span>
                        <div className="flex-1 bg-gray-100 px-4 py-2 rounded-md flex justify-between items-center">
                            <input type="text" className="bg-transparent outline-none text-sm flex-grow" placeholder="Pickup location" />
                            <button className="text-gray-400">✕</button>
                        </div>
                    </div>

                    {/* To Input */}
                    <div className="flex items-center space-x-3 mb-4">
                        <span className="w-3 h-3 bg-black rounded-sm"></span>
                        <div className="flex-1 bg-gray-100 px-4 py-2 rounded-md flex justify-between items-center">
                            <input type="text" className="bg-transparent outline-none text-sm flex-grow" placeholder="Dropoff location" />
                            <button className="text-gray-400">✕</button>
                        </div>
                    </div>

                    <div className="mb-6">
                        {/* <h3 className="text-sm font-semibold text-gray-700 mb-2">Select Vehicle:</h3> */}
                        <div className="flex justify-between">
                            <button
                                onClick={() => setSelectedVehicle('suv')}
                                className={`flex-1 text-center py-2 rounded-md mx-1 border ${
                                    selectedVehicle === 'suv'
                                        ? 'bg-black text-white border-black'
                                        : 'bg-gray-100 text-gray-500 border-gray-300'
                                }`}
                            >
                                🚙 SUV
                            </button>

                            {/* Sedan Option */}
                            <button
                                onClick={() => setSelectedVehicle('sedan')}
                                className={`flex-1 text-center py-2 rounded-md mx-1 border ${
                                    selectedVehicle === 'sedan'
                                        ? 'bg-black text-white border-black'
                                        : 'bg-gray-100 text-gray-500 border-gray-300'
                                }`}
                            >
                                🚗 Sedan
                            </button>

                            {/* Hatchback Option */}
                            <button
                                onClick={() => setSelectedVehicle('hatchback')}
                                className={`flex-1 text-center py-2 rounded-md mx-1 border ${
                                    selectedVehicle === 'hatchback'
                                        ? 'bg-black text-white border-black'
                                        : 'bg-gray-100 text-gray-500 border-gray-300'
                                }`}
                            >
                                🚕 Hatchback
                            </button>
                        </div>
                    </div>

                    {/* Date and Time */}
                    <div className="flex space-x-4 mb-6">
                        <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-md flex-1">
                            <span>📅</span> {/* Replace with an icon */}
                            <span className="text-sm">Today</span>
                        </button>
                        <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-md flex-1">
                            <span>⏰</span> {/* Replace with an icon */}
                            <span className="text-sm">Now</span>
                            <span>▼</span>
                        </button>
                    </div>

                    <button className="w-full bg-black text-[#c9d302] py-3 rounded-md font-semibold">Book now</button>
                </div>
            )}

            {/* Courier Details (Optional, similar layout) */}
            {activeTab === 'round-trip' && (
                <div>
                    {/* From Input */}
                    <div className="flex items-center space-x-3 mb-4">
                        <span className="w-3 h-3 bg-black rounded-full"></span>
                        <div className="flex-1 bg-gray-100 px-4 py-2 rounded-md flex justify-between items-center">
                            <input type="text" className="bg-transparent outline-none text-sm flex-grow" placeholder="Pickup location" />
                            <button className="text-gray-400">✕</button>
                        </div>
                    </div>

                    {/* To Input */}
                    <div className="flex items-center space-x-3 mb-4">
                        <span className="w-3 h-3 bg-black rounded-sm"></span>
                        <div className="flex-1 bg-gray-100 px-4 py-2 rounded-md flex justify-between items-center">
                            <input type="text" className="bg-transparent outline-none text-sm flex-grow" placeholder="Dropoff location" />
                            <button className="text-gray-400">✕</button>
                        </div>
                    </div>

                    <div className="mb-6">
                        {/* <h3 className="text-sm font-semibold text-gray-700 mb-2">Select Vehicle:</h3> */}
                        <div className="flex justify-between">
                            <button
                                onClick={() => setSelectedVehicle('suv')}
                                className={`flex-1 text-center py-2 rounded-md mx-1 border ${
                                    selectedVehicle === 'suv'
                                        ? 'bg-black text-white border-black'
                                        : 'bg-gray-100 text-gray-500 border-gray-300'
                                }`}
                            >
                                🚙 SUV
                            </button>

                            {/* Sedan Option */}
                            <button
                                onClick={() => setSelectedVehicle('sedan')}
                                className={`flex-1 text-center py-2 rounded-md mx-1 border ${
                                    selectedVehicle === 'sedan'
                                        ? 'bg-black text-white border-black'
                                        : 'bg-gray-100 text-gray-500 border-gray-300'
                                }`}
                            >
                                🚗 Sedan
                            </button>

                            {/* Hatchback Option */}
                            <button
                                onClick={() => setSelectedVehicle('hatchback')}
                                className={`flex-1 text-center py-2 rounded-md mx-1 border ${
                                    selectedVehicle === 'hatchback'
                                        ? 'bg-black text-white border-black'
                                        : 'bg-gray-100 text-gray-500 border-gray-300'
                                }`}
                            >
                                🚕 Hatchback
                            </button>
                        </div>
                    </div>

                    <div className="flex space-x-4 mb-6">
                        <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-md flex-1">
                            <span>📅</span> {/* Replace with an icon */}
                            <span className="text-sm">Today</span>
                        </button>
                        <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-md flex-1">
                            <span>⏰</span> {/* Replace with an icon */}
                            <span className="text-sm">Now</span>
                            <span>▼</span>
                        </button>
                    </div>

                    <button className="w-full bg-black text-white py-3 rounded-md font-semibold">Book now</button>
                </div>
            )}

            {activeTab === 'package' && (
                <div>
                    <div className="flex items-center space-x-3 mb-4">
                        <span className="w-3 h-3 bg-black rounded-full"></span>
                        <div className="flex-1 bg-gray-100 px-4 py-2 rounded-md flex justify-between items-center">
                            <input type="text" className="bg-transparent outline-none text-sm flex-grow" placeholder="Pickup location" />
                            <button className="text-gray-400">✕</button>
                        </div>
                    </div>

                    <div className="flex items-center space-x-3 mb-4">
                        <span className="w-3 h-3 bg-black rounded-sm"></span>
                        <div className="flex-1 bg-gray-100 px-4 py-2 rounded-md flex justify-between items-center">
                            <input type="text" className="bg-transparent outline-none text-sm flex-grow" placeholder="Dropoff location" />
                            <button className="text-gray-400">✕</button>
                        </div>
                    </div>

                    <div className="flex items-center space-x-3 mb-4">
                        <span className="w-3 h-3 bg-black rounded-sm"></span>
                        <div className="flex-1 bg-gray-100 px-4 py-2 rounded-md flex justify-between items-center">
                            <input
                                type="number"
                                min={1}
                                className="bg-transparent outline-none text-sm flex-grow"
                                placeholder="No of days"
                            />
                            <button className="text-gray-400">✕</button>
                        </div>
                    </div>

                    <div className="mb-6">
                        {/* <h3 className="text-sm font-semibold text-gray-700 mb-2">Select Vehicle:</h3> */}
                        <div className="flex justify-between">
                            <button
                                onClick={() => setSelectedVehicle('suv')}
                                className={`flex-1 text-center py-2 rounded-md mx-1 border ${
                                    selectedVehicle === 'suv'
                                        ? 'bg-black text-white border-black'
                                        : 'bg-gray-100 text-gray-500 border-gray-300'
                                }`}
                            >
                                🚙 SUV
                            </button>

                            {/* Sedan Option */}
                            <button
                                onClick={() => setSelectedVehicle('sedan')}
                                className={`flex-1 text-center py-2 rounded-md mx-1 border ${
                                    selectedVehicle === 'sedan'
                                        ? 'bg-black text-white border-black'
                                        : 'bg-gray-100 text-gray-500 border-gray-300'
                                }`}
                            >
                                🚗 Sedan
                            </button>

                            {/* Hatchback Option */}
                            <button
                                onClick={() => setSelectedVehicle('hatchback')}
                                className={`flex-1 text-center py-2 rounded-md mx-1 border ${
                                    selectedVehicle === 'hatchback'
                                        ? 'bg-black text-white border-black'
                                        : 'bg-gray-100 text-gray-500 border-gray-300'
                                }`}
                            >
                                🚕 Hatchback
                            </button>
                        </div>
                    </div>

                    <div className="flex space-x-4 mb-6">
                        <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-md flex-1">
                            <span>📅</span> {/* Replace with an icon */}
                            <span className="text-sm">Today</span>
                        </button>
                        <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-md flex-1">
                            <span>⏰</span> {/* Replace with an icon */}
                            <span className="text-sm">Now</span>
                            <span>▼</span>
                        </button>
                    </div>

                    <button className="w-full bg-black text-white py-3 rounded-md font-semibold">Book now</button>
                </div>
            )}

            <p className="text-[14px] text-gray-600 mt-3">
                * All applicable charges, including permits, tolls, parking fees, and other government-mandated costs, are the
                responsibility of the passenger.
            </p>
        </div>
    );
}
