import fs from 'fs';

/**
 * Categorises a FIGlet (.flf) font file by deriving technical properties.
 * 
 * @param {string} filePath - Path to the .flf file.
 * @returns {object|null} - Categorisation results or null if invalid.
 */
export function categorizeFont(filePath) {
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
        
        // Categorise Size using 'Mass' heuristic (Height * Width)
        let size = 'Medium';
        if (maxWidth > 0) {
            const area = height * maxWidth;
            if (area <= 35) size = 'Small';
            else if (area >= 100) size = 'Large';
            else size = 'Medium';
        } else {
            // Fallback to strict height
            if (height <= 4) size = 'Small';
            else if (height >= 9) size = 'Large';
        }
        
        return {
            size,
            casing: isDoubleCase ? 'Double' : 'Single'
        };
    } catch (e) {
        console.error(`Error categorising ${filePath}:`, e.message);
        return null;
    }
}
