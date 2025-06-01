import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(__dirname, '../db/db.json');

export function modifyProducts() {
  try {
    const data = fs.readFileSync(dbPath, 'utf-8');
    const db = JSON.parse(data);

    const modifiedProducts = db.map(({ description, ...rest }) => rest);

    fs.writeFileSync(
      dbPath,
      JSON.stringify(modifiedProducts, null, 2),
      'utf-8',
    );

    console.log(
      `Modified was removed description from ${modifiedProducts.length} items.`,
    );
  } catch (error) {
    console.error('Error read/write db.json:', error);
  }
}

if (process.argv[1].endsWith('modifyProducts.js')) {
  modifyProducts();
}
