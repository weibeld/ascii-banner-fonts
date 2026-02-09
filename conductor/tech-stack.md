# Tech Stack - ASCII Studio

## Frontend
- **Vite:** Next-generation frontend tooling for development and bundling.
- **TypeScript:** Typed superset of JavaScript for robust application logic.
- **HTML5/CSS3:** Modern, responsive UI with a minimalist aesthetic.
- **FIGlet.js (NPM):** The core engine for ASCII art generation, managed via NPM.

## Asset Management
- **NPM Integration:** External libraries (`figlet`) are managed as project dependencies.
- **Local Asset Strategy:** Font files are copied from `node_modules` to the `public/` directory during the build/sync process to ensure portability and bypass CORS issues.
- **Manifest Generation:** A `fonts.json` manifest is automatically generated to enable the frontend to discover available fonts in a static environment.

## Infrastructure & Deployment
- **Static Hosting:** Optimized for GitHub Pages, Vercel, or similar.
- **Automation:** GitHub Actions handle monthly dependency updates and asset synchronization.
- **Client-Side Processing:** All rendering happens in the user's browser.
