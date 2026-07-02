import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
// Files are placed under resonance-labs/ so preview (DIST=dist-site) serves
// them at the same /resonance-labs/ paths the component pages expect.
const OUT = path.resolve(ROOT, 'dist-site', 'resonance-labs');

const DIST_ROOT = path.resolve(ROOT, 'dist-site');
if (fs.existsSync(DIST_ROOT)) {
  fs.rmSync(DIST_ROOT, { recursive: true });
}
fs.mkdirSync(OUT, { recursive: true });

const INCLUDE = ['index.html', 'styles.css', 'assets', 'components'];

function copyRecursive(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const entry of fs.readdirSync(src)) {
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
console.log(`Built site → dist-site/resonance-labs/ (${fileCount} files)`);
