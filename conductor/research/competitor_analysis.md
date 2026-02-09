# Competitor Analysis: ManyTools ASCII Banner

## Overview
The [ManyTools ASCII Banner Generator](https://manytools.org/hacker-tools/ascii-banner/) is a popular web-based tool for creating ASCII banners. It served as a primary inspiration for the ASCII Studio project.

## Technology Stack
- **Engine:** The site explicitly credits **figlet.js** by Patorjk (`github.com/patorjk/figlet.js`).
- **Implementation:** It appears to be a server-side rendered page (PHP) that utilizes the JavaScript library for the client-side preview and generation.

## Font Selection
- **Source:** The fonts are sourced from the standard `figlet.js` collection (which we are already using).
- **Organization:** ManyTools organizes fonts into categories (e.g., "Basic", "3D", "Shadow") to help users navigate the large collection.
- **Preview:** It shows a single preview at a time, which is the primary limitation ASCII Studio aims to solve (by showing *all* fonts at once).

## Takeaways for ASCII Studio
- **Validation:** Our choice of `figlet.js` is validated as the industry standard for web-based ASCII art.
- **Differentiation:** Our "show all" approach is a significant UX improvement for power users who want to find the "best" font quickly without clicking through a dropdown 200+ times.
- **Categorization:** We should consider adopting similar categories (Basic, 3D, etc.) in our future filtering feature, as users are already familiar with this taxonomy.
