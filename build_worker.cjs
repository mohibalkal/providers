const fs = require('fs');
const https = require('https');

const HOST = 'https://vidup.to';
const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36',
  'Referer': 'https://vidup.to/',
  'Origin': 'https://vidup.to',
};

async function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: HEADERS }, (res) => {
      if (res.statusCode !== 200) {
        return reject(new Error(`Status ${res.statusCode} for ${url}`));
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function build() {
  try {
    console.log('Fetching vidup.to/tv/1399/1/1...');
    const page = await fetchUrl('https://vidup.to/tv/1399/1/1');
    const scriptTags = [...page.matchAll(/<script[^>]+src="([^"]+)"/g)].map((m) => m[1]);
    const payloadChunks = [...page.matchAll(/"(static\/chunks\/[^"]+\.js)"/g)].map((m) => '/_next/' + m[1].replace(/\\/g, ''));
    const scripts = [...new Set([...scriptTags, ...payloadChunks])];
    
    const chunks = [];
    for (const src of scripts) {
      if (!src.startsWith('/_next/')) continue;
      const name = src.split('/').pop();
      if (!name || !name.endsWith('.js')) continue;
      if (/(^|\/)main-app-|(^|\/)page-|(^|\/)layout-|(^|\/)polyfills-/.test(name)) continue;
      
      console.log(`Downloading ${name}...`);
      const code = await fetchUrl(HOST + src);
      chunks.push({ name, code });
    }
    
    console.log(`Downloaded ${chunks.length} chunks. Patching worker.js...`);
    let workerContent = fs.readFileSync('../worker.js', 'utf8');
    
    // Replace ensureChunks with hardcoded chunks
    const hardcoded = `
const _b64Chunks = ${JSON.stringify(chunks.map(c => ({name: c.name, code: Buffer.from(c.code).toString('base64')})))};
const chunks = _b64Chunks.map(c => {
  const bin = atob(c.code);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return { name: c.name, code: new TextDecoder().decode(bytes) };
});
async function ensureChunks() { return; }`;
    
    workerContent = workerContent.replace(/const chunks = \[\];[\s\S]*?async function ensureChunks\(\) \{[\s\S]*?\n\}/, hardcoded);
    
    fs.writeFileSync('../worker_fixed.js', workerContent);
    console.log('worker_fixed.js created successfully in HH folder!');
  } catch (err) {
    console.error('Build failed:', err);
  }
}

build();
