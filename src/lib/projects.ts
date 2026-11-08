import { getCollection } from 'astro:content';
import { site } from '../config/site';
import snapshot from '../data/github-snapshot.json';

type GitHubMetadata = { language: string };

const metadataRequests = new Map<string, Promise<GitHubMetadata>>();

function metadataFor(config: (typeof site.featuredRepositories)[number]): Promise<GitHubMetadata> {
  const cached = metadataRequests.get(config.repo);
  if (cached) return cached;

  const request = (async () => {
    const fallback = { language: snapshot.projects[config.snapshotKey].language };
    if (import.meta.env.GITHUB_OFFLINE === '1') {
      console.warn(`[portfolio] GitHub offline; using snapshot from ${snapshot.generatedAt} for ${config.repo}`);
      return fallback;
    }

    try {
      const headers: HeadersInit = { Accept: 'application/vnd.github+json' };
      if (import.meta.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${import.meta.env.GITHUB_TOKEN}`;
      const response = await fetch(`https://api.github.com/repos/${config.owner}/${config.repo}`, {
        headers,
        signal: AbortSignal.timeout(5000),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data: unknown = await response.json();
      if (!data || typeof data !== 'object' || !('language' in data) || typeof data.language !== 'string' || data.language.length > 40) {
        throw new Error('metadata failed validation');
      }
      return { language: data.language };
    } catch (error) {
      console.warn(`[portfolio] ${String(error)}; using snapshot from ${snapshot.generatedAt} for ${config.repo}`);
      return fallback;
    }
  })();

  metadataRequests.set(config.repo, request);
  return request;
}

export async function getProjects() {
  const entries = await getCollection('projects');
  const bySlug = new Map(entries.map((entry) => [entry.data.slug, entry]));

  const projects = await Promise.all(site.featuredRepositories.map(async (config) => {
    const entry = bySlug.get(config.slug);
    if (!entry) throw new Error(`Missing project content for ${config.slug}`);
    return {
      ...entry.data,
      entry,
      github: await metadataFor(config),
      showSource: config.showSource && entry.data.sourceVisibility === 'public',
    };
  }));

  return projects.sort((a, b) => a.order - b.order);
}
