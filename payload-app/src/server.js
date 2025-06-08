const express = require('express');
const payload = require('payload');

require('dotenv').config();

const app = express();

// Redirect root to Admin panel
app.get('/', (_, res) => {
  res.redirect('/admin');
});

const start = async () => {
  // Initialize Payload
  await payload.init({
    secret: process.env.PAYLOAD_SECRET || 'fallback-secret-key',
    mongoURL: process.env.MONGODB_URI || 'mongodb://localhost/payload',
    express: app,
    onInit: () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
    },
  });

  const port = process.env.PORT || 3000;
  app.listen(port, async () => {
    payload.logger.info(`Server listening on port ${port}`);
  });
};

start(); 