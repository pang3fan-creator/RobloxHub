#!/usr/bin/env node
/**
 * Convert PNG images to WEBP format in public/sorcerer-ascent directory
 * Usage: node scripts/convert-images-to-webp.mjs
 */

import { promises as fs } from 'fs';
import path from 'path';
import { glob } from 'glob';
import sharp from 'sharp';

const SOURCE_DIR = path.join(process.cwd(), 'public/sorcerer-ascent');
const POST_FILES = [
  path.join(process.cwd(), 'posts/en/sorcerer-ascent.mdx'),
  path.join(process.cwd(), 'posts/es/sorcerer-ascent.mdx'),
];

async function convertImagesToWebp() {
  console.log('🔍 Searching for PNG files in public/sorcerer-ascent...');

  // Find all PNG files
  const pngFiles = await glob('*.png', { cwd: SOURCE_DIR, absolute: true });

  if (pngFiles.length === 0) {
    console.log('✅ No PNG files found in public/sorcerer-ascent');
    return;
  }

  console.log(`📁 Found ${pngFiles.length} PNG files to convert:\n`);

  // Convert each PNG to WEBP
  const conversions = [];
  const pngToWebpMap = new Map();

  for (const pngPath of pngFiles) {
    const fileName = path.basename(pngPath, '.png');
    const webpPath = path.join(SOURCE_DIR, `${fileName}.webp`);

    pngToWebpMap.set(`${fileName}.png`, `${fileName}.webp`);

    console.log(`  🔄 ${path.basename(pngPath)} → ${fileName}.webp`);

    try {
      await sharp(pngPath).webp({ quality: 85 }).toFile(webpPath);

      conversions.push({ png: pngPath, webp: webpPath });
    } catch (error) {
      console.error(
        `  ❌ Error converting ${path.basename(pngPath)}:`,
        error.message
      );
    }
  }

  // Delete original PNG files
  console.log('\n🗑️  Deleting original PNG files...');
  for (const { png } of conversions) {
    try {
      await fs.unlink(png);
      console.log(`  ✅ Deleted ${path.basename(png)}`);
    } catch (error) {
      console.error(
        `  ❌ Error deleting ${path.basename(png)}:`,
        error.message
      );
    }
  }

  // Update MDX files
  console.log('\n📝 Updating MDX files...');
  await updateMdxFiles(pngToWebpMap);

  console.log('\n✅ Conversion complete!');
  console.log(`   - Converted: ${conversions.length} files`);
  console.log(`   - Deleted: ${conversions.length} PNG files`);
  console.log(`   - Updated: ${POST_FILES.length} MDX files`);
}

async function updateMdxFiles(pngToWebpMap) {
  for (const postFile of POST_FILES) {
    try {
      let content = await fs.readFile(postFile, 'utf-8');
      const fileName = path.basename(postFile);
      let updated = false;

      // Replace PNG references with WEBP
      for (const [pngName, webpName] of pngToWebpMap) {
        const regex = new RegExp(`${pngName.replace('.', '\\.')}`, 'g');
        if (regex.test(content)) {
          content = content.replace(regex, webpName);
          updated = true;
          console.log(`  ✅ Updated ${fileName}: ${pngName} → ${webpName}`);
        }
      }

      if (updated) {
        await fs.writeFile(postFile, content, 'utf-8');
      }
    } catch (error) {
      console.error(
        `  ❌ Error updating ${path.basename(postFile)}:`,
        error.message
      );
    }
  }
}

// Run the conversion
convertImagesToWebp().catch(console.error);
