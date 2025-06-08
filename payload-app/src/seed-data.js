require('dotenv').config();
const payload = require('payload');

const seedData = async () => {
  // Initialize Payload
  await payload.init({
    secret: process.env.PAYLOAD_SECRET || 'fallback-secret-key',
    mongoURL: process.env.MONGODB_URI || 'mongodb://localhost/payload',
    local: true, // This bypasses the API and directly uses the database
  });

  console.log('Payload initialized. Seeding data...');

  try {
    // Create sample glossary entries
    const sampleEntries = [
      {
        title: 'Bitcoin',
        slug: 'bitcoin',
        intro: 'A decentralized digital currency',
        content: 'Bitcoin is a cryptocurrency invented in 2008 by an unknown person or group of people using the name Satoshi Nakamoto.',
        difficulty: 'Beginner',
        keywords: [
          { keyword: 'cryptocurrency' },
          { keyword: 'digital currency' },
          { keyword: 'blockchain' }
        ]
      },
      {
        title: 'Blockchain',
        slug: 'blockchain',
        intro: 'A distributed ledger technology',
        content: 'A blockchain is a growing list of records, called blocks, that are linked and secured using cryptography.',
        difficulty: 'Intermediate',
        keywords: [
          { keyword: 'distributed ledger' },
          { keyword: 'blocks' },
          { keyword: 'cryptography' }
        ]
      },
      {
        title: 'Mining',
        slug: 'mining',
        intro: 'The process of adding transactions to the blockchain',
        content: 'Bitcoin mining is the process by which new bitcoins are entered into circulation and transactions are verified.',
        difficulty: 'Advanced',
        keywords: [
          { keyword: 'proof of work' },
          { keyword: 'hash rate' },
          { keyword: 'miners' }
        ]
      }
    ];

    for (const entry of sampleEntries) {
      const result = await payload.create({
        collection: 'glossary',
        data: entry,
      });
      console.log(`Created glossary entry: ${result.title}`);
    }

    console.log('Sample data seeded successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
  }

  process.exit(0);
};

seedData(); 