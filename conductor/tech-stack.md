# Tech Stack - ASCII Studio

## Frontend
- **HTML5/CSS3:** Vanilla implementation focusing on a minimalist, high-performance UI.
- **JavaScript (ES6+):** Vanilla JS for UI logic and font rendering orchestration.
- **FIGlet.js:** The core engine for ASCII art generation. 
  - **Local Asset Strategy:** To ensure maximum portability and bypass CORS/CDN issues on static hosts like GitHub Pages, the `figlet.min.js` library and all `.flf` font files are served locally from the project's directory structure.

## Font Management
- **FLF (FIGlet Font) Files:** The project utilizes a large library of FIGlet fonts.
- **Python (Maintenance only):** Python scripts are used for the automated discovery and downloading of font files from upstream repositories.

## Infrastructure & Deployment
- **Static Hosting:** Targeted for GitHub Pages, Vercel, or similar.
- **Build/Task Management:** A `Makefile` is used to orchestrate development tasks such as local serving, environment setup, and font collection updates.
- **Client-Side Processing:** All rendering happens in the user's browser, ensuring the app is fast, secure, and easy to host.
