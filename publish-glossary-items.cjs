// Your Payload CMS credentials
const EMAIL = 'fernikolic@gmail.com';
const PASSWORD = 'hmqvMK8He9Jz6XM';

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

async function getAllGlossaryItems(token) {
  console.log('📄 Fetching all glossary items...');
  
  try {
    const response = await fetch(`${PAYLOAD_URL}${GLOSSARY_ENDPOINT}?limit=100`, {
      method: 'GET',
      headers: {
        'Authorization': `JWT ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch glossary items: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log(`✅ Found ${data.docs.length} glossary items`);
    return data.docs;
  } catch (error) {
    console.error('❌ Failed to fetch glossary items:', error.message);
    throw error;
  }
}

async function publishGlossaryItem(itemId, token) {
  try {
    const response = await fetch(`${PAYLOAD_URL}${GLOSSARY_ENDPOINT}/${itemId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `JWT ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        published: true,
        updatedAt: new Date().toISOString()
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Publish failed: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`❌ Failed to publish glossary item ${itemId}:`, error.message);
    throw error;
  }
}

async function publishAllGlossaryItems() {
  try {
    // Authenticate with Payload
    const token = await authenticateWithPayload();
    
    // Get all glossary items
    const items = await getAllGlossaryItems(token);
    
    // Filter for unpublished items
    const draftItems = items.filter(item => !item.published);
    const publishedItems = items.filter(item => item.published);
    
    console.log(`\n📊 Glossary Item Status:`);
    console.log(`📝 Draft items: ${draftItems.length}`);
    console.log(`✅ Already published: ${publishedItems.length}`);
    console.log(`📁 Total items: ${items.length}`);
    
    if (draftItems.length === 0) {
      console.log('\n🎉 All glossary items are already published!');
      return;
    }
    
    console.log('\n🚀 Starting publishing process...\n');
    
    let successCount = 0;
    let failureCount = 0;
    
    for (const item of draftItems) {
      try {
        console.log(`📤 Publishing: ${item.title}`);
        
        await publishGlossaryItem(item.id, token);
        
        console.log(`✅ Successfully published: ${item.title}`);
        successCount++;
      } catch (error) {
        console.error(`❌ Failed to publish ${item.title}:`, error.message);
        failureCount++;
      }
    }
    
    console.log('\n📊 Publishing Summary:');
    console.log(`✅ Successfully published: ${successCount}`);
    console.log(`❌ Failed to publish: ${failureCount}`);
    console.log(`📁 Total drafts processed: ${draftItems.length}`);
    
    if (failureCount === 0) {
      console.log('\n🎉 All glossary items have been successfully published!');
      console.log('🌐 They are now live and accessible via your API!');
    } else {
      console.log('\n⚠️ Some items failed to publish. Check the logs above for details.');
    }
    
  } catch (error) {
    console.error('💥 Script failed:', error.message);
    process.exit(1);
  }
}

// Run the script
publishAllGlossaryItems(); 