import Image from 'next/image';
import { formatDate, getBlogPosts } from './utils';
import Link from 'next/link';

export default function Blog() {
    const allBlogs = getBlogPosts();

    return (
        <div className="bg-white min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
                    <p className="text-lg text-gray-500">New product features, the latest in technology, solutions, and updates.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {allBlogs
                        .sort((a, b) => {
                            if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
                                return -1;
                            }
                            return 1;
                        })
                        .map((post) => (
                            <Link key={post.slug} className="flex flex-col space-y-1 mb-4" href={`/blog/${post.slug}`}>
                                <div className="relative bg-gray-100 rounded-lg overflow-hidden shadow-md">
                                    <Image
                                        width={400}
                                        height={200}
                                        src="https://via.placeholder.com/400x200"
                                        alt="Blog 1"
                                        className="w-full h-52 object-cover"
                                    />

                                    <div className="p-6">
                                        <p className="text-sm text-gray-500">{formatDate(post.metadata.publishedAt, false)}</p>
                                        <h3 className="text-lg font-semibold text-gray-900 mt-2 mb-2">{post.metadata.title}</h3>
                                        <p className="text-sm text-gray-500">{post.metadata.summary}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                </div>
            </div>
        </div>
    );
}
