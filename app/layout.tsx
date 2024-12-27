import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import Image from 'next/image';
import Link from 'next/link';
import Footer from './components/Footer';

const poppins = Poppins({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-poppins',
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
    title: 'Currus Cabs',
    description: 'Book your Cab now',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${poppins.variable} antialiased`}>
                <div className="min-h-screen bg-white flex flex-col">
                    <header className="flex justify-between items-center px-6 md:px-8 py-3 bg-black mb-[60px] text-white">
                        {/* <h1 className="text-xl md:text-2xl font-bold">Taksi.</h1> */}
                        <Image src="/logo.jpg" alt="Currus Cabs" className="rounded" width={150} height={70} />
                        <nav className="hidden md:flex space-x-6 text-md font-medium">
                            <Link href="/" className="hover:text-[#c9d302]">
                                Home
                            </Link>
                            <Link href="/about" className="hover:text-[#c9d302]">
                                About
                            </Link>
                            <Link href="/driver-registration" className="hover:text-[#c9d302]">
                                Partner with Us
                            </Link>
                            <Link href="/blog" className="hover:text-[#c9d302]">
                                Blog
                            </Link>
                            <Link href="/contact" className="hover:text-[#c9d302]">
                                Contact
                            </Link>
                        </nav>
                        {/* <button className="px-4 py-2 bg-black text-white rounded-md text-sm md:text-base">Log in</button> */}
                    </header>
                    {children}

                    <Footer />
                </div>
            </body>
        </html>
    );
}
