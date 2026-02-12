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
3.  **Deploy:** **Zero-Build Deployment.** GitHub Pages can serve the repo content directly.

**Rationale:**
- **Portability:** You can clone the repo and run it offline immediately.
- **Independence:** The repo is the single source of truth. It doesn't break if NPM goes down during a deploy.

**The "Babysitting" Disadvantage:**
The major drawback of Model 1 is the high maintenance cost. You must "babysit" hundreds of files (300+ fonts, library, manifest) across every environment: local development, production, CI runners, and test servers. Every minor version update triggers massive Git diffs and requires careful synchronization to prevent drift.

### Model 2: Full CI-Based ("Lean Repo")
The repository contains only source code and configuration. Assets are treated as "build artifacts".

**Workflow:**
1.  **Dev:** Assets are downloaded locally for development but are **ignored by Git**.
2.  **Commit:** Only code and config are committed.
3.  **Deploy (CI):** The CI runner (GitHub Actions) performs a fresh `npm install`, extracts assets, and builds the production site on the fly.

**Rationale (Industry Best Practice):**
- **Repo Health:** Prevents the Git repository from growing massive over time due to binary blobs or duplicated data.
- **Separation of Concerns:** Strictly separates "Source Code" (human-written) from "Artifacts" (generated/upstream data).
- **Gold vs. Trash:** Model 2 clearly distinguishes between "Gold" (what we cannot generate, such as source code and the Version Manifest) and "Trash" (ephemeral artifacts that can be generated). We can discard artifacts at any time and regenerate them perfectly from the "Gold" in seconds.

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
- **Nature:** External static assets (currently only the [patorjk font collection](https://github.com/patorjk/figlet.js/tree/main/fonts) is included).
- **Acquisition:** Font collections are obtained in source-dependent ways. For the patorjk collection, we use `npm pack figlet` to extract the `.flf` files. Other collections may use direct downloads or repository clones.
- **Storage:** Extracted fonts are stored in subdirectories within `public/fonts/` (e.g., `public/fonts/patorjk/`). They are placed in `public/` so they are accessible as static URL resources at runtime.
- **Runtime:** These are served through separate URL requests on demand. They are **never** bundled into the JS code.

### Component 3: Font Manifest (`fonts.json`)
- **Nature:** Font metadata derived from the font collections, generated at build time into `src/generated/fonts.json`.
- **Storage:** Saved in `src/generated/` so that the build system (Vite) can treat it as source data and bundle it directly into the production application code.
- **Role:** Used by the app at runtime to perform instantaneous lookups of font data and categories.

### Component 4: Version Manifest (`versions.json`)
- **Nature:** The authoritative source of truth for core dependencies that are not tracked elsewhere (e.g., in `package.json`).
- **Storage:** Saved as `versions.json` in the project root to serve as the single "Gold" reference for the build pipeline.
- **Role:** Pins the specific versions for the FIGlet Library and every font collection.

---

## 4. Lifecycle & Workflows

### Lifecycle Management Interface

The entire project lifecycle is manageable through standard `npm run` commands.

- `npm run setup`: The "one-stop-shop" command. It installs the library and initialises all assets (acquires Font Collections and generates the Font Manifest). It ensures the local environment matches `versions.json`.
- `npm run dev`: Starts the local development environment (Vite). Requires `npm run setup` to have been executed.
- `npm run build`: Compiles the production application bundle into the `dist/` directory.
- `npm run clean`: Removes all ephemeral artifacts (Fonts, Font Manifest) to reset the environment to a "clean source" state.

### Deployment Workflow (CI/CD)
A GitHub Actions workflow triggered on pushes to the main branch that builds the project and deploys it to production.
1.  **Initialisation:** The CI runner starts from a clean slate and runs `npm run setup`. 
2.  **Build:** The CI runner runs `npm run build` to produce the production `dist/` folder.
3.  **Serve:** The `dist/` artifact is uploaded and served by GitHub Pages.

### Dependency Update Workflow
A GitHub Actions workflow that runs periodically to ensure the project doesn't fall behind upstream updates.
1. **Check:** Queries NPM and other sources for new versions of the FIGlet Library or Font Collections.
2. **Update:** If a newer version is found, the bot updates the relevant string in `versions.json` and creates a **Pull Request**.
3. **Result:** After merging the PR, the next execution of `npm run setup` (locally or in CI) will automatically incorporate the updated dependencies.

---

## 5. The Pivot: Why we switched to Model 2

After initially implementing Model 1 (Full Repo-Based), we officially pivoted to **Model 2 (Full CI-Based)**.

### Rationale
1.  **Simplicity:** We reduced the "moving parts" by treating assets as ephemeral build artifacts. We no longer need to babysit hundreds of binary files across environments.
2.  **Clean History:** Our Git history is focused strictly on logic and design.
3.  **Infrastructure Realization:** Since we require a GitHub Action for deployment to GitHub Pages anyway, the "Zero-Build" benefit of Model 1 was negligible.
