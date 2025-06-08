require('dotenv').config();
const payload = require('payload');

const debugPayload = async () => {
  try {
    await payload.init({
      secret: process.env.PAYLOAD_SECRET,
      mongoURL: process.env.MONGODB_URI,
      local: true,
    });

    console.log('Payload initialized successfully');
    console.log('Collections available:', Object.keys(payload.collections));
    
    // Check glossary collection details
    const glossaryCollection = payload.collections.glossary;
    console.log('\nGlossary collection config:');
    console.log('- Slug:', glossaryCollection.config.slug);
    console.log('- Fields:', glossaryCollection.config.fields.map(f => f.name));

    // Try to find documents
    console.log('\nTrying to find documents via Payload...');
    const result = await payload.find({
      collection: 'glossary',
      limit: 1,
    });
    
    console.log('Find result:', JSON.stringify(result, null, 2));

  } catch (error) {
    console.error('Error:', error.message);
  }

  process.exit(0);
};

debugPayload(); 