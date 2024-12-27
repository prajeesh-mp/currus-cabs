export default function Blog() {
    return (
        <div className="bg-white min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
                    <p className="text-lg text-gray-500">New product features, the latest in technology, solutions, and updates.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative bg-gray-100 rounded-lg overflow-hidden shadow-md">
                        <img src="https://via.placeholder.com/400x200" alt="Blog 1" className="w-full h-52 object-cover" />
                        <div className="p-6">
                            <p className="text-sm text-gray-500">Olivia Rhye • 20 Jan 2022</p>
                            <h3 className="text-lg font-semibold text-gray-900 mt-2 mb-2">UX review presentations</h3>
                            <p className="text-sm text-gray-500">
                                How do you create compelling presentations that wow your colleagues and impress your managers? Look no
                                further.
                            </p>
                        </div>
                    </div>

                    <div className="relative bg-gray-100 rounded-lg overflow-hidden shadow-md">
                        <img src="https://via.placeholder.com/400x200" alt="Blog 2" className="w-full h-52 object-cover" />
                        <div className="p-6">
                            <p className="text-sm text-gray-500">Phoenix Baker • 19 Jan 2022</p>
                            <h3 className="text-lg font-semibold text-gray-900 mt-2 mb-2">Best books on scaling your startup</h3>
                            <p className="text-sm text-gray-500">
                                This collection of the best startup books for scaling your startup is packed full of valuable insights and
                                advice.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
