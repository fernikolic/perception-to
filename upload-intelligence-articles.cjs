const fs = require('fs');
const path = require('path');

// Configuration
const PAYLOAD_URL = 'http://localhost:3000'; // Your Payload CMS URL
const INTELLIGENCE_ARTICLES_FOLDER = './intelligence-articles';

// Your Payload CMS credentials (from existing script)
const EMAIL = 'fernikolic@gmail.com';
const PASSWORD = 'hmqvMK8He9Jz6XM';

async function authenticateWithPayload() {
  try {
    console.log('🔐 Authenticating with Payload CMS...');
    
    const response = await fetch(`${PAYLOAD_URL}/api/users/login`, {
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
    
    if (!data.token) {
      throw new Error('No token received from authentication');
    }

    console.log('✅ Authentication successful');
    return data.token;
  } catch (error) {
    console.error('❌ Authentication failed:', error.message);
    throw error;
  }
}

// Convert markdown to basic Slate JSON structure for Payload
function markdownToSlate(markdown) {
  if (!markdown) return [{ type: 'paragraph', children: [{ text: '' }] }];
  
  const nodes = [];
  const lines = markdown.split('\n');
  let currentParagraph = '';
  
  for (const line of lines) {
    if (line.startsWith('# ')) {
      if (currentParagraph) {
        nodes.push({
          type: 'paragraph',
          children: [{ text: currentParagraph.trim() }]
        });
        currentParagraph = '';
      }
      nodes.push({
        type: 'heading',
        level: 1,
        children: [{ text: line.substring(2).trim() }]
      });
    } else if (line.startsWith('## ')) {
      if (currentParagraph) {
        nodes.push({
          type: 'paragraph',
          children: [{ text: currentParagraph.trim() }]
        });
        currentParagraph = '';
      }
      nodes.push({
        type: 'heading',
        level: 2,
        children: [{ text: line.substring(3).trim() }]
      });
    } else if (line.startsWith('### ')) {
      if (currentParagraph) {
        nodes.push({
          type: 'paragraph',
          children: [{ text: currentParagraph.trim() }]
        });
        currentParagraph = '';
      }
      nodes.push({
        type: 'heading',
        level: 3,
        children: [{ text: line.substring(4).trim() }]
      });
    } else if (line.startsWith('- ') || line.startsWith('* ')) {
      if (currentParagraph) {
        nodes.push({
          type: 'paragraph',
          children: [{ text: currentParagraph.trim() }]
        });
        currentParagraph = '';
      }
      nodes.push({
        type: 'ul',
        children: [{
          type: 'li',
          children: [{ text: line.substring(2).trim() }]
        }]
      });
    } else if (line.trim() === '') {
      if (currentParagraph.trim()) {
        nodes.push({
          type: 'paragraph',
          children: [{ text: currentParagraph.trim() }]
        });
        currentParagraph = '';
      }
    } else {
      currentParagraph += (currentParagraph ? ' ' : '') + line;
    }
  }
  
  if (currentParagraph.trim()) {
    nodes.push({
      type: 'paragraph',
      children: [{ text: currentParagraph.trim() }]
    });
  }
  
  return nodes.length > 0 ? nodes : [{ type: 'paragraph', children: [{ text: '' }] }];
}

async function uploadIntelligenceArticle(articleData, token, fileName) {
  try {
    console.log(`📤 Uploading intelligence article: ${articleData.title}`);
    
    // Prepare the data for Payload CMS
    const payloadData = {
      title: articleData.title,
      slug: articleData.slug,
      excerpt: articleData.excerpt,
      content: articleData.content, // Send as plain markdown text
      category: articleData.category,
      tags: articleData.tags || [],
      keywordFocus: articleData.keywordFocus,
      metaDescription: articleData.metaDescription,
      strategicValue: articleData.strategicValue,
      readTime: articleData.readTime,
      difficulty: articleData.difficulty,
      featured: articleData.featured || false,
      published: true, // Publish immediately
      publishedAt: new Date().toISOString(),
    };
    
    const response = await fetch(`${PAYLOAD_URL}/api/learn`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${token}`,
      },
      body: JSON.stringify(payloadData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Upload failed: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const result = await response.json();
    console.log(`✅ Successfully uploaded: ${articleData.title} (ID: ${result.doc?.id || 'unknown'})`);
    return result;
  } catch (error) {
    console.error(`❌ Failed to upload ${fileName}:`, error.message);
    throw error;
  }
}

async function uploadIntelligenceArticles() {
  let token;
  let successCount = 0;
  let failureCount = 0;
  const uploadedArticles = [];

  try {
    // Authenticate
    token = await authenticateWithPayload();

    // Check if intelligence articles folder exists
    if (!fs.existsSync(INTELLIGENCE_ARTICLES_FOLDER)) {
      throw new Error(`Intelligence articles folder not found: ${INTELLIGENCE_ARTICLES_FOLDER}`);
    }

    // Read all JSON files from intelligence articles folder
    const files = fs.readdirSync(INTELLIGENCE_ARTICLES_FOLDER);
    const jsonFiles = files.filter(file => path.extname(file).toLowerCase() === '.json');

    if (jsonFiles.length === 0) {
      throw new Error(`No JSON files found in ${INTELLIGENCE_ARTICLES_FOLDER}`);
    }

    console.log(`📁 Found ${jsonFiles.length} intelligence articles to upload`);
    console.log('\n🚀 Starting intelligence article upload process...\n');

    // Priority order for uploads (most important first)
    const priorityOrder = [
      'identify-emerging-finance-opportunities-before-competitors.json',
      'competitive-intelligence-emerging-finance-complete-guide.json',
      'strategic-decision-making-frameworks-emerging-finance-leaders.json',
      'strategic-market-timing-emerging-finance-opportunities.json',
      'regulatory-intelligence-system-emerging-finance.json',
      'partnership-intelligence-strategic-alliance-opportunities.json',
      'geographic-intelligence-regional-opportunities-emerging-finance.json',
      'sector-intelligence-industry-vertical-analysis-emerging-finance.json'
    ];

    // Sort files by priority
    const sortedFiles = [
      ...priorityOrder.filter(file => jsonFiles.includes(file)),
      ...jsonFiles.filter(file => !priorityOrder.includes(file))
    ];

    // Upload each article
    for (const fileName of sortedFiles) {
      try {
        const filePath = path.join(INTELLIGENCE_ARTICLES_FOLDER, fileName);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const articleData = JSON.parse(fileContent);

        // Validate required fields
        if (!articleData.title) {
          throw new Error('Missing required field: title');
        }
        if (!articleData.slug) {
          throw new Error('Missing required field: slug');
        }

        const result = await uploadIntelligenceArticle(articleData, token, fileName);
        successCount++;
        uploadedArticles.push({
          title: articleData.title,
          slug: articleData.slug,
          category: articleData.category,
          id: result.doc?.id
        });

      } catch (error) {
        console.error(`❌ Failed to process ${fileName}:`, error.message);
        failureCount++;
      }

      // Add delay between uploads
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

  } catch (error) {
    console.error('❌ Upload process failed:', error.message);
    process.exit(1);
  }

  // Final summary
  console.log('\n📊 Intelligence Articles Upload Summary:');
  console.log('=' .repeat(50));
  console.log(`✅ Successful uploads: ${successCount}`);
  console.log(`❌ Failed uploads: ${failureCount}`);
  console.log(`📁 Total files processed: ${successCount + failureCount}`);
  
  if (uploadedArticles.length > 0) {
    console.log('\n📚 Successfully Uploaded Articles:');
    uploadedArticles.forEach((article, index) => {
      console.log(`${index + 1}. ${article.title}`);
      console.log(`   Category: ${article.category}`);
      console.log(`   Slug: ${article.slug}`);
      console.log(`   ID: ${article.id}`);
      console.log('');
    });
  }
  
  if (failureCount > 0) {
    console.log('\n⚠️  Some uploads failed. Check the logs above for details.');
  } else {
    console.log('\n🎉 All intelligence articles uploaded successfully!');
    console.log('\n🔗 Your /learn page should now show all 8 intelligence articles');
    console.log('🌐 Visit your website to see the new content live');
  }

  console.log('\n📋 Next Steps:');
  console.log('1. Visit your /learn page to verify articles are displayed');
  console.log('2. Check internal linking between articles');
  console.log('3. Verify category navigation is working');
  console.log('4. Test search functionality with new content');
  console.log('5. Import glossary terms using upload-glossary-items.cjs');
}

// Run the script
if (require.main === module) {
  uploadIntelligenceArticles().catch(error => {
    console.error('❌ Script failed:', error.message);
    process.exit(1);
  });
}

module.exports = { uploadIntelligenceArticles };