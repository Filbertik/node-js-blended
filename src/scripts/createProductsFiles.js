import { readFile, writeFile, mkdir } from 'fs/promises';
import path from 'node:path';
import { DB_PATH, PATH_FILES_DIR } from '../constants/products.js';

const toKebab = (s) => s.trim().toLowerCase().replace(/\s+/g, '-');

async function createProductsFiles() {
  await mkdir(PATH_FILES_DIR, { recursive: true });
  const products = JSON.parse(await readFile(DB_PATH, 'utf-8'));
  for (const prod of products) {
    const fname = `${toKebab(prod.name)}.json`;
    await writeFile(
      path.join(PATH_FILES_DIR, fname),
      JSON.stringify(prod, null, 2),
    );
  }
}

async function main() {
  try {
    await createProductsFiles();
    console.log(`Created fils in ${PATH_FILES_DIR}`);
  } catch (err) {
    console.error('Error create files:', err.message);
    process.exit(1);
  }
}

main();
