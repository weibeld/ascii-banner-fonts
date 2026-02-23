# Font Data Backend: Strategy & Launch Pad

This document serves as the authoritative definition and planning resource for the **Font Data Repository**. It acts as a "Launch Pad" for initialising the new project and will eventually be migrated to that repository. All information contained here represents the current state of research and strategy deliberations; final implementation details will be formalised within dedicated tracks in the new repository.

## 1. Vision & Role
The **Font Data Repository** is intended to be a general-purpose repository and registry of FIGlet fonts. It is a specialised, standalone backend responsible for the curation, analysis, and versioned distribution of ASCII typography.

- **Outcome:** Acts as a high-integrity source of truth that can drive a multitude of presentation applications in the ASCII ecosystem.
- **Consumer:** Drives the **ASCII Banners Application** and any other frontend project.

---

## 2. Data Accumulation Strategy

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

## 3. Data Sourcing Strategy

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

## 4. Data Auditability
The high-level goal of this system is to ensure **100% Data Auditability**. Every font in our repository must be traceable back to its original source through every transformation (import, rename, patch, or exclusion) that has occurred.

### Historical Sequential Imports
The acquisition of data is treated as an append-only sequence of historical events. We do not perform a single "bulk sync"; instead, we perform a series of discrete "Imports". Each import focuses on a single source version and meticulously accounts for every file found in that source.

### The Bi-Directional Ledger
To maintain auditability, each import generates a machine-readable Ledger (e.g., in JSON format).
- **Forward Audit (Source -> Vault):** For every file in the import source, the ledger records exactly what happened to it (e.g., "Taken 1-to-1", "Edited", "Renamed", or "Skipped"). If a file is skipped (e.g., a duplicate or a non-font mapping), the reason is explicitly documented.
- **Reverse Audit (Vault -> Source):** Every font in our collection is assigned a unique, immutable ID. By querying the sequence of ledgers for this ID, we can reconstruct the font's entire biography: its point of origin, the import event that brought it in, and any subsequent edits applied to it.

### Reconciliation & "Inspiration" Edits
This system simplifies the handling of duplicates. If an import contains a font we already possess, we record it as "Skipped (Duplicate)". However, if the new source contains a bug fix for that font, we do not switch sources. Instead, we apply the fix to our existing "Gold" copy and record a "Patch" action in our font's biography, noting that the fix was "Inspired by" the recent import.

### Open Questions
- **Import Directory Structure:** Should each import be stored in its own dedicated directory? What are the naming conventions and what specific content (besides fonts) should be included?
- **Source Data Persistence:** Should the full original source data be committed to the repository? If so, should it be stored in its expanded form for easy diffing or as a compressed archive (ZIP) to keep the repository lean?
- **Ledger Storage Strategy:** Should we use a single, monolithic ledger for all items across all imports, or a separate ledger file for each individual import event?
- **Ledger Schema:** What is the exact technical structure of the JSON ledger? What are the required fields, field names, and nesting rules?

---

## 5. Import & Curation Tool
To facilitate the execution of the sequential import process, a specialized **Import & Curation Tool** will be developed. This utility acts as the operational interface for the Font Data vault, balancing high-performance automation with critical human oversight.

### Core Objectives
- **Visual Preview:** Feature a rendering interface (similar to the ASCII Banner frontend) to allow the operator to visually inspect each font in the source collection before making a decision.
- **Duplicate & Edit Detection:** Use file hashing (e.g., MD5 or SHA-256) to automatically identify fonts that are identical to existing entries in the vault. If a font name matches but the hash differs, the tool should highlight the differences to assist in identifying "inspired edits". The detection of duplicates (including edited re-imports) happens in the same way regardless of the source.
- **Smart Naming:** Automatically suggest Title Case target names for fonts sourced from lower-case or kebab-case filenames (common in the `figlet.org` distribution).
- **Ledger Automation:** Automatically generate the machine-readable Import Ledger entries for each file based on the reconciliation results.
- **Human-in-the-Loop Control:** While the tool automates detection and suggestions, the operator retains final authority over every action (Import, Skip, Patch, or Rename), ensuring the integrity of the "Vault".
- **Identity Maintenance:** The tool is responsible for creating and updating the **Identity Registry** (`id.json`) whenever a font is imported, renamed, or moved. This file communicates the essential identity info (name and ID) determined during the import to the analysis pipeline.

