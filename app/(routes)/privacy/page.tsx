export const metadata = {
    title: 'Privacy Policy - Indoor Gardens',
    description: 'Our commitment to protecting your privacy.',
    alternates: {
        canonical: '/privacy',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
        },
    },
};

export default function PrivacyPage() {
    return (
        <div className="bg-white min-h-screen py-24">
            <div className="container mx-auto px-4 max-w-3xl">
                <h1 className="text-4xl font-bold text-gray-900 mb-8 border-b pb-8">Privacy Policy</h1>

                <div className="prose prose-green max-w-none text-gray-600">
                    <p className="lead text-xl text-gray-800 mb-8">
                        At Indoor Gardens, we take your privacy seriously. This privacy policy describes how we collect, use, and protect your personal information.
                    </p>

                    <h3>1. Information We Collect</h3>
                    <p>
                        We collect information you provide directly to us, such as when you create an account, subscribe to our newsletter, request customer support, or contact us.
                    </p>
                    <ul>
                        <li>Name and contact information</li>
                        <li>Account credentials</li>
                        <li>Payment information (processed securely by third-party providers)</li>
                        <li>Communication preferences</li>
                    </ul>

                    <h3>2. How We Use Your Information</h3>
                    <p>
                        We use the information we collect to operate, maintain, and improve our services, including:
                    </p>
                    <ul>
                        <li>Sending you technical notices, updates, and support messages</li>
                        <li>Responding to your comments and questions</li>
                        <li>Analyzing trends and usage of our website</li>
                        <li>Personalizing the content and features we offer</li>
                    </ul>

                    <h3>3. Cookies and Tracking</h3>
                    <p>
                        We use cookies and similar tracking technologies to track the activity on our Service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                    </p>

                    <h3>4. Data Security</h3>
                    <p>
                        We implement appropriate technical and organizational measures to protect the security of your personal data. However, please note that no method of transmission over the Internet is 100% secure.
                    </p>

                    <h3>5. Changes to This Policy</h3>
                    <p>
                        We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
                    </p>

                    <div className="mt-12 p-6 bg-gray-50 rounded-xl">
                        <p className="mb-2 font-semibold text-gray-900">Questions?</p>
                        <p>
                            If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@indoor-gardens.com" className="text-primary hover:underline">privacy@indoor-gardens.com</a>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
