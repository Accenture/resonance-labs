import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const COMPONENTS_DIR = path.join(ROOT, 'components');
const SPECS_DIR = path.join(ROOT, 'node_modules/@orchestra/resonance-specs/dist/components');
const MANIFEST_FILE = 'labs.manifest.json';

function getSpecsData() {
  const componentMap = new Map();
  for (const file of fs.readdirSync(SPECS_DIR)) {
    if (!file.endsWith('.json')) continue;
    const key = file.replace(/\.json$/, '');
    const spec = JSON.parse(fs.readFileSync(path.join(SPECS_DIR, file), 'utf8'));
    const criteria = (spec?.artifacts?.criteria?.items ?? []).map(item => ({
      id: item.id,
      statement: String(item.statement || ''),
    }));
    componentMap.set(key, { version: String(spec.version || '1.0.0'), criteria });
  }
  return componentMap;
}

function readIfExists(filePath) {
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '';
}

function collectEvidence(componentPath) {
  const entries = fs.readdirSync(componentPath, { withFileTypes: true });
  const files = entries.filter(e => e.isFile()).map(e => e.name);

  const htmlText = files.filter(f => f.endsWith('.html')).map(f => readIfExists(path.join(componentPath, f))).join('\n');
  const cssText  = files.filter(f => f.endsWith('.css')).map(f => readIfExists(path.join(componentPath, f))).join('\n');
  const jsText   = files.filter(f => f.endsWith('.js')).map(f => readIfExists(path.join(componentPath, f))).join('\n');
  const allText  = [htmlText, cssText, jsText].join('\n');
  const src      = allText.toLowerCase();

  return {
    hasAria:          /aria-[a-z-]+\s*=|\baria-[a-z-]+\b/i.test(allText),
    hasRole:          /\brole\s*=\s*['"][a-z-]+['"]/i.test(allText),
    hasLabeling:      /aria-label|aria-labelledby|aria-describedby|<label\b|\balt\s*=|\btitle\s*=/i.test(allText),
    hasKeyboard:      /(keydown|keyup|keypress|onkeydown|onkeyup|\bEnter\b|\bSpace\b|Spacebar|\bTab\b|\bEscape\b|\bEsc\b|\bArrow(?:Up|Down|Left|Right)\b|\bHome\b|\bEnd\b|event\.key)/i.test(allText),
    hasFocusStyles:   /:focus-visible|:focus\b/i.test(cssText),
    hasHiddenToggle:  /\bhidden\b|aria-expanded|aria-selected|aria-pressed|aria-checked/i.test(allText),
    hasButton:        /<button\b/i.test(htmlText),
    hasInput:         /<input\b/i.test(htmlText),
    hasLiveRegion:    /aria-live|role\s*=\s*['"](status|alert|log)['"]/i.test(allText),
    sourceLower:      src,
  };
}

function normalizeStatement(statement) {
  return statement.replace(/<[^>]+>/g, ' ').replace(/`/g, '').replace(/\s+/g, ' ').trim().toLowerCase();
}

function classifyCriterion(statement, ev) {
  const s = normalizeStatement(statement);
  if (!s) return 'partial';
  if (s.startsWith('if ')) return 'partial';
  if (/contrast|3:1|4\.5:1|color/.test(s)) return ev.hasFocusStyles ? 'partial' : 'missing';
  if (/zoom|200%|reflow/.test(s)) return 'partial';
  if (/screen reader|assistive technologies announce|announcement|announced/.test(s))
    return ev.hasAria || ev.hasRole || ev.hasLiveRegion ? 'partial' : 'missing';
  if (/keyboard|enter|space|tab|arrow|escape|home|end/.test(s))
    return ev.hasKeyboard ? 'implements' : 'missing';
  if (/aria-/.test(s)) {
    const tokens = s.match(/aria-[a-z-]+/g) || [];
    return tokens.length === 0
      ? (ev.hasAria ? 'implements' : 'missing')
      : (tokens.every(t => ev.sourceLower.includes(t)) ? 'implements' : 'missing');
  }
  if (/\brole\b/.test(s)) return ev.hasRole ? 'implements' : 'missing';
  if (/accessible name|label/.test(s)) return ev.hasLabeling ? 'implements' : 'missing';
  if (/native html\s+button|button element/.test(s)) return ev.hasButton ? 'implements' : 'missing';
  if (/native html\s+input|input element/.test(s)) return ev.hasInput ? 'implements' : 'missing';
  if (/state|expanded|collapsed|selected|checked|pressed|hidden/.test(s))
    return ev.hasHiddenToggle ? 'implements' : 'partial';
  if (/focus/.test(s)) return ev.hasFocusStyles ? 'implements' : 'partial';
  if (ev.hasAria || ev.hasRole || ev.hasKeyboard) return 'partial';
  return 'missing';
}

function buildManifest(componentKey, specInfo, evidence, existing) {
  const implementsList = [], partialList = [], missingList = [];

  for (const criterion of specInfo.criteria) {
    const status = classifyCriterion(criterion.statement, evidence);
    if (status === 'implements') implementsList.push(criterion.id);
    else if (status === 'partial') partialList.push(criterion.id);
    else missingList.push(criterion.id);
  }

  const notApplicable = (existing?.notApplicable ?? []).filter(id =>
    specInfo.criteria.some(c => c.id === id)
  );
  const exclude = new Set(notApplicable);

  return {
    componentKey,
    specVersion: specInfo.version,
    implements:    implementsList.filter(id => !exclude.has(id)),
    partial:       partialList.filter(id => !exclude.has(id)),
    missing:       missingList.filter(id => !exclude.has(id)),
    notApplicable,
    verified: {
      keyboard:     evidence.hasKeyboard,
      screenReader: evidence.hasAria || evidence.hasRole,
      zoom200:      false,
      focusContrast: false,
    },
    notes: [
      'Generated by scripts/sync-compliance.mjs via static analysis of component source.',
      'Automated status should be reviewed with manual QA before release sign-off.',
    ],
    generatedAt: new Date().toISOString(),
  };
}

function run() {
  const specMap = getSpecsData();
  const dirs = fs.readdirSync(COMPONENTS_DIR, { withFileTypes: true })
    .filter(e => e.isDirectory() && !e.name.startsWith('.'))
    .map(e => e.name)
    .sort();

  let synced = 0;
  const noSpec = [];

  for (const key of dirs) {
    const componentPath = path.join(COMPONENTS_DIR, key);
    if (!specMap.has(key)) { noSpec.push(key); continue; }

    const manifestPath = path.join(componentPath, MANIFEST_FILE);
    let existing = null;
    if (fs.existsSync(manifestPath)) {
      try { existing = JSON.parse(fs.readFileSync(manifestPath, 'utf8')); } catch {}
    }

    const evidence = collectEvidence(componentPath);
    const manifest = buildManifest(key, specMap.get(key), evidence, existing);
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
    synced++;
  }

  if (noSpec.length) console.warn(`No spec found for: ${noSpec.join(', ')}`);
  console.log(`Synced ${synced} manifests.`);
}

run();
