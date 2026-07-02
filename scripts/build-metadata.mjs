import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const COMPONENTS_DIR = path.join(ROOT, 'components');
const SPECS_DIR = path.join(ROOT, 'node_modules/@orchestra/resonance-specs/dist/components');
const OUT_DIR = path.join(ROOT, 'packages/resonance-metadata/dist');
const BASE_URL = 'https://accenture.github.io/resonance-labs/components';

const CATEGORY_MAP = {
  accordion: 'Disclosure',
  'alert-dialog': 'Disclosure',
  dialog: 'Disclosure',
  disclosure: 'Disclosure',
  modal: 'Disclosure',
  popover: 'Disclosure',
  tooltip: 'Disclosure',
  autocomplete: 'Forms',
  checkbox: 'Forms',
  combobox: 'Forms',
  'date-picker': 'Forms',
  'file-upload': 'Forms',
  'password-input-toggle': 'Forms',
  'quantity-stepper': 'Forms',
  'radio-button': 'Forms',
  'search-input': 'Forms',
  select: 'Forms',
  slider: 'Forms',
  'text-input': 'Forms',
  'toggle-switch': 'Forms',
  breadcrumbs: 'Navigation',
  link: 'Navigation',
  'mega-navigation': 'Navigation',
  pagination: 'Navigation',
  'skip-navigation': 'Navigation',
  tabs: 'Navigation',
  alert: 'Feedback',
  badge: 'Feedback',
  'progress-bar': 'Feedback',
  'star-rating': 'Feedback',
  tag: 'Feedback',
  toast: 'Feedback',
  avatar: 'Content',
  card: 'Content',
  'card-list': 'Content',
  carousel: 'Content',
  'image-gallery': 'Content',
  table: 'Content',
  video: 'Content',
  'cart-summary': 'Commerce',
  'faceted-filter': 'Commerce',
  'mini-cart': 'Commerce',
  price: 'Commerce',
  'product-card': 'Commerce',
  'review-comment': 'Commerce',
  'sale-price': 'Commerce',
  'variant-selector': 'Commerce',
  'wishlist-button': 'Commerce',
  button: 'Actions',
  dropdown: 'Actions',
  listbox: 'Actions',
  'cookie-consent': 'Utility',
};

