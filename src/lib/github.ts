const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
const GITHUB_OWNER = import.meta.env.VITE_GITHUB_OWNER;
const GITHUB_REPO = import.meta.env.VITE_GITHUB_REPO;
const GITHUB_BRANCH = import.meta.env.VITE_GITHUB_BRANCH || 'main';

const BASE_URL = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}`;

function headers() {
  return {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    'Content-Type': 'application/json',
    Accept: 'application/vnd.github+json',
  };
}

export interface GitHubFile {
  name: string;
  path: string;
  sha: string;
  size: number;
  type: 'file' | 'dir';
  content?: string;
  encoding?: string;
}

export async function getFile(path: string): Promise<{ content: string; sha: string }> {
  const res = await fetch(`${BASE_URL}/contents/${path}?ref=${GITHUB_BRANCH}`, {
    headers: headers(),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(`Failed to get file ${path}: ${err.message || res.statusText || `HTTP ${res.status}`}`);
  }
  const data: GitHubFile = await res.json();
  const bytes = Uint8Array.from(atob(data.content!.replace(/\n/g, '')), (c) => c.charCodeAt(0));
  const content = new TextDecoder().decode(bytes);
  return { content, sha: data.sha };
}

export async function listDir(path: string): Promise<GitHubFile[]> {
  const res = await fetch(`${BASE_URL}/contents/${path}?ref=${GITHUB_BRANCH}`, {
    headers: headers(),
  });
  if (!res.ok) {
    throw new Error(`Failed to list directory ${path}: ${res.statusText}`);
  }
  return res.json();
}

export async function createFile(
  path: string,
  content: string,
  message: string
): Promise<void> {
  const encoded = btoa(unescape(encodeURIComponent(content)));
  const res = await fetch(`${BASE_URL}/contents/${path}`, {
    method: 'PUT',
    headers: headers(),
    body: JSON.stringify({
      message,
      content: encoded,
      branch: GITHUB_BRANCH,
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(`Failed to create file ${path}: ${err.message || res.statusText}`);
  }
}

export async function updateFile(
  path: string,
  content: string,
  sha: string,
  message: string
): Promise<void> {
  const encoded = btoa(unescape(encodeURIComponent(content)));
  const res = await fetch(`${BASE_URL}/contents/${path}`, {
    method: 'PUT',
    headers: headers(),
    body: JSON.stringify({
      message,
      content: encoded,
      sha,
      branch: GITHUB_BRANCH,
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(`Failed to update file ${path}: ${err.message || res.statusText}`);
  }
}

export async function deleteFile(
  path: string,
  sha: string,
  message: string
): Promise<void> {
  const res = await fetch(`${BASE_URL}/contents/${path}`, {
    method: 'DELETE',
    headers: headers(),
    body: JSON.stringify({
      message,
      sha,
      branch: GITHUB_BRANCH,
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(`Failed to delete file ${path}: ${err.message || res.statusText}`);
  }
}

export function isGitHubConfigured(): boolean {
  return !!(GITHUB_TOKEN && GITHUB_OWNER && GITHUB_REPO);
}

// Fetch and parse portfolio.json from GitHub (always up-to-date)
export async function getPortfolioJson(): Promise<Record<string, unknown>> {
  const { content } = await getFile('src/data/portfolio.json');
  return JSON.parse(content);
}
