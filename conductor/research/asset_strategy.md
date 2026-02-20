# Asset Strategy & Architecture

This document defines the architectural strategy for managing external assets (font files and the FIGlet library) in ASCII Banners.

## 1. Premise: Sourcing Requirements

### FIGlet Library (`figlet.js`)
The library rendering engine logic is best obtained via **NPM**.
- **Reason:** Sourcing the correct browser-compatible bundle directly from GitHub source or release zips proved unreliable and complex. `npm install` provides a deterministic, production-ready artifact.

### Fonts (`.flf` files)
Font files are static text assets.
- **Sourcing:** Fonts are obtained in source-specific ways (e.g. direct download from GitHub, or extraction from an NPM package). While they can be bundled with the library on NPM, they are fundamentally distinct assets.
- **Constraint:** We strictly require these files to be available on *our* domain at runtime to avoid CORS issues and reliance on external uptime.

---

## 2. Architectural Models

We evaluated three distinct models for managing these assets from development to deployment.

### Model 1: Full Repo-Based ("Batteries Included")
The repository contains every asset required to run the application. It is a "sealed" unit.

**Workflow:**
1.  **Dev:** Developer runs `npm install`. A script extracts assets into `assets/`.
2.  **Commit:** These assets are **committed** to the Git repository.
3.  **Deploy:** **Zero-Build Deployment.**. GitHub Pages can serve the repo content directly.

**Rationale:**
- **Portability:** You can clone the repo and run it offline immediately.
- **Independence:** The repo is the single source of truth. It doesn't break if NPM goes down during a deploy.

**The "Babysitting" Disadvantage:**
The major drawback of Model 1 is the high maintenance cost. You must maintain hundreds of files (300+ fonts, library, manifest) across every environment: local development, production, CI runners, and test servers. Every minor version update triggers massive Git diffs and requires careful synchronization to prevent drift.

### Model 2: Full CI-Based ("Lean Repo")
The repository contains only source code and configuration. Assets are treated as "build artifacts".

**Workflow:**
1.  **Dev:** Assets are downloaded locally for development but are **ignored by Git**.
2.  **Commit:** Only code and config are committed.
3.  **Deploy (CI):** The CI runner (GitHub Actions) performs a fresh `npm install`, extracts assets, and builds the production site on the fly.

**Rationale (Industry Best Practice):**
- **Repo Health:** Prevents the Git repository from growing massive over time due to binary blobs or duplicated data.
- **Separation of Concerns:** Strictly separates handwritten source code from generated or upstream data.
- **Persistence Strategy:** Model 2 clearly distinguishes between **Authoritative Source** (what we cannot generate, such as source code and the Font Version Manifest) and **Ephemeral Artifacts** (assets that can be regenerated). We can discard artifacts at any time and regenerate them perfectly from the source in seconds.

### Model 3: Direct Upstream ("CDN Dependent")
The application fetches assets from third-party servers at runtime.

**Status:** **Rejected.** This introduces fragility, privacy concerns, and potential CORS issues.

---

## 3. Selected Implementation (Model 2)

For **ASCII Banners**, we strictly follow the **Full CI-Based Model (Model 2)**.

### Component 1: FIGlet Library
- **Nature:** Dependency included via `npm install figlet`.
- **Integration:** Directly imported in `src/main.ts`. The build system (Vite) bakes this logic right into the production application code bundle.

