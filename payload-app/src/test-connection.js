require('dotenv').config();
const mongoose = require('mongoose');

const testConnection = async () => {
  try {
    console.log('Testing MongoDB connection...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connection successful');

    // Test querying the glossary collection directly
    const db = mongoose.connection.db;
    const glossaryCol = db.collection('glossary');
    const count = await glossaryCol.countDocuments();
    console.log(`✅ Found ${count} documents in glossary collection`);

    if (count > 0) {
      const docs = await glossaryCol.find({}).limit(1).toArray();
      console.log('✅ Sample document structure:');
      console.log(JSON.stringify(docs[0], null, 2));
    }

    // Try Payload initialization
    console.log('\nTesting Payload initialization...');
    const payload = require('payload');
    
    try {
      await payload.init({
        secret: process.env.PAYLOAD_SECRET,
        mongoURL: process.env.MONGODB_URI,
        local: true,
      });
      console.log('✅ Payload initialized successfully');
      
      // Test find operation
      console.log('\nTesting Payload find operation...');
      const result = await payload.find({
        collection: 'glossary',
        limit: 1,
      });
      console.log('✅ Payload find result:', JSON.stringify(result, null, 2));
      
    } catch (payloadError) {
      console.error('❌ Payload error:', payloadError.message);
      console.error('Full error:', payloadError);
    }

  } catch (error) {
    console.error('❌ Database connection error:', error.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

testConnection(); 