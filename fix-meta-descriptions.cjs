const fs = require('fs');
const path = require('path');

const INTELLIGENCE_ARTICLES_FOLDER = './intelligence-articles';

// Function to truncate meta description to 160 characters
function truncateMetaDescription(description) {
  if (!description) return '';
  if (description.length <= 160) return description;
  
  // Truncate at 157 characters and add ellipsis
  return description.substring(0, 157) + '...';
}

async function fixMetaDescriptions() {
  try {
    console.log('🔧 Fixing meta description lengths...');
    
    // Read all JSON files from intelligence articles folder
    const files = fs.readdirSync(INTELLIGENCE_ARTICLES_FOLDER);
    const jsonFiles = files.filter(file => path.extname(file).toLowerCase() === '.json');

    let fixedCount = 0;
    
    for (const fileName of jsonFiles) {
      const filePath = path.join(INTELLIGENCE_ARTICLES_FOLDER, fileName);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const articleData = JSON.parse(fileContent);
      
      const originalLength = articleData.metaDescription?.length || 0;
      
      if (originalLength > 160) {
        articleData.metaDescription = truncateMetaDescription(articleData.metaDescription);
        
        // Write the fixed data back to the file
        fs.writeFileSync(filePath, JSON.stringify(articleData, null, 2));
        
        console.log(`✅ Fixed ${fileName}: ${originalLength} → ${articleData.metaDescription.length} chars`);
        fixedCount++;
      } else {
        console.log(`✓ ${fileName}: ${originalLength} chars (OK)`);
      }
    }
    
    console.log(`\n📊 Meta Description Fix Summary:`);
    console.log(`Fixed: ${fixedCount} files`);
    console.log(`Total: ${jsonFiles.length} files processed`);
    console.log('\n🚀 Ready to upload articles!');
    
  } catch (error) {
    console.error('❌ Error fixing meta descriptions:', error.message);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  fixMetaDescriptions();
}

module.exports = { fixMetaDescriptions };