import { readFile } from 'fs/promises';
import { DB_PATH } from '../constants/products.js';

async function getTotalPrice() {
  const data = await readFile(DB_PATH, 'utf-8');
  const products = JSON.parse(data);

  const total = products.reduce((sum, p) => sum + Number(p.price), 0);
  return total.toFixed(2);
}

async function main() {
  try {
    const total = await getTotalPrice();
    console.log(`Total price: ${total}`);
  } catch (err) {
    console.error('Failed read db.json:', err.message);
    process.exit(1);
  }
}

main();
