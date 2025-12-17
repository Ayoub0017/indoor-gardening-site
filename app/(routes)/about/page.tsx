import Image from 'next/image';

export default function AboutPage() {
    return (
        <div className="bg-white">
            {/* Header Section */}
            <section className="relative py-20 bg-green-50">
                <div className="container mx-auto px-4 relative z-10">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6 text-center">
                        Cultivating Joy, <span className="text-primary">Indoors</span>
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto text-center leading-relaxed">
                        We believe that everyone deserves a little patch of nature to call their own.
                        Our mission is to make indoor gardening accessible, successful, and beautiful for modern living.
                    </p>
                </div>
                {/* Decorative background elements could go here */}
            </section>

            {/* Our Story Section */}
            <section className="py-24">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center gap-16">
                        <div className="flex-1 w-full">
                            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-xl">
                                <Image
                                    src="https://images.unsplash.com/photo-1545241047-6083a3684587?q=80&w=1887&auto=format&fit=crop"
                                    alt="Our founder planting"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                        <div className="flex-1 space-y-6">
                            <h2 className="text-3xl font-bold text-gray-900">Our Story</h2>
                            <p className="text-gray-600 leading-relaxed">
                                Indoor Gardens began in a small, sun-drenched apartment where our founder, Alex, started propagating pothos plants for friends.
                                What started as a hobby quickly grew into a passion for helping urban dwellers connect with nature.
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                We realized that many people want to have plants but are intimidated by the care they require.
                                We set out to change that by providing not just easier-to-care-for plants, but the education and support needed to keep them thriving.
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                Today, we're a community of thousands of indoor gardeners sharing our successes (and the occasional yellow leaf) together.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats / Impact */}
            <section className="py-20 bg-black text-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            { label: "Plants Homed", value: "10k+" },
                            { label: "Community Members", value: "50k+" },
                            { label: "Species Curated", value: "120+" },
                            { label: "Years Growing", value: "5+" },
                        ].map((stat, i) => (
                            <div key={i}>
                                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.value}</div>
                                <div className="text-gray-400 font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-24">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-16">Meet the Team</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                        {[
                            { name: "Alex Chen", role: "Founder & Lead Grower", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop" },
                            { name: "Sarah Miller", role: "Plant Doctor", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop" },
                            { name: "David Kim", role: "Community Manager", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop" },
                        ].map((member, i) => (
                            <div key={i} className="group text-center">
                                <div className="relative mb-6 rounded-2xl overflow-hidden aspect-square mx-auto max-w-sm shadow-md group-hover:shadow-xl transition-all">
                                    <Image
                                        src={member.img}
                                        alt={member.name}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                                <p className="text-primary font-medium">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
