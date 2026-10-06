import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const settingsPath = path.join(rootDir, 'src', 'data', 'site-settings.json');
const blogPath = path.join(rootDir, 'public', 'blog-index.json');
const projectsPath = path.join(rootDir, 'public', 'projects-index.json');

let siteUrl = 'https://kishorkumarmahato.com.np';
let blog = [];
let projects = [];

try {
  const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf-8'));
  if (settings.siteUrl) {
    siteUrl = settings.siteUrl.replace(/\/$/, '');
  }
} catch (e) {
  console.warn('Could not read site-settings.json:', e.message);
}

try {
  blog = JSON.parse(fs.readFileSync(blogPath, 'utf-8'));
} catch (e) {
  console.warn('Could not read blog-index.json:', e.message);
}

try {
  projects = JSON.parse(fs.readFileSync(projectsPath, 'utf-8'));
} catch (e) {
  console.warn('Could not read projects-index.json:', e.message);
}

const today = new Date().toISOString().split('T')[0];

const urls = [
  { loc: '/', priority: '1.0', changefreq: 'weekly', lastmod: today },
  { loc: '/blog', priority: '0.8', changefreq: 'weekly', lastmod: today },
  { loc: '/projects', priority: '0.8', changefreq: 'monthly', lastmod: today },
  ...blog
    .filter((p) => p.status === 'published' || p.status === undefined)
    .map((p) => ({
      loc: `/blog/${p.slug}`,
      priority: '0.7',
      changefreq: 'monthly',
      lastmod: p.date || today,
    })),
  ...projects
    .filter((p) => p.status === 'published' || p.status === undefined)
    .map((p) => ({
      loc: `/projects/${p.slug}`,
      priority: '0.6',
      changefreq: 'monthly',
      lastmod: today,
    })),
];

const xml = [
  `<?xml version="1.0" encoding="UTF-8"?>`,
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
  ...urls.map(
    (u) =>
      `  <url>\n    <loc>${siteUrl}${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`,
  ),
  `</urlset>`,
].join('\n');

// Write to public/sitemap.xml
const publicSitemap = path.join(rootDir, 'public', 'sitemap.xml');
fs.writeFileSync(publicSitemap, xml);
console.log(`✓ public/sitemap.xml generated (${urls.length} URLs)`);

// If dist exists, write to dist/sitemap.xml too
const distDir = path.join(rootDir, 'dist');
if (fs.existsSync(distDir)) {
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), xml);
  console.log(`✓ dist/sitemap.xml updated (${urls.length} URLs)`);
}

// Ensure Sitemap directive is in public/robots.txt
const robotsPath = path.join(rootDir, 'public', 'robots.txt');
try {
  let robots = fs.existsSync(robotsPath) ? fs.readFileSync(robotsPath, 'utf-8') : 'User-agent: *\nAllow: /\n';
  const sitemapLine = `Sitemap: ${siteUrl}/sitemap.xml`;
  if (!robots.includes('Sitemap:')) {
    robots = robots.trimEnd() + `\n\n${sitemapLine}\n`;
  } else {
    robots = robots.replace(/Sitemap:.*$/m, sitemapLine);
  }
  fs.writeFileSync(robotsPath, robots);
  console.log('✓ public/robots.txt updated with Sitemap URL');
} catch (e) {
  console.warn('Could not update robots.txt:', e.message);
}
