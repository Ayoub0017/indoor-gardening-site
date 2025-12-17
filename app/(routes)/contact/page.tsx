import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';
import ContactForm from '@/components/ContactForm';

export const metadata = {
    title: 'Contact Us - Indoor Gardens',
    description: 'Get in touch with us for plant care advice or partnership inquiries.',
};

export default function ContactPage() {
    return (
        <div className="bg-white min-h-screen">
            {/* Header */}
            <section className="bg-green-50 py-20 text-center">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Get in Touch</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Have a question about your plant? Want to partner with us? We'd love to hear from you.
                    </p>
                </div>
            </section>

            <section className="py-24">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-16 max-w-6xl mx-auto">
                        {/* Contact Info */}
                        <div className="lg:w-1/3 space-y-10">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
                                <p className="text-gray-600 mb-8 leading-relaxed">
                                    Fill out the form and our team will get back to you within 24 hours.
                                </p>

                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-green-50 rounded-full text-primary">
                                            <Mail size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">Email</h3>
                                            <p className="text-gray-600">hello@indoor-gardens.com</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-green-50 rounded-full text-primary">
                                            <MapPin size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">Office</h3>
                                            <p className="text-gray-600">
                                                123 Plant Street<br />
                                                Greendale, CA 90210
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-green-50 rounded-full text-primary">
                                            <Phone size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">Phone</h3>
                                            <p className="text-gray-600">+1 (555) 123-4567</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 bg-gray-900 rounded-3xl text-white">
                                <h3 className="text-xl font-bold mb-4">Join our Newsletter</h3>
                                <p className="text-gray-400 mb-6 text-sm">Get plant tips straight to your inbox.</p>
                                <Link href="/" className="inline-block w-full py-3 text-center bg-primary text-white font-semibold rounded-xl hover:bg-green-600 transition-colors">
                                    Subscribe
                                </Link>
                            </div>
                        </div>

                        {/* Form */}
                        <div className="lg:w-2/3 bg-white border border-gray-100 shadow-2xl rounded-3xl p-8 md:p-12">
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
