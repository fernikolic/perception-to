/**
 * Generate sitemap for Ghost research pages
 * Reads from src/data/ghost-posts.json and generates sitemap-research.xml
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = 'https://perception.to';

function generateSitemap() {
  // Read cached Ghost posts
  const dataPath = path.join(__dirname, '..', 'src', 'data', 'ghost-posts.json');

  if (!fs.existsSync(dataPath)) {
    console.log('⚠️  No ghost-posts.json found. Run npm run ghost:fetch first.');
    // Create empty sitemap
    const emptySitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/bitcoin-media-research</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${SITE_URL}/bitcoin-media-research/reports</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${SITE_URL}/bitcoin-media-research/opinion</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>`;

    const outputPath = path.join(__dirname, '..', 'public', 'sitemap-research.xml');
    fs.writeFileSync(outputPath, emptySitemap);
    console.log('✅ Created empty sitemap-research.xml');
    return;
  }

  const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  const posts = data.posts || [];

  console.log(`📝 Generating sitemap for ${posts.length} research posts...`);

  // Static pages
  const staticUrls = [
    { loc: `${SITE_URL}/bitcoin-media-research`, changefreq: 'weekly', priority: '0.8' },
    { loc: `${SITE_URL}/bitcoin-media-research/reports`, changefreq: 'weekly', priority: '0.7' },
    { loc: `${SITE_URL}/bitcoin-media-research/opinion`, changefreq: 'weekly', priority: '0.7' },
  ];

  // Dynamic post URLs
  const postUrls = posts.map(post => ({
    loc: `${SITE_URL}/bitcoin-media-research/${post.slug}`,
    lastmod: post.updated_at ? new Date(post.updated_at).toISOString().split('T')[0] : undefined,
    changefreq: 'monthly',
    priority: '0.6'
  }));

  const allUrls = [...staticUrls, ...postUrls];

  // Generate XML
  const urlEntries = allUrls.map(url => {
    let entry = `  <url>\n    <loc>${url.loc}</loc>`;
    if (url.lastmod) {
      entry += `\n    <lastmod>${url.lastmod}</lastmod>`;
    }
    entry += `\n    <changefreq>${url.changefreq}</changefreq>`;
    entry += `\n    <priority>${url.priority}</priority>`;
    entry += `\n  </url>`;
    return entry;
  }).join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;

  // Write to public folder
  const outputPath = path.join(__dirname, '..', 'public', 'sitemap-research.xml');
  fs.writeFileSync(outputPath, sitemap);

  console.log(`✅ Generated sitemap-research.xml with ${allUrls.length} URLs`);
  console.log(`   - Static pages: ${staticUrls.length}`);
  console.log(`   - Post pages: ${postUrls.length}`);
}

generateSitemap();
