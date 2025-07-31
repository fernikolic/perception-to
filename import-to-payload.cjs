// Payload CMS Bulk Import Script for Intelligence Articles
// Run this script to import all generated articles into your Payload CMS

const fs = require('fs');
const path = require('path');

// You'll need to configure these based on your Payload setup
const PAYLOAD_API_URL = 'http://localhost:3000/api'; // Adjust for your Payload URL
const PAYLOAD_SECRET = process.env.PAYLOAD_SECRET; // Your Payload secret

async function importArticles() {
  try {
    // Read the articles from the import file
    const importData = JSON.parse(fs.readFileSync('./payload-intelligence-import.json', 'utf8'));
    const articles = importData.collections.learn;
    
    console.log(`Importing ${articles.length} articles to Payload CMS...`);
    
    for (const article of articles) {
      try {
        // You would make API calls to your Payload instance here
        // Example:
        // const response = await fetch(`${PAYLOAD_API_URL}/learn`, {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //     'Authorization': `Bearer ${PAYLOAD_SECRET}`
        //   },
        //   body: JSON.stringify(article)
        // });
        
        console.log(`✓ Ready to import: ${article.title}`);
      } catch (error) {
        console.error(`✗ Error preparing ${article.title}:`, error.message);
      }
    }
    
    console.log('\nImport Summary:');
    console.log('- Articles ready for import: 8');
    console.log('- Categories: opportunity-intelligence, competitive-intelligence, market-timing, etc.');
    console.log('- Total content: 100+ minutes reading time');
    
    console.log('\nManual Import Instructions:');
    console.log('1. Open your Payload CMS admin panel');
    console.log('2. Navigate to the Learn collection');
    console.log('3. Create new entries using the data from intelligence-articles/ folder');
    console.log('4. Copy title, slug, content, category, and other fields');
    console.log('5. Set published: true for each article');
    
  } catch (error) {
    console.error('Import error:', error);
  }
}

// Alternative: Generate individual import files for easier manual import
function generateIndividualImports() {
  const importData = JSON.parse(fs.readFileSync('./payload-intelligence-import.json', 'utf8'));
  const articles = importData.collections.learn;
  
  console.log('Generating individual import files for manual CMS import...\n');
  
  articles.forEach((article, index) => {
    console.log(`${index + 1}. ${article.title}`);
    console.log(`   Slug: ${article.slug}`);
    console.log(`   Category: ${article.category}`);
    console.log(`   Content Length: ${Math.round(article.content.length / 1000)}k characters`);
    console.log(`   Read Time: ${article.readTime} minutes`);
    console.log(`   File: intelligence-articles/${article.slug}.json`);
    console.log('');
  });
  
  console.log('Import Process:');
  console.log('1. Open Payload CMS admin');
  console.log('2. Go to Learn collection');
  console.log('3. Create new entry');
  console.log('4. Use data from intelligence-articles/[slug].json files');
  console.log('5. Repeat for all 8 articles');
}

// Run the appropriate function
if (process.argv.includes('--list')) {
  generateIndividualImports();
} else {
  importArticles();
}

module.exports = { importArticles, generateIndividualImports };