# AGENTS.md — Qwykz Web

Guidance, architectural ground truths, and verification protocols for AI agents and developers working on the Qwykz documentation website.

---

## 1. Project Purpose & Relationship to @qwykz

`qwykz-web` is the official documentation, tutorial hub, and interactive showcase for **Qwykz** (`/home/marc/projects/qwykz`), the inspectable multi-stack project scaffolder.

### Primary Goals
- **Interactive Documentation**: Teach developers and beginners how to scaffold backends, frontends, and fullstack monorepos in seconds.
- **Un-slopped UI/UX**: Deliver a crisp, utilitarian terminal aesthetic built with React 19 and Tailwind CSS v4. No generic AI templates, floating blurs, or low-contrast widgets.
- **Humanized Technical Writing**: Explain complex staging concepts, capability matrices, and CLI flags in conversational plain English. Zero AI buzzwords (no "delve", "leverage", "testament", "cutting-edge landscape").
- **Zero Hallucinations**: Every command, preset name, flag, and database combination shown must exist in the real Qwykz engine.

---

## 2. Ground Truth Anchors

Before documenting or implementing any Qwykz CLI feature, verify against the core engine:

| Truth Anchor | Location in `@qwykz` | Purpose |
| :--- | :--- | :--- |
| **Capability Matrix** | `../qwykz/capability-matrix.json` | The single source of truth for supported stacks, databases, and auth combinations |
| **CLI Types** | `../qwykz/src/types.ts` | Complete TypeScript interfaces for `ScaffoldOptions`, `Preset`, and flags |
| **Preset Definitions** | `../qwykz/src/presets.ts` | Tested preset names (`api-rust`, `api-go`, `fullstack-react-elysia`, etc.) and aliases |
| **Preset Documentation** | `../qwykz/docs/presets.md` | Official catalog and flag override behavior |
| **System Guide** | `../qwykz/QWYKZ_PERSONAL_SYSTEM_GUIDE.md` | In-depth architecture breakdown of the staging pipeline and manifest |
| **Core Agent Rules** | `../qwykz/AGENTS.md` | Architectural invariants, test gates, and design philosophy |

### Upstream Verification & Synchronization Commands
Never guess what was updated in the core engine. Use the built-in sync scripts:

```bash
# Check if qwykz-web is drifted from core engine (version, matrix, commits)
bun run check:upstream

# Automatically pull latest version, capability matrix, and commit state
bun run sync:upstream
```

---

## 3. Tech Stack & Conventions

- **Framework**: React 19 (`react`, `react-dom`)
- **Build Tool**: Vite 8 with React Compiler Babel preset
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`, modern CSS `@import "tailwindcss";`, no legacy `tailwind.config.js`)
- **Linter**: `oxlint` (`bun run lint`)
- **Type Checker**: TypeScript 6 (`bunx tsc -b`)
- **Runtime**: Bun (`bun run dev`, `bun run build`)

---

## 4. Outer-Loop Engineering Protocol

When building, modifying, or refactoring the website, follow the verification cycle before concluding any task:

```
[Sync Check] ──> [Plan] ──> [Act / Implement] ──> [Verification Triad] ──> [Review / Ship]
```

### The Verification Triad
Every code change must pass this triad cleanly:

```bash
# 1. Upstream drift check
bun run check:upstream

# 2. Linting (oxlint)
bun run lint

# 3. TypeScript compilation & Production build
bun run build
```

---

## 5. Specialized Agent Squad (`qwykz-web-plugin`)

The project is supported by a 4-agent squad configured in `~/.gemini/antigravity-cli/config/plugins/qwykz-web-plugin/`:

1. **`qwykz-web-builder`**: Frontend Systems Engineer & UI Component Architect. Implements React 19 components, interactive preset selectors, copyable command generators, and Tailwind CSS v4 layouts.
2. **`qwykz-doc-humanizer`**: Technical Documentation Writer & Developer Educator. Writes clean, plain-English tutorials and guides following the 24 Humanizer rules.
3. **`qwykz-ui-reviewer`**: Principal UI/UX Design & Aesthetic Quality Auditor. Audits against AI slop, evaluates the Design Feasibility & Impact Index (DFII), and checks WCAG AA accessibility.
4. **`qwykz-loop-verifier`**: Outer-Loop Engineering & Contract Verification Specialist. Cross-checks claims against `../qwykz/capability-matrix.json` and enforces the verification triad.
