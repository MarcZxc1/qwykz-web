#!/usr/bin/env bun
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { execSync } from "node:child_process";

interface SyncState {
  lastSyncedCommit: string;
  lastSyncedAt: string;
  version: string;
}

const UPSTREAM_DIR = resolve(process.cwd(), "../qwykz");
const SYNC_STATE_FILE = resolve(process.cwd(), ".qwykz-sync-state.json");
const VERSION_FILE = resolve(process.cwd(), "src/data/version.ts");
const MATRIX_FILE = resolve(process.cwd(), "src/data/matrix.ts");

const isSyncMode = process.argv.includes("--sync");

function getUpstreamGitInfo(dir: string) {
  try {
    const commit = execSync("git rev-parse HEAD", { cwd: dir, encoding: "utf8" }).trim();
    const shortCommit = commit.slice(0, 7);
    const commitMsg = execSync("git log -1 --pretty=format:%s", { cwd: dir, encoding: "utf8" }).trim();
    const commitDate = execSync("git log -1 --pretty=format:%ci", { cwd: dir, encoding: "utf8" }).trim();
    return { commit, shortCommit, commitMsg, commitDate };
  } catch {
    return null;
  }
}

function loadSyncState(): SyncState | null {
  if (!existsSync(SYNC_STATE_FILE)) return null;
  try {
    return JSON.parse(readFileSync(SYNC_STATE_FILE, "utf8"));
  } catch {
    return null;
  }
}

