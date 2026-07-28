---
slug: celestial-archive
title: Celestial Archive
eyebrow: Flagship System
summary: A bilingual, local-first 78-card tarot reflection experience designed as a calm and private space across mobile and desktop.
year: 2026
role: Product, development, and visual direction
status: Live
liveUrl: https://ted0103.github.io/celestial-archive/
sourceUrl: https://github.com/ted0103/celestial-archive
sourceVisibility: public
accent: violet
order: 1
highlights:
  - Complete 78-card system
  - Bilingual experience
  - Local-first privacy
  - Web, Android, and offline access
media:
  src: /projects/celestial-archive-home.jpg
  alt: Celestial Archive opening sequence with a gold crescent and star field on a dark background
  width: 1470
  height: 923
  caption: The opening sequence establishes a quiet threshold before the archive begins.
  position: center
---

## The Problem

Reflection tools can feel noisy, generic, or careless with personal data. Celestial Archive approaches the experience as a private ritual: calm enough to invite thought, clear enough to use without instruction, and local-first by default.

## The Intention

I wanted the interface to slow the moment down without making the system difficult to understand. The visual atmosphere creates a threshold; straightforward controls, bilingual copy, and explicit privacy language keep people oriented once they enter.

## Design Decisions

The experience begins with a short opening sequence, then moves into clear rooms for choosing a reading, viewing cards, and keeping personal notes. English and Chinese are treated as one interface rather than separate versions. Motion and sound add atmosphere, but the core reading flow remains available when those enhancements are reduced.

## The Technical System

The project combines a complete 78-card system with bilingual interaction, responsive layouts, optional gesture input, and an offline package. Readings remain on the user’s device unless they deliberately save or export them.

The web release is static and installable. The Android package uses a Trusted Web Activity, while the offline package preserves a direct browser route for people who prefer not to install anything.

## The Challenge

The hardest balance was keeping the experience cinematic without letting atmosphere obscure navigation. That meant giving experimental interactions a dependable fallback and treating privacy and accessibility as part of the product language—not as footnotes.

## What I Learned

Atmosphere only works when the system underneath it stays understandable. The strongest design decisions were the ones that supported trust: explicit privacy, accessible controls, and a graceful core experience that does not depend on experimental features.

## Next Iteration

The next pass will deepen the card artwork and reading rhythm while preserving the same local-first foundation.
