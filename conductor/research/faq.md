# Frequently Asked Questions

## General
### What is FIGlet?
FIGlet is a computer program that generates text banners, in various typefaces, composed of letters made up of smaller ASCII characters. The name stands for "Frank, Ian and Glenn's LETters". It was originally released in 1991.

### What is an .flf file?
The `.flf` extension stands for **FIGLettering Font**. It is a plain text file format that contains the instructions for rendering characters as ASCII art. Every font you see in this app is an individual `.flf` file.

## Fonts & Origins
### Where do these fonts come from?
Most of the fonts in our collection were created between 1991 and 2000 by a global community of hobbyists. They were originally distributed via FTP servers and USENET groups. We source them from the [patorjk/figlet.js](https://github.com/patorjk/figlet.js) repository, which preserves these historical artifacts.

### Can I use these fonts in my own project?
Generally, yes. Most FIGlet fonts are considered public domain or released under very permissive licenses (like the MIT or BSD licenses). While we believe they are free to use, we recommend checking the internal comments of a specific font file if you have strict commercial requirements.

### Why are some fonts unreadable?
The FIGlet standard supports many "novelty" or "puzzle" fonts that were never intended to be legible. Some are designed to be purely decorative or to function as ciphers.

## Technology
### How does this app work?
This application is **static-first**. This means:
- **No Backend:** All rendering happens directly in your browser using JavaScript.
- **Privacy:** Your text input is never sent to a server.
- **Speed:** Once loaded, the app works instantly and can even function offline.

### What engine are you using?
We use the [figlet.js](https://github.com/patorjk/figlet.js) library, a JavaScript implementation of the original C FIGlet driver.

### What about "TOIlet" fonts?
TOIlet is a newer tool that extends FIGlet with support for colors (`.tlf` files). Currently, ASCII Studio focuses exclusively on the classic, universal `.flf` format to ensure maximum compatibility.
