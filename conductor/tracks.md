# Project Tracks

This file tracks all major tracks for the project. Each track has its own detailed plan in its respective folder.

---

- [ ] **Track: Evaluate & Integrate Additional Font Sources**
  *Context: [Research Findings](./research/ecosystem.md#community-font-collections)*
  *Description: Integrate the ~87 unique fonts from `xero/figlet-fonts` into our collection. This requires careful de-duplication (as filenames may differ while content is the same) and validation of font integrity.*

- [ ] **Track: Evaluate TOIlet Support**
  *Context: [Research Findings](./research/ecosystem.md#toilet-the-other-implementation)*
  *Description: Investigate the feasibility of supporting TOIlet (`.tlf`) fonts. This would require updating the rendering engine to support color codes and potentially new file formats.*

- [ ] **Track: Font Consistency & Quality Audit**
  *Description: Perform a comprehensive audit of the entire font collection. Investigate fonts that produce no visible output (e.g., due to corrupt files or unprintable characters). Fix issues where possible, or omit inconsistent fonts to ensure a high-quality user experience.*

- [ ] **Track: Local Assets Strategy Research & Evaluation**
  *Description: Evaluate the pros and cons of sourcing assets (fonts, libraries) from original sources vs. maintaining local copies. Investigate synchronisation mechanisms to keep local copies up-to-date with upstream changes.*
