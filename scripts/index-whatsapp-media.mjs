#!/usr/bin/env node
/**
 * WhatsApp Client Media Discovery, Inventory & Optimization Utility
 * Usage: node scripts/index-whatsapp-media.mjs [path-to-whatsapp-folder]
 *
 * Preserves original client files and inventories dimensions, aspect ratios,
 * file sizes, and SHA-256 hashes (to detect duplicate WhatsApp forwards).
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import sharp from 'sharp';

const sourceDir = process.argv[2] || path.resolve('.media-originals');
const reportPath = path.resolve('.media-originals/media-inventory.json');

const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);
const VIDEO_EXTS = new Set(['.mp4', '.mov', '.webm', '.m4v']);

async function hashFile(filePath) {
  const buffer = await fs.readFile(filePath);
  return crypto.createHash('sha256').update(buffer).digest('hex').slice(0, 16);
}

async function runInventory() {
  try {
    await fs.access(sourceDir);
  } catch {
    console.log(
      `Directorul sursă (${sourceDir}) nu există încă. Copiați fotografiile și videoclipurile WhatsApp în '.media-originals/' și rulați comanda din nou.`
    );
    return;
  }

  const entries = await fs.readdir(sourceDir, { withFileTypes: true });
  const seenHashes = new Map();
  const inventory = [];

  for (const entry of entries) {
    if (!entry.isFile()) continue;
    const ext = path.extname(entry.name).toLowerCase();
    if (!IMAGE_EXTS.has(ext) && !VIDEO_EXTS.has(ext)) continue;

    const fullPath = path.join(sourceDir, entry.name);
    const stat = await fs.stat(fullPath);
    const hash = await hashFile(fullPath);
    const duplicateOf = seenHashes.get(hash) || null;
    if (!duplicateOf) seenHashes.set(hash, entry.name);

    const record = {
      filename: entry.name,
      type: IMAGE_EXTS.has(ext) ? 'image' : 'video',
      sizeKB: Math.round(stat.size / 1024),
      hash,
      duplicateOf,
      width: null,
      height: null,
      aspectCategory: null,
    };

    if (IMAGE_EXTS.has(ext)) {
      try {
        const meta = await sharp(fullPath).metadata();
        record.width = meta.width || null;
        record.height = meta.height || null;
        if (meta.width && meta.height) {
          const ratio = meta.width / meta.height;
          record.aspectCategory =
            ratio > 1.2 ? 'landscape' : ratio < 0.72 ? 'vertical' : 'portrait';
        }
      } catch {
        record.aspectCategory = 'unreadable';
      }
    }

    inventory.push(record);
  }

  await fs.writeFile(reportPath, JSON.stringify(inventory, null, 2), 'utf8');
  console.log(`Inventar finalizat: ${inventory.length} fișiere analizate în ${reportPath}`);
}

runInventory();
