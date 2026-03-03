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

export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), localFileApiPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
