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
  // CSRF disabled - CORS handled by Express middleware
  csrf: []
}); 