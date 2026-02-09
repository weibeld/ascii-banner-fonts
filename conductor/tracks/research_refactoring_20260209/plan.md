# Implementation Plan - Project Research & Initial Refactoring

## Phase 1: Research
- [x] Task: Create `conductor/research` directory and `general_notes.md` to store findings.
- [x] Task: Research "What is Figlet?" (History, format, usage) and document in `conductor/research/figlet_overview.md`.
- [x] Task: Research the origin and licensing of the fonts currently in the `fonts/` directory (derived from `patorjk/figlet.js`). Document in `conductor/research/font_origins.md`.
- [x] Task: Investigate linked repositories (xero/figlet-fonts, hIMEI29A/FigletFonts) and `figlet.org`. Document relationships in `conductor/research/ecosystem.md`.
- [x] Task: Research "Toilet fonts" and their compatibility with FIGlet. Add findings to `conductor/research/ecosystem.md`.
- [x] Task: Analyze `manytools.org` to infer their font sources and stack. Document in `conductor/research/competitor_analysis.md`.
- [x] Task: Compile a public-facing FAQ based on research findings (`conductor/research/faq.md`).
- [x] Task: Gather stats (font count, stars) for community collections (`xero`, `hIMEI`) and update `conductor/research/ecosystem.md`.
- [x] Task: Deep dive into TOIlet (usage in CLI tools, popularity vs. FIGlet) and update `conductor/research/ecosystem.md`.
- [x] Task: Delete unused `conductor/research/general_notes.md`.
- [x] Task: Gather repo activity (commits, last date) and analyze font overlap vs. `patorjk`. Update `conductor/research/ecosystem.md`.
- [x] Task: Create future tracks for "Additional Font Sources" and "TOIlet Support" in `conductor/tracks.md` and link to research.
- [x] Task: Conductor - User Manual Verification 'Phase 1: Research' (Protocol in workflow.md)

## Phase 2: Refactoring & Architecture
- [x] Task: Create standard directory structure (`src/css`, `src/js`, `public/fonts`, `scripts`).
- [x] Task: Move `download_fonts.py` to `scripts/` and update it to download fonts to `public/fonts`.
- [x] Task: Move `index.html` logic into separate files: `src/css/style.css` and `src/js/app.js`.
- [x] Task: Update `index.html` to link to the new CSS and JS files.
- [x] Task: Ensure `figlet.js` is correctly located (e.g., `src/js/lib/` or `public/js/`) and referenced.
- [x] Task: Verify static rendering works with the new structure by serving the project locally.
- [x] Task: Conductor - User Manual Verification 'Phase 2: Refactoring & Architecture' (Protocol in workflow.md)
