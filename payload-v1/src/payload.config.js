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
  cors: [
    'http://localhost:3000',
    'https://perception.to',
  ],
  csrf: [
    'http://localhost:3000',
    'https://perception.to',
  ],
}); 