import { getCollection } from 'astro:content';
import { site } from '../config/site';
import snapshot from '../data/github-snapshot.json';

type GitHubMetadata = {
  description: string;
  language: string;
  updatedAt: string;
  homepage: string;
  repository: string;
};

type MetadataResult = {
  metadata: GitHubMetadata;
  source: 'live' | 'snapshot';
  snapshotGeneratedAt: string;
};

const allowedHosts = new Set(['github.com', 'ted0103.github.io']);

function safeUrl(value: unknown, hosts = allowedHosts) {
  if (typeof value !== 'string' || value.length > 240) return '';
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && hosts.has(url.hostname) ? url.href : '';
  } catch {
    return '';
  }
}

function validateMetadata(value: unknown): GitHubMetadata | null {
  if (!value || typeof value !== 'object') return null;
  const data = value as Record<string, unknown>;
  const description = typeof data.description === 'string' && data.description.length <= 240 ? data.description : '';
  const language = typeof data.language === 'string' && data.language.length <= 40 ? data.language : '';
  const updatedAt = typeof data.updated_at === 'string' && !Number.isNaN(Date.parse(data.updated_at)) ? data.updated_at : '';
  const homepage = safeUrl(data.homepage);
  const repository = safeUrl(data.html_url, new Set(['github.com']));
  return updatedAt && repository ? { description, language, updatedAt, homepage, repository } : null;
}

async function metadataFor(config: (typeof site.featuredRepositories)[number]): Promise<MetadataResult> {
  const fallback = snapshot.projects[config.snapshotKey];
  if (import.meta.env.GITHUB_OFFLINE === '1') {
    console.warn(`[portfolio] GitHub offline; using snapshot from ${snapshot.generatedAt} for ${config.repo}`);
    return { metadata: fallback, source: 'snapshot', snapshotGeneratedAt: snapshot.generatedAt };
  }

  try {
    const headers: HeadersInit = { Accept: 'application/vnd.github+json' };
    if (import.meta.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${import.meta.env.GITHUB_TOKEN}`;
    const response = await fetch(`https://api.github.com/repos/${config.owner}/${config.repo}`, { headers });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const validated = validateMetadata(await response.json());
    if (!validated) throw new Error('metadata failed validation');
    return { metadata: validated, source: 'live', snapshotGeneratedAt: snapshot.generatedAt };
  } catch (error) {
    console.warn(`[portfolio] ${String(error)}; using snapshot from ${snapshot.generatedAt} for ${config.repo}`);
    return { metadata: fallback, source: 'snapshot', snapshotGeneratedAt: snapshot.generatedAt };
  }
}

export async function getProjects() {
  const entries = await getCollection('projects');
  const bySlug = new Map(entries.map((entry) => [entry.data.slug, entry]));

  const projects = await Promise.all(site.featuredRepositories.map(async (config) => {
    const entry = bySlug.get(config.slug);
    if (!entry) throw new Error(`Missing project content for ${config.slug}`);
    const githubResult = await metadataFor(config);
    return {
      ...entry.data,
      entry,
      github: {
        ...githubResult.metadata,
        description: entry.data.summary || githubResult.metadata.description,
        language: entry.data.language || githubResult.metadata.language,
        source: githubResult.source,
        snapshotGeneratedAt: githubResult.snapshotGeneratedAt,
      },
      showSource: config.showSource && entry.data.sourceVisibility === 'public',
    };
  }));

  return projects.sort((a, b) => a.order - b.order);
}
