const express = require('express');
const payload = require('payload');
const cors = require('cors');

require('dotenv').config();

const app = express();

// Configure CORS to allow requests from frontend (Vite dev server)
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:5175',
    'http://localhost:3000',
    'https://perception.to',
    'https://www.perception.to'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

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