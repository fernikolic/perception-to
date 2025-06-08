// Your Payload CMS credentials
const EMAIL = 'fernikolic@gmail.com';
const PASSWORD = 'hmqvMK8He9Jz6XM';

// Payload CMS API endpoints
const PAYLOAD_URL = 'http://localhost:3000';
const LOGIN_ENDPOINT = '/api/users/login';
const LEARN_ENDPOINT = '/api/learn';

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

async function getAllArticles(token) {
  console.log('📄 Fetching all articles...');
  
  try {
    const response = await fetch(`${PAYLOAD_URL}${LEARN_ENDPOINT}?limit=100`, {
      method: 'GET',
      headers: {
        'Authorization': `JWT ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch articles: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log(`✅ Found ${data.docs.length} articles`);
    return data.docs;
  } catch (error) {
    console.error('❌ Failed to fetch articles:', error.message);
    throw error;
  }
}

async function publishArticle(articleId, token) {
  try {
    const response = await fetch(`${PAYLOAD_URL}${LEARN_ENDPOINT}/${articleId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `JWT ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        published: true,
        publishedAt: new Date().toISOString()
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Publish failed: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`❌ Failed to publish article ${articleId}:`, error.message);
    throw error;
  }
}

async function publishAllArticles() {
  try {
    // Authenticate with Payload
    const token = await authenticateWithPayload();
    
    // Get all articles
    const articles = await getAllArticles(token);
    
    // Filter for unpublished articles
    const draftArticles = articles.filter(article => !article.published);
    const publishedArticles = articles.filter(article => article.published);
    
    console.log(`\n📊 Article Status:`);
    console.log(`📝 Draft articles: ${draftArticles.length}`);
    console.log(`✅ Already published: ${publishedArticles.length}`);
    console.log(`📁 Total articles: ${articles.length}`);
    
    if (draftArticles.length === 0) {
      console.log('\n🎉 All articles are already published!');
      return;
    }
    
    console.log('\n🚀 Starting publishing process...\n');
    
    let successCount = 0;
    let failureCount = 0;
    
    for (const article of draftArticles) {
      try {
        console.log(`📤 Publishing: ${article.title}`);
        
        await publishArticle(article.id, token);
        
        console.log(`✅ Successfully published: ${article.title}`);
        successCount++;
      } catch (error) {
        console.error(`❌ Failed to publish ${article.title}:`, error.message);
        failureCount++;
      }
    }
    
    console.log('\n📊 Publishing Summary:');
    console.log(`✅ Successfully published: ${successCount}`);
    console.log(`❌ Failed to publish: ${failureCount}`);
    console.log(`📁 Total drafts processed: ${draftArticles.length}`);
    
    if (failureCount === 0) {
      console.log('\n🎉 All articles have been successfully published!');
      console.log('🌐 They are now live and accessible via your API!');
    } else {
      console.log('\n⚠️ Some articles failed to publish. Check the logs above for details.');
    }
    
  } catch (error) {
    console.error('💥 Script failed:', error.message);
    process.exit(1);
  }
}

// Run the script
publishAllArticles(); 