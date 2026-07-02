import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
// Files go to the root of dist-public/. The preview:ghpages script copies
// dist-public/. into /tmp/ghpages/resonance-labs/, placing files at the
// correct path for that BASE-relative server.
const OUT = path.resolve(ROOT, 'dist-public');

if (fs.existsSync(OUT)) {
  fs.rmSync(OUT, { recursive: true });
}
fs.mkdirSync(OUT, { recursive: true });

const INCLUDE = ['index.html', 'styles.css', 'assets', 'components'];

const EXCLUDE_FILES = new Set(['labs.manifest.json']);

function copyRecursive(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const entry of fs.readdirSync(src)) {
      if (EXCLUDE_FILES.has(entry)) continue;
      copyRecursive(path.join(src, entry), path.join(dest, entry));
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}

let fileCount = 0;
function countFiles(dir) {
  for (const entry of fs.readdirSync(dir)) {
    const p = path.join(dir, entry);
    fs.statSync(p).isDirectory() ? countFiles(p) : fileCount++;
  }
}

for (const entry of INCLUDE) {
  const src = path.join(ROOT, entry);
  if (!fs.existsSync(src)) {
    console.warn(`Warning: ${entry} not found, skipping.`);
    continue;
  }
  copyRecursive(src, path.join(OUT, entry));
}

countFiles(OUT);
console.log(`Exported public → dist-public/ (${fileCount} files)`);