function run() {
  console.log("\x1b[1m\x1b[36m⚡ Qwykz Upstream Link & Sync Verifier\x1b[0m");
  console.log("Checking core engine at: " + UPSTREAM_DIR + "\n");

  if (!existsSync(UPSTREAM_DIR)) {
    console.error("\x1b[31m✖ Upstream directory not found at " + UPSTREAM_DIR + "\x1b[0m");
    process.exit(1);
  }

  const gitInfo = getUpstreamGitInfo(UPSTREAM_DIR);
  const syncState = loadSyncState();

  // 1. Check Package Version
  const upstreamPkgPath = resolve(UPSTREAM_DIR, "package.json");
  const upstreamPkg = JSON.parse(readFileSync(upstreamPkgPath, "utf8"));
  const upstreamVersion: string = upstreamPkg.version;

  const versionTsContent = existsSync(VERSION_FILE) ? readFileSync(VERSION_FILE, "utf8") : "";
  const versionMatch = versionTsContent.match(/QWYKZ_VERSION = ["']([^"']+)["']/);
  const webVersion = versionMatch ? versionMatch[1] : "unknown";

  const versionInSync = upstreamVersion === webVersion;

  // 2. Check Capability Matrix
  const upstreamMatrixPath = resolve(UPSTREAM_DIR, "capability-matrix.json");
  const upstreamMatrixJson = JSON.parse(readFileSync(upstreamMatrixPath, "utf8"));
  const upstreamMatrix = upstreamMatrixJson.matrix || {};

  // Count experimental vs standard in upstream matrix
  let upstreamExpCount = 0;
  let upstreamSuppCount = 0;
  for (const fw of Object.values<any>(upstreamMatrix)) {
    for (const s of Object.values<string>(fw.dbTargets || {})) {
      if (s === "experimental") upstreamExpCount++;
      if (s === "supported") upstreamSuppCount++;
    }
    for (const s of Object.values<string>(fw.authTargets || {})) {
      if (s === "experimental") upstreamExpCount++;
      if (s === "supported") upstreamSuppCount++;
    }
    for (const s of Object.values<string>(fw.cachingTargets || {})) {
      if (s === "experimental") upstreamExpCount++;
      if (s === "supported") upstreamSuppCount++;
    }
  }

  // 3. Print Status Table
  console.log("Upstream Git Commit: " + (gitInfo ? gitInfo.shortCommit + " ('" + gitInfo.commitMsg + "')" : "Unknown"));
  if (syncState) {
    console.log("Last Synced Commit:   " + syncState.lastSyncedCommit.slice(0, 7) + " (" + syncState.lastSyncedAt + ")");
  } else {
    console.log("Last Synced Commit:   None recorded");
  }

  console.log("\n--- Verification Checklist ---");
  console.log(
    (versionInSync ? "\x1b[32m✔\x1b[0m" : "\x1b[33m▲\x1b[0m") +
    " Engine Version:  qwykz@" + upstreamVersion + "  |  qwykz-web@" + webVersion
  );
  console.log(
    "\x1b[32m✔\x1b[0m Matrix Status:   " + upstreamSuppCount + " supported targets, " + upstreamExpCount + " experimental"
  );

  const gitInSync = syncState?.lastSyncedCommit === gitInfo?.commit;
  if (gitInfo && !gitInSync) {
    console.log("\x1b[33m▲ Core engine has new commits since last recorded sync state.\x1b[0m");
  } else if (gitInSync && versionInSync) {
    console.log("\x1b[32m✔ Website is fully synchronized with core engine commit " + gitInfo?.shortCommit + ".\x1b[0m");
  }

  if (isSyncMode) {
    console.log("\n\x1b[36mSyncing upstream state into qwykz-web...\x1b[0m");

    // 1. Update version.ts
    const newVersionContent = `// Single source of truth for Qwykz core engine version and upstream links.
// Automatically updated via \`bun run sync:upstream\`.

export const QWYKZ_VERSION = "${upstreamVersion}";
export const QWYKZ_REPO_URL = "https://github.com/MarcZxc1/qwykz";
export const QWYKZ_RELEASE_DATE = "${new Date().toISOString().split("T")[0]}";
export const QWYKZ_MIN_BUN_VERSION = "1.0.0";
`;
    writeFileSync(VERSION_FILE, newVersionContent, "utf8");
    console.log("  Updated " + VERSION_FILE);

    // 2. Update matrix.ts
    const newMatrixContent = `export type CapabilityStatus = "supported" | "experimental" | "unsupported";

export interface FrameworkMatrix {
  dbTargets: Record<string, CapabilityStatus>;
  authTargets: Record<string, CapabilityStatus>;
  cachingTargets: Record<string, CapabilityStatus>;
  dockerfile?: boolean;
  frontends?: string[];
}

export const CAPABILITY_MATRIX_DATA: Record<string, FrameworkMatrix> = ${JSON.stringify(upstreamMatrix, null, 2)};

export function evaluateCombination(
  framework: string,
  db: string,
  auth: string,
  caching: string
): { status: CapabilityStatus; reason?: string } {
  const fw = CAPABILITY_MATRIX_DATA[framework];
  if (!fw) return { status: "unsupported", reason: 'Unknown framework "' + framework + '"' };

  const dbStatus = fw.dbTargets[db] || "unsupported";
  const authStatus = fw.authTargets[auth] || "unsupported";
  const cachingStatus = fw.cachingTargets[caching] || "unsupported";

  if (dbStatus === "unsupported") {
    return { status: "unsupported", reason: framework + " does not support " + db + " database." };
  }
  if (authStatus === "unsupported") {
    return { status: "unsupported", reason: framework + " does not support " + auth + " auth." };
  }
  if (cachingStatus === "unsupported") {
    return { status: "unsupported", reason: framework + " does not support " + caching + " caching." };
  }

  if (dbStatus === "experimental" || authStatus === "experimental" || cachingStatus === "experimental") {
    return {
      status: "experimental",
      reason: "This combination is experimental. Use --experimental flag to allow scaffolding.",
    };
  }

  return { status: "supported" };
}
`;
    writeFileSync(MATRIX_FILE, newMatrixContent, "utf8");
    console.log("  Updated " + MATRIX_FILE);

    // 3. Record sync state
    if (gitInfo) {
      const newState: SyncState = {
        lastSyncedCommit: gitInfo.commit,
        lastSyncedAt: new Date().toISOString(),
        version: upstreamVersion,
      };
      writeFileSync(SYNC_STATE_FILE, JSON.stringify(newState, null, 2) + "\n", "utf8");
      console.log("  Recorded sync state in " + SYNC_STATE_FILE);
    }

    console.log("\x1b[32m✨ Sync complete. All data files aligned with upstream qwykz@" + upstreamVersion + ".\x1b[0m");
  } else {
    if (!versionInSync || (gitInfo && !gitInSync)) {
      console.log("\n\x1b[33mRun 'bun run sync:upstream' to automatically update web data files.\x1b[0m");
      process.exit(1);
    }
  }
}

run();
