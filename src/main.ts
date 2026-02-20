import figlet from 'figlet';
import standard from 'figlet/importable-fonts/Standard.js';
import registry from './generated/font-registry.json';

// We bundle 'Standard' so the app has a fallback immediately
figlet.parseFont('Standard', standard);

interface FontEntry {
    name: string;
    collectionId: string;
    path: string;
    sourceUrl: string;
    categories: {
        size: string;
        casing: string;
    };
}

let cachedFonts: FontEntry[] = [];

async function init() {
    const status = document.getElementById('status');
    if (!status) return;

    try {
        // The registry is already a flat list under 'fonts'
        cachedFonts = (registry.fonts as any[]).sort((a, b) => a.name.localeCompare(b.name));

        const infoStrings = Object.values(registry.collections).map((c: any) => 
            `${c.name} (${c.version})`
        );

        status.innerText = `Ready with ${cachedFonts.length} fonts. Sources: ${infoStrings.join(' | ')}`;
        
        // Base font path for figlet. Use Vite's BASE_URL to handle project subdirectories.
        const baseUrl = import.meta.env.BASE_URL.endsWith('/') 
            ? import.meta.env.BASE_URL 
            : import.meta.env.BASE_URL + '/';
        
        figlet.defaults({ fontPath: `${baseUrl}fonts` });
        
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

    const sizeFilter = (document.querySelector('input[name="size"]:checked') as HTMLInputElement)?.value || 'All';
    const casingFilter = (document.querySelector('input[name="casing"]:checked') as HTMLInputElement)?.value || 'All';

    const text = input.value || " ";
    output.innerHTML = ''; 

    const filteredFonts = cachedFonts.filter(font => {
        const matchesSize = sizeFilter === 'All' || font.categories.size === sizeFilter;
        const matchesCasing = casingFilter === 'All' || font.categories.casing === casingFilter;
        return matchesSize && matchesCasing;
    });

    filteredFonts.forEach((font, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.id = `font-card-${index}`;
        
        card.innerHTML = `
            <span class="font-info">
                ${font.name}
                <span class="font-tag">${font.categories.size}</span>
                <span class="font-tag">${font.categories.casing}</span>
            </span>
            <pre>Loading...</pre>
        `;
        output.appendChild(card);

        figlet.text(text, { font: font.path as any }, function(err, data) {
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
