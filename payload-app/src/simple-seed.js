require('dotenv').config();
const mongoose = require('mongoose');

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Define a simple schema for glossary
    const glossarySchema = new mongoose.Schema({
      title: String,
      slug: String,
      content: String,
      difficulty: String,
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now }
    });

    const Glossary = mongoose.model('glossaries', glossarySchema);

    // Clear existing data
    await Glossary.deleteMany({});
    console.log('Cleared existing data');

    // Create sample entries
    const sampleEntries = [
      {
        title: 'Bitcoin',
        slug: 'bitcoin',
        content: 'Bitcoin is a decentralized digital currency invented in 2008 by an unknown person or group of people using the name Satoshi Nakamoto.',
        difficulty: 'Beginner'
      },
      {
        title: 'Blockchain',
        slug: 'blockchain', 
        content: 'A blockchain is a growing list of records, called blocks, that are linked and secured using cryptography.',
        difficulty: 'Intermediate'
      },
      {
        title: 'Mining',
        slug: 'mining',
        content: 'Bitcoin mining is the process by which new bitcoins are entered into circulation and transactions are verified.',
        difficulty: 'Advanced'
      }
    ];

    // Insert sample data
    const result = await Glossary.insertMany(sampleEntries);
    console.log(`Created ${result.length} glossary entries`);

    console.log('Sample data seeded successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

seedData(); 