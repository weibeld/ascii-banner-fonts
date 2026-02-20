# Font Data Backend: Strategy & Launch Pad

This document serves as the authoritative definition and planning resource for the **Font Data Repository**. It acts as a "Launch Pad" for initialising the new project and will eventually be migrated to that repository.

## 1. Vision & Role
The **Font Data Repository** is intended to be a general-purpose repository and registry of FIGlet fonts. It is a specialised, standalone backend responsible for the curation, analysis, and versioned distribution of ASCII typography.

- **Outcome:** Acts as a high-integrity source of truth that can drive a multitude of presentation applications in the ASCII ecosystem.
- **Consumer:** Drives the **ASCII Banners Application** and any other frontend project.

---

## 2. Fundamental Strategies

We evaluated the following architectural options for managing and sourcing font data.

### A. Data Storage Strategy

#### Option 1: Fostered Data (The "Vault" Model)
In this model, the repository commits the actual `.flf` font files. The data stored in the repo is the definitive source of truth.

- **Pros:**
    - **Total Control:** Enables high-touch curation, manual bug fixes, and precise renaming.
    - **Simplicity:** No complex dependency on third-party uptime or package manager stability at build time.
    - **History:** Every edit to a font is tracked in the Git history.
- **Cons:**
    - **Manual Sync:** Upstream updates must be manually reviewed and merged into the vault.

#### Option 2: Repeatable Pipeline (The "Recipe" Model)
In this model, fonts are still stored in the repository, but the entire content could at any time be overwritten or regenerated from original sources through automated scripts.

- **Pros:**
    - **Automaticity:** Theoretically easier to stay in sync with latest upstream releases.
- **Cons:**
    - **Brittleness:** Applying complex edits or fixes to font files via scripts is difficult and error-prone.
    - **Fragility:** Upstream data may change in unexpected ways, requiring continuous updates to the pipeline scripts.

---

### B. Data Sourcing Strategy

#### Option 1: Patorjk-First
Take everything from the [patorjk/figlet.js](https://github.com/patorjk/figlet.js) collection (the most popular modern collection) and add additional fonts from other sources.

- **Pros:**
    - **Standardisation:** Aligns with almost every modern FIGlet tool on the web.
    - **Efficiency:** Provides a massive, ready-to-use dataset immediately.
    - **Sync:** Enables automatic synchronisation with new patorjk versions.
- **Cons:**
    - **Curation Overhead:** Manual edits (exclusions, renaming) must either be automated (repeatable) or become difficult to maintain during full-collection version syncs.
    - **Provenance:** Harder to declare the definitive source of a font if it exists in multiple collections.

#### Option 2: Official-First
Take fonts from original sources first (primarily the official FIGlet distribution at [ftp://ftp.figlet.org/pub/figlet/fonts/](ftp://ftp.figlet.org/pub/figlet/fonts/)), then add only those fonts from Patorjk and other sources that are not yet in the official distro.

- **Pros:**
    - **Academic Integrity:** Establishes clear provenance for every font.
    - **Canonicality:** We build our own "Authoritative" set based on original sources.
    - **Freedom:** Allows us to implement our own curation, edits, and conventions without being bound by patorjk's decisions.
- **Cons:**
    - **Complexity:** Requires upfront effort to filter duplicates and handle edits that patorjk may have already applied to original fonts.
    - **Manual Effort:** Version updates from sources like Patorjk require manual checking for new fonts or edits.

---

## 3. Current Tendencies & Rationale

Based on our current deliberations, we are leaning towards the following combination:

### **Fostered Data + Official-First Sourcing**

#### Rationale for Fostered Data (Vault)
- **Safety:** From the moment we save the data in our repo, it is safe. We do not rely on third-party sources for the consistency of our project from that point on.
- **Legacy Protection:** The font sources we use are often dated and niche (e.g., figlet.org was last updated ~14 years ago). It is not clear how long these esoteric legacy sources will remain available. Making the data ours protects the project from upstream link-rot or hosting changes.
- **Stability:** We avoid the need to continuously update pipeline scripts to handle unexpected changes in upstream data structures.

#### Rationale for Official-First Sourcing
- **Clarity:** While Patorjk-First would be easier, tracking the fonts to their original sources is a one-time effort. 
- **Scale:** The current font universe (~300-400 fonts) is within a range that can be manually processed in reasonable time. This effort is worth the long-term benefit of providing a definitive collection with clear origins.

---

## 4. Pending Backend Roadmap

The following list will be populated with tasks identified during the [project_refinement_and_roadmap_20260220] grooming track. These items are intended to be implemented within the **Font Data Repository** and will likely be converted into dedicated tracks or tasks within that project's lifecycle.

*(Roadmap items will be added here as the grooming process continues.)*
