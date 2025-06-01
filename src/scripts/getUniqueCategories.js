import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.resolve(__dirname, '../db/db.json');

export function getUniqueCategories() {
  try {
    const data = fs.readFileSync(dbPath, 'utf-8');
    const db = JSON.parse(data);

    const categories = db.map((product) => product.category);
    const uniqueCategories = [...new Set(categories)];

    return uniqueCategories;
  } catch (error) {
    console.error('Error reading or db.json:', error);
    return [];
  }
}

const categories = getUniqueCategories();
console.log('Unique categories:', categories);
