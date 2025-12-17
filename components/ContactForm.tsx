'use client';

import { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

export default function ContactForm() {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus('loading');

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!res.ok) throw new Error('Failed to send');

            setStatus('success');
            (e.target as HTMLFormElement).reset();
        } catch (err) {
            console.error(err);
            setStatus('error');
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        placeholder="Your name"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-gray-700">Subject</label>
                <select
                    id="subject"
                    name="subject"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-gray-50 focus:bg-white appearance-none"
                >
                    <option value="general">General Inquiry</option>
                    <option value="support">Plant Care Support</option>
                    <option value="press">Press & Partnerships</option>
                    <option value="other">Other</option>
                </select>
            </div>

            <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-gray-700">Message</label>
                <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="How can we help you?"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-gray-50 focus:bg-white resize-none"
                />
            </div>

            <button
                type="submit"
                disabled={status === 'loading'}
                className={`w-full flex items-center justify-center gap-2 py-4 rounded-full font-bold text-white transition-all transform active:scale-[0.98] ${status === 'loading' ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-green-700 shadow-lg hover:shadow-xl'
                    }`}
            >
                {status === 'loading' ? (
                    'Sending...'
                ) : (
                    <>
                        Send Message <Send size={18} />
                    </>
                )}
            </button>

            {status === 'success' && (
                <div className="p-4 bg-green-50 text-green-700 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2">
                    <CheckCircle size={20} />
                    <p>Thank you! Your message has been sent successfully.</p>
                </div>
            )}

            {status === 'error' && (
                <div className="p-4 bg-red-50 text-red-700 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2">
                    <AlertCircle size={20} />
                    <p>Something went wrong. Please try again later.</p>
                </div>
            )}
        </form>
    );
}
