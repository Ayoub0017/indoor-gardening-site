import { getBlogPostBySlug } from '@/lib/contentful';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { TableOfContents } from '@/components/TableOfContents';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

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

    // Construct the full slug path for canonical URL
    const fullSlug = post.fields.parentPost
        ? `${post.fields.parentPost.fields.slug}/${post.fields.slug}`
        : post.fields.slug;

    return {
        title: `${post.fields.title} | Indoor Gardens`,
        description: post.fields.excerpt,
        alternates: {
            canonical: `/blog/${fullSlug}`,
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
            },
        },
        openGraph: {
            title: post.fields.title,
            description: post.fields.excerpt,
            type: 'article',
            url: `/blog/${fullSlug}`,
            images: post.fields.featuredImage ? [
                {
                    url: post.fields.featuredImage.fields.file.url,
                    alt: post.fields.featuredImage.fields.title,
                }
            ] : [],
            publishedTime: post.fields.publishedDate,
            authors: [post.fields.author?.fields.name],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.fields.title,
            description: post.fields.excerpt,
            images: post.fields.featuredImage ? [post.fields.featuredImage.fields.file.url] : [],
        },
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

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Back Button */}
            <Button variant="ghost" asChild className="mb-8 pl-0 hover:pl-2 transition-all">
                <Link href="/blog" className="flex items-center gap-2 text-muted-foreground">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Blog
                </Link>
            </Button>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative">

                {/* TOC - Desktop Only (Sticky Sidebar) */}
                <aside className="hidden lg:block lg:col-span-3 h-full">
                    <TableOfContents content={post.fields.markdownContent} />
                </aside>

                {/* Main Content Area */}
                <article className="lg:col-span-9 max-w-3xl mx-auto">

                    {/* Categories */}
                    <div className="flex gap-2 mb-6 justify-center lg:justify-start">
                        {post.fields.categories?.map((cat) => (
                            <span key={cat.sys.id} className="text-xs font-semibold bg-green-100 text-green-800 px-3 py-1 rounded-full uppercase tracking-wide">
                                {cat.fields.title}
                            </span>
                        ))}
                    </div>

                    {/* Header */}
                    <header className="text-center lg:text-left mb-12">
                        <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 mb-6 leading-tight">
                            {post.fields.title}
                        </h1>

                        <div className="flex items-center justify-center lg:justify-start gap-4">
                            <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                                <AvatarImage src={post.fields.author?.fields.avatar?.fields.file.url} alt={post.fields.author?.fields.name} />
                                <AvatarFallback>{post.fields.author?.fields.name?.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="text-left">
                                <div className="font-semibold text-gray-900">{post.fields.author?.fields.name}</div>
                                <div className="text-sm text-gray-500">{formatDate(post.fields.publishedDate)}</div>
                            </div>
                        </div>
                    </header>

                    {/* Featured Image */}
                    {post.fields.featuredImage && (
                        <div className="mb-12 rounded-xl overflow-hidden shadow-lg border bg-muted aspect-video relative">
                            <img
                                src={post.fields.featuredImage.fields.file.url}
                                alt={post.fields.featuredImage.fields.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}

                    {/* Markdown Content with Custom Styling */}
                    <div className="prose prose-lg prose-green max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-600 prose-p:leading-relaxed prose-li:text-gray-600 prose-img:rounded-xl prose-img:shadow-md">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeSlug]}
                            components={{
                                h1: ({ node, ...props }) => <h1 className="text-4xl font-extrabold mt-12 mb-6 text-gray-900" {...props} />,
                                h2: ({ node, ...props }) => <h2 className="text-3xl font-bold mt-16 mb-4 text-gray-900 border-b pb-2" {...props} />,
                                h3: ({ node, ...props }) => <h3 className="text-2xl font-bold mt-10 mb-3 text-gray-800" {...props} />,
                                h4: ({ node, ...props }) => <h4 className="text-xl font-semibold mt-8 mb-2 text-gray-800" {...props} />,
                                p: ({ node, ...props }) => <p className="mb-6 leading-8 text-gray-700" {...props} />,
                                li: ({ node, ...props }) => <li className="mb-2" {...props} />,
                                blockquote: ({ node, ...props }) => (
                                    <blockquote className="border-l-4 border-green-500 bg-green-50/50 p-6 rounded-r-lg italic my-8 text-gray-700" {...props} />
                                ),
                            }}
                        >
                            {post.fields.markdownContent}
                        </ReactMarkdown>
                    </div>

                    <Separator className="my-16" />

                    {/* Author Bio Card */}
                    {post.fields.author && (
                        <Card className="bg-gray-50/50 border-none shadow-sm">
                            <CardContent className="p-8 flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left">
                                <Avatar className="h-20 w-20 border-4 border-white shadow-md">
                                    <AvatarImage src={post.fields.author.fields.avatar?.fields.file.url} />
                                    <AvatarFallback>{post.fields.author.fields.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="space-y-2">
                                    <div className="flex flex-col sm:flex-row gap-2 items-center sm:items-baseline">
                                        <h3 className="text-xl font-bold text-gray-900">Written by {post.fields.author.fields.name}</h3>
                                        <span className="text-sm text-gray-500">Author & Plant Enthusiast</span>
                                    </div>
                                    <p className="text-gray-600 leading-relaxed text-base">
                                        {post.fields.author.fields.bio || "Passionate about bringing nature indoors and sharing tips for a greener home."}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </article>
            </div>
        </div>
    );
}
