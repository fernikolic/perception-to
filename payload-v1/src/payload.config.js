const { buildConfig } = require('payload/config');
const path = require('path');
const Users = require('./collections/Users');
const Glossary = require('./collections/Glossary');
const Learn = require('./collections/Learn');

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
  // CORS handled by Express middleware in server.js
  cors: false,
  csrf: false,
}); 