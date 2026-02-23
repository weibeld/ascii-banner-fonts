import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const FONTS_ROOT = path.join(ROOT, 'public', 'fonts');
const REGISTRY_PATH = path.join(ROOT, 'src', 'generated', 'font-registry.json');
const VERSIONS_PATH = path.join(ROOT, 'font-versions.json');

/**
 * Categorises a FIGlet (.flf) font file by deriving technical properties.
 */
function categorizeFont(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const lines = content.split(/\r?\n/);
        
        const header = lines[0];
        if (!header || !/^[tf]lf2./.test(header)) return null;
        
        const parts = header.split(/\s+/);
        const height = parseInt(parts[1], 10);
        const maxWidth = parseInt(parts[3], 10) || 0;
        const commentLines = parseInt(parts[5], 10) || 0;
        
        const startIdx = 1 + commentLines;
        
        const getCharLines = (charCode) => {
            const charIdx = charCode - 32;
            const lineStart = startIdx + (charIdx * height);
            if (lineStart + height > lines.length) return null;
            return lines.slice(lineStart, lineStart + height).join('\n');
        };
        
        const charA = getCharLines(65); // 'A'
        const chara = getCharLines(97); // 'a'
        const isDoubleCase = charA !== null && chara !== null && charA !== chara;
        
        let size = 'Medium';
        if (maxWidth > 0) {
            const area = height * maxWidth;
            if (area <= 35) size = 'Small';
            else if (area >= 100) size = 'Large';
        } else {
            if (height <= 4) size = 'Small';
            else if (height >= 9) size = 'Large';
        }
        
        return { size, casing: isDoubleCase ? 'Double' : 'Single' };
    } catch (e) {
        return null;
    }
}

console.log('Generating font registry...');

if (!fs.existsSync(FONTS_ROOT)) {
    console.error('Error: public/fonts directory not found. Run acquisition scripts first.');
    process.exit(1);
}

const fontVersions = JSON.parse(fs.readFileSync(VERSIONS_PATH, 'utf8'));

const registry = {
    collections: {},
    fonts: []
};

const collectionIds = fs.readdirSync(FONTS_ROOT).filter(f => fs.statSync(path.join(FONTS_ROOT, f)).isDirectory());

for (const id of collectionIds) {
    const version = fontVersions[id] || "unknown";
    const sourceDir = path.join(FONTS_ROOT, id);
    const fontFiles = fs.readdirSync(sourceDir).filter(f => f.endsWith('.flf'));
    
    console.log(`Processing ${fontFiles.length} fonts from collection: ${id}`);
    
    // Add collection metadata
    registry.collections[id] = {
        name: id === 'patorjk' ? "patorjk/figlet.js" : id,
        version: version,
        url: id === 'patorjk' ? `https://github.com/patorjk/figlet.js/tree/${version}/fonts` : ""
    };

    for (const file of fontFiles) {
        const filePath = path.join(sourceDir, file);
        const fontName = file.replace('.flf', '');
        const cat = categorizeFont(filePath);
        
        // Construct pinned GitHub URL for patorjk
        let sourceUrl = "";
        if (id === 'patorjk') {
            sourceUrl = `https://github.com/patorjk/figlet.js/blob/${version}/fonts/${file}`;
        }

        registry.fonts.push({
            name: fontName,
            collectionId: id,
            path: `${id}/${fontName}`,
            sourceUrl: sourceUrl,
            categories: cat || { size: 'Unknown', casing: 'Unknown' }
        });
    }
}

// Ensure output directory exists
if (!fs.existsSync(path.dirname(REGISTRY_PATH))) {
    fs.mkdirSync(path.dirname(REGISTRY_PATH), { recursive: true });
}

fs.writeFileSync(REGISTRY_PATH, JSON.stringify(registry, null, 2));
console.log(`Font registry generated at ${REGISTRY_PATH} (${registry.fonts.length} fonts)`);