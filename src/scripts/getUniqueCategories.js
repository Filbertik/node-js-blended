import { readFile } from 'fs/promises';
import { DB_PATH } from '../constants/products.js';

async function getUniqueCategories() {
  const data = await readFile(DB_PATH, 'utf-8');
  return [...new Set(JSON.parse(data).map((p) => p.category))];
}

async function main() {
  try {
    console.log(await getUniqueCategories());
  } catch (err) {
    console.error('Error get categories:', err.message);
    process.exit(1);
  }
}

main();
