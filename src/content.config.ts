import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const profile = defineCollection({
  loader: glob({ pattern: 'profile.md', base: './src/content' }),
  schema: z.object({
    name: z.string().max(80),
    title: z.string().max(120),
    intro: z.string().max(360),
    forecast: z.string().max(360),
    location: z.string().max(80),
    capabilities: z.array(z.string().max(60)).min(1).max(12),
    achievements: z.array(z.string().max(120)).min(1).max(12),
    tools: z.object({
      languages: z.array(z.string().max(40)).max(12),
      development: z.array(z.string().max(40)).max(12),
      creative: z.array(z.string().max(40)).max(12),
    }),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/projects' }),
  schema: z.object({
    slug: z.string().regex(/^[a-z0-9-]+$/),
    title: z.string().max(100),
    eyebrow: z.string().max(60),
    summary: z.string().max(320),
    year: z.number().int().min(2020).max(2100),
    role: z.string().max(120),
    status: z.string().max(60),
    liveUrl: z.url(),
    sourceUrl: z.url().optional(),
    sourceVisibility: z.enum(['public', 'private']),
    accent: z.enum(['cyan', 'violet']),
    order: z.number().int().min(1),
    highlights: z.array(z.string().max(100)).min(1).max(8),
  }),
});

export const collections = { profile, projects };