### Open Questions
- **ID Format:** What should be the format of the immutable font IDs? Options include UUIDs for guaranteed uniqueness or descriptive IDs (e.g. based on the initial filename).

---

## 6. Identity Registry
To bridge the communication between the Import and Analysis pipelines, a stable **Identity Registry** is maintained. This file is the way that the name, ID, and path (determined in the import pipeline) are communicated to the analysis pipeline, which otherwise only sees files on disk.

- **File:** `id.json`
- **Structure:** A JSON array of objects or a map. Preliminary structure for an entry: `{"id": "...", "name": "...", "path": "..."}`.
- **Role:** Acts as the permanent index of the "Vault," mapping stable internal IDs to current user-facing display names and technical file paths.
- **Usage:** The Import Tool updates this registry when a font is added, renamed, or moved. The Analysis Utility reads this registry to find out the font name and ID corresponding to a file on disk.

---

## 7. Data Normalisation
To ensure internal consistency across the "Vault," a standalone **Normalisation Utility** is integrated into the import pipeline.

### Normalisation Rules
The following rules define the technical standardisations applied to every font file in the vault:
- **Line Endings:** Convert all line endings to Unix (LF).

### Workflow & Policy
- **Workflow:** `Import Tool` $\rightarrow$ `Normalisation Utility` $\rightarrow$ `[File System]` $\rightarrow$ `Font Analysis Utility`.
- **Ledger Policy:** Since normalisation only affects the internal storage format and has no impact on font meaning or presentation, these actions are **not recorded** in the Import Ledger.
- **Structural Integrity:** Standardising character-level whitespace (stripping empty rows/columns) was considered but discarded to maintain the integrity of the original authors' designs; visual noise reduction will instead be handled via UI logic.

---

## 8. Font Analysis & Metadata Extraction
The technical analysis of font files (e.g., extracting height, character support, and casing) is implemented as a standalone module or package.

### Workflow
The analysis logic acts as a one-way pipeline triggered by the presence of new or edited font files in the repository. For each file found on disk, it looks up the corresponding `id` and `name` from the **Identity Registry** (`id.json`) based on the file name on disk. It then performs a suite of technical analyses on these files and writes the results directly to the user-facing **Font Registry** file.

### Extracted Metadata
The following info is extracted and saved in the user-facing font registry file:
- `id`: Looked up in Identity Registry based on the relative path.
- `name`: Looked up in Identity Registry based on the relative path.
- `path`: The relative path to the font file, detected from disk.
- `height`: The total line height of each character, extracted from the FIGfont header.
- `baseline`: The distance from the top of the character to the baseline, extracted from the FIGfont header.
- `two-case`: Boolean (true/false) indicating if the font supports both upper and lower case. Determined by analysing the character definitions.
- `ascii`: Boolean (true/false) indicating if the font uses purely ASCII characters (32-126) in its output mappings. If false, the font uses characters outside this range (e.g., ANSI block characters or international glyphs). This determines if the font can be rendered in a pure ASCII-only environment.
- `chars`: The number of unique, non-empty character drawings defined in the font file (count identical characters, such as for the upper-case and lower-case input character in some single-case font as a single character, consider implementing by the means of hashes and sets)

### Open Questions
- **Implementation Interface:** Should the analysis module be primarily a standalone command-line tool, or a package that is designed to be invoked programmatically as code?
- **Analysis Scope:** Do we run the analysis on ALL files every time or do we have some logic that detects which files need to be updated and re-analysed?

### Discarded Alternative: Integrated Tooling
The option to incorporate analysis logic directly into the Import Tool was rejected. Maintaining it as a standalone module ensures that the analysis suite can be invoked independently (e.g., for vault-wide re-analysis after adding a new metadata feature) without requiring a data import event.

