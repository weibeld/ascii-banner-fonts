import figlet from 'figlet';
import standard from 'figlet/importable-fonts/Standard.js';
import manifest from '../assets/manifest.json';

figlet.parseFont('Standard', standard);

interface FontEntry {
    name: string;
    sourcePath: string; // relative to /fonts/
    size: string;
    casing: string;
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
            source.fonts.forEach((font: any) => {
                allFonts.push({
                    name: font.name,
                    sourcePath: `${source.basePath}/${font.name}`,
                    size: font.categories.size,
                    casing: font.categories.casing
                });
            });
        });

        // Alphabetical sort
        cachedFonts = allFonts.sort((a, b) => a.name.localeCompare(b.name));

        status.innerText = `Ready with ${cachedFonts.length} fonts. Sources: ${infoStrings.join(' | ')}`;
        
        // Base font path for figlet. In production, these are at the root /fonts/
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

    // Get filter values (Radio buttons)
    const sizeFilter = (document.querySelector('input[name="size"]:checked') as HTMLInputElement)?.value || 'All';
    const casingFilter = (document.querySelector('input[name="casing"]:checked') as HTMLInputElement)?.value || 'All';

    const text = input.value || " ";
    output.innerHTML = ''; 

    // Apply filtering
    const filteredFonts = cachedFonts.filter(font => {
        const matchesSize = sizeFilter === 'All' || font.size === sizeFilter;
        const matchesCasing = casingFilter === 'All' || font.casing === casingFilter;
        return matchesSize && matchesCasing;
    });

    // Create containers in correct order
    filteredFonts.forEach((font, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.id = `font-card-${index}`;
        
        card.innerHTML = `
            <span class="font-info">
                ${font.name}
                <span class="font-tag">${font.size}</span>
                <span class="font-tag">${font.casing}</span>
            </span>
            <pre>Loading...</pre>
        `;
        output.appendChild(card);

        // Async render
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

    const status = document.getElementById('status');
    if (status) {
        status.innerText = `Showing ${filteredFonts.length} of ${cachedFonts.length} fonts.`;
    }
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
        renderAll: () => void;
    }
}

window.debounceRender = debounceRender;
window.renderAll = renderAll;

window.addEventListener('DOMContentLoaded', init);