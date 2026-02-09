# Asset Sourcing Strategy: Remote vs. Local

This document evaluates two primary strategies for managing external assets (font files and the FIGlet library) in ASCII Studio.

## 1. Remote Sourcing (Direct Upstream)

In this strategy, the application refers directly to the original source of the assets on the internet.

### Request Flow
1. User opens `index.html` (served from our domain).
2. The browser parses the HTML and encounters external links (e.g., `<script src="https://cdn.jsdelivr.net/.../figlet.js">`).
3. The browser makes separate HTTP requests to the **Remote Endpoints** (e.g., GitHub Raw or JSDelivr) to fetch the library and each font file as needed.

### Storage & Duplication
- **Project Repo:** Contains only the code. No library or font files are saved in our repository.
- **Duplication:** There is zero duplication. We use the single "source of truth" provided by the upstream maintainer.

---

## 2. Local Maintenance (Project Bundling)

In this strategy, we maintain a copy of all necessary assets within our own project structure.

### Request Flow
1. User opens `index.html` (served from our domain).
2. The browser parses the HTML and encounters internal links (e.g., `<script src="src/js/lib/figlet.min.js">`).
3. The browser makes separate HTTP requests to **Our Own Endpoint** (the same domain serving the app) to fetch the assets.

### Storage & Duplication
- **Project Repo:** All library and font files are saved within our directory structure (e.g., `src/js/lib/`, `public/fonts/`).
- **Duplication:** These files are exact duplicates of the files in the upstream repository (e.g., `patorjk/figlet.js`).

---

## Detailed Evaluation

### Remote Sourcing
- **Maintenance:** Excellent. No local files to manage.
- **Updates:** Automatic. Upstream improvements are immediately reflected.
- **Reliability:** Fragile. The application's core functionality depends on third-party uptime and stability of their URL patterns.
- **Suitability:** Best for quick prototypes or apps where assets change very frequently.

### Local Maintenance
- **Maintenance:** Higher. Requires a build-time or maintenance script to manage assets.
- **Updates:** Manual. Updates must be triggered via a synchronization process.
- **Reliability:** Robust. The application is a self-contained unit. It will work as long as its own hosting is active.
- **Suitability:** Best for production-grade applications, tools requiring offline support, or projects targeting platforms with strict Content Security Policies (like GitHub Pages).

## 3. Release-Based Synchronization Strategy

To implement the **Local Maintenance** strategy effectively, we need a reliable way to keep our local copies of `figlet.min.js` and the `.flf` fonts updated without manual drudgery.

### Target Repository
- **Source:** [patorjk/figlet.js](https://github.com/patorjk/figlet.js)
- **Content:** This single repository contains both the rendering engine and the curated font library.

### Proposed Workflow
We will implement a synchronization mechanism that "pins" the project to a specific upstream release.

1.  **Version Tracking:** Maintain a local file (e.g., `scripts/.current_version`) containing the tag name of the currently synced assets (e.g., `v1.10.0`).
2.  **Detection:** A script will query the GitHub API:
    `GET https://api.github.com/repos/patorjk/figlet.js/releases/latest`
3.  **Comparison:** If the `tag_name` from the API is newer than our local version:
    -   Download the files from the corresponding tag:
        -   `src/js/lib/figlet.min.js`
        -   All `.flf` files from the `fonts/` directory.
4.  **UI Integration:** The current version string must be displayed in the application (e.g., in the Footer or FAQ) to provide transparency to users.
5.  **Commitment:** Commit the updated assets and the new version string to our repository.

### Automation: GitHub Action
Instead of manual execution, we will implement a GitHub Action to handle synchronization:
- **Schedule:** Runs automatically on the 1st of every month.
- **Action:** Checks for a new release; if found, it performs the sync and opens a Pull Request for review.

### Expansion to Other Sources
If we later add fonts from `xero/figlet-fonts`, we will treat them as a "static" secondary collection. Since that repo has no releases and low activity, a simple manual sync script (run once or twice a year) is sufficient.

---

## 4. Settled Solution: Modern Stack Migration (NPM + Vite + TS)

Following further research and evaluation, we have migrated the project to a modern stack that elegantly fulfills the **Local Maintenance** strategy.

### Final Implementation Mechanism
- **Package Management:** The library is managed as a standard NPM dependency (`figlet`).
- **Asset Sync:** A Node.js script (`scripts/copy-fonts.js`) replaces complex ZIP/API logic. It copies fonts directly from `node_modules` into source-specific subdirectories (e.g., `public/fonts/patorjk/`).
- **Manifest Discovery:** The copy script generates a `fonts.json` manifest. This removes the need for brittle directory listing, making the app truly static and compatible with any host.
- **Monthly Automation:** The GitHub Action is simplified to `npm update figlet` followed by the copy script and an automated PR.
- **UI Attribution:** The version number is read directly from the `figlet` package's `package.json` and displayed in the frontend, ensuring clear provenance (e.g., `patorjk/figlet.js v1.10.0`).
