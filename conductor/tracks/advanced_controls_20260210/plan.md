# Implementation Plan - Advanced Controls & Font Categorization

## Phase 1: Research & Logic
- [x] Task: Research FIGlet options (width, layouts, multi-line) and document findings.
- [x] Task: Research and prototype the logic for automated font categorization (casing, height).
- [x] Task: Investigate category alignment with existing tools (TAAG, ManyTools).
- [x] Task: Conductor - User Manual Verification 'Phase 1: Research' (Protocol in workflow.md)

## Phase 2: Implementation & UI
- [x] Task: Update `extract-patorjk-assets.js` to automatically derive and include category metadata in `manifest.json`.
- [x] Task: Implement UI filters for font categories (Casing, Size).
- [x] Task: Conductor - User Manual Verification 'Phase 2: UI' (Protocol in workflow.md)

## Phase 3: Refactoring & Technical Debt
- [x] Task: Factor out font categorization logic into a reusable utility (`scripts/utils/font-categorizer.js`).
- [x] Task: Separate library extraction from font extraction (create `extract-patorjk-library.js` and `extract-patorjk-fonts.js`).
- [x] Task: Restructure project to move generated artifacts to root-level `assets/` directory.
- [x] Task: Update `package.json` with granular extraction commands.
- [x] Task: Conductor - User Manual Verification 'Phase 3: Refactoring' (Protocol in workflow.md)