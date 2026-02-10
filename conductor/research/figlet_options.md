# FIGlet Rendering Options: Research & Evaluation

This document evaluates the advanced rendering options provided by `figlet.js` and their potential utility for **ASCII Banners**.

**Primary Source:** [patorjk/figlet.js Documentation - Options](https://github.com/patorjk/figlet.js?tab=readme-ov-file#options)

## Core Options Overview

| Option | Description | Potential Value |
| :--- | :--- | :--- |
| `width` | The maximum width of the output in characters. | **High.** Essential for multi-line wrapping and preventing overflow on mobile/narrow viewports. |
| `whitespaceBreak` | If true, breaks lines at whitespace when the width is reached. | **Medium.** Improves readability for long text strings. |
| `horizontalLayout` | Controls how characters are spaced horizontally (**Horizontal Kerning**). | **Medium.** Essential for achieving the "correct" or desired look for specific fonts. |
| `verticalLayout` | Controls how lines are spaced vertically (**Vertical Kerning**). | **Low.** Less relevant for single-banner showcases. Most fonts do not support vertical kerning. |
| `printDirection` | `0` for Left-to-Right, `1` for Right-to-Left. | **Low.** FIGlet fonts are predominantly LTR. |

## Layout Modes (Kerning Override)
Both `horizontalLayout` and `verticalLayout` accept the same set of values to override a font's default kerning behavior. 

- **`default`**: Uses the font's own built-in preference.
- **`full`**: Each character occupies its full width/height. No overlapping.
- **`fitted`**: Characters are moved together until they touch (the most common override).
- **`controlled smushing`**: Characters are overlapped, but only if their touching sub-characters match specific "smushing rules" (e.g., matching brackets `(` and `)` might merge).
- **`universal smushing`**: Characters are overlapped as much as possible, regardless of sub-character conflicts. The overlapping character usually "wins" (overwrites the previous one).

### Support for Vertical Kerning
Per the documentation, **most fonts do not support vertical kerning**. A few exceptions exist (like the "Standard" font), but for the vast majority of FIGlet fonts, changing `verticalLayout` will have no visible effect.

## Future Implementation Strategy
To avoid overwhelming the user, we will not expose these controls globally in the initial version.

**Proposal:**
- **Per-Card Advanced Controls:** Add a discreet "Advanced" toggle or gear icon on each font card.
- **Context-Aware:** Only show `verticalLayout` controls if the input text contains newlines or wraps AND the font is known to support it (if detectable).
- **Defaults:** Continue to use the font's internal defaults for the main showcase view.
