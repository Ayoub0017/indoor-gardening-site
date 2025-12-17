import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-gray-50 border-t border-gray-100 py-16">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="space-y-4">
                    <h3 className="font-bold text-xl text-primary">Indoor Gardens</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                        Cultivating better living spaces through the power of indoor gardening. Join our community of plant lovers.
                    </p>
                </div>
                <div>
                    <h4 className="font-semibold mb-6 text-foreground">Company</h4>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                        <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                        <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                        <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                        <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold mb-6 text-foreground">Resources</h4>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                        <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
                        <li><Link href="#" className="hover:text-primary transition-colors">Plant Care Guides</Link></li>
                        <li><Link href="#" className="hover:text-primary transition-colors">Community Forum</Link></li>
                        <li><Link href="#" className="hover:text-primary transition-colors">Newsletter Archive</Link></li>
                    </ul>
                </div>
                <div className="space-y-4">
                    <h4 className="font-semibold text-foreground">Stay Updated</h4>
                    <p className="text-sm text-muted-foreground">Subscribe to our newsletter for the latest plant tips and inspiration.</p>
                    <form className="flex gap-2">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white"
                        />
                        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                            Join
                        </button>
                    </form>
                </div>
            </div>
            <div className="container mx-auto px-4 mt-16 pt-8 border-t border-gray-100 text-center text-muted-foreground text-sm">
                <p>&copy; {new Date().getFullYear()} Indoor Gardens. All rights reserved.</p>
            </div>
        </footer>
    )
}
