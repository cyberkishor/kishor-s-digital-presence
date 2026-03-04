import type { IncomingMessage, ServerResponse } from 'http';
import { createElement } from 'react';
import satori from 'satori';
import sharp from 'sharp';
import { readFileSync } from 'fs';
import { join } from 'path';

// Load font once, lazily.
let interRegular: ArrayBuffer | null = null;
let interBold: ArrayBuffer | null = null;
let fontsLoaded = false;

function loadFonts() {
  if (fontsLoaded) return;
  fontsLoaded = true;
  const dirs = [
    join(process.cwd(), 'api', 'fonts'),
    join(process.cwd(), 'fonts'),
    join(__dirname, 'fonts'),
    __dirname,
  ];
  for (const dir of dirs) {
    try {
      const r = readFileSync(join(dir, 'inter-400.ttf'));
      const b = readFileSync(join(dir, 'inter-700.ttf'));
      interRegular = r.buffer.slice(r.byteOffset, r.byteOffset + r.byteLength) as ArrayBuffer;
      interBold    = b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength) as ArrayBuffer;
      return;
    } catch { /* try next dir */ }
  }
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  loadFonts();

  const url = new URL(req.url!, `https://${req.headers.host}`);
  const title       = url.searchParams.get('title')       || 'Portfolio';
  const description = url.searchParams.get('description') || 'Developer Portfolio';
  const type        = url.searchParams.get('type')        || 'website';
  const authorName  = url.searchParams.get('name')        || 'Developer';
  const authorRole  = url.searchParams.get('role')        || 'Full-Stack Developer';
  const siteHost    = url.searchParams.get('site')        || 'example.com';
  const accent      = url.searchParams.get('accent')      || '#6366f1';

  const typeLabel =
    type === 'article' ? '✍  Blog Post' :
    type === 'project' ? '⚡  Project'   : null;

  const titleFontSize = title.length > 40 ? 44 : 56;

  // Fetch logo from same origin
  let logoUrl = '';
  try {
    const origin = `https://${req.headers.host}`;
    const logoRes = await fetch(`${origin}/logo.jpg`);
    if (logoRes.ok) {
      const buf = await logoRes.arrayBuffer();
      logoUrl = `data:image/jpeg;base64,${Buffer.from(buf).toString('base64')}`;
    }
  } catch { /* no logo */ }

  const fonts = [];
  if (interRegular) fonts.push({ name: 'Inter', data: interRegular, weight: 400 as const, style: 'normal' as const });
  if (interBold)    fonts.push({ name: 'Inter', data: interBold,    weight: 700 as const, style: 'normal' as const });
  const fontFamily = fonts.length ? 'Inter' : 'sans-serif';

  const el = createElement('div', {
    style: {
      width: '1200px',
      height: '630px',
      display: 'flex',
      flexDirection: 'column',
      background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 100%)',
      padding: '72px',
      fontFamily,
      position: 'relative',
    },
  },
    // Decorative circles
    createElement('div', { style: { position: 'absolute', right: '-60px', top: '-60px', width: '440px', height: '440px', borderRadius: '50%', background: accent, opacity: 0.07 } }),
    createElement('div', { style: { position: 'absolute', left: '-30px', bottom: '-30px', width: '360px', height: '360px', borderRadius: '50%', background: accent, opacity: 0.06 } }),

    // Type badge
    typeLabel && createElement('div', {
      style: {
        display: 'flex',
        alignSelf: 'flex-start',
        background: accent + '20',
        border: `1px solid ${accent}40`,
        borderRadius: '18px',
        padding: '6px 20px',
        marginBottom: '24px',
        color: accent,
        fontSize: '16px',
        fontWeight: 500,
      },
    }, typeLabel),

    // Title
    createElement('div', {
      style: {
        color: '#ffffff',
        fontSize: `${titleFontSize}px`,
        fontWeight: 700,
        lineHeight: 1.15,
        letterSpacing: '-1px',
        marginBottom: '16px',
        maxWidth: '680px',
      },
    }, title.length > 50 ? title.substring(0, 50) + '…' : title),

    // Description
    createElement('div', {
      style: {
        color: '#94a3b8',
        fontSize: '22px',
        lineHeight: 1.5,
        marginBottom: '28px',
        maxWidth: '680px',
      },
    }, description.length > 80 ? description.substring(0, 80) + '…' : description),

    // Accent line
    createElement('div', { style: { width: '60px', height: '3px', background: accent, borderRadius: '2px', marginBottom: '32px' } }),

    // Author row
    createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '12px' } },
      logoUrl
        ? createElement('img', { src: logoUrl, width: 48, height: 48, style: { borderRadius: '50%', objectFit: 'cover' } })
        : createElement('div', {
            style: { width: '48px', height: '48px', borderRadius: '50%', background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '20px', fontWeight: 700 },
          }, authorName[0] || 'A'),
      createElement('div', { style: { display: 'flex', flexDirection: 'column' } },
        createElement('div', { style: { color: '#e2e8f0', fontSize: '16px', fontWeight: 600 } }, authorName),
        createElement('div', { style: { color: '#64748b', fontSize: '14px' } }, authorRole),
      ),
    ),

    // Code window (right side, absolute)
    createElement('div', {
      style: {
        position: 'absolute',
        right: '72px',
        top: '140px',
        width: '370px',
        height: '330px',
        background: 'rgba(255,255,255,0.027)',
        border: '1px solid rgba(255,255,255,0.063)',
        borderRadius: '14px',
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
      },
    },
      // Window dots
      createElement('div', { style: { display: 'flex', gap: '8px', marginBottom: '24px' } },
        createElement('div', { style: { width: '14px', height: '14px', borderRadius: '50%', background: '#ff5f57' } }),
        createElement('div', { style: { width: '14px', height: '14px', borderRadius: '50%', background: '#ffbd2e' } }),
        createElement('div', { style: { width: '14px', height: '14px', borderRadius: '50%', background: '#28ca41' } }),
      ),
      // Code lines
      ...[
        [200, accent + '65'], [280, 'rgba(255,255,255,0.133)'],
        [240, accent + '55'], [260, 'rgba(255,255,255,0.094)'],
        [200, accent + '50'], [220, 'rgba(255,255,255,0.125)'],
        [300, accent + '45'], [240, 'rgba(255,255,255,0.082)'],
        [180, accent + '65'], [260, 'rgba(255,255,255,0.125)'],
        [160, accent + '55'], [220, 'rgba(255,255,255,0.094)'],
      ].map(([w, bg], i) =>
        createElement('div', {
          key: String(i),
          style: {
            width: `${w}px`,
            height: '8px',
            background: String(bg),
            borderRadius: '4px',
            marginBottom: '12px',
            marginLeft: i % 2 === 1 ? '20px' : '0',
          },
        }),
      ),
    ),

    // Footer separator + host
    createElement('div', {
      style: {
        position: 'absolute',
        bottom: '40px',
        left: '72px',
        right: '72px',
        display: 'flex',
        flexDirection: 'column',
        gap: '0',
      },
    },
      createElement('div', { style: { height: '1px', background: 'rgba(255,255,255,0.063)', marginBottom: '16px' } }),
      createElement('div', { style: { color: '#475569', fontSize: '16px' } }, siteHost),
    ),

    // Bottom accent bar
    createElement('div', {
      style: {
        position: 'absolute',
        bottom: '0',
        left: '0',
        right: '0',
        height: '4px',
        background: accent,
      },
    }),
  );

  const svg = await satori(el, {
    width: 1200,
    height: 630,
    fonts,
  });

  const png = await sharp(Buffer.from(svg)).png().toBuffer();

  res.setHeader('Content-Type', 'image/png');
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=86400');
  res.end(png);
}
