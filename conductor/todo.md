# Project Todo & Technical Debt

This file captures miscellaneous tasks, technical debt, and cleanup items that don't yet warrant their own full track. 

- **Workflow:** When starting a new track, check this list for relevant items.
- **Cleanup Tracks:** Periodically, bundle items from the "Backlog" into a dedicated "Technical Debt / Cleanup" track.

## Backlog

- UI tweaks:
  - Add copy-to-clipboard button to each rendering
  - Add link back to font definition file for each font
  - Add quick switch for switching between dark and light mode
  - Add controls to change text colour (and maybe backround colour)
- Favourite system: allow marking fonts as favourite and later separately view them, either at the top of the page, in a sidebar, etc.
  - No persistent session storage needed (i.e. no user login), maybe storage in cookie (or just URL) for short-term memory
  - Include button for clearing favourites
- Evaluate additional font sources on https://www.figlet.org/ (list of links below "Many fonts are also available:")
  - Evaluate nature of these fonts, overlap with patorjk font collection. Incorporate task into [font_sources_20260209] track
- Pin npm package version in the fetch command (version is probably defined in manifest, if not, must run the "check latest version" command first)

## Done
- Separate JS library extraction from font extraction [advanced_controls_20260210].
- Factor out categorisation logic into a reusable utility [advanced_controls_20260210].
- Rename project to "ASCII Banners" [Project Chore].
- Evaluate font categories (casing, size) [advanced_controls_20260210].
- Evaluate FIGlet options (width, layouts, multi-line) [advanced_controls_20260210].
- Clarify asset sourcing models (Full Repo vs. Full CI) and implement Full Repo-Based architecture [asset_model_clarification_20260209].
- Initialise todo list [asset_sync_20260209].