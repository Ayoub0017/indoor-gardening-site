import { getBlogPostBySlug } from '@/lib/contentful';
import { notFound } from 'next/navigation';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Helper to format date
const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });
};

type Props = {
    params: Promise<{
        slug: string[];
    }>;
};

export async function generateMetadata({ params }: Props) {
    const { slug } = await params;
    const postSlug = slug[slug.length - 1]; // Last segment is the post slug
    const post = await getBlogPostBySlug(postSlug);

    if (!post) {
        return {
            title: 'Post Not Found',
        };
    }

    return {
        title: `${post.fields.title} | Indoor Gardens`,
        description: post.fields.excerpt,
    };
}

export const revalidate = 0; // Always fetch fresh content

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const postSlug = slug[slug.length - 1]; // Get the last segment
    const post = await getBlogPostBySlug(postSlug);

    if (!post) {
        notFound();
    }

    // Optional: Strict URL checking could go here
    // Verify that if parentPost exists, the URL structure matches /parent-slug/child-slug

    return (
        <article className="container mx-auto px-4 py-12 max-w-4xl">
            {/* Breadcrumb-ish / Categories */}
            <div className="flex gap-2 mb-6 justify-center">
                {post.fields.categories?.map((cat) => (
                    <span key={cat.sys.id} className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">
                        {cat.fields.title}
                    </span>
                ))}
            </div>

            {/* Header */}
            <header className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
                    {post.fields.title}
                </h1>

                <div className="flex items-center justify-center gap-4 text-gray-600">
                    <div className="flex items-center gap-2">
                        {post.fields.author?.fields.avatar && (
                            <img
                                src={post.fields.author.fields.avatar.fields.file.url}
                                alt={post.fields.author.fields.name}
                                className="w-10 h-10 rounded-full border border-gray-200"
                            />
                        )}
                        <div className="text-left">
                            <div className="font-semibold text-gray-900">{post.fields.author?.fields.name}</div>
                            <div className="text-sm">{formatDate(post.fields.publishedDate)}</div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Featured Image */}
            {post.fields.featuredImage && (
                <div className="mb-12 rounded-2xl overflow-hidden shadow-lg">
                    <img
                        src={post.fields.featuredImage.fields.file.url}
                        alt={post.fields.featuredImage.fields.title}
                        className="w-full h-auto max-h-[600px] object-cover"
                    />
                </div>
            )}

            {/* Content */}
            <div className="prose prose-lg mx-auto prose-green prose-headings:font-bold prose-img:rounded-xl">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {post.fields.markdownContent}
                </ReactMarkdown>
            </div>

            {/* Author Bio */}
            {post.fields.author?.fields.bio && (
                <div className="mt-16 p-8 bg-gray-50 rounded-2xl flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
                    {post.fields.author.fields.avatar && (
                        <img
                            src={post.fields.author.fields.avatar.fields.file.url}
                            alt={post.fields.author.fields.name}
                            className="w-20 h-20 rounded-full"
                        />
                    )}
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">About {post.fields.author.fields.name}</h3>
                        <p className="text-gray-600">{post.fields.author.fields.bio}</p>
                    </div>
                </div>
            )}
        </article>
    );
}
