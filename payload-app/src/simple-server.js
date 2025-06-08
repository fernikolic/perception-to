const express = require('express');
const payload = require('payload');
const cors = require('cors');

require('dotenv').config();

const app = express();

// Configure CORS
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

const start = async () => {
  // Initialize Payload with minimal config
  await payload.init({
    secret: process.env.PAYLOAD_SECRET || 'fallback-secret-key',
    express: app,
    local: false,
    onInit: () => {
      console.log('Payload initialized successfully');
    },
  });

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
};

start().catch(err => {
  console.error('Failed to start server:', err);
}); 