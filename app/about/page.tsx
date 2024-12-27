import Image from 'next/image';
import Link from 'next/link';

export default function About() {
    const teamMembers = [
        {
            name: 'Amélie Laurent',
            role: 'Founder & CEO',
            description: 'Former co-founder of Opendoor. Early staff at Spotify and Clearbit.',
            image: 'https://i.pravatar.cc/450?img=1',
        },
        {
            name: 'Nikolas Gibbons',
            role: 'Engineering Manager',
            description: 'Lead engineering teams at Netflix, Pitch, and Protocol Labs.',
            image: 'https://i.pravatar.cc/450?img=2',
        },
        {
            name: 'Sienna Hewitt',
            role: 'Product Manager',
            description: 'Former PM for Linear, Lambda School, Squarespace Domains, and On Deck.',
            image: 'https://i.pravatar.cc/450?img=3',
        },
        {
            name: 'Zahra Christensen',
            role: 'Backend Developer',
            description: 'Lead backend dev at Clearbit. Former Clearbit and Loom.',
            image: 'https://i.pravatar.cc/450?img=8',
        },
        {
            name: 'Sophia Bennett',
            role: 'Designer',
            description: 'Award-winning designer with 10+ years of experience in tech and startups.',
            image: 'https://i.pravatar.cc/450?img=4',
        },
        {
            name: 'Malik Turner',
            role: 'Research Scientist',
            description: 'Expert in AI and machine learning research with published papers.',
            image: 'https://i.pravatar.cc/450?img=5',
        },
        {
            name: 'Elliot Brooks',
            role: 'Marketing Strategist',
            description: 'Built marketing campaigns for top-tier tech companies globally.',
            image: 'https://i.pravatar.cc/450?img=9',
        },
        {
            name: 'Daniel Cruz',
            role: 'Sales Lead',
            description: 'Oversees sales strategies for enterprise clients worldwide.',
            image: 'https://i.pravatar.cc/450?img=7',
        },
    ];

    return (
        <>
            <section className="bg-white py-16">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center px-6 lg:px-8">
                    <div className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
                        <h3 className="text-sm uppercase tracking-wide text-gray-500 mb-2">Our Story</h3>
                        <h2 className="text-4xl lg:text-5xl font-semibold text-gray-900 mb-6">
                            We’ll take you places Safe, <br />
                            affordable rides <br />
                            to every destination.
                        </h2>
                        <p className="text-lg text-gray-600 mb-6">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                            magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                            laborum.
                        </p>

                        <Link
                            href="/"
                            className="inline-block bg-black text-[#c9d302] text-lg font-medium px-6 py-3 rounded-lg shadow-md hover:bg-gray-800"
                        >
                            Book now
                        </Link>
                    </div>

                    <div className="lg:w-1/2">
                        <Image
                            src="/cab.jpg"
                            // layout="fill"
                            width={500}
                            height={800}
                            alt="Currus Cabs Team"
                            objectFit="cover"
                        />
                    </div>
                </div>
            </section>

            <section className="bg-gray-50 py-16">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-12"></div>

                    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-top px-6 lg:px-8 mb-10">
                        <div className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
                            <h3 className="text-sm uppercase tracking-wide text-gray-500 mb-2">Our Mission</h3>
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                                Built for safe and affordable rides, powered by Tech
                            </h2>
                        </div>

                        <div className="lg:w-1/2">
                            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                                Lorem ipsum odor amet, consectetuer adipiscing elit. Nunc vivamus rhoncus ad vel facilisi facilisi! Vel
                                eleifend potenti mollis erat habitasse mauris.
                            </p>
                            <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4">
                                Lorem ipsum odor amet, consectetuer adipiscing elit. Nunc vivamus rhoncus ad vel facilisi facilisi! Vel
                                eleifend potenti mollis erat habitasse mauris. Parturient aliquam tempus lacus vestibulum convallis orci ad.
                            </p>
                            <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4">
                                Lorem ipsum odor amet, consectetuer adipiscing elit. Nunc vivamus rhoncus ad vel facilisi facilisi! Vel
                                eleifend potenti mollis erat habitasse mauris.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center border-t border-gray-200 pt-8">
                        <div>
                            <h3 className="text-6xl font-bold text-gray-900">100+</h3>
                            <p className="text-gray-600 mt-2">Since 2010, Currus Cabs has grown from a team of 2 to over 100.</p>
                        </div>
                        <div>
                            <h3 className="text-6xl font-bold text-gray-900">1 million+</h3>
                            <p className="text-gray-600 mt-2">Over 1 million people use Currus Cabs to ride safe.</p>
                        </div>
                        <div>
                            <h3 className="text-6xl font-bold text-gray-900">84</h3>
                            <p className="text-gray-600 mt-2">84 companies choose Currus Cabs.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-white my-[100px]">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">Meet our Team</h2>
                        <p className="text-gray-600">
                            Our philosophy is simple; hire great people and give them the resources and support to do their best work.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="bg-gray-50 rounded-lg shadow-sm text-center">
                                <div className="w-full h-0 pb-[100%] relative mb-4">
                                    <Image src={member.image} alt={member.name} layout="fill" objectFit="cover" className="rounded-t-lg" />
                                </div>
                                <div className="p-6 text-start">
                                    <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
                                    <p className="text-gray-500 text-sm">{member.role}</p>
                                    <p className="text-gray-600 mt-2 text-sm">{member.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