---

## 9. CRUD Strategy
From a developer/backend perspective, the maintenance of the font vault data follows a well-defined CRUD pattern, primarily driven by the Import Tool as the single entry point for changes.

- **Create (C):** Performed through standard imports of font collections via the **Import & Curation Tool**.
- **Read (R):** Handled through public consumption of the repository and individual font files by consumers.
- **Update (U):** Managed through regular imports. To apply a fix or patch, the font file is edited offline and then re-processed through the **Import Tool**. The tool's standard duplicate-detection logic identifies the existing font and records the action as a "Patch" in the font's biography.
- **Delete (D):** TBD: not yet implemented, deliberately left as a future implementation task

---

## 10. Data Curation Guidelines

*Note: The policies in this section will likely be incorporated into the **Import & Curation Tool** section since this component is responsible for these policies.*

### Font Naming

The following guidelines govern the standardisation of font display names within the vault. These rules are to be applied during the reconciliation phase of an import.

- **Numeral Spacing:** Always ensure a space exists between the main font name and any trailing numerals (e.g., `Banner3` becomes `Banner 3`).
- **Modifier Positioning:** Modifiers such as "Small", "Big", or "Mini" should be moved to the end of the name (e.g., `Small FooBar` becomes `FooBar Small`). This ensures that related fonts are grouped together in lexical order.

### Filename Policy
Vault files should follow standard Unix-friendly naming conventions to facilitate command-line handling.

- **Goal:** Avoid upper-case characters, spaces, and other special characters in file names
- **Proposed Policy:** Use display name converted to kebab-case as the file name.

