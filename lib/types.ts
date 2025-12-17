import { Document } from '@contentful/rich-text-types';

export interface ContentfulImage {
    fields: {
        file: {
            url: string;
            details?: {
                image?: {
                    width: number;
                    height: number;
                };
            };
        };
        title: string;
    };
}

export interface Author {
    sys: { id: string };
    fields: {
        name: string;
        bio?: string;
        avatar?: ContentfulImage;
    };
}

export interface Category {
    sys: { id: string };
    fields: {
        title: string;
        description?: string;
    };
}

export interface BlogPost {
    sys: {
        id: string;
        createdAt: string;
        updatedAt: string;
    };
    fields: {
        title: string;
        slug: string;
        excerpt: string;
        featuredImage?: ContentfulImage;
        content: Document;
        author: Author;
        categories?: Category[];
        parentPost?: BlogPost; // Recursive reference for parent/child structure
        publishedDate: string;
    };
}

export interface ContentfulResponse<T> {
    items: T[];
    total: number;
    skip: number;
    limit: number;
}
