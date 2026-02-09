# Implementation Plan - Implement Asset Synchronization & UI Version Display

## Phase 1: Modern Stack Migration (Vite + TS)
- [x] Task: Clean Slate - Delete existing assets and scripts.
- [x] Task: Initialize Vite + TypeScript project (`package.json`, `tsconfig.json`, `vite.config.ts`).
- [x] Task: Create `scripts/copy-fonts.js` to sync fonts from `node_modules` to `public/fonts` and generate manifest.
- [x] Task: Migrate `src/js/app.js` to `src/main.ts` and update `index.html`.
- [x] Task: Conductor - User Manual Verification 'Phase 1: Migration' (Protocol in workflow.md)

## Phase 2: Automation & UI
- [x] Task: Create GitHub Action to run `npm update figlet` and open PR if new version exists.
- [x] Task: Update UI to display the current version (read from `package.json` or manifest).
- [x] Task: Conductor - User Manual Verification 'Phase 2: Automation & UI' (Protocol in workflow.md)
