const express = require('express');
const payload = require('payload');

require('dotenv').config();

const app = express();

// Initialize Payload
const start = async () => {
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    mongoURL: process.env.MONGODB_URI,
    express: app,
    onInit: () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
    },
  });

  app.listen(process.env.PORT || 3000, async () => {
    console.log(`Server listening on port ${process.env.PORT || 3000}`);
  });
};

start();

// Add your own express routes here 