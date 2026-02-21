# Font Data Backend: Strategy & Launch Pad

This document serves as the authoritative definition and planning resource for the **Font Data Repository**. It acts as a "Launch Pad" for initialising the new project and will eventually be migrated to that repository. All information contained here represents the current state of research and strategy deliberations; final implementation details will be formalised within dedicated tracks in the new repository.

## 1. Vision & Role
The **Font Data Repository** is intended to be a general-purpose repository and registry of FIGlet fonts. It is a specialised, standalone backend responsible for the curation, analysis, and versioned distribution of ASCII typography.

- **Outcome:** Acts as a high-integrity source of truth that can drive a multitude of presentation applications in the ASCII ecosystem.
- **Consumer:** Drives the **ASCII Banners Application** and any other frontend project.

---

## 2. Data Maintenance Strategy

### Option 1: Fostered Data (The "Vault" Model)
In this model, the repository commits the actual `.flf` font files. The data stored in the repo is the definitive source of truth.

- **Pros:**
    - **Total Control:** Enables high-touch curation, manual bug fixes, and precise renaming.
    - **Simplicity:** No complex dependency on third-party uptime or package manager stability at build time.
    - **History:** Every edit to a font is tracked in the Git history.
- **Cons:**
    - **Manual Sync:** Upstream updates must be manually reviewed and merged into the vault.

### Option 2: Repeatable Pipeline (The "Recipe" Model)
In this model, fonts are still stored in the repository, but the entire content could at any time be overwritten or regenerated from original sources through automated scripts.

- **Pros:**
    - **Automaticity:** Theoretically easier to stay in sync with latest upstream releases.
- **Cons:**
    - **Brittleness:** Applying complex edits or fixes to font files via scripts is difficult and error-prone.
    - **Fragility:** Upstream data may change in unexpected ways, requiring continuous updates to the pipeline scripts.

### Current Tendency & Rationale: Fostered Data
We strongly lean towards the **Vault** model for the following reasons:
- **Safety:** From the moment we save the data in our repo, it is safe. We do not rely on third-party sources for the consistency of our project from that point on.
- **Legacy Protection:** The font sources we use are often dated and niche (e.g., figlet.org was last updated ~14 years ago). It is not clear how long these esoteric legacy sources will remain available. Making the data ours protects the project from upstream link-rot or hosting provider changes.
- **Stability:** We avoid the need to continuously update pipeline scripts to handle unexpected changes in upstream data structures.

---

## 3. Data Source Strategy

