import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const NODE_MODULES_FIGLET = path.join(__dirname, '..', 'node_modules', 'figlet');
const NODE_MODULES_FONTS = path.join(NODE_MODULES_FIGLET, 'fonts');
const FIGLET_PKG_JSON = path.join(NODE_MODULES_FIGLET, 'package.json');
const PUBLIC_FONTS_ROOT = path.join(__dirname, '..', 'public', 'fonts');
const PATORJK_FONTS_DIR = path.join(PUBLIC_FONTS_ROOT, 'patorjk');
const LIB_DIR = path.join(__dirname, '..', 'src', 'js', 'lib');
const MANIFEST_PATH = path.join(__dirname, '..', 'src', 'assets', 'manifest.json');

console.log('Extracting assets from node_modules (patorjk/figlet.js)...');

// 1. Extract Fonts
if (!fs.existsSync(PATORJK_FONTS_DIR)) {
    fs.mkdirSync(PATORJK_FONTS_DIR, { recursive: true });
}

const fontList = [];
if (fs.existsSync(NODE_MODULES_FONTS)) {
    const files = fs.readdirSync(NODE_MODULES_FONTS);
    let count = 0;
    for (const file of files) {
        if (file.endsWith('.flf')) {
            fs.copyFileSync(path.join(NODE_MODULES_FONTS, file), path.join(PATORJK_FONTS_DIR, file));
            fontList.push(file.replace('.flf', ''));
            count++;
        }
    }
    console.log(`Successfully extracted ${count} fonts to public/fonts/patorjk/`);
} else {
    console.error('Error: node_modules/figlet/fonts not found.');
    process.exit(1);
}

// 2. Extract Library File
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

// 3. Update Central Manifest
let version = 'unknown';
if (fs.existsSync(FIGLET_PKG_JSON)) {
    const pkg = JSON.parse(fs.readFileSync(FIGLET_PKG_JSON, 'utf8'));
    version = pkg.version;
}

const timestamp = new Date().toISOString();

let manifest = { sources: {} };
if (fs.existsSync(MANIFEST_PATH)) {
    try {
        manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
    } catch (e) {
        console.warn('Existing manifest was invalid, recreating.');
    }
}

// Update (or create) the patorjk source entry
manifest.sources.patorjk = {
    name: "patorjk/figlet.js",
    version: version,
    last_updated: timestamp,
    basePath: "patorjk",
    fonts: fontList
};

fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
console.log(`Updated manifest.json for patorjk v${version} (${timestamp}).`);
