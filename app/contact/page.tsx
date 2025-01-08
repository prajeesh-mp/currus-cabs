'use client';
import React from 'react';
import { useForm } from 'react-hook-form';

const Contact = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = () => {
        // console.log(data);
    };

    return (
        <div className="flex flex-col items-center px-4 py-8 sm:px-8 lg:px-16">
            <h1 className="text-3xl font-bold text-center">Get in touch</h1>
            <p className="text-center text-gray-600 mt-2 mb-8">Need a ride? Let&apos;s chat about how we can help.</p>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-8">
                <button className="border border-gray-300 rounded-lg p-4 text-center hover:shadow-md">
                    <p className="font-medium">Visit us</p>
                    <p className="text-sm text-gray-500">Visit our office HQ.</p>
                </button>
                <button className="border border-gray-300 rounded-lg p-4 text-center hover:shadow-md">
                    <p className="font-medium">Call us</p>
                    <p className="font-semibold">+91 9876543210</p>

                    <p className="text-sm text-gray-500">Mon-Fri from 8am to 5pm.</p>
                </button>
            </div>

            {/* Contact Form */}
            <form className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-md" onSubmit={handleSubmit(onSubmit)}>
                <h2 className="text-xl font-semibold mb-4">Message us</h2>
                <p className="text-gray-500 mb-6">We&apos;ll get back to you within 24 hours.</p>

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
                        Email
                    </label>
                    <span className="w-3 h-3 bg-black rounded-sm"></span>
                    <div className="flex-1 bg-gray-100 px-4 py-2 rounded-md flex justify-between items-center">
                        <input
                            {...register('email', { required: 'Email is required' })}
                            type="text"
                            className="bg-transparent outline-none text-sm flex-grow"
                            placeholder="Email"
                        />
                    </div>
                    {errors.email && <p className="text-sm text-red-600">Email is required</p>}
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
                            placeholder="Phone"
                        />
                    </div>
                    {errors.phone && <p className="text-sm text-red-600">Phone is required</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700" htmlFor="firstName">
                        Message
                    </label>
                    <span className="w-3 h-3 bg-black rounded-sm"></span>
                    <div className="flex-1 bg-gray-100 px-4 py-2 rounded-md flex justify-between items-center">
                        <textarea
                            {...register('message', { required: 'Email is required' })}
                            className="bg-transparent outline-none text-sm flex-grow"
                            placeholder="Message"
                        />
                    </div>
                    {errors.message && <p className="text-sm text-red-600">Message is required</p>}
                </div>

                <button type="submit" className="w-full bg-black text-white py-3 rounded-md font-semibold">
                    Send message
                </button>
            </form>
        </div>
    );
};

export default Contact;
