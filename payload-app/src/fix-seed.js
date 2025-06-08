require('dotenv').config();
const mongoose = require('mongoose');

const fixSeed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const db = mongoose.connection.db;

    // First, clear the glossary collection (singular)
    const glossaryCol = db.collection('glossary');
    await glossaryCol.deleteMany({});
    console.log('Cleared glossary collection');

    // Create sample entries with Payload's expected structure
    const sampleEntries = [
      {
        title: 'Bitcoin',
        slug: 'bitcoin',
        content: 'Bitcoin is a decentralized digital currency invented in 2008 by an unknown person or group of people using the name Satoshi Nakamoto.',
        difficulty: 'Beginner',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Blockchain',
        slug: 'blockchain', 
        content: 'A blockchain is a growing list of records, called blocks, that are linked and secured using cryptography.',
        difficulty: 'Intermediate',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Mining',
        slug: 'mining',
        content: 'Bitcoin mining is the process by which new bitcoins are entered into circulation and transactions are verified.',
        difficulty: 'Advanced',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    // Insert into the correct collection name (glossary, not glossaries)
    const result = await glossaryCol.insertMany(sampleEntries);
    console.log(`Created ${result.insertedCount} glossary entries in 'glossary' collection`);

    // Verify the documents exist
    const count = await glossaryCol.countDocuments();
    console.log(`Total documents in glossary collection: ${count}`);

    // Show a sample document
    const sample = await glossaryCol.findOne({});
    console.log('\nSample document structure:');
    console.log(JSON.stringify(sample, null, 2));

  } catch (error) {
    console.error('Error fixing seed data:', error);
  } finally {
    await mongoose.disconnect();
  }
};

fixSeed(); 