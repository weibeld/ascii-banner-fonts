# Track Specification: Migrate to CI-Based Asset Strategy

## Overview
Transition the project architecture from a "Full Repo-Based" model (Model 1) to a "Full CI-Based" model (Model 2). This shift adopts a "Gold vs. Trash" philosophy, where only human-authored source and version descriptors are tracked, while binary fonts and metadata are treated as ephemeral build artifacts.

## Goals
1. **Source of Truth:** Implement `versions.json` (Version Manifest) as the authoritative record for all external dependency versions.
2. **Decoupled Pipeline:** Create surgical acquisition scripts (e.g., `npm pack` for patorjk fonts) and a standalone analysis script to generate `src/generated/fonts.json` (Fonts Manifest).
3. **Lifecycle Standardisation:** Implement a unified `npm run setup` command to synchronise the local environment with the Version Manifest.
4. **Clean Repository:** Remove all tracked font files and generated metadata from Git, updating `.gitignore` to maintain a lean repository.
5. **Automated Deployment:** Configure CI/CD to perform a clean setup and build before deploying the production artifact to GitHub Pages.

## Impact
- **Repo Health:** Drastically reduced repository size and cleaner Git history.
- **Workflow:** Standardised environment setup for both developers and CI runners.
- **Performance:** Maintained high performance via bundled logic and metadata.