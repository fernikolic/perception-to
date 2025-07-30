const { formatSlug } = require('../utils/formatSlug');

const Glossary = {
  slug: 'glossary',
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
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      options: [
        {
          label: 'Bitcoin',
          value: 'bitcoin',
        },
        {
          label: 'Stablecoins',
          value: 'stablecoins',
        },
        {
          label: 'Regulation',
          value: 'regulation',
        },
        {
          label: 'Macro',
          value: 'macro',
        },
        {
          label: 'Strategic Intelligence',
          value: 'strategic-intelligence',
        },
        {
          label: 'Competitive Intelligence',
          value: 'competitive-intelligence',
        },
        {
          label: 'Market Intelligence',
          value: 'market-intelligence',
        },
        {
          label: 'Risk Intelligence',
          value: 'risk-intelligence',
        },
      ],
    },
    {
      name: 'published',
      type: 'checkbox',
      defaultValue: true,
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

module.exports = Glossary; 