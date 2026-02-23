# Project Todo & Technical Debt

This file captures miscellaneous tasks, technical debt, and cleanup items that don't yet warrant their own full track. 

- **Workflow:** When starting a new track, check this list for relevant items.
- **Cleanup Tracks:** Periodically, bundle items from the "Backlog" into a dedicated "Technical Debt / Cleanup" track.

## Backlog

## Done
- Evaluated and rejected the 'Research Archive' strategy. Obsolete research documents are now deleted rather than moved to an archive directory to minimise workspace noise (especially for coding agents), avoid "dead" file clutter, and maintain a clear single source of truth. Git history serves as the primary archive for recovery if needed. (Original todo item: "Create research archive into which research documents can be moved when they become obsolete, e.g. after a major architectural change. Requires evaluation each time whether it makes sense to evolve a research doc or just move it to the archive and start with a new one.")
- Pin npm package version in the fetch command [migrate_to_ci_based_asset_strategy_20260210]
- Separate JS library extraction from font extraction [advanced_controls_20260210].
- Factor out categorisation logic into a reusable utility [advanced_controls_20260210].
- Rename project to "ASCII Banners" [Project Chore].
- Evaluate font categories (casing, size) [advanced_controls_20260210].
- Evaluate FIGlet options (width, layouts, multi-line) [advanced_controls_20260210].
- Clarify asset sourcing models (Full Repo vs. Full CI) and implement Full Repo-Based architecture [asset_model_clarification_20260209].
- Initialise todo list [asset_sync_20260209].
