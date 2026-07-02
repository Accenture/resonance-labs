import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SPECS_DIR = path.resolve(ROOT, 'node_modules/@orchestra/resonance-specs/dist/components');
const COMPONENTS_DIR = path.resolve(ROOT, 'components');

const componentDirs = fs.readdirSync(COMPONENTS_DIR).filter(name =>
  fs.statSync(path.join(COMPONENTS_DIR, name)).isDirectory()
);

let created = 0;
let skipped = 0;

for (const name of componentDirs) {
  const specPath = path.join(SPECS_DIR, `${name}.json`);
  const manifestPath = path.join(COMPONENTS_DIR, name, 'labs.manifest.json');

  if (!fs.existsSync(specPath)) {
    skipped++;
    continue;
  }

  const spec = JSON.parse(fs.readFileSync(specPath, 'utf8'));
  const criteria = spec?.artifacts?.criteria?.items ?? [];
  const ids = criteria.map(c => c.id);

  const existing = fs.existsSync(manifestPath)
    ? JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
    : null;

  // Preserve manually-set implements/partial; only update missing to reflect spec changes
  const manifest = {
    component: name,
    specVersion: spec.version ?? '1.0.0',
    implements: existing?.implements ?? [],
    partial: existing?.partial ?? [],
    missing: ids.filter(
      id => !(existing?.implements ?? []).includes(id) && !(existing?.partial ?? []).includes(id)
    ),
  };

  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
  created++;
}

console.log(`Synced ${created} component manifests (${skipped} components had no spec).`);
