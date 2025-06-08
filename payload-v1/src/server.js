const express = require('express');
const cors = require('cors');
const payload = require('payload');

require('dotenv').config();

const app = express();

// Add CORS middleware before Payload initialization
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Initialize Payload
const start = async () => {
  try {
    console.log('🚀 Starting Payload CMS...');
    console.log('📊 Environment:', process.env.NODE_ENV);
    console.log('🔗 MongoDB URI:', process.env.MONGODB_URI ? 'Set' : 'Missing');
    console.log('🔑 Payload Secret:', process.env.PAYLOAD_SECRET ? 'Set' : 'Missing');

    await payload.init({
      secret: process.env.PAYLOAD_SECRET,
      mongoURL: process.env.MONGODB_URI,
      express: app,
      onInit: () => {
        payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
      },
    });

    const port = parseInt(process.env.PORT) || 3000;
    const host = process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost';
    
    app.listen(port, host, () => {
      console.log(`✅ Server listening on ${host}:${port}`);
      console.log(`✅ Admin panel: http://${host}:${port}/admin`);
    });

  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

start();

// Add your own express routes here 