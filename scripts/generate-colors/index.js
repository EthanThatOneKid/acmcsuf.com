import { readFile, writeFile } from 'node:fs/promises';
import { parseGlobalCSS } from './colors.js';

const globalCSS = await readFile('static/global.css', 'utf-8');
writeFile('static/global.json', JSON.stringify(parseGlobalCSS(globalCSS, null, 2) + '\n'), 'utf-8');
