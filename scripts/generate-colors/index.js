import { readFile, writeFile } from 'node:fs/promises';
import { parseGlobalCSS } from './colors.js';

const globalCSS = await readFile('static/global.css', 'utf-8');
const colors = parseGlobalCSS(globalCSS);
const content = JSON.stringify(colors, null, 2) + '\n';
await writeFile('static/global.json', content, 'utf-8');
