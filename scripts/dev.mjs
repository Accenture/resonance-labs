import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = process.env.DIST
  ? path.resolve(process.env.DIST)
  : path.resolve(__dirname, '..');
const BASE = (process.env.BASE || '').replace(/\/$/, '');
const PORT = parseInt(process.env.PORT || '3000', 10);
// Strip BASE from URLs only in source-dev mode (no DIST).
// In preview mode (DIST set) files are already at the correct BASE-relative path.
const stripBase = BASE && !process.env.DIST;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.js':   'text/javascript; charset=utf-8',
  '.mjs':  'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg':  'image/svg+xml',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico':  'image/x-icon',
  '.woff': 'font/woff',
  '.woff2':'font/woff2',
  '.ttf':  'font/ttf',
  '.webp': 'image/webp',
  '.webm': 'video/webm',
  '.mp4':  'video/mp4',
};

const server = http.createServer((req, res) => {
  let url = req.url.split('?')[0];

  if (stripBase && url.startsWith(BASE)) {
    url = url.slice(BASE.length) || '/';
  }

  let filePath = path.join(ROOT, url);

  // Resolve directory → index.html
  try {
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }
  } catch {
    // file doesn't exist — fall through to 404
  }

  // Security: prevent path traversal outside ROOT
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end(`Not found: ${url}`);
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  });
});

server.listen(PORT, () => {
  const base = BASE ? `http://localhost:${PORT}${BASE}/` : `http://localhost:${PORT}/`;
  console.log(`Serving ${ROOT}`);
  console.log(`  → ${base}`);
});
