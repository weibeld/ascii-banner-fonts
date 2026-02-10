# Font Categorization Research

This document outlines the research into font categorization strategies for **ASCII Banners** and compares them with existing tools.

## Existing Ecosystem

### 1. Patorjk's TAAG
[Source: TAAG Tool](https://patorjk.com/software/taag/)

TAAG uses categories primarily in the "Test All" view to organize its vast collection:

**"Test All" Categories:**
- *Featured FIGlet Fonts*
- *ANSI FIGlet Fonts*
- *TOIlet Fonts* (Colored)
- *Regular FIGlet Fonts*
- *AOL Macro Fonts* (Unadjusted/Fixed)
- *3D Fonts*
- *Backdrop, Encodings, Scripts*

### 2. ManyTools
[Source: ManyTools ASCII Banner](https://manytools.org/hacker-tools/ascii-banner/)

ManyTools groups fonts into a few broad collections:
- *Selected FIGlet fonts*
- *Ascii-extended fonts*
- *Other FIGlet fonts*

---

## ASCII Banners Strategy: Automated Technical Categorization

Instead of maintaining brittle manual lists of style tags or collections, we derive categories programmatically from the font data itself.

### 1. Casing (Derived)
We compare the character definition of 'A' (ASCII 65) vs 'a' (ASCII 97).

- **Double Case:** The glyphs for 'A' and 'a' are different.
- **Single Case:** The glyphs for 'A' and 'a' are identical. (Note: This doesn't distinguish between "All Caps" vs "All Lower", but effectively means the font lacks case sensitivity).

### 2. Size (Derived)
We parse the `height` parameter from the `.flf` header line.

- **Small:** Height ≤ 4 lines (e.g., *Mini, 3x5*)
- **Medium:** Height 5-8 lines (e.g., *Standard, Big*)
- **Large:** Height ≥ 9 lines (e.g., *Banner, Block*)

### Benefits
- **Zero Maintenance:** New fonts are automatically categorized when added.
- **Objective:** Categories are based on verifiable data, not subjective style opinions.
- **Scalable:** Works for 10 fonts or 10,000 fonts without extra effort.