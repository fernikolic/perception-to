#!/usr/bin/env node

/**
 * Social Image Helper Script
 *
 * This script helps manage custom social images for the site.
 * It identifies pages that would benefit from custom images and provides
 * guidance on creating them.
 */

const fs = require('fs');
const path = require('path');

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  red: '\x1b[31m',
};

// Pages that should have custom social images (Tier 1 & 2)
const PRIORITY_PAGES = {
  tier1: [
    { path: '/', name: 'Homepage', reason: 'Primary brand identity and first impression' },
    { path: '/bitcoin-fear-greed-index', name: 'Fear & Greed Index', reason: 'Major feature page with high traffic potential' },
    { path: '/bitcoin-market-sentiment', name: 'Market Sentiment', reason: 'Major feature page with high traffic potential' },
    { path: '/pricing', name: 'Pricing', reason: 'Key conversion page' },
  ],
  tier2: [
    { path: '/api', name: 'API Reference', reason: 'Developer marketing' },
    { path: '/about', name: 'About Us', reason: 'Brand story and credibility' },
    { path: '/use-cases', name: 'Use Cases', reason: 'Marketing hub page' },
    { path: '/journalist', name: 'Journalist Landing', reason: 'Targeted audience landing page' },
    { path: '/investor', name: 'Investor Landing', reason: 'Targeted audience landing page' },
  ],
  tier3: [
    { path: '/bitcoin-bad-takes', name: 'Bitcoin Bad Takes', reason: 'Viral potential feature' },
    { path: '/slack-integration', name: 'Slack Integration', reason: 'Feature marketing' },
    { path: '/crypto-conferences', name: 'Crypto Conferences', reason: 'Feature marketing' },
  ]
};

// Social image directory
const SOCIAL_IMAGES_DIR = path.join(__dirname, '../public/social-images/pages');

// Check which images already exist
function checkExistingImages() {
  const existing = new Map();

  if (!fs.existsSync(SOCIAL_IMAGES_DIR)) {
    return existing;
  }

  const files = fs.readdirSync(SOCIAL_IMAGES_DIR);
  files.forEach(file => {
    if (file.endsWith('.png')) {
      const routePath = '/' + file.replace('.png', '').replace(/-/g, '-');
      existing.set(file.replace('.png', ''), routePath);
    }
  });

  return existing;
}

// Convert path to filename
function pathToFilename(path) {
  if (path === '/') return 'home';
  return path.replace(/^\//, '').replace(/\//g, '-');
}

// Main function
function main() {
  console.log(`\n${colors.bright}${colors.cyan}==============================================`);
  console.log(`   📸 Social Image Management Tool`);
  console.log(`==============================================${colors.reset}\n`);

  const existingImages = checkExistingImages();

  console.log(`${colors.bright}Current Status:${colors.reset}\n`);
  console.log(`✅ Custom images found: ${colors.green}${existingImages.size}${colors.reset}`);
  console.log(`📁 Images directory: ${colors.blue}public/social-images/pages/${colors.reset}\n`);

  // Show existing custom images
  if (existingImages.size > 0) {
    console.log(`${colors.bright}${colors.green}Existing Custom Images:${colors.reset}`);
    existingImages.forEach((route, filename) => {
      console.log(`  ✓ ${route} → ${filename}.png`);
    });
    console.log('');
  }

  // Check each tier
  ['tier1', 'tier2', 'tier3'].forEach(tier => {
    const tierName = tier === 'tier1' ? 'Tier 1 (Highest Priority)' :
                     tier === 'tier2' ? 'Tier 2 (Medium Priority)' :
                     'Tier 3 (Nice to Have)';

    const tierColor = tier === 'tier1' ? colors.red :
                      tier === 'tier2' ? colors.yellow :
                      colors.blue;

    console.log(`${colors.bright}${tierColor}${tierName}:${colors.reset}`);

    PRIORITY_PAGES[tier].forEach(page => {
      const filename = pathToFilename(page.path);
      const hasImage = Array.from(existingImages.keys()).includes(filename);

      const status = hasImage ? `${colors.green}✓ HAS IMAGE${colors.reset}` :
                                `${colors.yellow}✗ MISSING${colors.reset}`;

      console.log(`  ${status} ${colors.bright}${page.path}${colors.reset} - ${page.name}`);
      console.log(`      ${colors.cyan}→ ${page.reason}${colors.reset}`);
      if (!hasImage) {
        console.log(`      ${colors.blue}→ Create: public/social-images/pages/${filename}.png${colors.reset}`);
      }
    });
    console.log('');
  });

  // Summary
  const allPages = [...PRIORITY_PAGES.tier1, ...PRIORITY_PAGES.tier2, ...PRIORITY_PAGES.tier3];
  const missingCount = allPages.filter(page => {
    const filename = pathToFilename(page.path);
    return !Array.from(existingImages.keys()).includes(filename);
  }).length;

  console.log(`${colors.bright}Summary:${colors.reset}`);
  console.log(`  • Total priority pages: ${allPages.length}`);
  console.log(`  • With custom images: ${colors.green}${allPages.length - missingCount}${colors.reset}`);
  console.log(`  • Missing images: ${colors.yellow}${missingCount}${colors.reset}\n`);

  // Image specifications
  console.log(`${colors.bright}${colors.cyan}Image Specifications:${colors.reset}`);
  console.log(`  • Size: ${colors.bright}1200x630 pixels${colors.reset} (Open Graph standard)`);
  console.log(`  • Format: PNG or JPG`);
  console.log(`  • File size: < 1MB recommended`);
  console.log(`  • Location: ${colors.blue}public/social-images/pages/${colors.reset}`);
  console.log(`  • Naming: Use kebab-case matching route (e.g., bitcoin-fear-greed-index.png)\n`);

  // Next steps
  console.log(`${colors.bright}${colors.green}Next Steps:${colors.reset}`);
  console.log(`  1. Create images in Figma/Canva/Photoshop at 1200x630px`);
  console.log(`  2. Save as PNG in: ${colors.blue}public/social-images/pages/${colors.reset}`);
  console.log(`  3. Run: ${colors.cyan}npm run social:generate${colors.reset} to regenerate config`);
  console.log(`  4. Test on: https://cards-dev.twitter.com/validator`);
  console.log(`  5. Deploy your changes\n`);

  console.log(`${colors.bright}${colors.cyan}Design Tips:${colors.reset}`);
  console.log(`  • Include your logo/brand`);
  console.log(`  • Add page title or key value proposition`);
  console.log(`  • Use high contrast colors for readability`);
  console.log(`  • Avoid small text (will be hard to read when scaled)`);
  console.log(`  • Safe zone: Keep important content 100px from edges`);
  console.log(`  • Test how it looks at different sizes\n`);

  console.log(`${colors.cyan}==============================================`);
  console.log(`For more info, see: public/social-images/README.md`);
  console.log(`==============================================${colors.reset}\n`);
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { pathToFilename, PRIORITY_PAGES };
