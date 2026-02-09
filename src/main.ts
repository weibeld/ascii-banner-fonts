import figlet from 'figlet';
import standard from 'figlet/importable-fonts/Standard.js';

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
        const response = await fetch('/fonts/fonts.json');
        const manifest = await response.json();
        
        const allFonts: FontEntry[] = [];
        const versions: string[] = [];

        // Flatten sources into a single list
        Object.keys(manifest.sources).forEach(sourceKey => {
            const source = manifest.sources[sourceKey];
            versions.push(`${source.name} v${source.version}`);
            source.fonts.forEach((fontName: string) => {
                allFonts.push({
                    name: fontName,
                    sourcePath: `${source.basePath}/${fontName}`
                });
            });
        });

        // Simple alphabetical sort
        cachedFonts = allFonts.sort((a, b) => a.name.localeCompare(b.name));

        status.innerText = `Ready with ${cachedFonts.length} fonts. (${versions.join(', ')})`;
        
        // Base font path for figlet
        figlet.defaults({ fontPath: '/fonts/' });
        
        renderAll();
    } catch (e) {
        console.error(e);
        status.innerText = "Error: Could not scan fonts.";
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
        
        // Initial placeholder content
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
    const text = (document.getElementById('userInput') as HTMLInputElement).value;
    // We can clear and re-render or just update pre contents. 
    // Re-rendering everything is safer for visual consistency.
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
