import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.resolve(__dirname, '../db/db.json');

export function getTotalPrice() {
  try {
    const data = fs.readFileSync(dbPath, 'utf-8');
    const db = JSON.parse(data);

    // const total = db.products.reduce((sum, product) => sum + product.price, 0);
    const total = db.reduce((sum, product) => sum + Number(product.price), 0);

    return total;
  } catch (error) {
    console.error('Failed read db.json:', error);
    return 0;
  }
}

const totalPrice = getTotalPrice();
// console.log(`Total price of all products: ${totalPrice}`);
console.log(`Total price of all products: ${totalPrice.toFixed(2)} (Col)`);
