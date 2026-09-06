import type { DocSection, QuickstartStep } from "../types/doc";

export const QUICKSTART_STEPS: QuickstartStep[] = [
  {
    step: 1,
    title: "Run the scaffolder",
    command: "bunx qwykz@latest",
    explanation: "You do not need to install anything globally. Bun executes the latest version directly in your terminal.",
    tip: "If you prefer Node.js, run 'npx qwykz@latest' instead.",
  },
  {
    step: 2,
    title: "Pick a stack or use a preset",
    command: "bunx qwykz@latest --preset react-rust --name my-app",
    explanation: "Step through the interactive prompts, or pass a preset name to jump straight to code.",
    tip: "Use '--list-presets' to see all 17 tested combinations.",
  },
  {
    step: 3,
    title: "Start your services",
    command: "cd my-app && docker compose up -d",
    explanation: "Qwykz generates your Docker Compose file with pre-configured health checks and database volumes.",
  },
  {
    step: 4,
    title: "Build with AI or by Hand",
    command: "claude # or codex / cursor",
    explanation: "Qwykz generates an AGENTS.md context pack for AI tools (Claude Code, OpenAI Codex, Cursor) and a LEARN.md / GUIDE.md for developers.",
    tip: "Add '--learn' to generate a milestone-by-milestone hands-on learning workspace.",
  },
];

