export default function Testimonials() {
    const testimonials = [
        {
            name: 'Hikmet Atçeken',
            avatar: 'https://i.pravatar.cc/150?img=1',
            message: "Pulsefy's our daily tool to bypass averages and reveal true insights, for the whole team!",
            rating: 5,
        },
        {
            name: 'Arda Guler',
            avatar: 'https://i.pravatar.cc/150?img=2',
            message:
                'Pulsefy levels the analytics field for our team, enabling both beginners and pros to easily bypass average data and uncover the actionable insights that truly shape our marketing strategies.',
            rating: 4,
        },
        {
            name: 'Maria Ancelotti',
            avatar: 'https://i.pravatar.cc/150?img=3',
            message: 'From novice to pro, Pulsefy helps our team uncover the extraordinary in our marketing data!',
            rating: 5,
        },
        {
            name: 'Ragip Diler',
            avatar: 'https://i.pravatar.cc/150?img=4',
            message:
                'Pulsefy empowers our whole team, techies or not, to dive into marketing analytics and spot the insights that really matter—no more average data!',
            rating: 4,
        },
        {
            name: 'Jenny Wilson',
            avatar: 'https://i.pravatar.cc/150?img=5',
            message:
                "Pulsefy's user-friendly analytics let our whole team, regardless of skill, bypass averages to unearth and act on true, game-changing marketing insights every day.",
            rating: 5,
        },
        {
            name: 'Guy Hawkins',
            avatar: 'https://i.pravatar.cc/150?img=6',
            message:
                "Pulsefy is a game-changer for our team—easy for beginners and powerful for digging beyond average data. It's our daily ally in unearthing those pivotal marketing insights that really drive strategy!",
            rating: 5,
        },
    ];

    return (
        <div className="py-12 px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-semibold text-gray-900">
                    Dont take our word for it! <br />
                    Hear it from our customers
                </h2>
                {/* <p className="mt-2 text-gray-600">Find out how our users are spreading the word!</p> */}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.map((testimonial, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-200 relative">
                        <div className="flex items-center mb-4">
                            <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" />
                            <div className="ml-4">
                                <h4 className="font-bold text-gray-900">{testimonial.name}</h4>

                                <div className="flex items-center">{Array.from({ length: testimonial.rating }).map((_, i) => `⭐`)}</div>
                            </div>
                        </div>
                        <p className="text-gray-700 text-sm">{testimonial.message}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
