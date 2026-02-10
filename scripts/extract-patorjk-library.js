import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const NODE_MODULES_FIGLET = path.join(__dirname, '..', 'node_modules', 'figlet');
const LIB_DIR = path.join(__dirname, '..', 'assets', 'lib');

console.log('Extracting patorjk/figlet.js engine...');

if (!fs.existsSync(LIB_DIR)) {
    fs.mkdirSync(LIB_DIR, { recursive: true });
}

const distDir = path.join(NODE_MODULES_FIGLET, 'dist');
let libFound = false;

if (fs.existsSync(distDir)) {
    const jsFiles = fs.readdirSync(distDir).filter(f => f.endsWith('.js'));
    jsFiles.sort((a, b) => fs.statSync(path.join(distDir, b)).size - fs.statSync(path.join(distDir, a)).size);
    if (jsFiles.length > 0) {
        fs.copyFileSync(path.join(distDir, jsFiles[0]), path.join(LIB_DIR, 'figlet.js'));
        console.log(`Extracted library bundle: ${jsFiles[0]}`);
        libFound = true;
    }
}

if (!libFound) {
    const fallback = path.join(NODE_MODULES_FIGLET, 'lib', 'figlet.js');
    if (fs.existsSync(fallback)) {
        fs.copyFileSync(fallback, path.join(LIB_DIR, 'figlet.js'));
        console.log('Extracted library from fallback: lib/figlet.js');
        libFound = true;
    }
}

if (!libFound) {
    console.error('Error: Could not find figlet.js in node_modules.');
    process.exit(1);
}