### Option 1: Patorjk-First
Take everything from the [patorjk/figlet.js](https://github.com/patorjk/figlet.js) collection (the most popular modern collection) and add additional fonts from other sources (official FIGlet distro, xero/figlet-fonts, etc.).

- **Pros:**
    - **Standardisation:** Aligns with almost every modern FIGlet tool on the web (TAAG, Manytools, etc.).
    - **Efficiency:** Provides a massive, ready-to-use dataset immediately.
    - **Automatic Sync:** Enables automatic synchronisation with all new patorjk versions.
- **Cons:**
    - **Curation Difficulty:** Manual edits (exclusions, renaming) must either be automated or they make patorjk version syncs significantly more complex.
    - **Provenance:** Harder to declare the definitive source of a font if it exists in multiple collections.

### Option 2: Official-First
Take fonts from original sources first (primarily the official FIGlet distribution at [ftp://ftp.figlet.org/pub/figlet/fonts/](ftp://ftp.figlet.org/pub/figlet/fonts/)), then add only those fonts from Patorjk and other sources that are not yet in the official distro.

- **Pros:**
    - **Academic Integrity:** Establishes clear provenance for every font.
    - **Canonicality:** We build our own "Authoritative" set based on original sources.
    - **Freedom:** Allows us to implement our own curation, edits, and conventions without being bound by patorjk's decisions.
- **Cons:**
    - **Complexity:** Requires upfront effort to filter duplicates and decide whether to incorporate edits patorjk may have already applied to original fonts.
    - **Manual Effort:** Upstream updates require manual checking for new fonts or edits.

### Current Tendency & Rationale: Official-First
We prefer the **Official-First** approach because:
- **Clarity:** While Patorjk-First would be easier, tracking the fonts to their original sources is a one-time effort. 
- **Scale:** The current font universe (~300-400 fonts) is within a range that can be manually processed in reasonable time. This effort is worth the long-term benefit of providing a definitive collection with clear origins.

---

## 4. Data Import & Auditing System
The high-level goal of this system is to ensure **100% Data Auditability**. Every font in our repository must be traceable back to its original source through every transformation (import, rename, patch, or exclusion) that has occurred.

### Historical Sequential Imports
The acquisition of data is treated as an append-only sequence of historical events. We do not perform a single "bulk sync"; instead, we perform a series of discrete "Imports". Each import focuses on a single source version and meticulously accounts for every file found in that source.

### The Bi-Directional Ledger
To maintain auditability, each import generates a machine-readable Ledger (e.g., in JSON format).
- **Forward Audit (Source -> Vault):** For every file in the import source, the ledger records exactly what happened to it (e.g., "Taken 1-to-1", "Edited", "Renamed", or "Skipped"). If a file is skipped (e.g., a duplicate or a non-font mapping), the reason is explicitly documented.
- **Reverse Audit (Vault -> Source):** Every font in our collection is assigned a unique, immutable ID. By querying the sequence of ledgers for this ID, we can reconstruct the font's entire biography: its point of origin, the import event that brought it in, and any subsequent edits applied to it.

### Reconciliation & "Inspiration" Edits
This system simplifies the handling of duplicates. If an import contains a font we already possess, we record it as "Skipped (Duplicate)". However, if the new source contains a bug fix for that font, we do not switch sources. Instead, we apply the fix to our existing "Gold" copy and record a "Patch" action in our font's biography, noting that the fix was "Inspired by" the recent import.

### Pending Initial Curation Integration
The preliminary curation identified during the initial project grooming (including candidate exclusions, renames, and fixes) is currently safeguarded in the structured `pending_font_curation.json` file. One of the first tracks in the new backend repository will be to formally process this data holder into the first set of Import Ledgers within the new system.

### Open Questions
- **Import Directory Structure:** Should each import be stored in its own dedicated directory? What are the naming conventions and what specific content (besides fonts) should be included?
- **Source Data Persistence:** Should the full original source data be committed to the repository? If so, should it be stored in its expanded form for easy diffing or as a compressed archive (ZIP) to keep the repository lean?
- **Ledger Storage Strategy:** Should we use a single, monolithic ledger for all items across all imports, or a separate ledger file for each individual import event?
- **Ledger Schema:** What is the exact technical structure of the JSON ledger? What are the required fields, field names, and nesting rules?
- **Font ID Logic:** What should serve as the unique, immutable ID for a font? Using the font name or filename prevents future renaming. Should the ID be entirely independent of both name and filename (likely the most robust approach)?

---

## 5. Import & Curation Tool
To facilitate the execution of the sequential import process, a specialized **Import & Curation Tool** will be developed. This utility acts as the operational interface for the Font Data vault, balancing high-performance automation with critical human oversight.

### Core Objectives
- **Visual Preview:** Feature a rendering interface (similar to the ASCII Banner frontend) to allow the operator to visually inspect each font in the source collection before making a decision.
- **Duplicate & Edit Detection:** Use file hashing (e.g., MD5 or SHA-256) to automatically identify fonts that are identical to existing entries in the vault. If a font name matches but the hash differs, the tool should highlight the differences to assist in identifying "inspired edits".
- **Smart Naming:** Automatically suggest Title Case target names for fonts sourced from lower-case or kebab-case filenames (common in the `figlet.org` distribution).
- **Ledger Automation:** Automatically generate the machine-readable Import Ledger entries for each file based on the reconciliation results.
- **Human-in-the-Loop Control:** While the tool automates detection and suggestions, the operator retains final authority over every action (Import, Skip, Patch, or Rename), ensuring the integrity of the "Vault".

---

## 6. Data Curation Guidelines

### Font Naming

The following guidelines govern the standardisation of font names within the vault. These rules are to be applied during the reconciliation phase of an import.

- **Numeral Spacing:** Always ensure a space exists between the main font name and any trailing numerals (e.g., `Banner3` becomes `Banner 3`).
- **Modifier Positioning:** Modifiers such as "Small", "Big", or "Mini" should be moved to the end of the name (e.g., `Small Standard` becomes `Standard Small`). This ensures that related fonts are grouped together in lexical order.

---

## Appendix: Import & Auditing System Original Message

> So, regarding the auditing, importing and provenance system: I'm just drawing a picture of a system here that we can further discuss.
>
> The acquisition of the data happens sequentially (historically) as an append-only sequence of imports. Each import has such a ledger with an entry for every item in the import source. So, every item in the import source is accounted for (i.e. we can answer the question "what happed to this item from the source?"). For the back direction (i.e. answering the question "where does this item in our collection come from?"), we could use a unique and immutable ID for each font in our collection, and then simply query the ledgers for this ID. This should work because everything in our collection must have gotten there through an import, and every item in an import has an entry in a ledger (as mentinoned above). So, for example, given a font from an input source, we can find a ledger entry for it. If we didn't include the font in our collection, it simply has a ledger entry saying that it's skipped and why, but no ID, no corresponding file and entry in our collection. If we included it in our collection, the ledger entry says so and has an ID which clearly identifies the corresponding font in our collection that it belongs to. If we additionally did any edits to the font (at any point in time), this information is also contained in the ledger's audit trail for this font. On the other hand, if we take any font in our collection and want to know its history, we query the ledgers for the font's ID and we should find all the information, i.e. the original import in which the font was included, any edits done to it, etc. (Note that an ID query might return multiple entries from different imports if e.g. a font has been included in a the ftp.figlet.org import and then during the patorjk import it's discovered that we already imported this font in the ftp.figlet.org import, so we mark this font as 'skipped' in the ledger, but mention the reason that it's a duplicate already imported from ftp.figlet.org in the course of which we could also include the ID of the target font which would point to this original import ledger entry).
> 
> Regarding the import process over time: couldn't this system also solve the initial complexity for identifying original sources, duplicates, and edited duplicates in the import sources (I was first thinking that we need to create diffs e.g. between patorjk and ftp.figlet.org including "fonts only in patorjk but not in figlet.org", "fonts only in figlet.org but not in patorjk" and "fonts in both patorjk and figlet.org" and furthermore complicated by edits to figlet.org fonts done by patorjk, requiring something like "fonts in both patorjk and figlet.org but edited in patorjk" which would need to be subtracted from the "fonts in both patorjk and figlet.org" set - in short, it becomes quite complicated quickly)?. So, now we could do the entire import process in a strictly sequential and naive way. We could start with ftp.figlet.org (since it's our highest priority, most original source) and naively import everything we want from there (recording everything in our ledgers), and conclude this import. Then we treat patorjk as a fresh new import on top of what we already have in the repo. We go through all the patorjk fonts and for each one (always recording what we do in the ledger) either we import it as is (because we don't have it yet in the collection), we skip it because we have the exact same font already (from ftp.figlet.org) or we discover that this is the same font as one that we already have, but patorjk applied an edit to it. In that case we could decide to apply the same edit to the font we already have in our collection (note: we don't take patorjk's version 1-to-1, we just make the same changes in our own version), and we would also record this edit in the audit trail of the ledger entry for this font (note that this is the audit trail that traces back to the original ftp.figlet.org import, not the patorjk import, even though the inspiration for the edit came from the patorjk import - because we always only build on top of the current source of truth). We would in that case still note in the ledger entry for the patorjk version of the font that we skipped it and why and maybe that we still applied the edits to our source-of-truth font, including the ID of this font in our collection.
> 
> And in the same way we would proceed for all further import sources, such as xero/figlet-fonts, etc. Now if e.g. a source such as patorjk adds a new font, we could then even treat this single font as a new import, including its corresponding ledger entry, etc. If patorjk publishes an edit to a font that we already have in our collection, then we could just apply this edit on our own to the version of the font that we already have (whatever its origin) and record this edit in the audit trail of the ledger entry of this font.
