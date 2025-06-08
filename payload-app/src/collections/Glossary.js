const Glossary = {
  slug: 'glossary',
  admin: { useAsTitle: 'title' },
  access: {
    read: () => true, // Public read access for testing
    create: () => true, // Public write access for testing
    update: () => true, // Public update access for testing
    delete: () => true, // Public delete access for testing
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'content', type: 'textarea', required: true },
    {
      name: 'difficulty',
      type: 'select',
      options: ['Beginner', 'Intermediate', 'Advanced'],
    },
  ],
};

module.exports = Glossary; 