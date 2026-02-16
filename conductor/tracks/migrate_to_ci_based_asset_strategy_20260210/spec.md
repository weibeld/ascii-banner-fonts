# Track Specification: Migrate to CI-Based Asset Strategy

## Overview
Transition the project architecture from a "Full Repo-Based" model (Model 1) to a "Full CI-Based" model (Model 2). This shift adopts a "Gold vs. Trash" philosophy, where only human-authored source and the Version Manifest are tracked, while binary fonts and metadata are treated as ephemeral build artifacts.

## Goals
1. **Source of Truth:** Implement `versions.json` (Version Manifest) as the authoritative record for all external dependency versions (FIGlet Library and Font Collections).
2. **Decoupled Pipeline:** Implement surgical acquisition scripts (e.g., `npm pack` for patorjk fonts) and a standalone analysis script to generate `src/generated/fonts.json` (Fonts Manifest).
3. **Lifecycle Management:** Standardise the project lifecycle around a unified `npm run setup` command that initialises all assets and synchronises the environment with the Version Manifest.
4. **Clean Repository:** Remove all tracked font files and generated metadata from Git, ensuring the repository remains lean and focused on "Gold" source.
5. **Automated Deployment:** Configure a GitHub Actions CI/CD pipeline to perform a clean `npm run setup` and `npm run build` before deploying to GitHub Pages.

## Core Components
- **Component 1:** FIGlet Library (Code, bundled).
- **Component 2:** Font Collections (Assets, served via URL).
- **Component 3:** Font Manifest (Metadata, bundled).
- **Component 4:** Version Manifest (Gold Config, tracked).

## Impact
- **Repo Health:** Drastically reduced repository size and cleaner Git history.
- **Workflow:** Consistent environment setup for both developers and CI runners via `npm run setup`.
- **Performance:** Maintained high performance via bundled logic and metadata.
