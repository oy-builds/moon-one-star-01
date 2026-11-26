// The Moon Gets One Star — writes a one-star review of the Moon to entry.txt.
// Node 22, zero dependencies. Output dir: $MAKEFUN_OUTPUT_DIR (default /output).
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const REVIEW =
  "1/5 stars. Disappears for days, then shows up full of itself like nothing happened. Zero accountability.";

const MAX_CHARS = 120;

function main(): void {
  // Gate checks mirroring the kit's sealed scorer:
  // UTF-8 text, 1-120 characters, not only whitespace, single line.
  const chars = [...REVIEW];
  if (chars.length < 1 || chars.length > MAX_CHARS) {
    throw new Error(`review is ${chars.length} chars, must be 1-${MAX_CHARS}`);
  }
  if (REVIEW.trim().length === 0) {
    throw new Error("review must not be only whitespace");
  }
  if (REVIEW.includes("\n") || REVIEW.includes("\r")) {
    throw new Error("review must be a single line");
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), REVIEW, "utf8");
  console.log(`wrote ${chars.length} chars to ${join(outDir, "entry.txt")}`);
}

main();
