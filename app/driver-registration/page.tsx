'use client';
import { useForm } from 'react-hook-form';
import { districts } from '../utils/data';
import { handleFileSelection } from '../utils/image';
import { useState } from 'react';

export default function DriverRegistration() {
    const [vehiclePhoto, setVehiclePhoto] = useState('');
    const [driverPhoto, setDriverPhoto] = useState('');
    const [rcPhoto, setRcPhoto] = useState('');
    const [permitPhoto, setPermitPhoto] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        console.log(vehiclePhoto, driverPhoto, rcPhoto, permitPhoto);

        reset();
    };

    return (
        <div className="flex flex-col items-center px-4 py-8 sm:px-8 lg:px-16">
            <h1 className="text-3xl font-bold text-center">Partner with Us</h1>
            <p className="text-center text-gray-600 mt-2 mb-8">Drive when you want, make what you need</p>

            <form className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-md" onSubmit={handleSubmit(onSubmit)}>
                <h2 className="text-xl font-semibold mb-4">Register now</h2>
                {/* <p className="text-gray-500 mb-6">We&apos;ll get back to you within 24 hours.</p> */}

                <div className="mb-4">
                    <label className="block text-gray-700" htmlFor="firstName">
                        Name
                    </label>
                    <span className="w-3 h-3 bg-black rounded-sm"></span>
                    <div className="flex-1 bg-gray-100 px-4 py-2 rounded-md flex justify-between items-center">
                        <input
                            {...register('name', { required: 'Name is required' })}
                            type="text"
                            className="bg-transparent outline-none text-sm flex-grow"
                            placeholder="Name"
                        />
                    </div>
                    {errors.name && <p className="text-sm text-red-600">Name is required</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700" htmlFor="firstName">
                        Phone
                    </label>
                    <span className="w-3 h-3 bg-black rounded-sm"></span>
                    <div className="flex-1 bg-gray-100 px-4 py-2 rounded-md flex justify-between items-center">
                        <input
                            {...register('phone', { required: 'Phone is required' })}
                            type="text"
                            className="bg-transparent outline-none text-sm flex-grow"
                            placeholder="Phone Number"
                        />
                    </div>
                    {errors.phone && <p className="text-sm text-red-600">Phone is required</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700" htmlFor="firstName">
                        District
                    </label>
                    <span className="w-3 h-3 bg-black rounded-sm"></span>
                    <div className="flex-1 bg-gray-100 px-4 py-2 rounded-md flex justify-between items-center">
                        <select
                            className="bg-transparent outline-none text-sm flex-grow"
                            {...register('district', { required: 'Vehicle Type is required' })}
                        >
                            {districts.map((district, index) => (
                                <option value={district.name} key={index}>
                                    {district.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    {errors.district && <p className="text-sm text-red-600">District is required</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700" htmlFor="firstName">
                        Type of Vehicle
                    </label>
                    <span className="w-3 h-3 bg-black rounded-sm"></span>
                    <div className="flex-1 bg-gray-100 px-4 py-2 rounded-md flex justify-between items-center">
                        <select
                            className="bg-transparent outline-none text-sm flex-grow"
                            {...register('vehicleType', { required: 'Vehicle Type is required' })}
                        >
                            <option value="hatchback">Hatchback</option>
                            <option value="sedan">Sedan</option>
                            <option value="suv">SUV</option>
                        </select>
                    </div>
                    {errors.vehicleType && <p className="text-sm text-red-600">Vehicle Type is required</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700" htmlFor="firstName">
                        Registration No
                    </label>
                    <span className="w-3 h-3 bg-black rounded-sm"></span>
                    <div className="flex-1 bg-gray-100 px-4 py-2 rounded-md flex justify-between items-center">
                        <input
                            {...register('registrationNumber', { required: 'Vehicle Registration Number is required' })}
                            type="text"
                            className="bg-transparent outline-none text-sm flex-grow"
                            placeholder="Registration Number"
                        />
                    </div>
                    {errors.registrationNumber && <p className="text-sm text-red-600">Registration Number is required</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700" htmlFor="firstName">
                        Vehicle Photo
                    </label>
                    <span className="w-3 h-3 bg-black rounded-sm"></span>
                    <div className="flex-1 bg-gray-100 px-4 py-2 rounded-md flex justify-between items-center">
                        <input
                            {...register('vehiclePhoto', {
                                required: 'Vehicle Photo is required',
                                onChange: (e) =>
                                    handleFileSelection(e.target.files[0], (base64) => {
                                        setVehiclePhoto(base64);
                                    }),
                            })}
                            type="file"
                            className="bg-transparent outline-none text-sm flex-grow"
                            placeholder="Vehicle Photo"
                        />
                    </div>
                    {errors.vehiclePhoto && <p className="text-sm text-red-600">Vehicle Photo is required</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700" htmlFor="firstName">
                        Driver Photo
                    </label>
                    <span className="w-3 h-3 bg-black rounded-sm"></span>
                    <div className="flex-1 bg-gray-100 px-4 py-2 rounded-md flex justify-between items-center">
                        <input
                            {...register('driverPhoto', {
                                required: 'Driver Photo is required',
                                onChange: (e) =>
                                    handleFileSelection(e.target.files[0], (base64) => {
                                        setDriverPhoto(base64);
                                    }),
                            })}
                            type="file"
                            className="bg-transparent outline-none text-sm flex-grow"
                            placeholder="Driver Photo"
                        />
                    </div>
                    {errors.driverPhoto && <p className="text-sm text-red-600">Driver Photo is required</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700" htmlFor="firstName">
                        RC
                    </label>
                    <span className="w-3 h-3 bg-black rounded-sm"></span>
                    <div className="flex-1 bg-gray-100 px-4 py-2 rounded-md flex justify-between items-center">
                        <input
                            {...register('rc', {
                                required: 'Driver Photo is required',
                                onChange: (e) =>
                                    handleFileSelection(e.target.files[0], (base64) => {
                                        setRcPhoto(base64);
                                    }),
                            })}
                            type="file"
                            className="bg-transparent outline-none text-sm flex-grow"
                            placeholder="RC"
                        />
                    </div>
                    {errors.rc && <p className="text-sm text-red-600">RC is required</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700" htmlFor="firstName">
                        Permit
                    </label>
                    <span className="w-3 h-3 bg-black rounded-sm"></span>
                    <div className="flex-1 bg-gray-100 px-4 py-2 rounded-md flex justify-between items-center">
                        <input
                            {...register('permit', {
                                required: 'Permit is required',
                                onChange: (e) =>
                                    handleFileSelection(e.target.files[0], (base64) => {
                                        setPermitPhoto(base64);
                                    }),
                            })}
                            type="file"
                            className="bg-transparent outline-none text-sm flex-grow"
                            placeholder="Permit"
                        />
                    </div>
                    {errors.permit && <p className="text-sm text-red-600">Permit is required</p>}
                </div>

                <button type="submit" className="w-full bg-black text-white py-3 rounded-md font-semibold">
                    Submit
                </button>
            </form>
        </div>
    );
}
