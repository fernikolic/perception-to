const { buildConfig } = require('payload/config');
const { mongooseAdapter } = require('@payloadcms/db-mongodb');
const path = require('path');
const Users = require('./collections/Users');
const Glossary = require('./collections/Glossary');
const Learn = require('./collections/Learn');

module.exports = buildConfig({
  collections: [
    Users,
    Glossary,
    Learn,
  ],
  editor: {
    validate: () => true,
  },
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || 'mongodb://localhost/payload',
  }),
  admin: {
    disable: true, // Temporarily disabled due to webpack compilation issues
  },
  graphQL: {
    disable: true, // Disabled due to field configuration issues
  },
}); 