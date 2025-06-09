import { readFile, writeFile } from 'fs/promises';
import { DB_PATH } from '../constants/products.js';

async function modifyProducts() {
  const data = await readFile(DB_PATH, 'utf-8');
  const noDesc = JSON.parse(data).map(({ description, ...p }) => p);
  await writeFile(DB_PATH, JSON.stringify(noDesc, null, 2));
}

async function main() {
  try {
    await modifyProducts();
    console.log('Updated products, del description.');
  } catch (err) {
    console.error('Error modified:', err.message);
    process.exit(1);
  }
}

main();
