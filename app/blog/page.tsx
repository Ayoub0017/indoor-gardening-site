import { getBlogPosts } from '@/lib/contentful';
import Link from 'next/link';

// Helper to format date
const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });
};

export const revalidate = 0; // Always fetch fresh content

export async function generateMetadata() {
    return {
        title: 'Blog - Indoor Gardens',
        description: 'Expert tips, guides, and inspiration for your indoor garden. Learn how to grow healthy plants indoors.',
        alternates: {
            canonical: '/blog',
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
}


export default async function BlogIndexPage() {
    const posts = await getBlogPosts(100); // Fetch latest 100 posts for the index

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-8">Latest Gardening Tips</h1>

            {posts.length === 0 ? (
                <p className="text-gray-500">No blog posts found. Check back soon!</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <div key={post.sys.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            {post.fields.featuredImage && (
                                <div className="h-48 bg-gray-200 relative">
                                    <img
                                        src={post.fields.featuredImage.fields.file.url}
                                        alt={post.fields.featuredImage.fields.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                            <div className="p-6">
                                <div className="flex gap-2 mb-2">
                                    {post.fields.categories?.map((cat) => (
                                        <span key={cat.sys.id} className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                                            {cat.fields.title}
                                        </span>
                                    ))}
                                </div>
                                <h2 className="text-xl font-bold mb-2">
                                    <Link href={`/blog/${post.fields.parentPost ? `${post.fields.parentPost.fields.slug}/` : ''}${post.fields.slug}`} className="hover:text-green-600 transition-colors">
                                        {post.fields.title}
                                    </Link>
                                </h2>
                                <div className="text-sm text-gray-500 mb-4 flex items-center gap-2">
                                    {post.fields.author?.fields.avatar && (
                                        <img
                                            src={post.fields.author.fields.avatar.fields.file.url}
                                            alt={post.fields.author.fields.name}
                                            className="w-6 h-6 rounded-full"
                                        />
                                    )}
                                    <span>{post.fields.author?.fields.name || 'Unknown Author'}</span>
                                    <span>•</span>
                                    <span>{formatDate(post.fields.publishedDate)}</span>
                                </div>
                                <p className="text-gray-600 line-clamp-3 mb-4">
                                    {post.fields.excerpt}
                                </p>
                                <Link
                                    href={`/blog/${post.fields.parentPost ? `${post.fields.parentPost.fields.slug}/` : ''}${post.fields.slug}`}
                                    className="text-green-600 font-medium hover:underline inline-flex items-center"
                                >
                                    Read Article →
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
