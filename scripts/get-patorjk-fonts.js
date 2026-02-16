import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const FONTS_DEST = path.join(ROOT, 'public', 'fonts', 'patorjk');
const TEMP_DIR = path.join(ROOT, 'temp_unpack_patorjk');

// Read version from font-versions.json
const versions = JSON.parse(fs.readFileSync(path.join(ROOT, 'font-versions.json'), 'utf8'));
const version = versions.patorjk;

console.log(`Acquiring patorjk font collection ${version}...`);

try {
    // 1. Prepare directories
    if (fs.existsSync(TEMP_DIR)) fs.rmSync(TEMP_DIR, { recursive: true, force: true });
    fs.mkdirSync(TEMP_DIR, { recursive: true });
    if (!fs.existsSync(FONTS_DEST)) fs.mkdirSync(FONTS_DEST, { recursive: true });

    // 2. npm pack
    console.log(`Running: npm pack figlet@${version} --silent`);
    const tarballName = execSync(`npm pack figlet@${version} --silent`, { cwd: TEMP_DIR, encoding: 'utf8' }).trim();
    const tarballPath = path.join(TEMP_DIR, tarballName);

    // 3. Unpack
    console.log(`Unpacking ${tarballName}...`);
    execSync(`tar -xzf ${tarballPath} -C ${TEMP_DIR}`, { cwd: TEMP_DIR });

    // 4. Move fonts
    const sourceFontsDir = path.join(TEMP_DIR, 'package', 'fonts');
    const fonts = fs.readdirSync(sourceFontsDir).filter(f => f.endsWith('.flf'));
    
    console.log(`Moving ${fonts.length} fonts to ${FONTS_DEST}...`);
    for (const font of fonts) {
        fs.copyFileSync(path.join(sourceFontsDir, font), path.join(FONTS_DEST, font));
    }

    // 5. Cleanup
    fs.rmSync(TEMP_DIR, { recursive: true, force: true });
    console.log('Successfully acquired patorjk collection.');

} catch (e) {
    console.error('Error acquiring patorjk fonts:', e.message);
    process.exit(1);
}
