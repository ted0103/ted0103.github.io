---
slug: teds-personal-portfolio
title: Ted's Personal Portfolio
eyebrow: Digital Identity
summary: A fast, accessible portfolio for software projects, university experience, and visual storytelling, presented through a playful paper-and-sticker interface.
year: 2026
role: Design, content, and development
status: Current
liveUrl: https://ted0103.github.io/
sourceVisibility: private
accent: cyan
order: 3
highlights:
  - Multi-page Astro architecture
  - Curated GitHub metadata
  - Accessible liquid-glass system
  - Static, resilient deployment
media:
  src: /projects/just-ted-named-cover.png
  alt: Just_Ted wordmark above a laptop showing the paper-and-sticker portfolio homepage
  width: 1254
  height: 1254
  caption: A branded device mockup featuring the project interface.
  position: center
---

## The Problem

A portfolio should make a person easier to understand, not bury them under effects. This site gives my technical, leadership, and creative work one coherent home while leaving room for the next project.

## The Intention

My GitHub profile is designed to be scanned quickly. This website has a different job: it gives the work room to breathe, explains the choices behind it, and shows how technical thinking, leadership, and visual storytelling connect.

## Design Decisions

The redesign uses ruled paper, compact tab navigation, condensed display headings, and small colored labels to give the work a more personal rhythm. Project imagery remains evidence, while concise mono labels carry navigation and metadata.

## The Technical System

Astro generates every page as static HTML. Biography and case studies live in Markdown, contact and navigation values live in one TypeScript file, and a curated GitHub metadata layer enriches only approved projects. A committed snapshot keeps builds dependable when GitHub is unavailable.

## The Challenge

Paper texture and playful motion can quickly reduce readability. The solution is restraint: keep the background quiet, make every label and image secondary to the work, and use short transitions that respect reduced-motion settings.

## What I Learned

Visual polish is strongest when it clarifies hierarchy. The most useful animation is often the smallest one: a press response, a section arriving at the right moment, or a material shifting just enough to show depth.

## Next Iteration

The content structure is ready to grow one project at a time. New repositories remain private to the portfolio until I deliberately feature them.
