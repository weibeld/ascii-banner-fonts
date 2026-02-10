# Asset Strategy & Architecture

This document defines the architectural strategy for managing external assets (font files and the FIGlet library) in ASCII Studio.

## 1. Premise: The NPM Source of Truth

We use the official `figlet` NPM package as the single authoritative source for both the rendering engine and the core font library.

### Why NPM?
We investigated multiple sourcing methods:
- **GitHub Repository (Source):** Requires a complex build toolchain to generate the production artifacts from TypeScript source.
- **GitHub Release (Zip):** Inconsistent structure across versions; often lacks the final minified distribution files.
- **CDN (jsDelivr):** While accessible, it introduces an external runtime dependency and fragility if URL patterns change.

**Conclusion:** `npm install` is the only robust, officially supported method to obtain the complete, production-ready set of assets (library + fonts) in a deterministic state.

---

## 2. Asset Sourcing Models

Given that `npm install` provides the raw materials, we evaluated two architectural models for integrating them into our application.

### Model 1: Full Repo-Based (Contained)
The repository contains every asset required to run the application. It is a "sealed" unit.

**Workflow:**
1.  **Extraction:** A developer (or bot) runs `npm install`, then a script copies the relevant files from `node_modules` to tracked directories (`src/lib/`, `public/fonts/`).
2.  **Commitment:** These copied assets are committed to the Git repository.
3.  **Deployment:** The host serves the files directly. No build process is required on the production server.

### Model 2: Full CI-Based (Lean)
The repository contains only source code and configuration. Assets are ephemeral.

**Workflow:**
1.  **Exclusion:** `node_modules` and `public/fonts/` are ignored by Git.
2.  **Deployment:** The CI pipeline (GitHub Actions) runs `npm install` and `npm run build` to generate the assets on the fly before deploying the result.

---

## 3. Detailed Comparison & Evaluation

| Feature | Model 1 (Full Repo) | Model 2 (Full CI) |
| :--- | :--- | :--- |
| **Repo Size** | Larger (Includes binary fonts) | Tiny (Code only) |
| **Self-Sufficiency** | **Total.** Can run offline or from a USB stick immediately after cloning. | **Low.** Requires internet, NPM registry, and a build environment to run. |
| **Robustness** | **High.** Deployment cannot fail due to NPM outages or upstream changes. | **Medium.** Deployment breaks if NPM is down or packages vanish. |
| **Mixed Sources** | **Simple.** Non-NPM fonts (e.g., `xero`) are treated exactly the same way (committed files). | **Complex.** Requires custom CI logic to fetch/build each non-NPM source. |
| **Auditability** | Changes to fonts are visible in Git history. | Font changes are invisible "magic" during deployment. |

---

## 4. Selected Strategy: Model 1 (Full Repo-Based)

For **ASCII Studio**, we strictly follow **Model 1**.

### Implementation Details
- **Library:** The `figlet` library is bundled/copied to `src/js/lib/` and committed.
- **Fonts:** Font files are extracted to `public/fonts/patorjk/` and committed.
- **Manifest:** A `fonts.json` file is generated and committed to allow the frontend to discover assets without server-side listing.

### Automated Maintenance (The "Robot Maintainer")
While the assets are committed, we automate their maintenance (version update) to prevent drift:
- **Mechanism:** A GitHub Action runs periodically (e.g., monthly).
- **Process:**
    1. Checks for a new version of the upstream `figlet` package
    2. If there is a new version:
       1.  Runs `npm update`.
       2.  Runs the extraction script (extracts assets into repository).
       3.  Commits the extracted assets and opens a **Pull Request**.
    3. If there is no new version, does nothing
- **Result:** The developer simply merges the PR to "ingest" the new upstream version into the repository.
