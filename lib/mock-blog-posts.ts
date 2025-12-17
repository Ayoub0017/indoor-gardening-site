import { BlogPost } from './types';
import { BLOCKS } from '@contentful/rich-text-types';

export const mockBlogPosts: BlogPost[] = [
    {
        sys: {
            id: '1',
            createdAt: '2024-01-15T10:00:00Z',
            updatedAt: '2024-01-15T10:00:00Z',
        },
        fields: {
            title: 'Getting Started with Indoor Gardening: A Beginner\'s Guide',
            slug: 'getting-started-indoor-gardening',
            excerpt: 'Learn the essential tips and tricks to start your indoor garden journey. Perfect for beginners who want to bring nature indoors.',
            content: {
                nodeType: BLOCKS.DOCUMENT,
                content: [],
                data: {},
            },
            publishedDate: '2024-01-15T10:00:00Z',
            author: {
                fields: {
                    name: 'Sarah Green',
                },
            },
            featuredImage: {
                fields: {
                    title: 'Indoor Garden Setup',
                    file: {
                        url: 'https://images.unsplash.com/photo-1466781783364-36c955e42a7f?w=800',
                        details: {
                            image: {
                                width: 800,
                                height: 600,
                            },
                        },
                    },
                },
            },
        },
    },
    {
        sys: {
            id: '2',
            createdAt: '2024-01-20T10:00:00Z',
            updatedAt: '2024-01-20T10:00:00Z',
        },
        fields: {
            title: 'Top 10 Low-Light Plants for Your Home',
            slug: 'top-10-low-light-plants',
            excerpt: 'Discover the best plants that thrive in low-light conditions. Perfect for apartments and rooms with limited natural light.',
            content: {
                nodeType: BLOCKS.DOCUMENT,
                content: [],
                data: {},
            },
            publishedDate: '2024-01-20T10:00:00Z',
            author: {
                fields: {
                    name: 'Michael Chen',
                },
            },
            featuredImage: {
                fields: {
                    title: 'Low Light Plants',
                    file: {
                        url: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=800',
                        details: {
                            image: {
                                width: 800,
                                height: 600,
                            },
                        },
                    },
                },
            },
        },
    },
    {
        sys: {
            id: '3',
            createdAt: '2024-02-01T10:00:00Z',
            updatedAt: '2024-02-01T10:00:00Z',
        },
        fields: {
            title: 'Watering Wisdom: How Much is Too Much?',
            slug: 'watering-wisdom-guide',
            excerpt: 'Master the art of watering your indoor plants. Learn to read the signs and avoid common watering mistakes.',
            content: {
                nodeType: BLOCKS.DOCUMENT,
                content: [],
                data: {},
            },
            publishedDate: '2024-02-01T10:00:00Z',
            author: {
                fields: {
                    name: 'Emma Rodriguez',
                },
            },
            featuredImage: {
                fields: {
                    title: 'Watering Plants',
                    file: {
                        url: 'https://images.unsplash.com/photo-1459156212016-c812468e2115?w=800',
                        details: {
                            image: {
                                width: 800,
                                height: 600,
                            },
                        },
                    },
                },
            },
        },
    },
    {
        sys: {
            id: '4',
            createdAt: '2024-02-10T10:00:00Z',
            updatedAt: '2024-02-10T10:00:00Z',
        },
        fields: {
            title: 'Creating the Perfect Herb Garden in Your Kitchen',
            slug: 'kitchen-herb-garden',
            excerpt: 'Fresh herbs at your fingertips! Learn how to grow a thriving herb garden right in your kitchen.',
            content: {
                nodeType: BLOCKS.DOCUMENT,
                content: [],
                data: {},
            },
            publishedDate: '2024-02-10T10:00:00Z',
            author: {
                fields: {
                    name: 'James Wilson',
                },
            },
            featuredImage: {
                fields: {
                    title: 'Kitchen Herbs',
                    file: {
                        url: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800',
                        details: {
                            image: {
                                width: 800,
                                height: 600,
                            },
                        },
                    },
                },
            },
        },
    },
    {
        sys: {
            id: '5',
            createdAt: '2024-02-15T10:00:00Z',
            updatedAt: '2024-02-15T10:00:00Z',
        },
        fields: {
            title: 'Dealing with Common Plant Pests Naturally',
            slug: 'natural-pest-control',
            excerpt: 'Keep your indoor garden healthy with natural pest control methods. Say goodbye to harmful chemicals!',
            content: {
                nodeType: BLOCKS.DOCUMENT,
                content: [],
                data: {},
            },
            publishedDate: '2024-02-15T10:00:00Z',
            author: {
                fields: {
                    name: 'Sarah Green',
                },
            },
            featuredImage: {
                fields: {
                    title: 'Healthy Plants',
                    file: {
                        url: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800',
                        details: {
                            image: {
                                width: 800,
                                height: 600,
                            },
                        },
                    },
                },
            },
        },
    },
    {
        sys: {
            id: '6',
            createdAt: '2024-02-20T10:00:00Z',
            updatedAt: '2024-02-20T10:00:00Z',
        },
        fields: {
            title: 'The Best Air-Purifying Plants for Your Home',
            slug: 'air-purifying-plants',
            excerpt: 'Breathe easier with these beautiful air-purifying plants. Improve your indoor air quality naturally.',
            content: {
                nodeType: BLOCKS.DOCUMENT,
                content: [],
                data: {},
            },
            publishedDate: '2024-02-20T10:00:00Z',
            author: {
                fields: {
                    name: 'Michael Chen',
                },
            },
            featuredImage: {
                fields: {
                    title: 'Air Purifying Plants',
                    file: {
                        url: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=800',
                        details: {
                            image: {
                                width: 800,
                                height: 600,
                            },
                        },
                    },
                },
            },
        },
    },
];
