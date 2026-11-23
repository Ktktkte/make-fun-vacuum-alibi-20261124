// The Vacuum's Alibi — one-line entry writer.
// Reads the vacuum's excuse from entry.txt (kept beside this script) and
// writes it to the grader's output directory as entry.txt.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const sourcePath = join(scriptDir, "entry.txt");
const line = readFileSync(sourcePath, "utf8").trimEnd();

if (line.length < 1 || line.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${line.length}`);
}
if (!line.trim()) {
  throw new Error("entry must not be only white space");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, line, "utf8");
// Read back what was written so a silent write failure cannot pass unnoticed.
const written = readFileSync(outPath, "utf8");
if (written !== line) {
  throw new Error("verification failed: output does not match entry.txt");
}
