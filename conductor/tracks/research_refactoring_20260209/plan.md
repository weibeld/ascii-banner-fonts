# Implementation Plan - Project Research & Initial Refactoring

## Phase 1: Research
- [ ] Task: Create `conductor/research` directory and `general_notes.md` to store findings.
- [ ] Task: Research "What is Figlet?" (History, format, usage) and document in `conductor/research/figlet_overview.md`.
- [ ] Task: Research the origin and licensing of the fonts currently in the `fonts/` directory (derived from `patorjk/figlet.js`). Document in `conductor/research/font_origins.md`.
- [ ] Task: Investigate linked repositories (xero/figlet-fonts, hIMEI29A/FigletFonts) and `figlet.org`. Document relationships in `conductor/research/ecosystem.md`.
- [ ] Task: Research "Toilet fonts" and their compatibility with FIGlet. Add findings to `conductor/research/ecosystem.md`.
- [ ] Task: Analyze `manytools.org` to infer their font sources and stack. Document in `conductor/research/competitor_analysis.md`.
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Research' (Protocol in workflow.md)

## Phase 2: Refactoring & Architecture
- [ ] Task: Create standard directory structure (`src/css`, `src/js`, `public/fonts`, `scripts`).
- [ ] Task: Move `download_fonts.py` to `scripts/` and update it to download fonts to `public/fonts`.
- [ ] Task: Move `index.html` logic into separate files: `src/css/style.css` and `src/js/app.js`.
- [ ] Task: Update `index.html` to link to the new CSS and JS files.
- [ ] Task: Ensure `figlet.js` is correctly located (e.g., `src/js/lib/` or `public/js/`) and referenced.
- [ ] Task: Verify static rendering works with the new structure by serving the project locally.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Refactoring & Architecture' (Protocol in workflow.md)
