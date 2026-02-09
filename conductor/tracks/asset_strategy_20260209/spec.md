# Track Specification: Local Assets Strategy Research & Evaluation

## Overview
This track evaluates the strategy for managing external assets (font files and the FIGlet library). It compares "Remote Sourcing" (loading directly from original upstream sources) against "Local Maintenance" (maintaining duplicated copies within our project), focusing on architecture, maintenance overhead, and reliability.

## Goals
1. **Conceptual Mapping:** Clearly explain the request flow and asset storage for both strategies.
2. **Maintenance Analysis:** Evaluate the pros and cons of each approach, specifically regarding upstream updates.
3. **Synchronization Design:** Propose a mechanism to keep local copies synchronized with original sources if the local strategy is chosen.

## Research Questions
1. **Request Flow:** In both scenarios, which endpoints serve the assets (`.flf` files, `figlet.js`), and what is the browser's interaction with them?
2. **Duplication:** Where are assets saved in each case (e.g., project repo vs. upstream CDN)?
3. **Update Management:** How do we handle upstream changes (new fonts, bug fixes in `figlet.js`) in both scenarios? Is an automated synchronization mechanism necessary?
