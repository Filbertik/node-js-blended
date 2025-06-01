import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createFakeProduct } from '../utils/createFakeProduct.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(__dirname, '../db/db.json');

export async function generateProducts(count) {
  if (!Number.isInteger(count) || count <= 0) {
    console.error('press any count');
    return;
  }

  // let db = { products: [] }; ??
  let db = null;

  if (fs.existsSync(dbPath)) {
    const fileContent = fs.readFileSync(dbPath, 'utf-8');
    try {
      db = JSON.parse(fileContent);
    } catch (error) {
      console.error('Error read  db.json:', error);
      return;
    }
  }

  const newProducts = Array.from({ length: count }, () => createFakeProduct());
  db.products.push(...newProducts);

  try {
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf-8');
    console.log(`Added ${count}. All count : ${db.products.length}`);
  } catch (error) {
    console.error('Error write db.json:', error);
  }
}

const args = process.argv.slice(2);
const count = parseInt(args[0], 10);

generateProducts(count);
