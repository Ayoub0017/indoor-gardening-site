import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
    return (
        <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-32">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    <div className="flex-1 space-y-8 animate-in slide-in-from-left duration-700 fade-in">
                        <h1 className="text-4xl lg:text-7xl font-bold tracking-tight text-gray-900 leading-[1.1]">
                            Bring life to your <span className="text-primary">indoor space</span>
                        </h1>
                        <p className="text-lg text-gray-600 max-w-xl leading-relaxed">
                            Transform your home into a sanctuary with our expert advice on indoor gardening.
                            Learn how to care for your plants and create a thriving green oasis.
                        </p>
                        <div className="flex items-center gap-4 pt-4">
                            <Link href="/blog" className="px-8 py-4 bg-primary text-white rounded-full font-semibold hover:bg-green-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                                Explore The Blog
                            </Link>
                            <Link href="/about" className="px-8 py-4 bg-white text-gray-900 border border-gray-200 rounded-full font-semibold hover:bg-gray-50 transition-all">
                                Our Story
                            </Link>
                        </div>
                        <div className="pt-8 flex items-center gap-8 text-sm text-gray-500 font-medium">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500" /> 100+ Plant Guides
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500" /> Expert Advice
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 w-full relative h-[400px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl animate-in slide-in-from-right duration-700 fade-in">
                        {/* Placeholder for now, user asked for placeholder images. Next/Image requires width/height or fill */}
                        <div className="absolute inset-0 bg-green-100 flex items-center justify-center text-green-800">
                            {/* Normally we use next/image here. I'll use a placeholder service or just a div if I don't have images. */}
                            <Image
                                src="https://images.unsplash.com/photo-1470058869958-2a77ade41c02?q=80&w=2070&auto=format&fit=crop"
                                alt="Indoor Garden"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Background decoration */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 -ml-24 w-96 h-96 bg-green-200/30 rounded-full blur-3xl -z-10" />
            <div className="absolute top-0 right-0 -mt-24 w-96 h-96 bg-blue-50/50 rounded-full blur-3xl -z-10" />
        </section>
    )
}
