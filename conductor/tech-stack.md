# Tech Stack - ASCII Studio

## Frontend
- **HTML5/CSS3:** Vanilla implementation focusing on a minimalist, high-performance UI.
- **JavaScript (ES6+):** Vanilla JS for UI logic and font rendering orchestration.
- **FIGlet.js:** The core engine for ASCII art generation. 
  - *Note:* We will evaluate whether to use a CDN or local bundling to ensure compatibility with GitHub Pages and avoid CORS issues.

## Font Management
- **FLF (FIGlet Font) Files:** The project utilizes a large library of FIGlet fonts.
- **Python (Maintenance only):** Python scripts are used for the automated discovery and downloading of font files from upstream repositories.

## Infrastructure & Deployment
- **Static Hosting:** Targeted for GitHub Pages, Vercel, or similar.
- **Client-Side Processing:** All rendering happens in the user's browser, ensuring the app is fast, secure, and easy to host.
