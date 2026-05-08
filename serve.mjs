// Simple static file server with /api/agent/token endpoint
// Usage: node serve.mjs

import { createServer } from 'http';
import { readFile, readFileSync } from 'fs';
import { extname, join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = 3000;

// Load .env.local
try {
  const envContent = readFileSync(join(__dirname, '.env.local'), 'utf-8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, '');
    if (key && !process.env[key]) process.env[key] = val;
  }
} catch { /* .env.local not found — env vars from shell */ }

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css',
  '.js':   'application/javascript',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.woff2':'font/woff2',
  '.woff': 'font/woff',
  '.txt':  'text/plain; charset=utf-8',
};

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

createServer(async (req, res) => {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, CORS);
    res.end();
    return;
  }

  // Token exchange endpoint
  if (req.method === 'POST' && req.url === '/api/agent/token') {
    const apiKey = process.env.API_KEY_21ST;
    if (!apiKey) {
      res.writeHead(500, { 'Content-Type': 'application/json', ...CORS });
      res.end(JSON.stringify({ error: 'API_KEY_21ST not configured in .env.local' }));
      return;
    }
    try {
      const tokenRes = await fetch('https://relay.an.dev/v1/tokens', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ agent: 'support-agent', expiresIn: '1h' }),
      });
      const data = await tokenRes.json();
      res.writeHead(tokenRes.ok ? 200 : tokenRes.status, {
        'Content-Type': 'application/json', ...CORS,
      });
      res.end(JSON.stringify(data));
    } catch (e) {
      res.writeHead(500, { 'Content-Type': 'application/json', ...CORS });
      res.end(JSON.stringify({ error: String(e) }));
    }
    return;
  }

  // Static files
  try {
    let path = req.url === '/' ? '/index-v2.html' : req.url;
    // strip query string
    path = path.split('?')[0];
    const filePath = join(__dirname, path);
    const ext = extname(filePath);
    const data = await readFile(filePath);
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream', ...CORS });
    res.end(data);
  } catch {
    res.writeHead(404); res.end('Not found');
  }
}).listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
