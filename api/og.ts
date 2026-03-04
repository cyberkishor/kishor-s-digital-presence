import type { IncomingMessage, ServerResponse } from 'http';
import { Resvg } from '@resvg/resvg-js';

function escXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  const url = new URL(req.url!, `https://${req.headers.host}`);

  const title       = url.searchParams.get('title')       || 'Portfolio';
  const description = url.searchParams.get('description') || 'Developer Portfolio';
  const type        = url.searchParams.get('type')        || 'website';
  const authorName  = url.searchParams.get('name')        || 'Developer';
  const authorRole  = url.searchParams.get('role')        || 'Full-Stack Developer';
  const siteHost    = url.searchParams.get('site')        || 'example.com';
  const accent      = url.searchParams.get('accent')      || '#6366f1';

  const typeLabel =
    type === 'article' ? '✍ Blog Post' :
    type === 'project' ? '⚡ Project'   : null;

  const titleFontSize = title.length > 40 ? 44 : 56;
  const avatarY = typeLabel ? 360 : 330;

  // Fetch logo from same origin and embed as base64
  let logoDataUrl = '';
  try {
    const origin = `https://${req.headers.host}`;
    const logoRes = await fetch(`${origin}/logo.jpg`);
    if (logoRes.ok) {
      const buf = await logoRes.arrayBuffer();
      logoDataUrl = `data:image/jpeg;base64,${Buffer.from(buf).toString('base64')}`;
    }
  } catch { /* fall back to initial */ }

  const avatarSvg = logoDataUrl
    ? `<clipPath id="lc"><circle cx="96" cy="${avatarY}" r="24"/></clipPath>
       <image href="${logoDataUrl}" x="72" y="${avatarY - 24}" width="48" height="48" clip-path="url(#lc)" preserveAspectRatio="xMidYMid slice"/>`
    : `<circle cx="96" cy="${avatarY}" r="24" fill="url(#accent)"/>
       <text x="96" y="${avatarY + 8}" font-family="system-ui,sans-serif" font-size="20" font-weight="700" fill="#fff" text-anchor="middle">${escXml(authorName[0] || 'A')}</text>`;

  const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f0f0f"/>
      <stop offset="100%" stop-color="#1a1a2e"/>
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${accent}"/>
      <stop offset="100%" stop-color="${accent}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="1050" cy="100" r="220" fill="${accent}" opacity="0.07"/>
  <circle cx="150" cy="530" r="180" fill="${accent}" opacity="0.06"/>
  ${typeLabel ? `
  <rect x="72" y="90" width="${typeLabel.length * 11}" height="36" rx="18" fill="${accent}20"/>
  <rect x="72" y="90" width="${typeLabel.length * 11}" height="36" rx="18" fill="none" stroke="${accent}40" stroke-width="1"/>
  <text x="${72 + (typeLabel.length * 11) / 2}" y="114" font-family="system-ui,sans-serif" font-size="16" font-weight="500" fill="${accent}" text-anchor="middle">${typeLabel}</text>
  ` : ''}
  <text x="72" y="${typeLabel ? 210 : 180}" font-family="system-ui,sans-serif" font-size="${titleFontSize}" font-weight="700" fill="#ffffff" letter-spacing="-1">${escXml(title.substring(0, 50))}${title.length > 50 ? '…' : ''}</text>
  <text x="72" y="${typeLabel ? 260 : 230}" font-family="system-ui,sans-serif" font-size="22" fill="#94a3b8">${escXml(description.substring(0, 80))}${description.length > 80 ? '…' : ''}</text>
  <rect x="72" y="${typeLabel ? 296 : 266}" width="60" height="3" rx="2" fill="url(#accent)"/>
  ${avatarSvg}
  <text x="132" y="${avatarY - 6}" font-family="system-ui,sans-serif" font-size="16" font-weight="600" fill="#e2e8f0">${escXml(authorName)}</text>
  <text x="132" y="${avatarY + 15}" font-family="system-ui,sans-serif" font-size="14" fill="#64748b">${escXml(authorRole)}</text>
  <rect x="760" y="140" width="370" height="330" rx="14" fill="#ffffff07" stroke="#ffffff10" stroke-width="1"/>
  <circle cx="790" cy="168" r="7" fill="#ff5f57"/>
  <circle cx="812" cy="168" r="7" fill="#ffbd2e"/>
  <circle cx="834" cy="168" r="7" fill="#28ca41"/>
  <rect x="780" y="192" width="200" height="8" rx="4" fill="${accent}65"/>
  <rect x="780" y="212" width="280" height="8" rx="4" fill="#ffffff22"/>
  <rect x="800" y="232" width="240" height="8" rx="4" fill="${accent}55"/>
  <rect x="800" y="252" width="260" height="8" rx="4" fill="#ffffff18"/>
  <rect x="800" y="272" width="200" height="8" rx="4" fill="${accent}50"/>
  <rect x="780" y="292" width="220" height="8" rx="4" fill="#ffffff20"/>
  <rect x="780" y="312" width="300" height="8" rx="4" fill="${accent}45"/>
  <rect x="800" y="332" width="240" height="8" rx="4" fill="#ffffff15"/>
  <rect x="800" y="352" width="180" height="8" rx="4" fill="${accent}65"/>
  <rect x="780" y="372" width="260" height="8" rx="4" fill="#ffffff20"/>
  <rect x="780" y="392" width="160" height="8" rx="4" fill="${accent}55"/>
  <rect x="780" y="412" width="220" height="8" rx="4" fill="#ffffff18"/>
  <line x1="0" y1="590" x2="1200" y2="590" stroke="#ffffff10" stroke-width="1"/>
  <text x="72" y="614" font-family="system-ui,sans-serif" font-size="16" fill="#475569">${escXml(siteHost)}</text>
  <rect x="0" y="626" width="1200" height="4" fill="url(#accent)"/>
</svg>`;

  const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } });
  const png = resvg.render().asPng();

  res.setHeader('Content-Type', 'image/png');
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=86400');
  res.end(png);
}
