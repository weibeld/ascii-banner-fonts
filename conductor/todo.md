# Project Todo & Technical Debt

This file captures miscellaneous tasks, technical debt, and cleanup items that don't yet warrant their own full track. 

- **Workflow:** When starting a new track, check this list for relevant items.
- **Cleanup Tracks:** Periodically, bundle items from the "Backlog" into a dedicated "Technical Debt / Cleanup" track.

## Backlog

- Rename project to "ASCII Banners"
- Evaluate font categories:
  - Investigate what categories are used on https://manytools.org/hacker-tools/ascii-banner/ and https://patorjk.com/software/taag/ (the latter is a tool by the patorjk/figlet.js author
  - Investigate whether these categories are defined somewhere in the data or metadata (i.e. in https://github.com/patorjk/figlet.js). If not, how do these tools determine which font is in which category
  - Evaluate additional (maybe more useful) categories that should be able to be derived from the data (i.e. by looking at the font files):
    1. Casing (Lower-case only, upper-case only, double case): identify fonts that can print only lower-case, only upper-case, or both cases. They way this could probably be done is by looking at the font file and comparing the entries corresponding to the upper and lower case versions of a character (e.g. ASCII 0x41 and 0x61 for "A" and "a", respectively) and check whether they differ. If yes, the font is likely double case, if no, then it is either lower-case only or upper-case only (we still don't know which one, though)
   2. Size: consider defining categories (e.g. small, medium, larged) based on height or width of the characters
- Evaluate FIGlet options 
  - Investigate the available FIGlet options as described in https://github.com/patorjk/figlet.js?tab=readme-ov-file#options and if and how we could use them in our app (and whether it makes sense at all)
  - Implementation of options in web tool: https://patorjk.com/software/taag/#p=moreopts
  - Read through rest of https://github.com/patorjk/figlet.js/blob/main/README.md to see if there is anything more that might be relevant to our project
- Investigate multi-line strategy
  - Should we allow multiple lines per banner (https://manytools.org/hacker-tools/ascii-banner/ and https://patorjk.com/software/taag both do)?
  - If so, UI must be updated accordingly
  - Check what FIGlet options (https://github.com/patorjk/figlet.js?tab=readme-ov-file#options) are relevant to this and how it could be incorporated in our app (in particular investigate options like `width`, `whitespaceBreak`, and `verticalLayout`

## Done
- Clarify asset sourcing models (Full Repo vs. Full CI) and implement Full Repo-Based architecture [asset_model_clarification_20260209].
- Initialise todo list [asset_sync_20260209].
