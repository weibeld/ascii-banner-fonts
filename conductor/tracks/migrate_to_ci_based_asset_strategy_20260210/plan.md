# Implementation Plan - Migrate to CI-Based Asset Strategy

## Phase 1: Strategy & Cleanup
- [ ] Task: Update `.gitignore` to exclude ephemeral artifacts (`public/fonts/`, `src/generated/`).
- [ ] Task: Remove all currently tracked font assets (`public/fonts/*`) and legacy extraction scripts.
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Cleanup' (Protocol in workflow.md)

## Phase 2: Pipeline Implementation
- [ ] Task: Finalise `versions.json` (Version Manifest) with FIGlet and patorjk pins.
- [ ] Task: Implement acquisition scripts (e.g. `scripts/fetch-fonts-patorjk.js`) using `npm pack`.
- [ ] Task: Implement `scripts/generate-fonts-manifest.js` (targets `src/generated/fonts.json`).
- [ ] Task: Update `package.json` with Lifecycle Management Interface (`setup`, `dev`, `build`, `clean`).
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Pipeline' (Protocol in workflow.md)

## Phase 3: Frontend & CI/CD
- [ ] Task: Update `src/main.ts` to import the bundled `fonts.json`.
- [ ] Task: Implement `.github/workflows/deploy.yml` for automated GitHub Pages deployment.
- [ ] Task: Implement `.github/workflows/sync_versions.yml` (Dependency Update Workflow).
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Finalisation' (Protocol in workflow.md)
