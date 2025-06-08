const fs = require('fs');
const path = require('path');

// Your Payload CMS credentials
const EMAIL = 'fernikolic@gmail.com';
const PASSWORD = 'hmqvMK8He9Jz6XM';

// Payload CMS API endpoints
const PAYLOAD_URL = 'http://localhost:3000';
const LOGIN_ENDPOINT = '/api/users/login';
const LEARN_ENDPOINT = '/api/learn';

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

async function updateArticle(articleId, updatedData, token) {
  try {
    const response = await fetch(`${PAYLOAD_URL}${LEARN_ENDPOINT}/${articleId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `JWT ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Update failed: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`❌ Failed to update article ${articleId}:`, error.message);
    throw error;
  }
}

async function fixContentFormat() {
  try {
    // Authenticate with Payload
    const token = await authenticateWithPayload();
    
    // Get all articles
    const articles = await getAllArticles(token);
    
    console.log('\n🔄 Starting content format conversion...\n');
    
    let successCount = 0;
    let failureCount = 0;
    
    for (const article of articles) {
      try {
        // Check if content is HTML string (needs conversion)
        if (typeof article.content === 'string') {
          console.log(`🔄 Converting: ${article.title}`);
          
          // Convert HTML to Slate JSON
          const slateContent = htmlToSlate(article.content);
          
          // Update the article
          await updateArticle(article.id, { content: slateContent }, token);
          
          console.log(`✅ Successfully updated: ${article.title}`);
          successCount++;
        } else {
          console.log(`⏭️ Skipping (already converted): ${article.title}`);
        }
      } catch (error) {
        console.error(`❌ Failed to process ${article.title}:`, error.message);
        failureCount++;
      }
    }
    
    console.log('\n📊 Conversion Summary:');
    console.log(`✅ Successfully converted: ${successCount}`);
    console.log(`❌ Failed conversions: ${failureCount}`);
    console.log(`📁 Total articles processed: ${articles.length}`);
    
    if (failureCount === 0) {
      console.log('\n🎉 All content successfully converted to Slate format!');
    } else {
      console.log('\n⚠️ Some conversions failed. Check the logs above for details.');
    }
    
  } catch (error) {
    console.error('💥 Script failed:', error.message);
    process.exit(1);
  }
}

// Run the script
fixContentFormat(); 