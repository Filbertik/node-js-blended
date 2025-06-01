import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(__dirname, '../db/db.json');

export function groupProductsByCategories() {
  try {
    const data = fs.readFileSync(dbPath, 'utf-8');
    const db = JSON.parse(data);
    const grouped = {};

    db.forEach((product) => {
      const { category, name } = product;

      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(name);
    });

    return grouped;
  } catch (error) {
    console.error('Error reading db.json:', error);
    return {};
  }
}

if (process.argv[1].endsWith('groupProductsByCategories.js')) {
  const grouped = groupProductsByCategories();
  console.log('Grouped by categories:', grouped);
}
