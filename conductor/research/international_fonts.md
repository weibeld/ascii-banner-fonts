# Research: International FIGlet Fonts

This document provides a technical analysis of international character support in the FIGlet ecosystem. It is based on a review of the FIGfont specifications and the international font collection provided by the official FIGlet distribution.

---

## 1. Authoritative Specifications

The following document is the primary standard for FIGlet fonts and control mechanisms:

- **FIGfont Version 2 FIGfont and FIGdriver Standard:** [http://www.jave.de/figlet/figfont.html](http://www.jave.de/figlet/figfont.html)
    - **Version 2.1:** The baseline standard defining the header and the first 102 implicit character slots (ASCII 32–126 and 7 required German characters).
    - **Version 2.2:** Introduces support for extra characters via "code tags" and the `Full_Layout` and `Codetag_Count` header parameters.
- **FIGlet Control Files (.flc) Specification:** [http://www.jave.de/figlet/figfont.html#controlfiles](http://www.jave.de/figlet/figfont.html#controlfiles)
    - Defines the mechanism for remapping input characters before they are passed to the font driver.

---

## 2. Fundamental Approaches to Internationalization

There are two distinct architectural patterns used by FIGlet font creators to support non-ASCII characters.

### Approach A: The "Sacrifice" Model (ASCII Slot Repurposing)
This approach utilizes the standard **FIGfont 2.1** structure. Since the format only provides implicit slots for the 95 printable ASCII characters (32–126) and 7 German characters, font authors "sacrifice" standard English characters to represent international glyphs.

- **Character Access:** Users must type standard ASCII keys to produce international output. For example, in a Hebrew font, typing `t` might render an *Aleph*.
- **Slot Limitation:** The font is strictly limited to the 102 required character slots.
- **Mapping:** The "Keyboard Map" is typically documented in the font's header comments. Without a machine-readable `.flc` file, the driver has no way of knowing that `t` is not actually a `t`.
- **Right-to-Left:** FIGfont 2.1 and later supports right-to-left rendering through the `Print_Direction` header parameter (value `1` for RTL). See [http://www.jave.de/figlet/figfont.html#printdirection](http://www.jave.de/figlet/figfont.html#printdirection).

### Approach B: Code-Tagged FIGcharacters
This approach utilizes the **FIGfont 2.2** standard. It expands the font beyond the required slots by using explicit "code tags". See the specification for code-tagged characters at [http://www.jave.de/figlet/figfont.html#codetagged](http://www.jave.de/figlet/figfont.html#codetagged).

- **Character Access:** Each character block is preceded by a separate line containing a code tag (e.g., `65533`, `0x3042`, or `0123`). This tag specifies the character's code in decimal, octal, or hexadecimal.
- **Scalability:** This allows for a vast range of characters (up to 2 billion slots), making it suitable for CJK (Chinese, Japanese, Korean) languages or full Unicode support.
- **Integrity:** The `Codetag_Count` header parameter indicates how many code-tagged characters are included in the file.
- **Unicode Support:** The specification recommends using Unicode code points for these tags to ensure modern compatibility.

---

## 3. Analysis of International Collection

This analysis covers the fonts provided in the official FIGlet distribution at [ftp://ftp.figlet.org/pub/figlet/fonts/international/](ftp://ftp.figlet.org/pub/figlet/fonts/international/). These fonts illustrate the transition between the standard implicit slot model and the newer code-tagged extension.

### Standard Model Fonts
The following fonts use **Approach A (The Sacrifice Model)** and define the standard 102 required character slots.

| Font File | Characters Defined | Language | Implementation Details |
| :--- | :--- | :--- | :--- |
| `jerusalem.flf` | 101 | Hebrew | Maps Hebrew letters to English keys (e.g., `t`=Aleph). Uses `Print_Direction: 1` for RTL. |
| `mshebrew210.flf` | 28 | Hebrew | Variant Hebrew mapping. Only includes primary letters. |
| `moscow.flf` | 94 | Cyrillic | Sacrifices symbols like `\`, `/`, `\|`, and `~` for Cyrillic letters. |
| `ntgreek.flf` | 101 | Greek | Maps Greek letters to phonetically similar English keys. |
| `katakana.flf` | 90 | Japanese | Maps Katakana characters to the standard ASCII range. |
| `runic.flf` | 27 | Runic | Maps runes to phonetic English keys. |
| `runyc.flf` | 50 | Runic | An expanded version of the runic font. |
| `tengwar.flf` | 94 | Elvish | Maps Tolkien's Tengwar script to ASCII slots. |
| `smtengwar.flf` | 94 | Elvish | Small variant of the Tengwar font. |

### Code-Tagged Fonts
The following font utilizes **Approach B (Code-Tagged Model)** to define characters outside the standard ASCII range.

| Font File | Characters Defined | Language | Implementation Details |
| :--- | :--- | :--- | :--- |
| `tsalagi.flf` | 95 | Cherokee | Uses FIGfont 2.2 tags for the Cherokee syllabary. Includes a corresponding `tsalagi.flc` control file for input mapping. |

---

## 4. Analysis of CJK Collection

The fonts in the CJK package at [ftp://ftp.figlet.org/pub/figlet/fonts/international/cjkfonts/](ftp://ftp.figlet.org/pub/figlet/fonts/international/cjkfonts/) represent the largest and most complex FIGlet fonts in existence. They exclusively use **Approach B (Code-Tagged Model)** and contain thousands of characters.

| Font File | Characters Defined | Language | Encoding Standard | Implementation Details |
| :--- | :--- | :--- | :--- | :--- |
| `cns.flf` | 13,839 | Traditional Chinese | CNS | Uses custom planes-based tagging system. |
| `gb16fs.flf` | 7,842 | Simplified Chinese | GB2312 | Simplified Chinese "Fang Song Ti" font. |
| `gb16st.flf` | 7,842 | Simplified Chinese | GB2312 | Simplified Chinese "Song Ti" font. |
| `hanglg16.flf` | 8,452 | Korean | KSC5601 | Korean "Gothic" font. |
| `hanglm16.flf` | 8,452 | Korean | KSC5601 | Korean "Mincho" font. |
| `jiskan16.flf` | 7,105 | Japanese | JIS X 0208 | Tags correspond to regional JIS codes. |

### Supporting Control Files (.flc)
The CJK package includes specialized control files to handle legacy multibyte inputs:
- `big5.flc`: Maps the Taiwan **Big-5** character set to the **CNS** encoding used by `cns.flf`.
- `unshift.flc`: Maps 94x94 fonts from GR space (high bytes) to GL space (low bytes).
- `iso2022.flc`: Strips ISO 2022 escape sequences from input character sets.

---

## 5. Practical Application

The overarching goal for the **ASCII Banners Application** is to allow users to directly enter the characters they wish to print in Unicode (e.g., entering Greek characters directly rather than using ASCII substitutes).

### Support for Sacrifice Model Fonts
To support native input for fonts that repurpose standard ASCII slots, there are two primary implementation possibilities:

1.  **Translation Layer:** The backend maintains machine-readable mapping tables (Unicode → ASCII slot) for each language standard. The frontend UI then performs the character translation (e.g., `א` → `t`) before invoking the FIGlet rendering driver. This leaves the legacy font files unchanged.
2.  **Modernization via Transformation:** The font files could be transformed from the standard implicit model to the code-tagged model, where each international glyph is re-tagged with its actual Unicode code point. This would allow them to be used in the same way as modernized CJK fonts.

#### Consideration for Esoteric Scripts
The viability of native Unicode input for esoteric scripts depends on their status within the Unicode standard:
- **Runes:** Confirmed to be encoded in the Unicode **Runic block** (`U+16A0`–`U+16FF`). Native input is feasible if the fonts are modernized to use these code points.
- **Tengwar:** Not formally encoded in the Unicode standard (it exists only in unofficial Private Use Area assignments). As there is no universal Unicode representation, native input is currently unfeasible. These fonts will likely remain restricted to their legacy English keyboard maps or be excluded from the primary collection.

### Support for Code-Tagged Fonts
For fonts already using the expanded code-tagged model (like CJK), native input is achieved through **Unicode Restoration**:

- **Separated Project:** This involves a one-time curation project to rewrite legacy font files, replacing regional tags (JIS, etc.) with native Unicode code points.
- **Simplified Architecture:** Once "restored" to Unicode, these fonts work out-of-the-box without specialized mapping tables or `.flc` files. The UI simply passes the Unicode code points to the FIGlet driver.
