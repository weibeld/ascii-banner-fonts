let cachedFonts = [];
let debounceTimer;

// Fetch font list once on load
async function init() {
    const status = document.getElementById('status');
    try {
        // In a real static build on GH Pages, directory listing might fail.
        // For now, we keep the dynamic fetch logic but update path.
        const response = await fetch('public/fonts/');
        const html = await response.text();
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const links = Array.from(doc.querySelectorAll('a'));
        
        cachedFonts = links
            .map(link => link.getAttribute('href'))
            .filter(href => href.toLowerCase().endsWith('.flf'))
            .map(name => decodeURIComponent(name).replace('.flf', ''));

        status.innerText = `Ready with ${cachedFonts.length} fonts.`;
        figlet.defaults({ fontPath: 'public/fonts/' });
        renderAll();
    } catch (e) {
        status.innerText = "Error: Could not scan fonts folder.";
    }
}

function renderAll() {
    const output = document.getElementById('output');
    const text = document.getElementById('userInput').value || " ";
    output.innerHTML = ''; 

    cachedFonts.forEach((fontName, index) => {
        figlet.text(text, { font: fontName }, function(err, data) {
            if (err) return;

            const div = document.createElement('div');
            div.className = 'card';
            div.innerHTML = `
                <span class="font-info">
                    <span class="counter">${String(index + 1).padStart(2, '0')}</span>${fontName}
                </span>
                <pre>${data}</pre>
            `;
            output.appendChild(div);
        });
    });
}

// Wait for user to stop typing before re-rendering 200+ fonts
function debounceRender() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(renderAll, 400);
}

window.addEventListener('DOMContentLoaded', init);
