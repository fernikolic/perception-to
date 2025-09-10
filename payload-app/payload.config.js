const { buildConfig } = require('payload/config');
const { mongooseAdapter } = require('@payloadcms/db-mongodb');
const path = require('path');
const Users = require('./src/collections/Users');

module.exports = buildConfig({
  collections: [
    Users,
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
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'https://perception.to',
  routes: {
    api: '/api',
  },
}); 