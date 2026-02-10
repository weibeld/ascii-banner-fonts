# Track Specification: Advanced Controls & Font Categorization

## Overview
This track focuses on enhancing the user experience by providing advanced controls for FIGlet rendering options and introducing a categorization system for fonts based on their technical properties (e.g., casing, size).

## Goals
1. **FIGlet Options Integration:** Research and implement support for core FIGlet options (width, horizontal/vertical layout, whitespace breaking).
2. **Font Categorization:** Implement an automated system to derive font properties (Casing: Lower/Upper/Double; Size: Small/Medium/Large) by inspecting font files.
3. **Advanced UI Controls:** Provide a UI for users to toggle rendering options and filter fonts by categories.

## Research Questions
1. **Option Mapping:** Which FIGlet options from `figlet.js` provide the most value for a showcase comparison?
2. **Category Extraction:** How can we reliably determine "casing" and "size" by programmatically analyzing `.flf` files?
3. **Third-Party Alignment:** How do existing tools (TAAG, ManyTools) handle their font categorization, and can we align with their data?
