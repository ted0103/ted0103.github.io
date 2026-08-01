---
slug: callneuron
title: CallNeuron
eyebrow: Consent-First CALL-E Agent
summary: A scholarship outreach operator that turns an approved shortlist into one polite, consent-checked CALL-E conversation and a clear human follow-up.
year: 2026
role: Product strategy, full-stack development, and visual direction
status: Live operator prototype
language: TypeScript
liveUrl: https://call-neuron-preview.pages.dev/
sourceUrl: https://github.com/ted0103/awesome-phone-call-agents/tree/feat/call-neuron/apps/typescript/call-neuron
sourceVisibility: public
accent: cyan
order: 1
highlights:
  - Manual and document shortlist intake
  - Per-recipient consent gate
  - Reviewable CALL-E plan and confirmation
  - Human-owned follow-up disposition
media:
  src: /projects/callneuron-logo.png
  alt: CallNeuron logo combining a phone handset with three connected neural nodes on a deep teal field
  width: 1200
  height: 1200
  caption: The handset and connected nodes represent a careful automated conversation returning to a human.
  position: center
---

## The Problem

Scholarship and education teams can have a strong opportunity and a carefully approved shortlist, yet still lose promising candidates between a spreadsheet and the first useful conversation. Repetitive outreach takes time, but an unexplained automated call can feel intrusive and damage trust.

## The Intention

CallNeuron is not a ranking engine or an award decision-maker. It prepares one approved opportunity, contacts one consented adult, explains who is calling and why, and returns interest or questions to a human staff member. The human handoff is the product outcome—not a longer autonomous conversation.

## The Product Loop

An operator writes the approved brief, adds recipients manually or imports a CSV, spreadsheet, Word document, or selectable-text PDF, and reviews the selected adult’s consent evidence. CALL-E first produces a reviewable plan. A separate confirmation is required before one phone can ring. The final provider signal and the operator’s follow-up disposition remain visibly separate.

## The Technical System

The interface uses React, TypeScript, Vite, Cloudflare Pages Functions, IndexedDB, and CALL-E’s brokered MCP flow. The browser initializes CALL-E, discovers the available tools, calls `plan_call`, confirms `run_call`, and monitors `get_call_run`. Twelve focused tests cover import boundaries, withdrawn consent, stateless and session-based MCP initialization, the plan/run/status contract, voicemail policy, and privacy-minimal export.

## The Trust Model

Original files are parsed locally and never uploaded. Names, phone numbers, transcripts, and offer details are excluded from the result export. Voicemail is off by default and contains only the organization and public callback number when enabled. There is no batch dispatch, hidden scheduling, automatic retry, scholarship decision, or collection of grades, identity documents, financial records, or payments.

## What I Learned

The strongest phone agent is not the one that talks the longest. A useful agent knows when to introduce itself, ask permission, stay inside an approved brief, capture the question, and make the next human action unmistakable.

## Next Iteration

The next step is a small, consented operator trial focused on call clarity, response time, voicemail comprehension, and whether human follow-ups happen as promised. A production rollout would also need organizational privacy, safeguarding, legal, device-security, and role-management review.
