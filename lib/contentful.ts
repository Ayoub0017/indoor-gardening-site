import { createClient } from 'contentful';
import { BlogPost } from './types';

const space = process.env.CONTENTFUL_SPACE_ID;
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;

// Create a client or a mock if credentials are missing
export const contentfulClient = (space && accessToken)
    ? createClient({ space, accessToken })
    : {
        getEntries: async () => {
            console.warn('Contentful credentials missing. Returning empty results.');
            return { items: [] };
        }
    } as any;

export async function getBlogPosts(limit = 6): Promise<BlogPost[]> {
    try {
        const response = await contentfulClient.getEntries({
            content_type: 'blogPost',
            limit,
            order: ['-fields.publishedDate'],
            include: 2,
        });

        // Cast to our type manually since we aren't using strict contentful generated types for simplicity
        return response.items as unknown as BlogPost[];
    } catch (error: any) {
        console.error('Error fetching blog posts:', error);
        return [];
    }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
        const response = await contentfulClient.getEntries({
            content_type: 'blogPost',
            'fields.slug': slug,
            limit: 1,
            include: 2,
        });

        if (response.items.length > 0) {
            return response.items[0] as unknown as BlogPost;
        }

        return null;
    } catch (error) {
        console.error(`Error fetching blog post with slug ${slug}:`, error);
        return null;
    }
}
