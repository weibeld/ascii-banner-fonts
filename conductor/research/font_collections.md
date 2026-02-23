# Font Collections & Ecosystem

This document provides a fundamental overview of the various font collections available in the FIGlet ecosystem as well as projects that make use of them.

## 1. Official FIGlet Font Distribution

The [FIGlet project](https://www.figlet.org/) provides an official distribution of FIGlet fonts on its FTP server at [ftp://ftp.figlet.org/pub/figlet/fonts/](ftp://ftp.figlet.org/pub/figlet/fonts/). This collection is generally unversioned and represents the canonical set of fonts for the original FIGlet implementation.

- **The Program:** FIGlet (Frank, Ian, and Glenn's Letters) is a classic command-line utility for creating ASCII banners. Its official website is [figlet.org](https://www.figlet.org/) and its source code is hosted on [cmatsuoka/figlet](https://github.com/cmatsuoka/figlet) on GitHub.
- **International Support:** The official FIGlet font distribution also provides a set of international fonts that render non-ASCII characters. Detailed information about how international fonts are implemented (e.g., sacrifice vs. code-tagged models), can be found in the [International Fonts Research](./international_fonts.md) document.

**Font Statistics:**

| Category | Count | Description |
| :--- | :--- | :--- |
| Standard | 156 | Fonts in the *ours*, *contributed*, and *ms-dos* directories. |
| International (Sacrifice Model) | 10 | Fonts that repurpose standard ASCII slots for international glyphs. |
| International (Code-Tagged Model) | 7 | Fonts using explicit code tags (includes root fonts and CJK collection). |
| **Total** | **173** | Combined count of all fonts in the distribution. |

---

## 2. Official TOIlet Font Distribution

[TOIlet](http://caca.zoy.org/wiki/toilet) (The Other Implementation) was developed as a modern alternative to FIGlet, with a focus on supporting color and Unicode characters. Its active development has slowed down or stalled. TOIlet font files use `.tlf` file endings contrasting with the `.flf` file endings of FIGlet fonts.

- **FIGlet Compatibility:** Newer versions of FIGlet have added support for TOIlet fonts and FIGlet can now natively read and process TOIlet fonts. TOIlet itself also claims to be able to read and process FIGlet fonts.
- **Releases:** Three major versions of TOIlet were released: [0.1](http://caca.zoy.org/attachment/wiki/toilet/toilet-0.1.tar.gz) (2008), [0.2](http://caca.zoy.org/attachment/wiki/toilet/toilet-0.2.tar.gz) (2010), and [0.3](http://caca.zoy.org/attachment/wiki/toilet/toilet-0.3.tar.gz) (2012). 

**Font Statistics:**

| Category | Count | Description |
| :--- | :--- | :--- |
| TOIlet Fonts | 21 | Fixed set of fonts from the latest [official TOIlet distribution (v0.3)](http://caca.zoy.org/attachment/wiki/toilet/toilet-0.3.tar.gz). |

---

## 3. patorjk/figlet.js

[patorjk/figlet.js](https://github.com/patorjk/figlet.js) is a JavaScript implementation of the FIGlet driver created in 2012. It also incorporates a large font collection in the same repository. The FIGlet driver as well as the font collection are actively maintained.

The fonts in this collection can be categorised into the below three groups.

### 1. FIGlet Fonts
This category comprises the majority of the collection. These are native FIGlet fonts gathered by patorjk from several locations.
- **Main Source:** A large part of the FIGlet fonts are taken from the [official FIGlet distribution](#1-official-figlet-font-distribution) described above.
- **Other Sources:** Various community contributions collected over the years (difficult to track back).
- **Modifications:** patorjk applied modifications/fixes to several of the imported fonts with respect to their original source.
- **Characteristics:** Standard `.flf` files designed for the original FIGlet engine.

**Statistics (v1.10.0):**

| Category | Count |
| :--- | :--- |
| FIGlet Fonts | 290 |

### 2. TOIlet Fonts
These are the TOIlet fonts from the official [TOIlet font distribution](#2-official-toilet-font-distribution) described above. They have been included in the collection in release [v1.9.0](https://github.com/patorjk/figlet.js/releases/tag/v1.9.0) in 2025.
- **Integration:** The TOIlet font files are used as-is with the `.tlf` file extensions changed to `.flf` (this works because FIGlet is compatible with TOIlet fonts).
- **Verification:** All TOIlet fonts in the patorjk collection (identified by the `tlf` header line) have been verified to be bit-for-bit identical to the official [TOIlet distribution v0.3](http://caca.zoy.org/attachment/wiki/toilet/toilet-0.3.tar.gz) fonts, with the exception of the font *Rebel* which is missing from the official TOIlet distribution (also not that some font files in the TOIlet font distribution are ZIP-compressed while still having a `.tlc` extension).

**Statistics (v1.10.0):**

| Category | Count |
| :--- | :--- |
| TOIlet Fonts | 22 |

### 3. ANSI Fonts
This is a small, selected set of legacy [ANSI art](https://en.wikipedia.org/wiki/ANSI_art) fonts that have been manually converted to the FIGlet format by patorjk as explained in the [TheDraw's Lost ANSI Art Fonts](https://patorjk.com/blog/2014/01/22/thedraws-lost-ansi-art-fonts/) blog post.
- **Source:** The fonts have been originally created with the legacy editor [TheDraw](https://en.wikipedia.org/wiki/TheDraw) and are hosted on the [Roy/SAC](https://web.archive.org/web/20120819044459/http://www.roysac.com/thedrawfonts-tdf.asp) website.
- **Conversion:** patorjk manually converted these from their original binary `.tdf` format to the FIGlet format around 2014.
- **Process:** The conversion involved stripping color information to make them compatible with the monochrome FIGlet rendering engine.
- **Included Fonts:** *3D-ASCII, ANSI Compact, ANSI Regular, Shadow, Bloody, Calvin S, Classy, Coder Mini, Delta Corps Priest 1, Electronic, Elite, Stronger Than All, THIS,* and *The Edge*.

**Statistics (v1.10.0):**

| Category | Count |
| :--- | :--- |
| ANSI Fonts | 14 |


### Total Font Statistics for Version v1.10.0

The following counts are based on the [v1.10.0 release](https://github.com/patorjk/figlet.js/releases/tag/v1.10.0).

| Category | Count |
| :--- | :--- |
| FIGlet Fonts | 290 |
| TOIlet Fonts | 22 |
| ANSI Fonts | 14 |
| Total Collection | 326 |

---

## 4. Text to ASCII Art Generator (TAAG) by Patorjk
[Source: TAAG Tool](https://patorjk.com/software/taag/)

TAAG serves as the primary web-based interface for the `figlet.js` engine and its associated font collection. It provides a comprehensive preview of the entire collection, organized with a few specific additions:
- **Featured FIGlet Fonts vs. Regular FIGlet Fonts:** FIGlet fonts are split into Featured FIGlet Fonts and Regular FIGlet fonts where the Featured FIGlet Fonts are deemed to be the best or most popular fonts by the author's subjective assessment.
- **AOL Macro Fonts:** The tool includes unique "AOL Macro Fonts" in both "unadjusted" and "fixed" versions. Originally popular in the 1990s AOL ecosystem, these fonts were designed for the Arial font rather than monospace environments. Because standard Arial rendering has evolved, the "unadjusted" fonts no longer display correctly; patorjk has manually corrected a subset of these to ensure they render properly with modern font engines (the "fixed" versions). These fonts are not part of the [patorjk/figlet.js](https://github.com/patorjk/figlet.js) repository and their source, as well as their definition format, are not publicly known.
- **Handpicked Groups:** The [Testing All](https://patorjk.com/software/taag/#p=testall) feature of the tool provides some themed groups containing small subsets of fonts. Specifically, the available groups are *3D Fonts*, *Backdrop*, *Scripts*, and *Encodings*. Each group contains from a few to a few dozen fonts which seem to be handpicked by the tool author.

The development and philosophy behind TAAG are documented in its [About page](https://patorjk.com/software/taag/#p=about) and a 2012 [blog post](https://patorjk.com/blog/2012/06/07/taag-reboot/) detailing its reboot.

---

## 5. ManyTools ASCII Banners
[Source: ManyTools ASCII Banner](https://manytools.org/hacker-tools/ascii-banner/)

This tool provides nearly identical functionality to TAAG and explicitly identifies the [`figlet.js`](https://github.com/patorjk/figlet.js) library as its underlying engine. Given that the `figlet.js` library was developed specifically for the 2012 TAAG reboot by patorjk, it is highly likely that this tool is an imitation of TAAG. It currently appears to be using an older version of [patorjk/figlet.js](https://github.com/patorjk/figlet.js) as its font set differs slightly, for example, it includes the legacy ANSI fonts but lacks the more recent TOIlet font additions.
