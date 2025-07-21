require('dotenv').config();
const mongoose = require('mongoose');

const checkCollections = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/payload');
    console.log('Connected to MongoDB');

    // List all collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('\n📁 Available collections:');
    collections.forEach(col => {
      console.log(`  - ${col.name}`);
    });

    // Check glossaries collection
    const db = mongoose.connection.db;
    const glossariesCount = await db.collection('glossaries').countDocuments();
    console.log(`\n📚 Glossaries collection has ${glossariesCount} documents`);

    // Get some sample documents
    const sampleGlossaries = await db.collection('glossaries').find({}).limit(3).toArray();
    console.log('\n📋 Sample glossary documents:');
    sampleGlossaries.forEach((doc, index) => {
      console.log(`  ${index + 1}. ${doc.title} (${doc.slug})`);
    });

    // Check for our specific entry
    const bitcoinSentiment = await db.collection('glossaries').findOne({ slug: 'bitcoin-sentiment' });
    if (bitcoinSentiment) {
      console.log('\n✅ Found bitcoin-sentiment entry:');
      console.log(`   Title: ${bitcoinSentiment.title}`);
      console.log(`   ID: ${bitcoinSentiment._id}`);
    } else {
      console.log('\n❌ bitcoin-sentiment entry not found');
    }

    // Check learns collection
    const learnsCount = await db.collection('learns').countDocuments();
    console.log(`\n📖 Learns collection has ${learnsCount} documents`);

    const bitcoinSentimentLearn = await db.collection('learns').findOne({ slug: 'bitcoin-sentiment-analysis' });
    if (bitcoinSentimentLearn) {
      console.log('\n✅ Found bitcoin-sentiment-analysis entry:');
      console.log(`   Title: ${bitcoinSentimentLearn.title}`);
      console.log(`   ID: ${bitcoinSentimentLearn._id}`);
    } else {
      console.log('\n❌ bitcoin-sentiment-analysis entry not found');
    }

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\nDisconnected from MongoDB');
  }
};

checkCollections();