import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import type { Plugin } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Plugin: exposes /__local?path=... endpoints for reading/writing local files.
// Only useful when VITE_USE_LOCAL_FILES=true in .env.local
function localFileApiPlugin(): Plugin {
  return {
    name: "local-file-api",
    configureServer(server) {
      server.middlewares.use("/__local", (req, res) => {
        const url = new URL(req.url!, "http://localhost");
        const filePath = url.searchParams.get("path");

        if (!filePath) {
          res.statusCode = 400;
          res.end(JSON.stringify({ error: "missing path param" }));
          return;
        }

        const absPath = path.join(__dirname, filePath);

        // Security: only allow paths inside the project root
        if (!absPath.startsWith(__dirname + path.sep) && absPath !== __dirname) {
          res.statusCode = 403;
          res.end(JSON.stringify({ error: "path outside project root" }));
          return;
        }

        res.setHeader("Content-Type", "application/json");

        if (req.method === "GET") {
          try {
            const content = fs.readFileSync(absPath, "utf-8");
            res.end(JSON.stringify({ content }));
          } catch {
            res.statusCode = 404;
            res.end(JSON.stringify({ error: "not found" }));
          }
        } else if (req.method === "PUT") {
          let body = "";
          req.on("data", (chunk) => { body += chunk; });
          req.on("end", () => {
            try {
              const { content } = JSON.parse(body);
              fs.mkdirSync(path.dirname(absPath), { recursive: true });
              fs.writeFileSync(absPath, content, "utf-8");
              res.end(JSON.stringify({ ok: true }));
            } catch (e) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: String(e) }));
            }
          });
        } else if (req.method === "DELETE") {
          try {
            fs.unlinkSync(absPath);
            res.end(JSON.stringify({ ok: true }));
          } catch {
            res.statusCode = 404;
            res.end(JSON.stringify({ error: "not found" }));
          }
        } else {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: "method not allowed" }));
        }
      });
    },
  };
}

