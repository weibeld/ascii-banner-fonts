import fs from 'fs';
import path from 'path';

function analyzeFont(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split(/\r?\n/);
    
    // Header Parsing
    const header = lines[0];
    if (!header || !header.startsWith('flf2a')) return null;
    
    const parts = header.split(/\s+/);
    const height = parseInt(parts[1], 10);
    const commentLines = parseInt(parts[5], 10) || 0;
    
    // Character Definitions start after header + comments
    const startIdx = 1 + commentLines;
    
    // Characters are in ASCII order starting from 32 (Space).
    // 'A' is 65, 'a' is 97.
    // Each character is 'height' lines long.
    
    function getCharLines(charCode) {
        const charIdx = charCode - 32;
        const lineStart = startIdx + (charIdx * height);
        return lines.slice(lineStart, lineStart + height).join('\n');
    }
    
    const charA = getCharLines(65); // 'A'
    const chara = getCharLines(97); // 'a'
    
    const isDoubleCase = charA !== chara;
    
    // Categorize Size
    let size = 'Medium';
    if (height <= 4) size = 'Small';
    else if (height >= 11) size = 'Large'; // Adjusted slightly
    
    // Categorize Casing
    const casing = isDoubleCase ? 'Double' : 'Single';

    return {
        name: path.basename(filePath, '.flf'),
        height,
        size,
        casing
    };
}

// Test on a few fonts
const testFonts = [
    'public/fonts/patorjk/Standard.flf',
    'public/fonts/patorjk/Small.flf',
    'public/fonts/patorjk/Big.flf',
    'public/fonts/patorjk/Mini.flf'
];

testFonts.forEach(f => {
    if (fs.existsSync(f)) {
        console.log(analyzeFont(f));
    } else {
        console.log(`Not found: ${f}`);
    }
});