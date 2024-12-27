'use client';
import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="bg-gray-800 text-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0">
                        <Link href="/">
                            <span className="text-xl font-bold text-white hover:text-gray-300">CabBooking</span>
                        </Link>
                    </div>

                    <div className="hidden md:flex space-x-4">
                        <Link href="/">
                            <span className="hover:text-gray-300">Home</span>
                        </Link>
                        <Link href="/about">
                            <span className="hover:text-gray-300">About</span>
                        </Link>
                        <Link href="/services">
                            <span className="hover:text-gray-300">Services</span>
                        </Link>
                        <Link href="/contact">
                            <span className="hover:text-gray-300">Contact</span>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            className="text-gray-300 hover:text-white focus:outline-none focus:text-white"
                            onClick={() => alert('Add mobile menu toggle logic!')}
                        >
                            <svg
                                className="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
