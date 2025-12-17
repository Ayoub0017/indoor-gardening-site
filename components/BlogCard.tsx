import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/lib/types';
import { format } from 'date-fns';

interface BlogCardProps {
    post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
    const { title, slug, excerpt, featuredImage, publishedDate, categories, parentPost } = post.fields;

    // Construct URL based on parentPost existence
    const postUrl = `/blog/${parentPost ? `${parentPost.fields.slug}/` : ''}${slug}`;

    return (
        <Link href={postUrl} className="group block h-full">
            <article className="flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:border-green-100 transition-all duration-300 hover:-translate-y-1">
                <div className="relative h-64 w-full overflow-hidden bg-gray-100">
                    {featuredImage?.fields?.file?.url ? (
                        <Image
                            src={`https:${featuredImage.fields.file.url}`}
                            alt={featuredImage.fields.title || title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    ) : (
                        <div className="w-full h-full bg-green-50 flex items-center justify-center text-green-300">
                            No Image
                        </div>
                    )}
                    <div className="absolute top-4 left-4 flex gap-2">
                        {categories?.slice(0, 1).map(cat => (
                            <span key={cat.sys.id} className="px-3 py-1 bg-white/90 backdrop-blur text-xs font-semibold text-green-800 rounded-full">
                                {cat.fields.title}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                        <time dateTime={publishedDate}>
                            {publishedDate ? format(new Date(publishedDate), 'MMM d, yyyy') : ''}
                        </time>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed flex-1">
                        {excerpt}
                    </p>
                    <div className="flex items-center text-primary font-medium text-sm mt-auto group-hover:underline decoration-2 underline-offset-4">
                        Read Article
                    </div>
                </div>
            </article>
        </Link>
    )
}
