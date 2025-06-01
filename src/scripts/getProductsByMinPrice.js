import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.resolve(__dirname, '../db/db.json');

export function getProductsByMinPrice(minPrice) {
  if (!Number.isFinite(minPrice) || minPrice < 0) {
    console.error('Please provide a valid minimum price (positive number)');
    return [];
  }

  try {
    const data = fs.readFileSync(dbPath, 'utf-8');
    const db = JSON.parse(data);

    const filtered = db.products.filter((product) => product.price >= minPrice);

    return filtered;
  } catch (error) {
    console.error('Failed read db.json:', error);
    return [];
  }
}

const args = process.argv.slice(2);
const minPrice = parseFloat(args[0]);

const result = getProductsByMinPrice(minPrice);
console.log(`Products with price >= ${minPrice}:`);
console.log(result);
