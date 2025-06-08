require('dotenv').config();
const mongoose = require('mongoose');

const inspectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Get the database
    const db = mongoose.connection.db;
    
    // List all collections
    console.log('\n=== All Collections ===');
    const collections = await db.listCollections().toArray();
    collections.forEach(col => console.log(`- ${col.name}`));

    // Check the glossaries collection
    console.log('\n=== Glossaries Collection ===');
    const glossariesCol = db.collection('glossaries');
    const count = await glossariesCol.countDocuments();
    console.log(`Document count: ${count}`);

    if (count > 0) {
      console.log('\n=== Sample Documents ===');
      const docs = await glossariesCol.find({}).limit(2).toArray();
      docs.forEach((doc, index) => {
        console.log(`\nDocument ${index + 1}:`);
        console.log(JSON.stringify(doc, null, 2));
      });
    }

    // Check if there's a 'glossary' collection (singular)
    console.log('\n=== Checking for "glossary" collection (singular) ===');
    const glossaryCol = db.collection('glossary');
    const glossaryCount = await glossaryCol.countDocuments();
    console.log(`Document count in "glossary": ${glossaryCount}`);

    if (glossaryCount > 0) {
      console.log('\n=== Sample Documents from "glossary" ===');
      const glossaryDocs = await glossaryCol.find({}).limit(2).toArray();
      glossaryDocs.forEach((doc, index) => {
        console.log(`\nDocument ${index + 1}:`);
        console.log(JSON.stringify(doc, null, 2));
      });
    }

  } catch (error) {
    console.error('Error inspecting database:', error);
  } finally {
    await mongoose.disconnect();
  }
};

inspectDB(); 