### International Fonts
To manage project complexity during the initial build phase, international fonts (specifically those requiring "Sacrifice" or "Code-Tagged" translation layers) are **deliberately excluded** from the current scope.
- **Policy:** Exclude fonts from the [`international/`](ftp://ftp.figlet.org/pub/figlet/fonts/international) folder in the official ftp.figlet.org font collection
- **Future Support:** These fonts will be integrated in a future project phase, potentially following the "Unicode Restoration" strategy documented in the **[International Fonts Research](./international_fonts.md)**.

---

## 11. Miscellaneous

- **Pending Curation Data:** Some preliminary curation has been done on the patorjk collection (including proposed exclusions, renamings, and fixes), the results of which are currently safeguarded in the structured `pending_font_curation.json` file. One of the first tracks in the new backend repository will be to formally process this data holder into the first set of Import Ledgers within the new system.

---

## Appendix: Original Message for Data Auditability 

> So, regarding the auditing, importing and provenance system: I'm just drawing a picture of a system here that we can further discuss.
>
> The acquisition of the data happens sequentially (historically) as an append-only sequence of imports. Each import has such a ledger with an entry for every item in the import source. So, every item in the import source is accounted for (i.e. we can answer the question "what happed to this item from the source?"). For the back direction (i.e. answering the question "where does this item in our collection come from?"), we could use a unique and immutable ID for each font in our collection, and then simply query the ledgers for this ID. This should work because everything in our collection must have gotten there through an import, and every item in an import has an entry in a ledger (as mentinoned above). So, for example, given a font from an input source, we can find a ledger entry for it. If we didn't include the font in our collection, it simply has a ledger entry saying that it's skipped and why, but no ID, no corresponding file and entry in our collection. If we included it in our collection, the ledger entry says so and has an ID which clearly identifies the corresponding font in our collection that it belongs to. If we additionally did any edits to the font (at any point in time), this information is also contained in the ledger's audit trail for this font. On the other hand, if we take any font in our collection and want to know its history, we query the ledgers for the font's ID and we should find all the information, i.e. the original import in which the font was included, any edits done to it, etc. (Note that an ID query might return multiple entries from different imports if e.g. a font has been included in a the ftp.figlet.org import and then during the patorjk import it's discovered that we already imported this font in the ftp.figlet.org import, so we mark this font as 'skipped' in the ledger, but mention the reason that it's a duplicate already imported from ftp.figlet.org in the course of which we could also include the ID of the target font which would point to this original import ledger entry).
> 
> Regarding the import process over time: couldn't this system also solve the initial complexity for identifying original sources, duplicates, and edited duplicates in the import sources (I was first thinking that we need to create diffs e.g. between patorjk and ftp.figlet.org including "fonts only in patorjk but not in figlet.org", "fonts only in figlet.org but not in patorjk" and "fonts in both patorjk and figlet.org" and furthermore complicated by edits to figlet.org fonts done by patorjk, requiring something like "fonts in both patorjk and figlet.org but edited in patorjk" which would need to be subtracted from the "fonts in both patorjk and figlet.org" set - in short, it becomes quite complicated quickly)?. So, now we could do the entire import process in a strictly sequential and naive way. We could start with ftp.figlet.org (since it's our highest priority, most original source) and naively import everything we want from there (recording everything in our ledgers), and conclude this import. Then we treat patorjk as a fresh new import on top of what we already have in the repo. We go through all the patorjk fonts and for each one (always recording what we do in the ledger) either we import it as is (because we don't have it yet in the collection), we skip it because we have the exact same font already (from ftp.figlet.org) or we discover that this is the same font as one that we already have, but patorjk applied an edit to it. In that case we could decide to apply the same edit to the font we already have in our collection (note: we don't take patorjk's version 1-to-1, we just make the same changes in our own version), and we would also record this edit in the audit trail of the ledger entry for this font (note that this is the audit trail that traces back to the original ftp.figlet.org import, not the patorjk import, even though the inspiration for the edit came from the patorjk import - because we always only build on top of the current source of truth). We would in that case still note in the ledger entry for the patorjk version of the font that we skipped it and why and maybe that we still applied the edits to our source-of-truth font, including the ID of this font in our collection.
> 
> And in the same way we would proceed for all further import sources, such as xero/figlet-fonts, etc. Now if e.g. a source such as patorjk adds a new font, we could then even treat this single font as a new import, including its corresponding ledger entry, etc. If patorjk publishes an edit to a font that we already have in our collection, then we could just apply this edit on our own to the version of the font that we already have (whatever its origin) and record this edit in the audit trail of the ledger entry of this font.

## Appendix: Original Message for CRUD Strategy 

> Before proceeding with the next task, I have something that i just would like to get off my mind.
> 
> First, if we have this import & curation tool to do the imports, we will probably also do the font analysis (i.e. extracting metadata, etc) in this process. So should this be part of the import tool? Or could it be a separate implementation that is invoked by the import tool?
> 
> Second, if we have fonts that we want to edit before importing, do we also need an editing function in the import tool, or a separate editing tool (would need to create the appropriate ledger entries, etc.)? Or, the second option that i was thinking about, import fonts always as-is and, if necessary, do the editing completely off-the-loop (e.g. edit in any way and come back with an edited version of the font file) and then import the edited fonts as a completely new import (the import tool will detect that we have this font already and propose/user can select that this font be an edit to this specific existing font, thus ledger entries are created in the normal course of an import)?
> 
> I think what both of these points come down to is, how do we handle edits to existing fonts in the repo? When we talked about this before, we just said "we apply the edits to the existing font file and then create the appropriate ledger entries". However, we didn't specify how this is implemented, i.e. do we make edits to the font file directly in the repo and commit, and then manually create a ledger entry? We don't to edit these ledger JSON files manually, as for the imports we also have an import tool doing this. So then, what process would do these edits, which may occur outside of what we usually consider an "import" (e.g. patorjk publishes an new fix for a single font).So i think this is what this attempts to solve. If for the real imports we have a tool tha we can fire up and that guides as through the process and handles everything in the auditing backend, we  would need the same for what we consider "edits", that is, we would need to implement this functionality either in the import tool or in a separate tool. Except for the option where we have *only* pure imports and we treat edits to existing fonts as new imports, handled in the usual way by the import tool.
> 
> Basically also enabling CRUD on our data through well-defined tools.
