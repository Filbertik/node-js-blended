import { readFile, writeFile } from 'fs/promises';
import { DB_PATH } from '../constants/products.js';
import { createFakeProduct } from '../utils/createFakeProduct.js';

const generateProducts = async (count = 9) => {
  try {
    const data = await readFile(DB_PATH, 'utf-8');
    const db = data ? JSON.parse(data) : [];

    const newProducts = Array.from({ length: count }, createFakeProduct);
    db.push(...newProducts);

    await writeFile(DB_PATH, JSON.stringify(db, null, 2));
    console.log(`Added ${count} new products`);
  } catch (error) {
    console.error('Error write db.json:', error.message);
  }
};

generateProducts(9);
