# FIGlet Ecosystem & Related Tools

## The Core
- **[figlet.org](http://www.figlet.org/):** The "official" home of the FIGlet project. It hosts the canonical source code (in C), documentation for the `.flf` format, and the original collection of standard fonts. It is the primary reference for anyone implementing a FIGlet driver.

## Community Font Collections
The ASCII art community relies on large, curated repositories to share and preserve fonts. We have analyzed the three major collections (Snapshot: 2026-02-09):

| Collection | GitHub Stars | Font Count (.flf) | Commits | Last Update | Focus |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **[patorjk/figlet.js](https://github.com/patorjk/figlet.js)** | ~2.9k | 326 | ~346 | Dec 2025 | Standard for JS; powers many web tools. |
| **[xero/figlet-fonts](https://github.com/xero/figlet-fonts)** | ~1.5k | 376 | ~34 | Nov 2025 | Popular for Unix dotfiles and shell ricing. |
| **[hIMEI29A/FigletFonts](https://github.com/hIMEI29A/FigletFonts)** | ~50 | 573 | ~13 | Dec 2017 | Largest raw collection; includes rare/historical fonts. |

*Note: Font counts are approximate and may include duplicates or variants.*

### Font Overlap Analysis
We compared the file lists of the community collections against our base (`patorjk`) to see how many *unique* fonts they could add to our project:

- **xero/figlet-fonts:** Contains **~87 unique fonts** not found in the `patorjk` collection.
- **hIMEI29A/FigletFonts:** Contains **~374 unique fonts** not found in the `patorjk` collection.

**Conclusion & Strategy:**
- **Primary Expansion:** We will prioritize integrating the **~87 unique fonts** from `xero/figlet-fonts`. This collection is well-maintained and has a high "popularity-to-content" ratio. Integrating these would bring our total to ~400 fonts.
- **Low Priority:** The `hIMEI29A/FigletFonts` collection, while large, is low-traffic and contains many esoteric or non-standard fonts. To maintain a high-quality, curated experience, we will **skip** this collection.
- **Next Steps:** Future work will focus on a "clean" merge of the `xero` fonts into our base collection, ensuring robust de-duplication and metadata validation.


## TOIlet (The Other Implementation)
**TOIlet** (The Other Implementation's letters) is a powerful successor/extension to FIGlet, written by Sam Hocevar.

### Relationship to FIGlet
- **Format:** TOIlet uses the `.tlf` (TOIlet Font) format, which is an extension of the FIGlet `.flf` format.
- **Compatibility:** TOIlet is fully **backward compatible** with FIGlet fonts. It can render any `.flf` file.
- **Enhanced Features:** TOIlet adds support for:
  - **Color:** ANSI color codes and different color filters (rainbow, metal, etc.).
  - **Unicode:** Better support for non-ASCII character sets.
  - **Export Formats:** Can output to HTML, SVG, TGA, and more.

### Popularity & CLI Usage
- **Modern Standard:** TOIlet is considered the "enhanced" version of FIGlet and is widely used in Linux environments for colorful terminal banners.
- **Integration:** While not built directly into tools like the Gemini CLI (which typically uses its own ASCII art generation or standard libraries), TOIlet is the go-to tool for users manually creating colorful banners for their shell profiles (`.bashrc`, `.zshrc`).
- **Ecosystem:** The TOIlet ecosystem is smaller than FIGlet's but impactful due to its unique features (filters/color).

### ASCII Banners Strategy
For now, we will focus on `.flf` compatibility as it is the most universal. However, because TOIlet fonts are so similar, we may explore adding `.tlf` support in a future track to expand our library even further.

