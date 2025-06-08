const fs = require('fs');
const path = require('path');

// Configuration
const PAYLOAD_URL = 'http://localhost:3000'; // Adjust if your Payload CMS runs on a different port
const DOWNLOADS_FOLDER = '/Users/fernandonikolic/Downloads/learn-drafts';

// Your Payload CMS credentials - UPDATE THESE
const EMAIL = 'fernikolic@gmail.com'; // Replace with your email
const PASSWORD = 'hmqvMK8He9Jz6XM'; // Replace with your password

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

// Convert HTML to basic Slate JSON structure
function htmlToSlate(html) {
  if (!html) return null;
  
  // Simple HTML to Slate conversion
  // This handles basic tags: p, h1-h6, ul, ol, li, strong, em, br
  const nodes = [];
  
  // Split by major block elements
  const blocks = html
    .replace(/<br\s*\/?>/gi, '\n')
    .split(/(<(?:p|h[1-6]|ul|ol|blockquote|div)[^>]*>.*?<\/(?:p|h[1-6]|ul|ol|blockquote|div)>)/gi)
    .filter(block => block.trim());

  for (const block of blocks) {
    if (block.match(/^<p[^>]*>/i)) {
      const textContent = block.replace(/<\/?p[^>]*>/gi, '');
      const children = parseInlineElements(textContent);
      if (children.length > 0) {
        nodes.push({
          type: 'paragraph',
          children: children
        });
      }
    } else if (block.match(/^<h([1-6])[^>]*>/i)) {
      const level = block.match(/^<h([1-6])[^>]*>/i)[1];
      const textContent = block.replace(/<\/?h[1-6][^>]*>/gi, '');
      const children = parseInlineElements(textContent);
      if (children.length > 0) {
        nodes.push({
          type: 'heading',
          level: parseInt(level),
          children: children
        });
      }
    } else if (block.match(/^<ul[^>]*>/i)) {
      const listItems = extractListItems(block);
      if (listItems.length > 0) {
        nodes.push({
          type: 'ul',
          children: listItems
        });
      }
    } else if (block.match(/^<ol[^>]*>/i)) {
      const listItems = extractListItems(block);
      if (listItems.length > 0) {
        nodes.push({
          type: 'ol',
          children: listItems
        });
      }
    } else if (block.trim() && !block.match(/^<[^>]+>$/)) {
      // Plain text that's not wrapped in tags
      const children = parseInlineElements(block);
      if (children.length > 0) {
        nodes.push({
          type: 'paragraph',
          children: children
        });
      }
    }
  }

  return nodes.length > 0 ? nodes : [{ type: 'paragraph', children: [{ text: '' }] }];
}

function parseInlineElements(html) {
  if (!html) return [{ text: '' }];
  
  const children = [];
  let currentText = '';
  let currentFormats = {};
  
  // Remove HTML tags and extract formatting
  const cleanText = html
    .replace(/<strong[^>]*>(.*?)<\/strong>/gi, (match, content) => {
      return `__BOLD_START__${content}__BOLD_END__`;
    })
    .replace(/<b[^>]*>(.*?)<\/b>/gi, (match, content) => {
      return `__BOLD_START__${content}__BOLD_END__`;
    })
    .replace(/<em[^>]*>(.*?)<\/em>/gi, (match, content) => {
      return `__ITALIC_START__${content}__ITALIC_END__`;
    })
    .replace(/<i[^>]*>(.*?)<\/i>/gi, (match, content) => {
      return `__ITALIC_START__${content}__ITALIC_END__`;
    })
    .replace(/<[^>]+>/g, '') // Remove all other HTML tags
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

  // Simple text with basic formatting
  const parts = cleanText.split(/(__(?:BOLD|ITALIC)_(?:START|END)__)/);
  let bold = false;
  let italic = false;

  for (const part of parts) {
    if (part === '__BOLD_START__') {
      if (currentText) {
        children.push({ text: currentText, ...currentFormats });
        currentText = '';
      }
      bold = true;
      currentFormats = { ...currentFormats, bold: true };
    } else if (part === '__BOLD_END__') {
      if (currentText) {
        children.push({ text: currentText, ...currentFormats });
        currentText = '';
      }
      bold = false;
      const { bold: _, ...newFormats } = currentFormats;
      currentFormats = newFormats;
    } else if (part === '__ITALIC_START__') {
      if (currentText) {
        children.push({ text: currentText, ...currentFormats });
        currentText = '';
      }
      italic = true;
      currentFormats = { ...currentFormats, italic: true };
    } else if (part === '__ITALIC_END__') {
      if (currentText) {
        children.push({ text: currentText, ...currentFormats });
        currentText = '';
      }
      italic = false;
      const { italic: _, ...newFormats } = currentFormats;
      currentFormats = newFormats;
    } else if (part) {
      currentText += part;
    }
  }

  if (currentText) {
    children.push({ text: currentText, ...currentFormats });
  }

  return children.length > 0 ? children : [{ text: cleanText || '' }];
}

