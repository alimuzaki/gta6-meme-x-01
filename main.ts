// Entry program for the make.fun bounty "Post a GTA 6 meme on X" (gta6-meme-x-01).
//
// The post on X is the real entry. All this program does is hand the house the
// address of that post: it reads POST.json from the repository and writes the
// exact same bytes to the output directory, where the gate picks it up.
//
// How the grader runs it (from the repository root):
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
//
// No network, no clock, no files outside the repository: the two runs the
// grader does must produce identical bytes, and this program only copies
// one small file, so they do.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The grader mounts the repository at /bot and the output at /output.
// Outside the grader, the two env vars below let a local run point at
// the current directory and a scratch folder instead.
const repoDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

mkdirSync(outDir, { recursive: true });

const postPath = join(repoDir, "POST.json");
const outPath = join(outDir, "POST.json");

let postBytes: Buffer;
try {
  postBytes = readFileSync(postPath);
} catch (err) {
  console.error(`Could not read ${postPath}: ${(err as Error).message}`);
  process.exit(1);
}

try {
  writeFileSync(outPath, postBytes);
} catch (err) {
  console.error(`Could not write ${outPath}: ${(err as Error).message}`);
  process.exit(1);
}
