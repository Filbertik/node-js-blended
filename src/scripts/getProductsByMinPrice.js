import { readFile } from 'fs/promises';
import { DB_PATH } from '../constants/products.js';

async function getProductsByMinPrice(minPrice) {
  const data = await readFile(DB_PATH, 'utf-8');
  const products = JSON.parse(data);

  return products.filter((p) => Number(p.price) >= minPrice);
}

async function main() {
  try {
    const price = Number(process.argv[2] || 0);
    const result = await getProductsByMinPrice(price);

    console.log(`Products with price >= ${price}:`);
    console.log(result);
  } catch (err) {
    console.error('Error', err.message);
    process.exit(1);
  }
}

main();