### Component 2: Font Collections
- **Nature:** External static assets (currently specifically the [patorjk collection](https://github.com/patorjk/figlet.js/tree/main/fonts)).
- **Acquisition:** Font collections are obtained in source-dependent ways. For the patorjk collection, we use `npm pack figlet` to extract the `.flf` files. 
- **Storage:** Extracted fonts are stored in subdirectories within `public/fonts/` (e.g., `public/fonts/patorjk/`). They are placed in `public/` so they are accessible as static URL resources at runtime.
- **Runtime:** These are served through separate URL requests on demand. They are **never** bundled into the JS code.

### Component 3: Font Version Manifest (`font-versions.json`)
- **Nature:** The authoritative source of truth for font collection versions. (Code dependencies like FIGlet are tracked in `package.json`).
- **Storage:** Saved as `font-versions.json` in the project root to serve as the single source reference for the build pipeline.

### Component 4: Font Registry (`font-registry.json`)
- **Nature:** **Build-time Lock File.**
- **Integration:** Generated at build time into `src/generated/font-registry.json` and bundled by Vite into the production code.
- **Content:** A rich, flat registry containing everything the UI needs: font names, local paths, and **version-pinned source URLs** back to the upstream repositories.
- **Role:** Eliminates runtime inference. The app performs instantaneous lookups from this pre-compiled data.

### Component 5: Font Management Scripts
- **Nature:** Custom automation logic.
- **Role:** Bridges the gap between the Font Version Manifest and the Font Registry.
    - `get-patorjk-fonts.js`: Implements the source-specific acquisition logic for obtaining the fonts.
    - `make-font-registry.js`: Implements the analysis logic (categorization) and compiles the Font Registry from the font data.

---

## 4. Evolution: The Two-Repo Split

To further enforce the **Separation of Concerns**, the project is strategically evolving from a single integrated repository into a **Distributed Data Ecosystem**.

### The Architecture
The responsibilities are split between two specialized repositories:

1.  **Font Data (The Backend):**
    - **Focus:** Data curation, analysis, and integrity.
    - **Components:** Owns **Component 2** (Font Collections), **Component 4** (Font Registry), and **Component 5** (Font Management Scripts).
    - **Content:**
        - The actual font files (curated, fixed, and renamed) maintained directly in this repository.
        - Updates from upstream sources (e.g., patorjk/figlet.js) are handled entirely within this repo.
        - Comprehensive font analysis logic (categorisation, character count extraction, international character mappings).
        - A definitive, versioned Font Registry provided as a ready-to-use artifact.
    - **Outcome:**
        - Acts as a general-purpose, versioned source of truth for FIGlet fonts.
        - Storage of fonts in our own sphere of control eliminates reliance on third-party uptime.
        - Becomes a standalone public resource (the largest unified collection of FIGlet fonts on the internet).

2.  **ASCII Banners Application (The Frontend - This Repo):**
    - **Focus:** Presentation, UX, and user interaction.
    - **Components:** Owns **Component 1** (FIGlet Library) and **Component 3** (Font Version Manifest).
    - **Acquisition:**
        - The app has only a single versioned data dependency (our own Font Data repo).
        - During `npm run setup`, this app fetches the curated fonts and the pre-compiled registry from the Font Data repository.
        - Fonts are locally downloaded during the build process to avoid CORS issues and ensure domain-local availability.
    - **Outcome:**
        - Simplifies the application by removing all analysis logic and multi-source management.
        - Focuses exclusively on creating a high-performance, beautiful UI.

---

## 5. Lifecycle Management Interface

The entire project lifecycle is manageable through standard `npm run` commands.

### Lifecycle Scripts
- `npm run setup`: The "one-stop-shop" command. It performs `npm install` and initialises all assets (acquires Font Collections and generates the Font Registry). It ensures the local environment is 100% ready for development.
- `npm run dev`: Starts the local development server (Vite). Requires `npm run setup` to have been executed.
- `npm run build`: Compiles the production application bundle into the `dist/` directory.
- `npm run clean`: Removes all ephemeral artifacts (`dist/`, `public/fonts/`, `src/generated/`) to reset the environment to a "clean source" state.

### Deploy Workflow (CI/CD)
This is an automated workflow executed on **GitHub Actions** whenever changes are pushed to the main branch.
1.  **Initialisation:** The CI runner starts from a clean slate and runs `npm run setup`. 
2.  **Build:** The CI runner runs `npm run build` to produce the production `dist/` folder.
3.  **Serve:** The `dist/` artifact is uploaded and served by GitHub Pages.

### Dependency Update Workflow
Automated GitHub Actions workflow:
1. **Check:** Queries NPM/GitHub for new versions of FIGlet and Font Collections.
2. **Update:** Updates `package.json` and `font-versions.json`, then creates a **Pull Request**.
3. **Result:** Merging the PR synchronises all environments on the next `npm run setup`.

---

## 6. The Pivot: Why we switched to Model 2

After initially implementing Model 1 (Full Repo-Based), we officially pivoted to **Model 2 (Full CI-Based)**.

### Rationale
1.  **Simplicity:** We reduced the "moving parts" by treating assets as ephemeral build artifacts. We no longer need to maintain hundreds of binary files across environments.
2.  **Clean History:** Our Git history is focused strictly on logic and design.
3.  **Infrastructure Realization:** Since we require a GitHub Action for deployment to GitHub Pages anyway, the "Zero-Build" benefit of Model 1 was negligible.
