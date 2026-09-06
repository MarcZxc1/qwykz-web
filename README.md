# ⚡ qwykz-web

The official documentation, capability matrix explorer, and interactive project builder for [**`qwykz`**](https://github.com/MarcZxc1/qwykz).

Built with **React 19**, **Vite 8**, **Tailwind CSS v4**, and **Oxlint**.

---

## Features

- **Interactive Command Builder**: Configure frameworks, databases, auth providers, caching, and ORMs with live CLI command and argument generation.
- **Dynamic Capability Matrix**: Real-time compatibility grid reflecting the 84 verified framework combinations from the core engine.
- **Preset Catalog**: Visual browser for curated stack presets (`api-rust`, `api-go`, `web-nextjs`, `fullstack-hono`, and more).
- **Interactive Terminal & Learn Mode**: Previews of educational flags (`--learn`) and `AGENTS.md` context packs.
- **Automated Upstream Sync**: Synchronized directly with the core `qwykz` CLI engine via `scripts/sync-qwykz.ts`.

---

## Development

### Install Dependencies
```bash
bun install
```

### Start Development Server
```bash
bun run dev
```

### Upstream Verification & Sync
Verify alignment with the upstream `qwykz` core engine:
```bash
# Check if web is in sync with ../qwykz
bun run check:upstream

# Pull matrix and version updates from ../qwykz
bun run sync:upstream
```

### Production Build & Lint
```bash
bun run lint
bun run build
```

---

## Deployment

Deployable as a zero-config static application on [Vercel](https://vercel.com), Cloudflare Pages, or Netlify. Includes production security headers and immutable caching via `vercel.json`.

---

## License

[MIT](https://github.com/MarcZxc1/qwykz/blob/main/LICENSE) © [Marc](https://github.com/MarcZxc1)
