# Track Specification: Clarify Asset Sourcing Models

## Overview
This track aims to resolve the ambiguity between two distinct models for managing assets sourced from the `figlet` NPM package. It seeks to establish a strict architectural choice between a repository-contained model and a CI-resolved model.

## Goals
1. **Model Definition:** Formally define the "Full Repo-Based" and "Full CI-Based" models in the context of our NPM dependency.
2. **Technical Validation:** Confirm if both models are technically feasible and identify the necessary steps for each.
3. **Strategic Selection:** Choose one model to follow strictly, avoiding the current "mixed" approach.
4. **Documentation Sync:** Update `conductor/research/asset_strategy.md` with the finalized decision and logic.

## Research Questions
1. **Model 1 (Full Repo-Based):** How can we extract and commit both the library logic and fonts to the repo so that `npm install` is never needed at deploy time? What are the implications for version updates?
2. **Model 2 (Full CI-Based):** How do we ensure that font assets are reliably extracted and included in the production bundle during the CI/CD pipeline (e.g., GitHub Actions) without ever being tracked in Git?
3. **Consistency:** Which model better supports the integration of future, non-NPM font sources (e.g., direct GitHub clones)?
