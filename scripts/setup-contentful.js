#!/usr/bin/env node

/**
 * Setup Contentful Content Types
 * This script creates the blogPost content type in your Contentful space
 */

const contentful = require('contentful-management');

async function setupContentTypes() {
    const spaceId = process.env.CONTENTFUL_SPACE_ID;
    const managementToken = process.env.CONTENTFUL_MANAGEMENT_TOKEN;

    if (!spaceId || !managementToken) {
        console.error('❌ Missing required environment variables:');
        console.error('   - CONTENTFUL_SPACE_ID');
        console.error('   - CONTENTFUL_MANAGEMENT_TOKEN');
        console.error('\n📝 Please add CONTENTFUL_MANAGEMENT_TOKEN to your .env.local file');
        console.error('   You can create one at: https://app.contentful.com/spaces/' + spaceId + '/api/keys');
        process.exit(1);
    }

    try {
        console.log('🚀 Connecting to Contentful...');
        const client = contentful.createClient({
            accessToken: managementToken
        });

        const space = await client.getSpace(spaceId);
        const environment = await space.getEnvironment('master');

        // Create or Update Author content type
        console.log('📝 Checking Author content type...');
        try {
            let authorContentType = await environment.getContentType('author');
            console.log('✅ Author content type exists. Checking for missing fields...');

            let needsUpdate = false;

            // Add Bio if missing
            if (!authorContentType.fields.find(f => f.id === 'bio')) {
                console.log('   ➕ Adding Bio field...');
                authorContentType.fields.push({
                    id: 'bio',
                    name: 'Bio',
                    type: 'Text',
                    required: false,
                    validations: [
                        { size: { min: 0, max: 500 } }
                    ]
                });
                needsUpdate = true;
            }

            if (needsUpdate) {
                authorContentType = await authorContentType.update();
                await authorContentType.publish();
                console.log('✅ Author content type updated and published!');
            } else {
                console.log('   ✨ Author content type is up to date.');
            }

        } catch (error) {
            console.log('📝 Creating Author content type...');
            const authorContentType = await environment.createContentTypeWithId('author', {
                name: 'Author',
                description: 'Author profile for blog posts',
                displayField: 'name',
                fields: [
                    {
                        id: 'name',
                        name: 'Name',
                        type: 'Symbol',
                        required: true,
                        validations: [
                            { size: { min: 1, max: 100 } }
                        ]
                    },
                    {
                        id: 'avatar',
                        name: 'Avatar',
                        type: 'Link',
                        linkType: 'Asset',
                        required: false,
                        validations: [
                            {
                                linkMimetypeGroup: ['image']
                            }
                        ]
                    },
                    {
                        id: 'bio',
                        name: 'Bio',
                        type: 'Text',
                        required: false,
                        validations: [
                            { size: { min: 0, max: 500 } }
                        ]
                    }
                ]
            });
            await authorContentType.publish();
            console.log('✅ Author content type created and published!');
        }

        // Create or Update Category content type
        console.log('📝 Creating/updating Category content type...');
        let categoryContentType;
        try {
            categoryContentType = await environment.getContentType('category');
            console.log('⚠️  Category content type exists. Unpublishing and deleting to ensure correct structure...');
            try {
                await categoryContentType.unpublish();
            } catch (e) {
                // Ignore if already unpublished
            }
            await categoryContentType.delete();
            console.log('🗑️  Old Category content type deleted.');
        } catch (error) {
            // content type doesn't exist, proceed to create
        }

        categoryContentType = await environment.createContentTypeWithId('category', {
            name: 'Category',
            description: 'Categories for blog posts',
            displayField: 'title',
            fields: [
                {
                    id: 'title',
                    name: 'Title',
                    type: 'Symbol',
                    required: true,
                    validations: [
                        { size: { min: 1, max: 100 } }
                    ]
                },
                {
                    id: 'description',
                    name: 'Description',
                    type: 'Text',
                    required: false,
                    validations: [
                        { size: { min: 0, max: 500 } }
                    ]
                }
            ]
        });
        await categoryContentType.publish();
        console.log('✅ Category content type created and published!');

        // Create or update blogPost content type
        console.log('📝 Creating/updating blogPost content type...');
        let blogPostContentType;
        try {
            blogPostContentType = await environment.getContentType('blogPost');
            console.log('✅ blogPost content type exists. Checking for missing fields...');

            let needsUpdate = false;

            // Add parentPost if missing
            if (!blogPostContentType.fields.find(f => f.id === 'parentPost')) {
                console.log('   ➕ Adding parentPost field...');
                blogPostContentType.fields.push({
                    id: 'parentPost',
                    name: 'Parent Post',
                    type: 'Link',
                    linkType: 'Entry',
                    required: false,
                    validations: [
                        { linkContentType: ['blogPost'] }
                    ]
                });
                needsUpdate = true;
            }

            if (needsUpdate) {
                blogPostContentType = await blogPostContentType.update();
                await blogPostContentType.publish();
                console.log('✅ blogPost content type updated and published!');
            } else {
                console.log('   ✨ blogPost content type is up to date.');
            }

        } catch (error) {
            console.log('📝 Creating blogPost content type...');
            blogPostContentType = await environment.createContentTypeWithId('blogPost', {
                name: 'Blog Post',
                description: 'A blog post for the indoor gardening site',
                displayField: 'title',
                fields: [
                    {
                        id: 'title',
                        name: 'Title',
                        type: 'Symbol',
                        required: true,
                        validations: [
                            { size: { min: 1, max: 200 } }
                        ]
                    },
                    {
                        id: 'slug',
                        name: 'Slug',
                        type: 'Symbol',
                        required: true,
                        validations: [
                            { unique: true },
                            { size: { min: 1, max: 200 } },
                            {
                                regexp: {
                                    pattern: '^[a-z0-9]+(?:-[a-z0-9]+)*$',
                                    flags: null
                                },
                                message: 'Slug must be lowercase with hyphens only'
                            }
                        ]
                    },
                    {
                        id: 'excerpt',
                        name: 'Excerpt',
                        type: 'Text',
                        required: true,
                        validations: [
                            { size: { min: 1, max: 500 } }
                        ]
                    },
                    {
                        id: 'content',
                        name: 'Content',
                        type: 'RichText',
                        required: true,
                        validations: [
                            {
                                enabledNodeTypes: [
                                    'heading-1',
                                    'heading-2',
                                    'heading-3',
                                    'heading-4',
                                    'heading-5',
                                    'heading-6',
                                    'ordered-list',
                                    'unordered-list',
                                    'hr',
                                    'blockquote',
                                    'embedded-entry-block',
                                    'embedded-asset-block',
                                    'hyperlink',
                                    'entry-hyperlink',
                                    'asset-hyperlink',
                                    'embedded-entry-inline'
                                ]
                            }
                        ]
                    },
                    {
                        id: 'publishedDate',
                        name: 'Published Date',
                        type: 'Date',
                        required: true
                    },
                    {
                        id: 'featuredImage',
                        name: 'Featured Image',
                        type: 'Link',
                        linkType: 'Asset',
                        required: false,
                        validations: [
                            {
                                linkMimetypeGroup: ['image']
                            }
                        ]
                    },
                    {
                        id: 'author',
                        name: 'Author',
                        type: 'Link',
                        linkType: 'Entry',
                        required: true,
                        validations: [
                            {
                                linkContentType: ['author']
                            }
                        ]
                    },
                    {
                        id: 'categories',
                        name: 'Categories',
                        type: 'Array',
                        items: {
                            type: 'Link',
                            linkType: 'Entry',
                            validations: [
                                { linkContentType: ['category'] }
                            ]
                        },
                        required: false
                    },
                    {
                        id: 'parentPost',
                        name: 'Parent Post',
                        type: 'Link',
                        linkType: 'Entry',
                        required: false,
                        validations: [
                            { linkContentType: ['blogPost'] }
                        ]
                    }
                ]
            });

            console.log('✅ blogPost content type created successfully!');

            // Publish the content type
            await blogPostContentType.publish();
            console.log('✅ blogPost content type published!');
        }

        console.log('\n🎉 Setup complete! You can now:');
        console.log('   1. Go to https://app.contentful.com/spaces/' + spaceId + '/entries');
        console.log('   2. Click "Add entry" → "Blog Post"');
        console.log('   3. Create your first blog post');

    } catch (error) {
        console.error('❌ Error setting up Contentful:', error.message);
        if (error.details) {
            console.error('Details:', JSON.stringify(error.details, null, 2));
        }
        process.exit(1);
    }
}

setupContentTypes();
