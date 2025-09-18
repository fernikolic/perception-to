#!/usr/bin/env node

/**
 * Generate social images configuration based on available files
 * This script scans the public/social-images directory and creates
 * a configuration object that can be used at runtime.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SOCIAL_IMAGES_DIR = path.join(__dirname, '../public/social-images');
const OUTPUT_FILE = path.join(__dirname, '../src/config/social-images-generated.ts');

function scanDirectory(dir, prefix = '') {
  const images = {};

  if (!fs.existsSync(dir)) {
    return images;
  }

  const items = fs.readdirSync(dir);

  for (const item of items) {
    const itemPath = path.join(dir, item);
    const stat = fs.statSync(itemPath);

    if (stat.isDirectory()) {
      // Recursively scan subdirectories
      Object.assign(images, scanDirectory(itemPath, `${prefix}${item}/`));
    } else if (stat.isFile() && /\.(png|jpg|jpeg)$/i.test(item)) {
      // Extract the base name without extension
      const baseName = path.basename(item, path.extname(item));
      const imagePath = `${prefix}${item}`;

      // Convert filename back to URL path - keep hyphens as they are part of route names
      let urlPath;
      if (baseName === 'home') {
        urlPath = '/';
      } else if (baseName === 'default') {
        // Skip adding to specific paths - this will be handled as the global default
        continue;
      } else {
        urlPath = `/${baseName}`;
      }

      images[urlPath] = {
        url: `https://perception.to/social-images/${imagePath}`,
        filename: baseName,
        directory: prefix.slice(0, -1), // Remove trailing slash
        exists: true
      };
    }
  }

  return images;
}

function generateConfig() {
  console.log('🔍 Scanning social images directory...');

  const availableImages = scanDirectory(SOCIAL_IMAGES_DIR);

  console.log(`📸 Found ${Object.keys(availableImages).length} social images`);

  // Generate TypeScript configuration
  const configContent = `// Auto-generated file - do not edit manually
// Generated on: ${new Date().toISOString()}

export interface AvailableSocialImage {
  url: string;
  filename: string;
  directory: string;
  exists: boolean;
}

export const AVAILABLE_SOCIAL_IMAGES: Record<string, AvailableSocialImage> = ${JSON.stringify(availableImages, null, 2)};

export function hasCustomSocialImage(path: string): boolean {
  return path in AVAILABLE_SOCIAL_IMAGES;
}

export function getCustomSocialImageUrl(path: string): string | null {
  const image = AVAILABLE_SOCIAL_IMAGES[path];
  return image ? image.url : null;
}
`;

  // Ensure output directory exists
  const outputDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write the configuration file
  fs.writeFileSync(OUTPUT_FILE, configContent);

  console.log(`✅ Generated configuration at ${OUTPUT_FILE}`);

  // Print summary
  if (Object.keys(availableImages).length > 0) {
    console.log('\n📋 Available custom social images:');
    Object.entries(availableImages).forEach(([path, info]) => {
      console.log(`  ${path} → ${info.directory}/${info.filename}`);
    });
  } else {
    console.log('\n💡 No custom social images found. Add images to public/social-images/ to get started!');
  }
}

// Create directories if they don't exist
const dirsToCreate = [
  path.join(SOCIAL_IMAGES_DIR, 'pages'),
  path.join(SOCIAL_IMAGES_DIR, 'features'),
  path.join(SOCIAL_IMAGES_DIR, 'categories')
];

dirsToCreate.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`📁 Created directory: ${dir}`);
  }
});

generateConfig();