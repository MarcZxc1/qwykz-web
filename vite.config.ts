import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import { defineConfig, type Plugin } from "vite";
import tailwindcss from "@tailwindcss/vite";

function visitorApiDevPlugin(): Plugin {
  return {
    name: "visitor-api-dev",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url && req.url.startsWith("/api/visitors")) {
          try {
            const hitsUrl = "https://hits.sh/qwykz-web.vercel.app.svg?label=visitors";
            const upstream = await fetch(hitsUrl, {
              headers: { "User-Agent": "qwykz-dev" },
            });
            if (upstream.ok) {
              const svg = await upstream.text();
              const match = svg.match(/<title>visitors: ([0-9,]+)<\/title>/);
              const count = match ? parseInt(match[1].replace(/,/g, ""), 10) : null;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ count, provider: "hits-dev" }));
              return;
            }
          } catch {
            // fallback handled below
          }
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ count: null, provider: "mock-dev" }));
          return;
        }
        next();
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    babel({ presets: [reactCompilerPreset()] }),
    visitorApiDevPlugin(),
  ],
});
