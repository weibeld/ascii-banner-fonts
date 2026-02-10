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

- [~] **Track: Migrate to CI-Based Asset Strategy**
  *Link: [./tracks/migrate_to_ci_based_asset_strategy_20260210/](./tracks/migrate_to_ci_based_asset_strategy_20260210/)*
  *Description: Transition from 'Full Repo-Based' (Model 1) to 'Full CI-Based' (Model 2). Remove assets from Git, implement build-time generation pipelines, and configure GitHub Actions for deployment.*



