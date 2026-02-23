# Project Todo & Technical Debt

This file captures miscellaneous tasks, technical debt, and cleanup items that don't yet warrant their own full track. 

- **Workflow:** When starting a new track, check this list for relevant items.
- **Cleanup Tracks:** Periodically, bundle items from the "Backlog" into a dedicated "Technical Debt / Cleanup" track.

## Backlog

- Additional FIGlet font collections:
  - https://github.com/cmatsuoka/figlet-fonts: seems to include the fonts of the official FIGlet distro on the FTP server and much more, including large numbers of converted Commodore 64 fonts, converted BDF bitmap fonts, UNIX 'banner' command fonts. It also includes the common TOIlet fonts, and seems to include the JavE font collection (see below). This is a comprehensive and authoritative (original) source (from the FIGlet code maintainer, Claudio Matsuoka) and must be treated with precedence.
  - https://github.com/xero/figlet-fonts: semi-popular, check if providing anything new with respect to cmatsuoka and patorjk
  - https://github.com/hIMEI29A/FigletFonts: semi-popular, check if providing anything new with respect to cmatsuoka and patorjk
  - https://github.com/mtatton/figlet_fonts: check if providing anything new with respect to cmatsuoka and patorjk
  - https://www.freshports.org/misc/figlet-fonts: what is this? Check if providing anything new with respect to cmatsuoka and patorjk
  - https://github.com/PhMajerus/FIGfonts: unique set of ANSI fonts (including coloured fonts) in FIGlet format, very actively maintained! However, compatibility needs attention (doesn't display correctly by default due to advanced characters being used)
  - https://knassen.github.io/personal-tech/figsamples.html: font conversions and creations by Kent Nassen, check if providing anything new with respect to cmatsuoka and patorjk
  - https://knassen.github.io/personal-tech/figfonts/other/otherfonts.html: additional FIGlet fonts listed by Kent Knassen, check if providing anything new with respect to cmatsuoka and patorjk
  - http://www.jave.de/figlet/fonts.html: font collection included in JavE, check if providing anything new with respect to cmatsuoka and patorjk (cmatsuoko/figlet-fonts seem to include this collection)
- FIGlet/ASCII art tools
  - https://github.com/m-col/bdf2flf: allows converting BDF bitmap fonts to FIGlet fonts
  - http://www.jave.de/: ASCII art editor (includes FIGlet font collection)
- Miscellaneous FIGlet resources:
  - https://www.figlet.org/contrib.html: various resources
  - https://knassen.github.io/personal-tech/figlet.html: various resources
  - https://www.figlet.org/cgi-bin/fontdb.cgi: author names and creation dates of fonts in standard FIGlet distro
  - http://www.jave.de/figlet/figfont.html: FIGlet specs

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