// Plugin: serves /api/og?title=&description=&type= as SVG in local dev
function ogImagePlugin(): Plugin {
  // Load logo once as base64 when plugin initialises
  let logoDataUrl = "";
  const logoPath = path.join(__dirname, "public", "logo.jpg");
  try {
    logoDataUrl = `data:image/jpeg;base64,${fs.readFileSync(logoPath).toString("base64")}`;
  } catch {
    // logo missing — fall back to gradient initial
  }

  return {
    name: "og-image-api",
    configureServer(server) {
      server.middlewares.use("/api/og", (req, res) => {
        const url = new URL(req.url!, "http://localhost");
        const title = url.searchParams.get("title") || "Kishor Kumar Mahato";
        const description = url.searchParams.get("description") || "Senior Full-Stack Developer";
        const type = url.searchParams.get("type") || "website";
        const authorName = url.searchParams.get("name") || "Kishor Kumar Mahato";
        const authorRole = url.searchParams.get("role") || "Senior Full-Stack Developer";
        const siteHost = url.searchParams.get("site") || "kishorkumarmahato.com.np";

        const typeLabel =
          type === "article" ? "✍ Blog Post" :
          type === "project" ? "⚡ Project" : null;

        const titleFontSize = title.length > 40 ? 44 : 56;
        const avatarY = typeLabel ? 360 : 330;

        // Avatar: real logo or gradient fallback
        const avatarSvg = logoDataUrl
          ? `<defs><clipPath id="logoClip"><circle cx="96" cy="${avatarY}" r="24"/></clipPath></defs>
             <image href="${logoDataUrl}" x="72" y="${avatarY - 24}" width="48" height="48" clip-path="url(#logoClip)" preserveAspectRatio="xMidYMid slice"/>`
          : `<circle cx="96" cy="${avatarY}" r="24" fill="url(#accent)"/>
             <text x="96" y="${avatarY + 8}" font-family="system-ui,sans-serif" font-size="20" font-weight="700" fill="#fff" text-anchor="middle">K</text>`;

        const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f0f0f"/>
      <stop offset="100%" stop-color="#1a1a2e"/>
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#6366f1"/>
      <stop offset="100%" stop-color="#8b5cf6"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="1050" cy="100" r="220" fill="#6366f1" opacity="0.07"/>
  <circle cx="150" cy="530" r="180" fill="#8b5cf6" opacity="0.06"/>
  ${typeLabel ? `
  <rect x="72" y="90" width="${typeLabel.length * 11}" height="36" rx="18" fill="#6366f120"/>
  <rect x="72" y="90" width="${typeLabel.length * 11}" height="36" rx="18" fill="none" stroke="#6366f140" stroke-width="1"/>
  <text x="${72 + (typeLabel.length * 11) / 2}" y="114" font-family="system-ui,sans-serif" font-size="16" font-weight="500" fill="#a5b4fc" text-anchor="middle">${typeLabel}</text>
  ` : ""}
  <text x="72" y="${typeLabel ? 210 : 180}" font-family="system-ui,sans-serif" font-size="${titleFontSize}" font-weight="700" fill="#ffffff" letter-spacing="-1">${escXml(title.substring(0, 50))}${title.length > 50 ? "…" : ""}</text>
  <text x="72" y="${typeLabel ? 260 : 230}" font-family="system-ui,sans-serif" font-size="22" fill="#94a3b8">${escXml(description.substring(0, 80))}${description.length > 80 ? "…" : ""}</text>
  <rect x="72" y="${typeLabel ? 296 : 266}" width="60" height="3" rx="2" fill="url(#accent)"/>
  ${avatarSvg}
  <text x="132" y="${avatarY - 6}" font-family="system-ui,sans-serif" font-size="16" font-weight="600" fill="#e2e8f0">${escXml(authorName)}</text>
  <text x="132" y="${avatarY + 15}" font-family="system-ui,sans-serif" font-size="14" fill="#64748b">${escXml(authorRole)}</text>
  <rect x="760" y="140" width="370" height="330" rx="14" fill="#ffffff07" stroke="#ffffff10" stroke-width="1"/>
  <circle cx="790" cy="168" r="7" fill="#ff5f57"/>
  <circle cx="812" cy="168" r="7" fill="#ffbd2e"/>
  <circle cx="834" cy="168" r="7" fill="#28ca41"/>
  <rect x="780" y="192" width="200" height="8" rx="4" fill="#6366f165"/>
  <rect x="780" y="212" width="280" height="8" rx="4" fill="#ffffff22"/>
  <rect x="800" y="232" width="240" height="8" rx="4" fill="#8b5cf660"/>
  <rect x="800" y="252" width="260" height="8" rx="4" fill="#ffffff18"/>
  <rect x="800" y="272" width="200" height="8" rx="4" fill="#6366f150"/>
  <rect x="780" y="292" width="220" height="8" rx="4" fill="#ffffff20"/>
  <rect x="780" y="312" width="300" height="8" rx="4" fill="#8b5cf640"/>
  <rect x="800" y="332" width="240" height="8" rx="4" fill="#ffffff15"/>
  <rect x="800" y="352" width="180" height="8" rx="4" fill="#6366f160"/>
  <rect x="780" y="372" width="260" height="8" rx="4" fill="#ffffff20"/>
  <rect x="780" y="392" width="160" height="8" rx="4" fill="#8b5cf655"/>
  <rect x="780" y="412" width="220" height="8" rx="4" fill="#ffffff18"/>
  <line x1="0" y1="590" x2="1200" y2="590" stroke="#ffffff10" stroke-width="1"/>
  <text x="72" y="614" font-family="system-ui,sans-serif" font-size="16" fill="#475569">${escXml(siteHost)}</text>
  <rect x="0" y="626" width="1200" height="4" fill="url(#accent)"/>
</svg>`;

        res.setHeader("Content-Type", "image/svg+xml");
        res.setHeader("Cache-Control", "public, max-age=3600");
        res.end(svg);
      });
    },
  };
}

function escXml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), localFileApiPlugin(), ogImagePlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
