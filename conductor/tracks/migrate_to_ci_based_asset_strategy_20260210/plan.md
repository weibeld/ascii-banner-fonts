# Implementation Plan - Migrate to CI-Based Asset Strategy

## Phase 1: Strategy & Cleanup
- [x] Task: Update `.gitignore` to exclude ephemeral artifacts (`public/fonts/`, `src/generated/`).
- [x] Task: Remove all currently tracked font assets (`public/fonts/*`) and legacy extraction scripts.
- [x] Task: Conductor - User Manual Verification 'Phase 1: Cleanup' (Protocol in workflow.md)

## Phase 2: Pipeline Implementation
- [x] Task: Finalise `versions.json` (Version Manifest) with FIGlet and patorjk pins.
- [x] Task: Implement acquisition scripts (e.g. `scripts/get-patorjk-fonts.js`) using `npm pack`.
- [x] Task: Implement `scripts/generate-font-manifest.js` (targets `src/generated/font.json`).
- [x] Task: Update `package.json` with Lifecycle Management Interface (`setup`, `dev`, `build`, `clean`).
- [x] Task: Conductor - User Manual Verification 'Phase 2: Pipeline' (Protocol in workflow.md)

## Phase 3: Frontend & CI/CD
- [x] Task: Update `src/main.ts` to import the bundled `font.json`.
- [~] Task: Implement `.github/workflows/deploy.yml` for automated GitHub Pages deployment.
- [ ] Task: Implement `.github/workflows/sync_versions.yml` (Dependency Update Workflow).
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Finalisation' (Protocol in workflow.md)
