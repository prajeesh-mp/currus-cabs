import Image from 'next/image';

export default function Footer() {
    return (
        <footer className="bg-white border-t">
            <div className="max-w-6xl mx-auto px-4 py-8 lg:py-12 grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* Left Section */}
                <div className="lg:col-span-2">
                    <Image src="/logo.jpg" alt="Currus Cabs" className="rounded" width={150} height={70} />

                    <p className="text-lg font-semibold text-gray-800 mb-2">We’ll take you places.</p>
                    <p className="text-gray-500">Currus Cabs</p>
                </div>

                <div>
                    <h4 className="font-semibold text-gray-800 mb-4">Company</h4>
                    <ul className="space-y-2 text-gray-600">
                        <li>
                            <a href="#" className="hover:text-black">
                                Blog
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-black">
                                Booking
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-black">
                                Driver Registration
                            </a>
                        </li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold text-gray-800 mb-4">Resources</h4>
                    <ul className="space-y-2 text-gray-600">
                        <li>
                            <a href="#" className="hover:text-black">
                                About
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-black">
                                Contact
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-black">
                                Press Conferences
                            </a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold text-gray-800 mb-4">Contact Us</h4>
                    <ul className="space-y-2 text-gray-600">
                        <li>
                            <span>+91 9446045678</span>
                        </li>
                        <li>
                            <span>info@keracabs.com</span>
                        </li>
                        <li>
                            <p>2nd Floor, ABS building , Opp.Edakkad Village office, Thottada, kizhunna PO, Kannur-670007</p>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="bg-[#fbffb6]">
                <div className="max-w-6xl mx-auto px-4 py-4 flex flex-wrap justify-between items-center text-sm text-black">
                    <p className="mb-2 lg:mb-0">&copy; 2024 Currus Cabs Pvt Ltd. All rights reserved.</p>
                    <div className="space-x-4">
                        <a href="#" className="hover:underline">
                            Terms of Service
                        </a>
                        <a href="#" className="hover:underline">
                            Privacy Policy
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
