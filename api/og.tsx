import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

// Fetch Inter font for better text rendering
async function loadFont(url: string) {
  const res = await fetch(url);
  return res.arrayBuffer();
}

export default async function handler(req: Request) {
  const { searchParams, origin } = new URL(req.url);

  const title = searchParams.get('title') || 'Kishor Kumar Mahato';
  const description = searchParams.get('description') || 'Senior Full-Stack Developer';
  const type = searchParams.get('type') || 'website';
  const authorName = searchParams.get('name') || 'Kishor Kumar Mahato';
  const authorRole = searchParams.get('role') || 'Senior Full-Stack Developer';
  const siteHost = searchParams.get('site') || 'kishorkumarmahato.com.np';

  const typeLabel = type === 'article' ? '✍ Blog Post' : type === 'project' ? '⚡ Project' : null;

  // Fetch font and logo in parallel
  let fontData: ArrayBuffer | undefined;
  let logoSrc: string | undefined;

  await Promise.allSettled([
    loadFont('https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff')
      .then((d) => { fontData = d; }),
    fetch(`${origin}/logo.jpg`)
      .then((r) => r.ok ? r.arrayBuffer() : null)
      .then((buf) => {
        if (!buf) return;
        // Convert ArrayBuffer to base64 (Edge Runtime safe)
        const bytes = new Uint8Array(buf);
        let binary = '';
        bytes.forEach((b) => { binary += String.fromCharCode(b); });
        logoSrc = `data:image/jpeg;base64,${btoa(binary)}`;
      }),
  ]);

  const options: ConstructorParameters<typeof ImageResponse>[1] = {
    width: 1200,
    height: 630,
    ...(fontData
      ? {
          fonts: [
            {
              name: 'Inter',
              data: fontData,
              style: 'normal',
              weight: 400,
            },
          ],
        }
      : {}),
  };

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#0f0f0f',
          fontFamily: fontData ? 'Inter' : 'system-ui, sans-serif',
          position: 'relative',
        }}
      >
        {/* Background gradient blobs */}
        <div
          style={{
            position: 'absolute',
            top: -60,
            right: -60,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, #6366f118 0%, transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -80,
            left: -80,
            width: 360,
            height: 360,
            borderRadius: '50%',
            background: 'radial-gradient(circle, #8b5cf614 0%, transparent 70%)',
          }}
        />

        {/* Main content */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'row',
            padding: '60px 72px',
            gap: 48,
          }}
        >
          {/* Left column */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: 0,
            }}
          >
            {/* Type badge */}
            {typeLabel && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: 20,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '6px 16px',
                    borderRadius: 20,
                    background: '#6366f120',
                    border: '1px solid #6366f140',
                    color: '#a5b4fc',
                    fontSize: 16,
                    fontWeight: 500,
                  }}
                >
                  {typeLabel}
                </div>
              </div>
            )}

            {/* Title */}
            <div
              style={{
                fontSize: title.length > 40 ? 44 : 56,
                fontWeight: 700,
                color: '#ffffff',
                lineHeight: 1.15,
                letterSpacing: '-1px',
                marginBottom: 20,
              }}
            >
              {title}
            </div>

            {/* Description */}
            <div
              style={{
                fontSize: 22,
                color: '#94a3b8',
                lineHeight: 1.5,
                display: '-webkit-box',
                WebkitLineClamp: 3,
                overflow: 'hidden',
              }}
            >
              {description}
            </div>

            {/* Divider */}
            <div
              style={{
                width: 60,
                height: 3,
                borderRadius: 2,
                background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
                marginTop: 32,
                marginBottom: 32,
              }}
            />

            {/* Author row */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}
            >
              {logoSrc ? (
                <img
                  src={logoSrc}
                  width={48}
                  height={48}
                  style={{ borderRadius: '50%', objectFit: 'cover' }}
                />
              ) : (
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 20,
                    fontWeight: 700,
                    color: '#fff',
                  }}
                >
                  K
                </div>
              )}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <div style={{ fontSize: 16, fontWeight: 600, color: '#e2e8f0' }}>
                  {authorName}
                </div>
                <div style={{ fontSize: 14, color: '#64748b' }}>
                  {authorRole}
                </div>
              </div>
            </div>
          </div>

          {/* Right column — decorative code block */}
          <div
            style={{
              width: 320,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: '100%',
                borderRadius: 16,
                background: '#ffffff08',
                border: '1px solid #ffffff12',
                padding: '20px 24px',
                display: 'flex',
                flexDirection: 'column',
                gap: 0,
              }}
            >
              {/* Window dots */}
              <div style={{ display: 'flex', gap: 6, marginBottom: 20 }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57' }} />
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffbd2e' }} />
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28ca41' }} />
              </div>
              {/* Code lines */}
              {[
                { w: '70%', c: '#6366f170' },
                { w: '90%', c: '#ffffff25' },
                { w: '55%', c: '#8b5cf670' },
                { w: '80%', c: '#ffffff20' },
                { w: '65%', c: '#6366f150' },
                { w: '75%', c: '#ffffff22' },
                { w: '45%', c: '#8b5cf655' },
                { w: '85%', c: '#ffffff18' },
                { w: '60%', c: '#6366f165' },
                { w: '70%', c: '#ffffff20' },
                { w: '40%', c: '#8b5cf660' },
                { w: '78%', c: '#ffffff15' },
              ].map((line, i) => (
                <div
                  key={i}
                  style={{
                    height: 8,
                    borderRadius: 4,
                    background: line.c,
                    width: line.w,
                    marginBottom: 12,
                    marginLeft: i % 3 !== 0 ? 16 : 0,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 72px',
            borderTop: '1px solid #ffffff10',
          }}
        >
          <div style={{ fontSize: 16, color: '#475569' }}>
            {siteHost}
          </div>
          {/* Tech tags */}
          <div style={{ display: 'flex', gap: 8 }}>
            {['Shopify', 'React', 'Laravel', 'Next.js'].map((tag) => (
              <div
                key={tag}
                style={{
                  padding: '4px 12px',
                  borderRadius: 6,
                  background: '#ffffff08',
                  border: '1px solid #ffffff12',
                  color: '#64748b',
                  fontSize: 13,
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom accent line */}
        <div
          style={{
            height: 4,
            background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #6366f1)',
          }}
        />
      </div>
    ),
    options
  );
}
