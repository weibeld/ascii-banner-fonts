import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const FONTS_ROOT = path.join(ROOT, 'public', 'fonts');
const MANIFEST_PATH = path.join(ROOT, 'src', 'generated', 'font.json');
const VERSIONS_PATH = path.join(ROOT, 'versions.json');

/**
 * Categorises a FIGlet (.flf) font file by deriving technical properties.
 */
function categorizeFont(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const lines = content.split(/\r?\n/);
        
        const header = lines[0];
        if (!header || !header.startsWith('flf2a')) return null;
        
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

console.log('Generating font manifest...');

if (!fs.existsSync(FONTS_ROOT)) {
    console.error('Error: public/fonts directory not found. Run acquisition scripts first.');
    process.exit(1);
}

const versions = JSON.parse(fs.readFileSync(VERSIONS_PATH, 'utf8'));
const manifest = { sources: {} };
const sources = fs.readdirSync(FONTS_ROOT).filter(f => fs.statSync(path.join(FONTS_ROOT, f)).isDirectory());

for (const sourceKey of sources) {
    const sourceDir = path.join(FONTS_ROOT, sourceKey);
    const fonts = fs.readdirSync(sourceDir).filter(f => f.endsWith('.flf'));
    
    console.log(`Processing ${fonts.length} fonts from source: ${sourceKey}`);
    
    const fontMetadata = [];
    for (const file of fonts) {
        const filePath = path.join(sourceDir, file);
        const cat = categorizeFont(filePath);
        
        fontMetadata.push({
            name: file.replace('.flf', ''),
            categories: cat || { size: 'Unknown', casing: 'Unknown' }
        });
    }

    manifest.sources[sourceKey] = {
        name: sourceKey === 'patorjk' ? "patorjk/figlet.js" : sourceKey,
        version: versions.fonts[sourceKey] || "unknown",
        last_updated: new Date().toISOString(),
        basePath: sourceKey,
        fonts: fontMetadata
    };
}

if (!fs.existsSync(path.dirname(MANIFEST_PATH))) {
    fs.mkdirSync(path.dirname(MANIFEST_PATH), { recursive: true });
}

fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
console.log(`Font manifest generated at ${MANIFEST_PATH}`);