import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const NODE_MODULES_FONTS = path.join(__dirname, '..', 'node_modules', 'figlet', 'fonts');
const FIGLET_PKG_JSON = path.join(__dirname, '..', 'node_modules', 'figlet', 'package.json');
const PUBLIC_FONTS_ROOT = path.join(__dirname, '..', 'public', 'fonts');
const PATORJK_FONTS_DIR = path.join(PUBLIC_FONTS_ROOT, 'patorjk');

console.log('Copying fonts from node_modules (patorjk/figlet.js)...');

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
    console.log(`Successfully copied ${count} fonts to public/fonts/patorjk/`);
    
    // Get version from figlet package.json
    let version = 'unknown';
    if (fs.existsSync(FIGLET_PKG_JSON)) {
        const pkg = JSON.parse(fs.readFileSync(FIGLET_PKG_JSON, 'utf8'));
        version = pkg.version;
    }

    // Generate manifest with source-based structure
    const manifest = {
        sources: {
            patorjk: {
                name: "patorjk/figlet.js",
                version: version,
                basePath: "patorjk",
                fonts: fontList
            }
        }
    };

    fs.writeFileSync(path.join(PUBLIC_FONTS_ROOT, 'fonts.json'), JSON.stringify(manifest, null, 2));
    console.log(`Generated fonts.json manifest with patorjk v${version}.`);

} else {
    console.error('Error: node_modules/figlet/fonts not found. Run npm install first.');
    process.exit(1);
}