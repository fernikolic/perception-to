const fs = require('fs');
const path = require('path');

// Your Payload CMS credentials - UPDATE THESE
const EMAIL = 'fernikolic@gmail.com';
const PASSWORD = 'hmqvMK8He9Jz6XM';

// Directory containing your glossary JSON files - UPDATE THIS PATH
const FILES_DIRECTORY = '/Users/fernandonikolic/Downloads/glossary-items';

// Payload CMS API endpoints
const PAYLOAD_URL = 'http://localhost:3000';
const LOGIN_ENDPOINT = '/api/users/login';
const GLOSSARY_ENDPOINT = '/api/glossary';

async function authenticateWithPayload() {
  console.log('🔐 Authenticating with Payload CMS...');
  
  try {
    const response = await fetch(`${PAYLOAD_URL}${LOGIN_ENDPOINT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: EMAIL,
        password: PASSWORD,
      }),
    });

    if (!response.ok) {
      throw new Error(`Authentication failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('✅ Authentication successful');
    return data.token;
  } catch (error) {
    console.error('❌ Authentication failed:', error.message);
    throw error;
  }
}

// Transform data to match Payload CMS Glossary schema
function transformGlossaryData(data) {
  // Map category labels to values for Glossary collection
  const categoryMap = {
    'Bitcoin': 'bitcoin',
    'Stablecoins': 'stablecoins', 
    'Regulation': 'regulation',
    'Macro': 'macro'
  };

  return {
    title: data.title,
    slug: data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
    description: data.description,
    category: categoryMap[data.category] || 'bitcoin', // Default fallback
    published: data.published !== undefined ? data.published : true, // Default to published
  };
}

async function uploadGlossaryItem(itemData, token, fileName) {
  try {
    const response = await fetch(`${PAYLOAD_URL}${GLOSSARY_ENDPOINT}`, {
      method: 'POST',
      headers: {
        'Authorization': `JWT ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(itemData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Upload failed: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    console.log(`✅ Successfully uploaded: ${fileName} (ID: ${data.id})`);
    return data;
  } catch (error) {
    console.error(`❌ Failed to upload ${fileName}:`, error.message);
    throw error;
  }
}

async function uploadGlossaryItems() {
  try {
    // Check if directory exists
    if (!fs.existsSync(FILES_DIRECTORY)) {
      throw new Error(`Directory not found: ${FILES_DIRECTORY}`);
    }

    // Get all JSON files
    const files = fs.readdirSync(FILES_DIRECTORY)
      .filter(file => file.endsWith('.json'))
      .sort();

    if (files.length === 0) {
      throw new Error(`No JSON files found in ${FILES_DIRECTORY}`);
    }

    console.log(`📁 Found ${files.length} JSON files to process\n`);

    // Authenticate with Payload
    const token = await authenticateWithPayload();

    console.log('\n🚀 Starting glossary item upload process...\n');

    let successCount = 0;
    let failureCount = 0;

    for (const fileName of files) {
      try {
        console.log(`📤 Uploading glossary item: ${fileName}`);
        
        // Read and parse JSON file
        const filePath = path.join(FILES_DIRECTORY, fileName);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        let itemData;
        
        try {
          itemData = JSON.parse(fileContent);
        } catch (parseError) {
          throw new Error(`Invalid JSON in ${fileName}: ${parseError.message}`);
        }

        // Transform data to match Payload CMS Glossary schema
        const transformedData = transformGlossaryData(itemData);

        await uploadGlossaryItem(transformedData, token, fileName);
        successCount++;

      } catch (error) {
        console.error(`❌ Failed to process ${fileName}:`, error.message);
        failureCount++;
      }
    }

    console.log('\n📊 Upload Summary:');
    console.log(`✅ Successful uploads: ${successCount}`);
    console.log(`❌ Failed uploads: ${failureCount}`);
    console.log(`📁 Total files processed: ${files.length}`);

    if (failureCount === 0) {
      console.log('\n🎉 All glossary items uploaded successfully!');
    } else {
      console.log('\n⚠️  Some uploads failed. Check the logs above for details.');
    }

  } catch (error) {
    console.error('💥 Script failed:', error.message);
    process.exit(1);
  }
}

// Run the script
uploadGlossaryItems(); 