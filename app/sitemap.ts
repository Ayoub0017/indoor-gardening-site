import { MetadataRoute } from 'next';
import { getBlogPosts } from '@/lib/contentful';

export const revalidate = 3600; // Revalidate sitemap every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://justindoorgardens.com';

    // Static pages
    const staticPages = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 1,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        },
        {
            url: `${baseUrl}/privacy`,
            lastModified: new Date(),
            changeFrequency: 'yearly' as const,
            priority: 0.3,
        },
    ];

    // Fetch all blog posts
    const posts = await getBlogPosts(1000); // Get all posts

    const blogPages = posts.map((post) => {
        const slug = post.fields.parentPost
            ? `${post.fields.parentPost.fields.slug}/${post.fields.slug}`
            : post.fields.slug;

        return {
            url: `${baseUrl}/blog/${slug}`,
            lastModified: new Date(post.sys.updatedAt),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        };
    });

    return [...staticPages, ...blogPages];
}
