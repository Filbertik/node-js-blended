import { readFile } from 'fs/promises';
import { DB_PATH } from '../constants/products.js';

async function groupProductsByCategories() {
  const data = await readFile(DB_PATH, 'utf-8');
  const grouped = {};
  JSON.parse(data).forEach(({ category, name }) => {
    grouped[category] = grouped[category] || [];
    grouped[category].push(name);
  });
  return grouped;
}

async function main() {
  try {
    console.log(await groupProductsByCategories());
  } catch (err) {
    console.error('Error of group:', err.message);
    process.exit(1);
  }
}

main();
