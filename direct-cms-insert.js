#!/usr/bin/env node

import fetch from 'node-fetch';

// Test with existing entry format
const testContent = {
  title: 'Bitcoin Sentiment',
  slug: 'bitcoin-sentiment',
  description: 'Bitcoin sentiment refers to the overall market psychology and emotional state of investors, traders, and market participants toward Bitcoin. This sentiment can range from extreme fear to extreme greed and is influenced by various factors including price movements, news events, regulatory developments, and market conditions.',
  category: 'bitcoin',
  published: true
};

async function testInsert() {
  try {
    console.log('🧪 Testing Payload CMS insertion...');
    
    const response = await fetch('https://perception.to/api/glossary', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testContent)
    });

    const responseText = await response.text();
    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers));
    console.log('Response body:', responseText);

    if (response.ok) {
      console.log('✅ Success!');
    } else {
      console.log('❌ Failed - may need authentication');
    }

  } catch (error) {
    console.error('💥 Error:', error.message);
  }
}

testInsert();