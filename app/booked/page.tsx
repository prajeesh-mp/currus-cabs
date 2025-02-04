'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const BookedContent = () => {
    const searchParams = useSearchParams();
    const txnId = searchParams.get('id');

    const isSuccess = Boolean(txnId);

    return (
        <section className="bg-white p-16 dark:bg-gray-900">
            <div className="relative flex flex-1 flex-col items-center justify-center pb-16 pt-12">
                {isSuccess ? <SuccessMessage txnId={txnId} /> : <FailureMessage />}
            </div>
            <SupportContact />
        </section>
    );
};

const SuccessMessage = ({ txnId }: { txnId: string }) => (
    <>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="text-green-600 w-28 h-28"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1"
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div className="max-w-2xl text-center">
            <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Thank you! Booking Completed</h1>
            <div className="mt-6 text-base leading-7 text-slate-600">Booking NO. {txnId}</div>
            <div className="mt-6 text-base leading-7 text-slate-600">You will receive a confirmation SMS with booking information.</div>
            <BackHomeButton />
        </div>
    </>
);

const FailureMessage = () => (
    <>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="text-red-600 w-28 h-28"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1"
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
        <div className="max-w-2xl text-center">
            <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Booking Failed</h1>
            <div className="mt-6 text-base leading-7 text-slate-600">
                Your booking could not be completed. Please try again or contact support.
            </div>
            <div className="mt-6 flex space-x-4">
                <BackHomeButton />
                <RetryBookingButton />
            </div>
        </div>
    </>
);

const BackHomeButton = () => (
    <Link
        className="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-slate-900 text-white hover:bg-slate-700"
        href="/"
    >
        <span>Back to Home</span>
    </Link>
);

const RetryBookingButton = () => (
    <Link
        className="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-red-600 text-white hover:bg-red-500"
        href="/"
    >
        <span>Retry Booking</span>
    </Link>
);

const SupportContact = () => (
    <div className="p-4 bg-green-100 border-l-4 border-gray-500 text-gray-700 rounded-md">
        <p>
            For assistance, contact{' '}
            <a href="tel:+919446045678" className="text-blue-600 hover:underline">
                +91 9446045678
            </a>
        </p>
    </div>
);

export default function Booked() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <BookedContent />
        </Suspense>
    );
}
