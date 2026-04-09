#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const rootDir = process.cwd();
const componentsDir = path.join(rootDir, 'components');
const specsArchive = path.join(rootDir, 'resonance-specs-1.0.0.tgz');
const manifestFileName = 'labs.manifest.json';

function readArchiveJson(internalPath) {
  const raw = execFileSync('tar', ['-xOf', specsArchive, internalPath], {
    cwd: rootDir,
    encoding: 'utf8'
  });

  return JSON.parse(raw);
}

function getSpecsData() {
  if (!fs.existsSync(specsArchive)) {
    throw new Error('Missing resonance-specs-1.0.0.tgz in repository root.');
  }

  const index = readArchiveJson('package/dist/index.json');
  const componentMap = new Map();

  for (const entry of index.components || []) {
    const specPath = `package/dist/${entry.file}`;
    const spec = readArchiveJson(specPath);
    const key = String(entry.file)
      .replace(/^components\//, '')
      .replace(/\.json$/, '');

    const criteriaItems = spec?.artifacts?.criteria?.items || [];
    const criteria = criteriaItems.map((item) => ({
      id: item.id,
      statement: String(item.statement || '')
    }));

    componentMap.set(key, {
      version: String(spec.version || entry.version || '1.0.0'),
      criteria
    });
  }

  return componentMap;
}

function readIfExists(filePath) {
  if (!fs.existsSync(filePath)) {
    return '';
  }

  return fs.readFileSync(filePath, 'utf8');
}

function collectEvidence(componentPath, componentKey) {
  const entries = fs.readdirSync(componentPath, { withFileTypes: true });
  const files = entries.filter((entry) => entry.isFile()).map((entry) => entry.name);

  const htmlFiles = files.filter((file) => file.endsWith('.html'));
  const cssFiles = files.filter((file) => file.endsWith('.css'));
  const jsFiles = files.filter((file) => file.endsWith('.js'));

  const htmlText = htmlFiles
    .map((file) => readIfExists(path.join(componentPath, file)))
    .join('\n');
  const cssText = cssFiles
    .map((file) => readIfExists(path.join(componentPath, file)))
    .join('\n');
  const jsText = jsFiles
    .map((file) => readIfExists(path.join(componentPath, file)))
    .join('\n');

  const allText = [htmlText, cssText, jsText].join('\n');
  const sourceLower = allText.toLowerCase();

  const hasAria = /aria-[a-z-]+\s*=|\baria-[a-z-]+\b/i.test(allText);
  const hasRole = /\brole\s*=\s*['"][a-z-]+['"]/i.test(allText);
  const hasLabeling = /aria-label|aria-labelledby|aria-describedby|<label\b|\balt\s*=|\btitle\s*=/i.test(allText);
  const hasKeyboardHandler = /(keydown|keyup|keypress|onkeydown|onkeyup)/i.test(allText);
  const hasKeyboardTokens = /(\bEnter\b|\bSpace\b|Spacebar|\bTab\b|\bEscape\b|\bEsc\b|\bArrow(Up|Down|Left|Right)\b|\bHome\b|\bEnd\b|event\.key)/i.test(allText);
  const hasFocusStyles = /:focus-visible|:focus\b/i.test(cssText);
  const hasHiddenToggle = /\bhidden\b|aria-expanded|aria-selected|aria-pressed|aria-checked/i.test(allText);
  const hasButton = /<button\b/i.test(htmlText);
  const hasInput = /<input\b/i.test(htmlText);
  const hasLiveRegion = /aria-live|role\s*=\s*['"](status|alert|log)['"]/i.test(allText);

  return {
    componentKey,
    files,
    htmlFiles,
    cssFiles,
    jsFiles,
    hasAria,
    hasRole,
    hasLabeling,
    hasKeyboard: hasKeyboardHandler || hasKeyboardTokens,
    hasFocusStyles,
    hasHiddenToggle,
    hasButton,
    hasInput,
    hasLiveRegion,
    sourceLower
  };
}

function normalizeStatement(statement) {
  return statement
    .replace(/<[^>]+>/g, ' ')
    .replace(/`/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

function classifyCriterion(statement, evidence) {
  const s = normalizeStatement(statement);

  if (!s) {
    return 'partial';
  }

  if (s.startsWith('if ')) {
    return 'partial';
  }

  if (/contrast|3:1|4\.5:1|color/.test(s)) {
    return evidence.hasFocusStyles ? 'partial' : 'missing';
  }

  if (/zoom|200%|reflow/.test(s)) {
    return 'partial';
  }

  if (/screen reader|assistive technologies announce|announcement|announced/.test(s)) {
    return evidence.hasAria || evidence.hasRole || evidence.hasLiveRegion ? 'partial' : 'missing';
  }

  if (/keyboard|enter|space|tab|arrow|escape|home|end/.test(s)) {
    return evidence.hasKeyboard ? 'implements' : 'missing';
  }

  if (/aria-/.test(s)) {
    const matches = s.match(/aria-[a-z-]+/g) || [];
    if (matches.length === 0) {
      return evidence.hasAria ? 'implements' : 'missing';
    }

    const hasAll = matches.every((token) => evidence.sourceLower.includes(token));
    return hasAll ? 'implements' : 'missing';
  }

  if (/\brole\b/.test(s)) {
    return evidence.hasRole ? 'implements' : 'missing';
  }

  if (/accessible name|label/.test(s)) {
    return evidence.hasLabeling ? 'implements' : 'missing';
  }

  if (/native html\s+button|button element/.test(s)) {
    return evidence.hasButton ? 'implements' : 'missing';
  }

  if (/native html\s+input|input element/.test(s)) {
    return evidence.hasInput ? 'implements' : 'missing';
  }

  if (/state|expanded|collapsed|selected|checked|pressed|hidden/.test(s)) {
    return evidence.hasHiddenToggle ? 'implements' : 'partial';
  }

  if (/focus/.test(s)) {
    return evidence.hasFocusStyles ? 'implements' : 'partial';
  }

  if (evidence.hasAria || evidence.hasRole || evidence.hasKeyboard) {
    return 'partial';
  }

  return 'missing';
}

function buildManifest(componentKey, specInfo, evidence, existingManifest, specAvailable) {
  const implementsList = [];
  const partialList = [];
  const missingList = [];

  for (const criterion of specInfo.criteria) {
    const status = classifyCriterion(criterion.statement, evidence);

    if (status === 'implements') {
      implementsList.push(criterion.id);
      continue;
    }

    if (status === 'partial') {
      partialList.push(criterion.id);
      continue;
    }

    missingList.push(criterion.id);
  }

  const existingNotApplicable = Array.isArray(existingManifest?.notApplicable)
    ? existingManifest.notApplicable.filter((id) => specInfo.criteria.some((c) => c.id === id))
    : [];

  const removeFrom = new Set(existingNotApplicable);
  const cleanImplements = implementsList.filter((id) => !removeFrom.has(id));
  const cleanPartial = partialList.filter((id) => !removeFrom.has(id));
  const cleanMissing = missingList.filter((id) => !removeFrom.has(id));

  const notes = [
    'Generated by scripts/sync-compliance.mjs using local static analysis against private @resonance/specs AC IDs only.',
    'Full AC statements and definitions remain proprietary IP and are intentionally excluded from this repository.',
    'Automated status assignment should be reviewed with manual QA before release sign-off.'
  ];

  if (!specAvailable) {
    notes.unshift('No private @resonance/specs component mapping was found for this component; AC ID status buckets are empty until mapping is provided.');
  }

  return {
    componentKey,
    specVersion: specInfo.version,
    implements: cleanImplements,
    partial: cleanPartial,
    missing: cleanMissing,
    notApplicable: existingNotApplicable,
    verified: {
      keyboard: evidence.hasKeyboard,
      screenReader: evidence.hasAria || evidence.hasRole,
      zoom200: false,
      focusContrast: false
    },
    notes,
    generatedAt: new Date().toISOString()
  };
}

function toFlag(value) {
  return value ? 'Pass (automated)' : 'Needs manual verification';
}

function upsertComplianceSection(readmeText, manifest) {
  const section = [
    '## Compliance Snapshot (Public)',
    '',
    '| Status | AC Count |',
    '|-----|--------:|',
    `| Implemented | ${manifest.implements.length} |`,
    `| Partial | ${manifest.partial.length} |`,
    `| Missing | ${manifest.missing.length} |`,
    `| Not Applicable | ${manifest.notApplicable.length} |`,
    '',
    'Validation flags:',
    `- Keyboard: ${toFlag(manifest.verified.keyboard)}`,
    `- Screen reader semantics: ${toFlag(manifest.verified.screenReader)}`,
    `- 200% zoom: ${toFlag(manifest.verified.zoom200)}`,
    `- Focus contrast: ${toFlag(manifest.verified.focusContrast)}`,
    '',
    'Proprietary notice: Full acceptance criteria definitions are proprietary IP in the private @resonance/specs package and are intentionally not reproduced in this repository.',
    '',
    `See ${manifestFileName} for AC identifier-level status.`,
    ''
  ].join('\n');

  const sectionRegexGlobal = /\n?## Compliance Snapshot \(Public\)[\s\S]*?(?=\n##\s+|$)/gm;
  const orphanSnapshotRegex = /\n\| Status \| AC Count \|[\s\S]*?See labs\.manifest\.json for AC identifier-level status\.\n?/gm;
  const cleaned = readmeText
    .replace(sectionRegexGlobal, '')
    .replace(orphanSnapshotRegex, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trimEnd();

  if (/\n## Files\b/.test(cleaned)) {
    return cleaned.replace(/\n## Files\b/, `\n\n${section}\n## Files`);
  }

  return `${cleaned}\n\n${section}`;
}

function run() {
  const specMap = getSpecsData();
  const componentDirs = fs
    .readdirSync(componentsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith('.'))
    .map((entry) => entry.name)
    .sort();

  let manifestCount = 0;
  let readmeCount = 0;
  const withoutSpec = [];

  for (const componentKey of componentDirs) {
    const componentPath = path.join(componentsDir, componentKey);
    const specInfo = specMap.get(componentKey) || {
      version: 'unknown',
      criteria: []
    };
    const specAvailable = specMap.has(componentKey);
    if (!specAvailable) {
      withoutSpec.push(componentKey);
    }

    const manifestPath = path.join(componentPath, manifestFileName);
    const readmePath = path.join(componentPath, 'README.md');

    let existingManifest = null;
    if (fs.existsSync(manifestPath)) {
      try {
        existingManifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
      } catch {
        existingManifest = null;
      }
    }

    const evidence = collectEvidence(componentPath, componentKey);
    const manifest = buildManifest(componentKey, specInfo, evidence, existingManifest, specAvailable);

    fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
    manifestCount += 1;

    if (fs.existsSync(readmePath)) {
      const originalReadme = fs.readFileSync(readmePath, 'utf8');
      const updatedReadme = upsertComplianceSection(originalReadme, manifest);
      if (updatedReadme !== originalReadme) {
        fs.writeFileSync(readmePath, updatedReadme, 'utf8');
      }
      readmeCount += 1;
    }
  }

  if (withoutSpec.length > 0) {
    console.warn(`Components missing specs mapping (${withoutSpec.length}): ${withoutSpec.join(', ')}`);
  }

  console.log(`Updated manifests: ${manifestCount}`);
  console.log(`Processed READMEs: ${readmeCount}`);
}

run();
