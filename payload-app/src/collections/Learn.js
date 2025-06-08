const { formatSlug } = require('../utils/formatSlug');

const Learn = {
  slug: 'learn',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true, // Public read access for GET requests
    create: ({ req: { user } }) => !!user, // Only authenticated users can create
    update: ({ req: { user } }) => !!user, // Only authenticated users can update
    delete: ({ req: { user } }) => !!user, // Only authenticated users can delete
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [formatSlug('title')],
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Brief summary of the article (shown on cards)',
      },
    },
    {
      name: 'content',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Full article content',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        {
          label: 'Bitcoin Basics',
          value: 'bitcoin-basics',
        },
        {
          label: 'Market Analysis',
          value: 'market-analysis',
        },
        {
          label: 'Technical Guides',
          value: 'technical-guides',
        },
        {
          label: 'Policy & Regulation',
          value: 'policy-regulation',
        },
        {
          label: 'DeFi & Stablecoins',
          value: 'defi-stablecoins',
        },
        {
          label: 'Data & Research',
          value: 'data-research',
        },
      ],
    },
    {
      name: 'tags',
      type: 'array',
      fields: [
        {
          name: 'tag',
          type: 'text',
        },
      ],
      admin: {
        description: 'Add relevant tags for this article',
      },
    },
    {
      name: 'readTime',
      type: 'number',
      required: true,
      admin: {
        description: 'Estimated reading time in minutes',
      },
    },
    {
      name: 'difficulty',
      type: 'select',
      required: true,
      options: [
        {
          label: 'Beginner',
          value: 'beginner',
        },
        {
          label: 'Intermediate',
          value: 'intermediate',
        },
        {
          label: 'Advanced',
          value: 'advanced',
        },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Mark as featured article',
      },
    },
    {
      name: 'published',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData.published && !value) {
              return new Date();
            }
            return value;
          },
        ],
      },
    },
    {
      name: 'updatedAt',
      type: 'date',
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' || !value) {
              return new Date();
            }
            return value;
          },
        ],
      },
    },
  ],
};

module.exports = Learn; 