function toTitle(key) {
  return key.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function parseHtmlTitle(html) {
  const m = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  return m ? m[1].trim() : null;
}

function isFullPage(html) {
  return /^<!doctype/i.test(html.trim()) || /^<html/i.test(html.trim());
}

function risk(missing, specCount) {
  if (missing === 0) return 'low';
  if (specCount === 0 || missing / specCount < 0.25) return 'medium';
  return 'high';
}

function labsAlignment(implemented, partial, specCount) {
  if (specCount === 0) return 0;
  return Math.round((implemented + partial * 0.5) / specCount * 100);
}

function getExamples(componentKey, componentPath) {
  const examples = [];
  let files;
  try { files = fs.readdirSync(componentPath); } catch { return examples; }

  for (const file of files.sort()) {
    if (!file.endsWith('.html')) continue;
    const html = fs.readFileSync(path.join(componentPath, file), 'utf8');
    if (!isFullPage(html)) continue;

    const isIndex = file === 'index.html';
    const slug = isIndex ? 'basic' : file.replace(/\.html$/, '').replace(/--+/g, '-');
    const id = `${componentKey}-${slug}`;
    const rawTitle = parseHtmlTitle(html);
    const title = rawTitle ?? `${toTitle(componentKey)} — ${toTitle(slug)}`;
    const url = isIndex
      ? `${BASE_URL}/${componentKey}/`
      : `${BASE_URL}/${componentKey}/${file}`;

    examples.push({ id, title, url, thumbnail: null });
  }
  return examples;
}

function loadSpec(componentKey) {
  const specPath = path.join(SPECS_DIR, `${componentKey}.json`);
  if (!fs.existsSync(specPath)) return null;
  return JSON.parse(fs.readFileSync(specPath, 'utf8'));
}

function loadManifest(componentKey) {
  const manifestPath = path.join(COMPONENTS_DIR, componentKey, 'labs.manifest.json');
  if (!fs.existsSync(manifestPath)) return null;
  try { return JSON.parse(fs.readFileSync(manifestPath, 'utf8')); } catch { return null; }
}

function run() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const componentDirs = fs.readdirSync(COMPONENTS_DIR, { withFileTypes: true })
    .filter(e => e.isDirectory() && !e.name.startsWith('.'))
    .map(e => e.name)
    .sort();

  const today = new Date().toISOString().slice(0, 10);

  // Collect per-component data
  const componentData = [];
  const examplesMap = {};
  const criterionMap = {};

  for (const key of componentDirs) {
    const spec = loadSpec(key);
    const manifest = loadManifest(key);
    const componentPath = path.join(COMPONENTS_DIR, key);
    const examples = getExamples(key, componentPath);

    const specCount = spec?.artifacts?.criteria?.items?.length ?? 0;
    const testCases = spec?.artifacts?.testspec?.items?.length ?? 0;
    const implemented = manifest?.implements?.length ?? 0;
    const partial = manifest?.partial?.length ?? 0;
    const missing = manifest?.missing?.length ?? 0;
    const generatedAt = manifest?.generatedAt?.slice(0, 10) ?? today;

    componentData.push({
      component: key,
      title: toTitle(key),
      category: CATEGORY_MAP[key] ?? 'Other',
      specCount,
      testCases,
      labsExamples: examples.length,
      labsAlignment: labsAlignment(implemented, partial, specCount),
      implemented,
      partial,
      missing,
      risk: risk(missing, specCount),
      lastUpdated: generatedAt,
    });

    examplesMap[key] = examples;

    // criterion-map: combine all three buckets with status
    const criterionEntry = {};
    const exampleIds = examples.map(e => e.id);
    for (const id of manifest?.implements ?? []) criterionEntry[id] = { status: 'implemented', examples: exampleIds };
    for (const id of manifest?.partial ?? []) criterionEntry[id] = { status: 'partial', examples: exampleIds };
    for (const id of manifest?.missing ?? []) criterionEntry[id] = { status: 'missing', examples: [] };
    for (const id of manifest?.notApplicable ?? []) criterionEntry[id] = { status: 'not-applicable', examples: [] };
    criterionMap[key] = criterionEntry;
  }

  // component-summary.json
  const specsVersion = '1.0.0';
  const labsVersion = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8')).version;

  fs.writeFileSync(path.join(OUT_DIR, 'component-summary.json'), JSON.stringify({
    generatedAt: today,
    specsVersion,
    labsVersion,
    components: componentData,
  }, null, 2) + '\n');

  // examples.json
  fs.writeFileSync(path.join(OUT_DIR, 'examples.json'), JSON.stringify({
    generatedAt: today,
    components: examplesMap,
  }, null, 2) + '\n');

  // coverage-summary.json
  const totalSpecCount = componentData.reduce((s, c) => s + c.specCount, 0);
  const totalImplemented = componentData.reduce((s, c) => s + c.implemented, 0);
  const totalPartial = componentData.reduce((s, c) => s + c.partial, 0);
  const totalMissing = componentData.reduce((s, c) => s + c.missing, 0);
  const overallAlignment = labsAlignment(totalImplemented, totalPartial, totalSpecCount);

  const categories = [...new Set(componentData.map(c => c.category))].sort();
  const byCategory = categories.map(cat => {
    const comps = componentData.filter(c => c.category === cat);
    const catSpecCount = comps.reduce((s, c) => s + c.specCount, 0);
    const catImpl = comps.reduce((s, c) => s + c.implemented, 0);
    const catPartial = comps.reduce((s, c) => s + c.partial, 0);
    return {
      category: cat,
      components: comps.length,
      labsAlignment: labsAlignment(catImpl, catPartial, catSpecCount),
    };
  });

  fs.writeFileSync(path.join(OUT_DIR, 'coverage-summary.json'), JSON.stringify({
    generatedAt: today,
    specsVersion,
    labsVersion,
    summary: {
      components: componentData.length,
      overallLabsAlignment: overallAlignment,
      implemented: totalImplemented,
      partial: totalPartial,
      missing: totalMissing,
    },
    byCategory,
  }, null, 2) + '\n');

  // criterion-map.json
  fs.writeFileSync(path.join(OUT_DIR, 'criterion-map.json'), JSON.stringify({
    generatedAt: today,
    components: criterionMap,
  }, null, 2) + '\n');

  // index.js — re-exports all JSON artifacts
  fs.writeFileSync(path.join(OUT_DIR, 'index.js'), [
    `import componentSummaryData from './component-summary.json' assert { type: 'json' };`,
    `import examplesData from './examples.json' assert { type: 'json' };`,
    `import coverageSummaryData from './coverage-summary.json' assert { type: 'json' };`,
    `import criterionMapData from './criterion-map.json' assert { type: 'json' };`,
    ``,
    `export const componentSummary = componentSummaryData;`,
    `export const examples = examplesData;`,
    `export const coverageSummary = coverageSummaryData;`,
    `export const criterionMap = criterionMapData;`,
  ].join('\n') + '\n');

  console.log(`Metadata built → packages/resonance-metadata/dist/ (${componentData.length} components)`);
  console.log(`  Overall labsAlignment: ${overallAlignment}%`);
  console.log(`  Implemented: ${totalImplemented} | Partial: ${totalPartial} | Missing: ${totalMissing}`);
}

run();
