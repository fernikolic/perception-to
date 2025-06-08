const { buildConfig } = require('payload/config');
const { webpackBundler } = require('@payloadcms/bundler-webpack');
const path = require('path');
const Users = require('./collections/Users');
const Glossary = require('./collections/Glossary');

module.exports = buildConfig({
  collections: [
    Users,
    Glossary,
  ],
  mongoURL: process.env.MONGODB_URI || 'mongodb://localhost/payload',
  editor: {
    validate: () => true,
  },
  admin: {
    disable: true, // Temporarily disabled due to webpack compilation issues
  },
  graphQL: {
    disable: true, // Disabled due to field configuration issues
  },
}); 