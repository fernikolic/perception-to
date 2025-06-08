const { buildConfig } = require('payload/config');
const path = require('path');
const Users = require('./src/collections/Users');
const Glossary = require('./src/collections/Glossary');
const Learn = require('./src/collections/Learn');

module.exports = buildConfig({
  admin: {
    user: Users.slug,
    disable: false,
  },
  collections: [
    Users,
    Glossary,
    Learn,
  ],
  editor: {
    depth: 10,
    leaves: {
      bold: true,
      italic: true,
      underline: true,
      strikethrough: true,
      code: true,
    },
    elements: {
      h1: true,
      h2: true,
      h3: true,
      h4: true,
      h5: true,
      h6: true,
      blockquote: true,
      ul: true,
      ol: true,
      li: true,
      link: true,
    },
  },
  // CSRF disabled - CORS handled by Express middleware
  csrf: []
}); 