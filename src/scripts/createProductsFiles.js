import fs from 'fs';
import path from 'path';
import { PATH_FILES_DIR } from '../constants/products.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.resolve(__dirname, '../db/db.json');

export async function createProductsFiles() {
  try {
    const data = fs.readFileSync(dbPath, 'utf-8');
    const db = JSON.parse(data);

    if (!fs.existsSync(PATH_FILES_DIR)) {
      fs.mkdirSync(PATH_FILES_DIR, { recursive: true });
    }

    for (const product of db.products) {
      const fileName =
        product.name.toLowerCase().split(' ').join('-') + '.json';
      const filePath = path.join(PATH_FILES_DIR, fileName);
      fs.writeFileSync(filePath, JSON.stringify(product, null, 2), 'utf-8');
    }

    console.log(`Created ${db.products.length} files in ${PATH_FILES_DIR}`);
  } catch (error) {
    console.error('Error creating product files:', error);
  }
}

createProductsFiles();
