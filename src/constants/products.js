import path from 'node:path';

// export const PATH_DB = path.join('src/db/db.json');
export const DB_PATH = new URL('../db/db.json', import.meta.url);

export const PATH_FILES_DIR = path.join('src/db/files');
