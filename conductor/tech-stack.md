# Tech Stack - ASCII Banners

## Frontend
- **Vite:** Next-generation frontend tooling for development and bundling.
- **TypeScript:** Typed superset of JavaScript for robust application logic.
- **HTML5/CSS3:** Modern, responsive UI with a minimalist aesthetic.
- **FIGlet.js (NPM):** The core engine for ASCII art generation, managed via NPM.

## Asset Management
- **Full Repo-Based Strategy (Model 1):** All assets (fonts and the FIGlet rendering engine) are committed to the repository. This ensures total portability and robustness, allowing the project to run as a self-contained unit without external dependencies at deploy time.
- **NPM Integration:** The `figlet` library is managed as a project dependency, but production assets are extracted from `node_modules` into the project structure.
- **Unified Manifest:** A central `src/assets/manifest.json` stores all asset metadata (versions, fonts, and ISO 8601 update timestamps). This manifest is bundled at build time, eliminating runtime fetch requests and enabling immediate font discovery.

## Infrastructure & Deployment
- **Static Hosting:** Optimized for GitHub Pages, Vercel, or similar. No build step (like `npm install`) is strictly required on the host if serving pre-built assets, though GitHub Actions are used for automated maintenance.
- **Automation (Maintenance Bot):** GitHub Actions perform monthly version checks against upstream sources. If a new version is detected, the bot updates the dependency, extracts new assets, updates the manifest, and opens a Pull Request.
