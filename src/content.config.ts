import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const profile = defineCollection({
  loader: glob({ pattern: 'profile.md', base: './src/content' }),
  schema: z.object({
    name: z.string().max(80),
    forecast: z.string().max(360),
    location: z.string().max(80),
    education: z.object({
      degree: z.string().max(120),
      institution: z.string().max(120),
      period: z.string().max(40),
      level: z.string().max(60),
      interests: z.array(z.string().max(100)).min(1).max(12),
      academicAchievements: z.array(z.string().max(100)).min(1).max(8),
    }),
    leadership: z.array(z.object({
      role: z.string().max(100),
      organization: z.string().max(120),
      logo: z.string().regex(/^\/experience-logos\/[a-z0-9-]+\.webp$/),
      logoAlt: z.string().max(80),
      period: z.string().max(60),
      summary: z.string().max(240),
      responsibilities: z.array(z.string().max(280)).min(1).max(8),
    })).min(1).max(12),
    awards: z.array(z.object({
      title: z.string().max(120),
      year: z.number().int().min(2020).max(2100).optional(),
      summary: z.string().max(240),
    })).min(1).max(12),
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
    media: z.object({
      src: z.string().regex(/^\/projects\/[a-z0-9-]+\.(jpg|png|webp)$/),
      alt: z.string().min(1).max(180),
      width: z.number().int().positive(),
      height: z.number().int().positive(),
      caption: z.string().max(180).optional(),
      position: z.enum(['center', 'top']).default('center'),
    }),
  }),
});

export const collections = { profile, projects };
