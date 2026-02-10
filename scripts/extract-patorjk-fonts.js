import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { categorizeFont } from './utils/font-categorizer.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const NODE_MODULES_FIGLET = path.join(__dirname, '..', 'node_modules', 'figlet');
const NODE_MODULES_FONTS = path.join(NODE_MODULES_FIGLET, 'fonts');
const FIGLET_PKG_JSON = path.join(NODE_MODULES_FIGLET, 'package.json');
const ASSETS_ROOT = path.join(__dirname, '..', 'assets');
const FONTS_DIR = path.join(ASSETS_ROOT, 'fonts', 'patorjk');
const MANIFEST_PATH = path.join(ASSETS_ROOT, 'manifest.json');

console.log('Extracting patorjk/figlet.js fonts...');

if (!fs.existsSync(FONTS_DIR)) {
    fs.mkdirSync(FONTS_DIR, { recursive: true });
}

const fontMetadata = [];
if (fs.existsSync(NODE_MODULES_FONTS)) {
    const files = fs.readdirSync(NODE_MODULES_FONTS);
    let count = 0;
    for (const file of files) {
        if (file.endsWith('.flf')) {
            const srcPath = path.join(NODE_MODULES_FONTS, file);
            const destPath = path.join(FONTS_DIR, file);
            
            fs.copyFileSync(srcPath, destPath);
            
            const categorization = categorizeFont(srcPath);
            const fontName = file.replace('.flf', '');
            
            fontMetadata.push({
                name: fontName,
                categories: {
                    size: categorization ? categorization.size : 'Unknown',
                    casing: categorization ? categorization.casing : 'Unknown'
                }
            });
            
            count++;
        }
    }
    console.log(`Successfully extracted and analysed ${count} fonts.`);
} else {
    console.error('Error: node_modules/figlet/fonts not found.');
    process.exit(1);
}

// Update Central Manifest
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

manifest.sources.patorjk = {
    name: "patorjk/figlet.js",
    version: version,
    last_updated: timestamp,
    basePath: "patorjk",
    fonts: fontMetadata
};

fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
console.log(`Updated manifest.json for patorjk v${version} (${timestamp}).`);