function extractListItems(listHtml) {
  const items = [];
  const listItemMatches = listHtml.match(/<li[^>]*>(.*?)<\/li>/gi);
  
  if (listItemMatches) {
    for (const item of listItemMatches) {
      const content = item.replace(/<\/?li[^>]*>/gi, '');
      const children = parseInlineElements(content);
      if (children.length > 0) {
        items.push({
          type: 'li',
          children: children
        });
      }
    }
  }
  
  return items;
}

// Transform data to match Payload CMS schema
function transformArticleData(data) {
  // Map category labels to values
  const categoryMap = {
    'Bitcoin Basics': 'bitcoin-basics',
    'Market Analysis': 'market-analysis',
    'Technical Guides': 'technical-guides',
    'Policy & Regulation': 'policy-regulation',
    'DeFi & Stablecoins': 'defi-stablecoins',
    'Data & Research': 'data-research'
  };

  // Map difficulty labels to values
  const difficultyMap = {
    'Beginner': 'beginner',
    'Intermediate': 'intermediate',
    'Advanced': 'advanced'
  };

  return {
    title: data.title,
    slug: data.slug,
    excerpt: data.excerpt,
    content: htmlToSlate(data.content), // Convert HTML to Slate JSON
    category: categoryMap[data.category] || 'data-research', // Default fallback
    tags: data.tags ? data.tags.map(tag => ({ tag })) : [], // Convert to array of objects
    readTime: data.readingTime || 5, // Rename field and provide default
    difficulty: difficultyMap[data.difficulty] || 'intermediate', // Default fallback
    featured: data.featured || false,
    published: data.published || false
  };
}

async function uploadArticle(articleData, token, fileName) {
  try {
    console.log(`📤 Uploading article: ${fileName}`);
    
    const response = await fetch(`${PAYLOAD_URL}/api/learn`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${token}`,
      },
      body: JSON.stringify(articleData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Upload failed: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const result = await response.json();
    console.log(`✅ Successfully uploaded: ${fileName} (ID: ${result.doc?.id || 'unknown'})`);
    return result;
  } catch (error) {
    console.error(`❌ Failed to upload ${fileName}:`, error.message);
    throw error;
  }
}

async function readJsonFiles() {
  try {
    if (!fs.existsSync(DOWNLOADS_FOLDER)) {
      throw new Error(`Downloads folder not found: ${DOWNLOADS_FOLDER}`);
    }

    const files = fs.readdirSync(DOWNLOADS_FOLDER);
    const jsonFiles = files.filter(file => path.extname(file).toLowerCase() === '.json');

    if (jsonFiles.length === 0) {
      throw new Error(`No JSON files found in ${DOWNLOADS_FOLDER}`);
    }

    console.log(`📁 Found ${jsonFiles.length} JSON files to process`);
    return jsonFiles;
  } catch (error) {
    console.error('❌ Error reading files:', error.message);
    throw error;
  }
}

async function processArticles() {
  let token;
  let successCount = 0;
  let failureCount = 0;

  try {
    // Authenticate
    token = await authenticateWithPayload();

    // Read JSON files
    const jsonFiles = await readJsonFiles();

    console.log('\n🚀 Starting article upload process...\n');

    // Process each file
    for (const fileName of jsonFiles) {
      try {
        const filePath = path.join(DOWNLOADS_FOLDER, fileName);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const articleData = JSON.parse(fileContent);

        // Validate required fields
        if (!articleData.title) {
          throw new Error('Missing required field: title');
        }

        // Transform data to match Payload CMS schema
        const transformedData = transformArticleData(articleData);

        await uploadArticle(transformedData, token, fileName);
        successCount++;

      } catch (error) {
        console.error(`❌ Failed to process ${fileName}:`, error.message);
        failureCount++;
      }

      // Add a small delay between uploads to be nice to the server
      await new Promise(resolve => setTimeout(resolve, 500));
    }

  } catch (error) {
    console.error('❌ Process failed:', error.message);
    process.exit(1);
  }

  // Final summary
  console.log('\n📊 Upload Summary:');
  console.log(`✅ Successful uploads: ${successCount}`);
  console.log(`❌ Failed uploads: ${failureCount}`);
  console.log(`📁 Total files processed: ${successCount + failureCount}`);
  
  if (failureCount > 0) {
    console.log('\n⚠️  Some uploads failed. Check the logs above for details.');
    process.exit(1);
  } else {
    console.log('\n🎉 All articles uploaded successfully!');
  }
}

// Run the script
if (require.main === module) {
  processArticles().catch(error => {
    console.error('❌ Script failed:', error.message);
    process.exit(1);
  });
}

module.exports = { processArticles }; 