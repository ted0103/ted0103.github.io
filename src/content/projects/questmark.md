---
slug: questmark
title: QuestMark
eyebrow: Real-World Skill Quest
summary: A private-by-default student app that turns nearby real-life missions into evidence-backed Proof Cards, XP, achievements, and a visible skill map.
year: 2026
role: Product strategy, development, and visual direction
status: Installable PWA
liveUrl: https://ted0103.github.io/questmark/
sourceUrl: https://github.com/ted0103/questmark
sourceVisibility: public
accent: cyan
order: 1
highlights:
  - Location-aware daily missions
  - Evidence-backed Proof Cards
  - Interactive skill growth map
  - Private-by-default sharing
media:
  src: /projects/questmark-banner.webp
  alt: QuestMark liquid-glass globe surrounded by communication, courage, and observation skill signals
  caption: The daily quest surface connects one nearby mission to evidence, skill signals, and visible progress.
  position: top
---

## The Problem

Most personal-development apps measure screen activity or ask users to claim skills. Students need a more credible way to grow: do something useful in the real world, reflect on it, and keep proof of what the experience demonstrated.

## The Intention

QuestMark turns ordinary life into small, unusual missions. A student might interview a local founder, spot poor public design, teach a difficult concept, or improve a confusing message. Each mission is designed to create a story worth remembering—not another streak maintained inside an app.

## Design Decisions

The interface uses a luminous liquid-glass world as the centre of the daily quest experience. Mission details stay direct and practical around it: location, time, evidence, skills, safety, and XP. Motion makes progress feel alive while reduced-motion support keeps the core experience calm and accessible.

![QuestMark poster with a liquid-glass globe and three skill signals](/projects/questmark-poster.webp)

## The Technical System

The installable PWA is built with Next.js, React, TypeScript, and CSS. Its local recommendation model ranks a small set of Kuala Lumpur quests on-device. Evidence photos stay in IndexedDB, progress metadata stays local, and the exported app works offline after the first visit.

## The Trust Model

Evidence is private by default. Users decide what to share, can blur themselves before using visual proof, and can choose individual Proof Cards for a portfolio. Peer verification is optional rather than a gate to participation.

## What I Learned

Gamification becomes more meaningful when every reward points back to a real experience. The strongest part of QuestMark is not the XP counter; it is the chain from mission, to evidence, to reflection, to a skill claim that has context behind it.

## Next Iteration

The next step is a small student pilot to test whether the missions feel safe, specific, and genuinely worth leaving the screen for.
