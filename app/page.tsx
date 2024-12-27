import RideSelector from './components/RideSelector';
// import MapWithRoute from '@/app/components/Map';
import Image from 'next/image';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

export default function Home() {
    return (
        <main className="px-6 md:px-8 flex-1 space-y-10 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center justify-center ">
                <div className="max-w-md space-y-4 text-center md:text-left">
                    <h2 className="text-4xl md:text-5xl font-bold leading-tight">We’ll take you places</h2>
                    <p className="text-sm md:text-base text-gray-500">Safe, affordable rides to every destination.</p>
                    <RideSelector />
                </div>

                <div className="relative w-full md:w-1/2 h-[300px] md:ms-10 md:h-[400px] bg-gray-100 rounded-lg overflow-hidden">
                    {/* Map Placeholder */}
                    <div className="absolute inset-0 bg-blue-50">
                        {/* <MapWithRoute /> */}
                        <Image src="/routes.png" width={1000} height={600} alt="Route" />
                        {/* <div className="absolute top-8 left-6 md:top-20 md:left-10 bg-white shadow-md rounded-lg p-4">
                            <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                                <div>
                                    <p className="text-sm font-medium">Daniel H.</p>
                                    <p className="text-xs text-gray-500">9-HQ-14</p>
                                </div>
                            </div>
                        </div>

                        <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 bg-white shadow-md rounded-lg p-4">
                            <p className="text-xs text-gray-500">Estimated time</p>
                            <p className="text-lg md:text-xl font-bold">10-15 min</p>
                            <p className="text-sm text-gray-500">Noa Carmel’s home</p>
                            <p className="text-xs text-gray-400">7th sevenstreet</p>
                        </div> */}
                    </div>
                </div>
            </div>

            <Testimonials />
        </main>
    );
}
