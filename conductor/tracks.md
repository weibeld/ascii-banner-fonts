# Project Tracks

This file tracks all major tracks for the project. Each track has its own detailed plan in its respective folder.

---

- [ ] **Track: Evaluate & Integrate Additional Font Sources**
  *Link: [./tracks/font_sources_20260209/](./tracks/font_sources_20260209/)*
  *Context: [Research Findings](./research/ecosystem.md#community-font-collections)*
  *Description: Integrate the ~87 unique fonts from `xero/figlet-fonts` into our collection. This requires careful de-duplication (as filenames may differ while content is the same) and validation of font integrity.*

- [ ] **Track: Evaluate TOIlet Support**
  *Link: [./tracks/toilet_support_20260209/](./tracks/toilet_support_20260209/)*
  *Context: [Research Findings](./research/ecosystem.md#toilet-the-other-implementation)*
  *Description: Investigate the feasibility of supporting TOIlet (`.tlf`) fonts. This would require updating the rendering engine to support color codes and potentially new file formats.*

- [ ] **Track: Font Consistency & Quality Audit**
  *Link: [./tracks/font_audit_20260209/](./tracks/font_audit_20260209/)*
  *Description: Perform a comprehensive audit of the entire font collection. Investigate fonts that produce no visible output (e.g., due to corrupt files or unprintable characters). Fix issues where possible, or omit inconsistent fonts to ensure a high-quality user experience.*

- [ ] **Track: Project Refinement & Roadmap Planning**
  *Link: [./tracks/project_refinement_and_roadmap_20260220/](./project_refinement_and_roadmap_20260220/)*
  *Description: Systematic grooming of the project brain-dump. Transition from monolithic notes to structured research, implementation tracks, and architectural decisions (including the 'Central Font Repository' strategy).*

- [~] **Track: Repository Split Execution**
  *Link: [./tracks/repository_split_execution_20260220/](./repository_split_execution_20260220/)*
  *Description: Execute the decoupling of the monolithic repository into specialized Frontend (Application) and Backend (Font Data) projects.*




