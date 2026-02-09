# Track Specification: Project Research & Initial Refactoring

## Overview
This track focuses on establishing a solid foundation for the ASCII Studio project. It involves two key activities: conducting research to understand the domain (FIGlet fonts, ecosystem, and origins) and refactoring the existing codebase from a prototype into a maintainable static web application architecture.

## Goals
1.  **Domain Knowledge:** Answer specific research questions regarding FIGlet, font origins, and related tools to inform design decisions and legal/attribution requirements.
2.  **Codebase Maturity:** Transition the "vibe-coded" prototype into a structured project with a clear separation of concerns (HTML, CSS, JS) and a maintainable file structure.
3.  **Preparation for Features:** Ensure the codebase is ready to support upcoming features like search, filtering, and collections.

## Research Questions
1.  **What is Figlet?** Understand its history, standard, and file format (.flf).
2.  **Font Origins:** Determine the nature, license, and authors of the currently downloaded fonts and the `patorjk` repository.
3.  **Ecosystem Links:** Clarify the relationship between this project and:
    *   https://www.figlet.org/
    *   https://github.com/xero/figlet-fonts
    *   https://github.com/hIMEI29A/FigletFonts
4.  **Toilet Fonts:** Define what they are and their compatibility/relationship with FIGlet.
5.  **Inspiration Source:** Investigate https://manytools.org/hacker-tools/ascii-banner/ to understand its font sources and implementation (if discernable).

## Refactoring Requirements
-   **Structure:** Organize the project into standard directories (e.g., `src/`, `assets/`, `scripts/`).
-   **Code Quality:** Apply the selected code style guides (HTML, CSS, JS).
-   **Optimization:** Ensure `figlet.js` and font loading are handled efficiently for a static context.
-   **Clean Slate:** Remove unused or temporary files from the initial prototype phase.