export const DOC_SECTIONS: DocSection[] = [
  {
    id: "overview",
    title: "What is Qwykz?",
    category: "guide",
    summary: "A fast project builder that sets up real code, databases, and AI guides in seconds.",
    content: `Starting a new project often eats an entire afternoon. You have to configure Docker Compose, write database connection pools, configure auth tokens, set CORS headers, align port numbers between frontend and backend, and explain the whole setup to your AI coding tools.

Qwykz takes care of that repetitive setup in seconds.

Instead of generic boilerplate filled with placeholder comments, Qwykz generates production-ready code with type-safe models, database migrations, running Docker services, and companion guides:
- **AGENTS.md**: Context pack for AI coding assistants (Claude Code, Cursor, OpenAI Codex, Copilot).
- **LEARN.md**: Architecture and framework methods guide for human developers.
- **GUIDE.md**: Progressive 6-milestone learning roadmap in \`--learn\` mode.`,
    codeSnippet: {
      language: "bash",
      caption: "Try a preset right now without installing anything",
      code: "# Scaffold a Rust Axum API with PostgreSQL & Redis\nbunx qwykz@latest --preset rust --name payment-api\n\n# Or build a React + Go Fiber fullstack app\nbunx qwykz@latest --preset react-go --name dashboard\n\n# Or learn Hono step-by-step with a hands-on skeleton\nbunx qwykz@latest --preset hono --learn --name hono-learning",
    },
  },
  {
    id: "ai-pair-programming",
    title: "Pair Programming with AI (Claude, Cursor, Codex)",
    category: "guide",
    summary: "How Qwykz eliminates AI hallucinations, saves token quota, and turns Claude Code, Cursor, or Codex into true mentors.",
    content: `Coding with an AI assistant should feel like pair-programming with a smart senior engineer, not babysitting an assistant who keeps guessing your server ports and database configurations.

### The Real Problem With AI on Blank Projects
When you open an empty folder in Claude Code, Cursor, Codex CLI, or Copilot and ask it to build an API from scratch:
1. **It guesses architecture**: It creates a database connection per request instead of pooling connections.
2. **It invents conflicting ports**: It runs your frontend and backend on port 3000, causing port clashes.
3. **It burns your token quota**: The AI spends 15+ tool calls exploring folders just to figure out what stack you're using.
4. **It spoon-feeds code**: If you're trying to learn, it dumps 500 lines of completed code, robbing you of intuition.

### How Qwykz Solves This
Qwykz lays down the architectural ground truth *first*:
- **Pre-Configured Docker & Connection Pools**: Database containers, health checks, and connection pools are already running.
- **AGENTS.md Context Pack**: The AI reads this file on its very first turn. It immediately knows the exact backend port (e.g. 8080 for Rust, 3000 for Go), the exact test command, and where routes live.
- **Mentorship in \`--learn\` Mode**: In hands-on mode, \`AGENTS.md\` explicitly instructs the AI: *"The developer is in learning mode. Do not write full code for them. Ask guiding questions, explain concepts, and help them through the milestones."*`,
    codeSnippet: {
      language: "bash",
      caption: "Scaffold with Qwykz and launch your AI immediately",
      code: "# 1. Scaffold your stack in 10 seconds\nbunx qwykz@latest --preset api-rust --name payments\n\n# 2. Start services\ncd payments && docker compose up -d\n\n# 3. Open your AI tool — it reads AGENTS.md immediately\nclaude # or codex / cursor",
    },
  },
  {
    id: "learn-mode",
    title: "Hands-On Learn Mode (--learn)",
    category: "guide",
    summary: "Master new frameworks by building them yourself milestone-by-milestone without spoon-feeding.",
    content: `When learning a new backend framework (like Rust Axum, Go Fiber, or Hono), dumping 30 finished files into your workspace hurts learning. You don't know what code does what, and copying code doesn't build intuition.

Qwykz provides a dedicated hands-on learning mode via \`--learn\`:

1. **Clean Skeleton**: Generates directory layout, package configurations (\`package.json\`, \`Cargo.toml\`, \`go.mod\`, \`tsconfig.json\`), and Docker setups.
2. **Zero Pre-Finished Business Code**: Finished routes, controllers, and services are stripped and replaced with \`.gitkeep\` files.
3. **GUIDE.md Milestone Roadmap**: Structured into 6 progressive milestones:
   - **Milestone 1**: Environment & Tooling Verification
   - **Milestone 2**: Minimal Server Boot & Health Check (\`GET /api/health\`)
   - **Milestone 3**: Database Connection & Migrations
   - **Milestone 4**: Core Business CRUD Endpoints
   - **Milestone 5**: Input Validation & Error Handling
   - **Milestone 6**: Authentication & Route Protection
4. **Not Spoon-Fed**: The guide explains the architectural concept, lists the exact methods to use, and gives you a terminal verification command (curl / test) so you write the code yourself.
5. **AI Mentorship**: In \`--learn\` mode, \`AGENTS.md\` instructs AI coding agents to act as mentors rather than writing the code for you.`,
    codeSnippet: {
      language: "bash",
      caption: "Scaffold a hands-on learning workspace",
      code: "# Generate a guided skeleton for Rust Axum\nbunx qwykz@latest --preset api-rust --learn --name rust-learn\n\n# Generate a guided skeleton for Hono\nbunx qwykz@latest --preset api-hono --learn --name hono-learn",
    },
  },
  {
    id: "presets",
    title: "Curated Stack Presets (17 Stacks)",
    category: "reference",
    summary: "Zero-configuration stack presets spanning Rust, Go, Python, TypeScript, and Fullstack.",
    content: `Qwykz includes 17 curated stack presets covering the most popular modern architectures:

### Standalone Backend APIs (7)
- \`api-rust\` (alias \`rust\`): Rust Axum + Docker PostgreSQL + Redis
- \`api-go\` (alias \`go\`): Go Fiber + Docker PostgreSQL + Redis
- \`api-python\` (alias \`python\`, \`fastapi\`): FastAPI + Docker PostgreSQL + Redis
- \`api-elysia\` (alias \`elysia\`, \`bun\`): Elysia on Bun + Docker PostgreSQL + Redis
- \`api-hono\` (alias \`hono\`): Hono on Bun + Docker PostgreSQL + Redis
- \`api-express\` (alias \`express\`, \`node\`): Express + TypeScript + Zod/Helmet/CORS
- \`api-laravel\` (alias \`laravel\`): Laravel 11/12 + Docker PostgreSQL + Redis

### Fullstack Monorepos (7)
- \`fullstack-react-rust\` (alias \`react-rust\`): React 19 Vite + Rust Axum (port 8080)
- \`fullstack-react-go\` (alias \`react-go\`): React 19 Vite + Go Fiber (port 3000)
- \`fullstack-react-elysia\` (alias \`react-elysia\`): React 19 Vite + Elysia Bun (port 3000)
- \`fullstack-react-hono\` (alias \`react-hono\`): React 19 Vite + Hono Bun (port 3000)
- \`fullstack-react-express\` (alias \`react-express\`): React 19 Vite + Express (port 3000)
- \`fullstack-react-fastapi\` (alias \`react-python\`): React 19 Vite + FastAPI (port 8000)
- \`fullstack-vue-hono\` (alias \`vue-hono\`): Vue 3 Vite + Hono Bun (port 3000)

### Web & Frontend SPAs (3)
- \`web-nextjs\` (alias \`nextjs\`, \`saas\`): Next.js App Router + Docker Postgres + Redis
- \`web-react\` (alias \`react\`): React 19 SPA + Vite + Tailwind CSS v4
- \`web-vue\` (alias \`vue\`): Vue 3 SPA + Vite + Tailwind CSS v4`,
    codeSnippet: {
      language: "bash",
      caption: "List and run presets directly",
      code: "# View full formatted presets catalog in your terminal\nbunx qwykz@latest --list-presets\n\n# Run any preset by canonical name or alias\nbunx qwykz@latest --preset react-hono --name app",
    },
  },
  {
    id: "capability-matrix",
    title: "Honest Capability Gating",
    category: "concepts",
    summary: "Why Qwykz stops invalid framework, database, and auth combinations before touching disk.",
    content: `Many generators let you select any random combination of tools, only to generate broken imports, incompatible drivers, or missing runtime dependencies.

Qwykz enforces **Honest Capability Gating** via \`capability-matrix.json\`:

- **Supported**: Fully tested end-to-end with deterministic in-memory planning and runtime verification.
- **Unsupported**: Blocked at validation time before any files are created on disk.

For example:
- Rust, Go Fiber, and Python FastAPI backends support local JWT and Redis caching, but reject unsupported client-side JS providers (like Clerk or Supabase Auth) before writing.
- Standalone React and Vue SPAs support local token storage, Supabase Auth, and Clerk Auth, but reject backend-only concerns like Docker Redis caching.
- All 10 supported frameworks and 17 presets are fully graduated to standard supported status.`,
    codeSnippet: {
      language: "bash",
      caption: "Capability validation behavior",
      code: "# Supported combinations scaffold directly without experimental flags\nbunx qwykz@latest --framework react --auth local --yes\nbunx qwykz@latest --preset api-laravel --yes\n\n# Invalid or incompatible combinations fail fast before touching disk\nbunx qwykz@latest --framework rust --auth clerk # Fails before write",
    },
  },
  {
    id: "staging-pipeline",
    title: "Inspectable Staging Pipeline",
    category: "concepts",
    summary: "Why your project folder never gets corrupted by half-finished scaffolding.",
    content: `Most scaffolding tools write files directly to your hard drive as they run. If a template has an error or if you cancel midway, you are left with half-written files and broken node_modules.

Qwykz works differently:

1. **In-Memory Plan**: Qwykz builds a complete map of every file and folder before touching your drive.
2. **Capability Check**: It checks your database, framework, and auth choices against capability-matrix.json. If a combination is invalid, it stops immediately.
3. **Isolated Staging**: Files are written into a temporary staging workspace.
4. **Validation**: It audits packages and validates file syntax.
5. **Atomic Commit**: Only after all checks pass does Qwykz move the finished project to your target folder.`,
    codeSnippet: {
      language: "bash",
      caption: "Preview every file before writing to disk",
      code: "# See the exact file tree and package audit without creating files\nbunx qwykz@latest --preset api-elysia --dry-run\n\n# Audit package justifications strictly\nbunx qwykz@latest --preset api-express --strict --dry-run\n\n# Inspect line-by-line diffs of generated templates\nbunx qwykz@latest --preset api-hono --dry-run --show-diff",
    },
  },
  {
    id: "agents-md",
    title: "AI-Native Context (AGENTS.md & LEARN.md)",
    category: "concepts",
    summary: "Factual context packs for AI pair programmers and human developers.",
    content: `When you open a newly scaffolded project in Claude Code, Cursor, Codex, or Copilot, the AI usually spends dozens of tool calls and thousands of tokens scanning your directory tree trying to figure out which port the backend runs on or how to run tests.

Every project scaffolded by Qwykz includes two companion context documents:

### 1. AGENTS.md (For AI Assistants)
- Documents exact backend and frontend ports (e.g. 8080 for Rust, 3000 for Go)
- Specifies the exact test commands and database migrations
- Explains the authentication flow and secret keys
- In \`--learn\` mode, instructs the AI to mentor rather than auto-complete

### 2. LEARN.md (For Developers)
- Maps the starting entry file and architectural layers
- Visualizes the request lifecycle with clean ASCII flowcharts
- Provides a syntax and framework methods reference table
- Guides you step-by-step on how to add new routes and models`,
    codeSnippet: {
      language: "markdown",
      caption: "Sample AGENTS.md generated automatically by Qwykz",
      code: "# AGENTS.md — my-service\n\n## Stack\n- Backend: Rust (Axum 0.7) on port 8080\n- Database: PostgreSQL (Docker Compose)\n- Cache: Redis (Docker Compose)\n- Auth: Local JWT (Argon2 password hashing)\n\n## Verification Triad\n- Build: cargo check\n- Test: cargo test\n- Docker: docker compose up -d",
    },
  },
  {
    id: "cli-reference",
    title: "CLI Flags Reference",
    category: "reference",
    summary: "Complete reference of all CLI flags supported by the Qwykz engine.",
    content: `You can run Qwykz interactively or pass flags for automated scripts and CI/CD pipelines.

### Core Generation Flags
- \`--preset <name-or-alias>\`: Use a curated stack preset (e.g. \`rust\`, \`go\`, \`react-hono\`).
- \`--name <project-name>\`: Set project name and target directory.
- \`--learn\`: Enable guided hands-on learning mode with \`GUIDE.md\` milestones.
- \`--yes\` / \`-y\`: Run non-interactively with sensible defaults or provided flags.
- \`--list-presets\`: Print the full preset catalog in an ASCII table and exit.

### Stack Configuration Flags
- \`--framework <framework>\`: Target framework (\`express\`, \`hono\`, \`elysia\`, \`rust\`, \`go\`, \`python\`, \`nextjs\`, \`laravel\`, \`react\`, \`vue\`, \`monorepo\`).
- \`--db <target>\`: Database target (\`docker\`, \`local\`, \`supabase\`, \`neon\`).
- \`--caching <target>\`: Caching store (\`docker\`, \`upstash\`, \`none\`).
- \`--auth <target>\`: Auth provider (\`local\`, \`supabase\`, \`clerk\`).
- \`--deploy <target>\`: Deployment overlay (\`docker\`, \`vercel\`, \`fly\`, \`render\`).

### Safety & Inspection Flags
- \`--dry-run\`: Preview the scaffold plan and file list without writing anything to disk.
- \`--show-diff\`: Render complete file diffs when previewing with \`--dry-run\`.
- \`--strict\`: Enforce strict package justifications and fail if an untracked package is added.
- \`--experimental\`: Allow experimental combinations from the capability matrix.
- \`--no-ai-context\`: Suppress generating \`AGENTS.md\`.
- \`--record-prompts\`: Save prompt answers to \`.qwykz-manifest.json\`.
- \`--verbose\`: Live-stream background shell command outputs.
- \`--version\` / \`-v\`: Print current qwykz version and exit.
- \`--help\` / \`-h\`: Print command options and usage guide and exit.`,
    codeSnippet: {
      language: "bash",
      caption: "Scripting example with verified flags",
      code: "# Automated non-interactive project setup with Docker PostgreSQL & Redis\nbunx qwykz@latest \\\n  --preset api-go \\\n  --name user-service \\\n  --db docker \\\n  --caching docker \\\n  --yes",
    },
  },
  {
    id: "plugins",
    title: "Plugin & Extensibility Engine",
    category: "concepts",
    summary: "Extend Qwykz with custom frameworks, auth providers, and deployment overlays.",
    content: `Qwykz includes an extensible plugin manifest system allowing teams to register custom framework templates, auth plugins, and deployment blueprints:

- \`qwykz plugin list\`: List installed and registered plugins.
- \`qwykz plugin install <name>\`: Install a community or enterprise plugin package.
- \`qwykz plugin init\`: Scaffold a new plugin repository with valid manifest schemas.`,
    codeSnippet: {
      language: "bash",
      caption: "Managing Qwykz plugins",
      code: "# List available plugins\nbunx qwykz@latest plugin list\n\n# Initialize a custom plugin\nbunx qwykz@latest plugin init my-custom-stack",
    },
  },
];
