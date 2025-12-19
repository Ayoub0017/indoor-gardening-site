import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100/50">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center">
                    <Image
                        src="/logo.png"
                        alt="JIG - Just Indoor Gardens"
                        width={80}
                        height={40}
                        className="h-10 w-auto"
                        priority
                    />
                </Link>
                <nav className="hidden md:flex items-center gap-8">
                    {['Home', 'About', 'Blog', 'Contact'].map((item) => (
                        <Link
                            key={item}
                            href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                            className="text-sm font-medium text-gray-600 hover:text-primary transition-colors hover:bg-green-50 px-3 py-2 rounded-md"
                        >
                            {item}
                        </Link>
                    ))}
                </nav>
                <div className="flex items-center gap-4">
                    <Link href="/contact" className="px-5 py-2.5 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-green-700 transition-all shadow-sm hover:shadow-md active:scale-95">
                        Get Started
                    </Link>
                </div>
            </div>
        </header>
    )
}
