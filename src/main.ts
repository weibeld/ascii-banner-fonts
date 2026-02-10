import figlet from 'figlet';
import standard from 'figlet/importable-fonts/Standard.js';
import manifest from './assets/manifest.json';

figlet.parseFont('Standard', standard);

interface FontEntry {
    name: string;
    sourcePath: string; // relative to /fonts/
}

let cachedFonts: FontEntry[] = [];

async function init() {
    const status = document.getElementById('status');
    if (!status) return;

    try {
        const allFonts: FontEntry[] = [];
        const infoStrings: string[] = [];

        // Process sources from the bundled manifest
        Object.keys(manifest.sources).forEach(sourceKey => {
            const source = (manifest.sources as any)[sourceKey];
            infoStrings.push(`${source.name} v${source.version} (Updated: ${source.last_updated})`);
            source.fonts.forEach((fontName: string) => {
                allFonts.push({
                    name: fontName,
                    sourcePath: `${source.basePath}/${fontName}`
                });
            });
        });

        // Alphabetical sort
        cachedFonts = allFonts.sort((a, b) => a.name.localeCompare(b.name));

        status.innerText = `Ready with ${cachedFonts.length} fonts. Sources: ${infoStrings.join(' | ')}`;
        
        // Base font path for figlet. In Model 1, these are in public/fonts/
        figlet.defaults({ fontPath: '/fonts/' });
        
        renderAll();
    } catch (e) {
        console.error(e);
        status.innerText = "Error: Could not initialize application.";
    }
}

function renderAll() {
    const output = document.getElementById('output');
    const input = document.getElementById('userInput') as HTMLInputElement;
    if (!output || !input) return;

    const text = input.value || " ";
    output.innerHTML = ''; 

    // Create containers in correct order immediately
    cachedFonts.forEach((font, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.id = `font-card-${index}`;
        
        card.innerHTML = `
            <span class="font-info">
                <span class="counter">${String(index + 1).padStart(2, '0')}</span>${font.name}
            </span>
            <pre>Loading...</pre>
        `;
        output.appendChild(card);

        // Async render into the specific card
        figlet.text(text, { font: font.sourcePath as any }, function(err, data) {
            const pre = card.querySelector('pre');
            if (pre) {
                if (err) {
                    pre.innerText = "Error rendering font.";
                    pre.style.color = "#ff4444";
                } else {
                    pre.innerText = data || "";
                }
            }
        });
    });
}

function debounceRender() {
    clearTimeout(window.debounceTimer);
    window.debounceTimer = window.setTimeout(renderAll, 400);
}

// Global declarations for the inline event handler
declare global {
    interface Window {
        debounceTimer: number | undefined;
        debounceRender: () => void;
    }
}

window.debounceRender = debounceRender;

window.addEventListener('DOMContentLoaded', init);