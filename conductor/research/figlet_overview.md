# FIGlet Overview

## What is FIGlet?
FIGlet is a computer program that generates text banners, in various typefaces, composed of letters made up of smaller ASCII characters. 

### Etymology
The name **FIGlet** stands for "Frank, Ian and Glenn's LETters". It was created by Glenn Chappell, with assistance from Ian Chai and Frank Sheeran (who provided the initial inspiration).

### History
- **1991:** First released as "newban".
- **1993:** Released as FIGlet 2.0.
- **Modern Era:** It has become a standard tool in Unix-like environments for creating ASCII art banners for MOTDs (Message of the Day), script headers, and terminal branding.

## The .flf File Format
The `.flf` extension stands for **FIGLettering Font**. It is a plain text format that describes how to render characters as ASCII art.

### Structure of an .flf file
1. **Header Line:** Contains the signature `flf2a` and metadata like character height, baseline, maximum line length, and "smush" modes (which control how characters overlap or interact).
2. **Comments:** Optional lines providing information about the font's author, license, and history.
3. **FIGcharacter Data:** The actual definitions for each character, usually starting with standard ASCII 32-126 and often including extended character sets.

## Usage
- **FIGdrivers:** Programs (like the original FIGlet C program or the `figlet.js` library) that read `.flf` files and render input text.
- **Smushing:** A key feature of FIGlet that allows characters to be squeezed together (kerning) for a more cohesive look.
- **Global Collection:** Over the decades, hundreds of fonts have been created by hobbyists, ranging from simple block letters to complex 3D and script styles.
