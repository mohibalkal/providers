const https = require('https');

const HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36",
  "Referer": "https://vidup.to/",
  "X-Requested-With": "XMLHttpRequest"
};

const API = "https://enc-dec.app/api";

function fetchUrl(url, method = 'GET', body = null, headers = HEADERS) {
  return new Promise((resolve, reject) => {
    const opts = { method, headers: { ...headers } };
    if (body) {
      opts.headers['Content-Type'] = 'application/json';
      opts.headers['Content-Length'] = Buffer.byteLength(body);
    }
    const req = https.request(url, opts, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ body: data, status: res.statusCode, headers: res.headers }));
    });
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

async function validate(resStr) {
  const data = JSON.parse(resStr);
  if (data.status !== 200) throw new Error("API Error: " + data.error);
  return data.result;
}

async function run() {
  const base_url = "https://vidup.to/movie/941109";
  console.log("1. Fetching", base_url);
  const pageRes = await fetchUrl(base_url);
  console.log("Status:", pageRes.status);
  
  let text = '';
  const cookies = pageRes.headers['set-cookie'];
  if (cookies) {
    console.log("Cookies found:", cookies);
    const cookieStr = Array.isArray(cookies) ? cookies.join(';') : cookies;
    const match = cookieStr.match(/page_id=([a-zA-Z0-9_-]+)/);
    if (match) text = match[1];
  }
  
  if (!text) {
    console.log("No text in cookies, checking body...");
    const match = pageRes.body.match(/\\"(?:en|token)\\":\\"(.*?)\\"/) || pageRes.body.match(/"(?:en|token)":"([^"]+)"/);
    if (match) text = match[1];
  }

  if (!text) throw new Error("Token not found");
  console.log("Token found:", text);

  console.log("2. Fetching enc-vidup");
  const encRes = await fetchUrl(`${API}/enc-vidup?text=${text}`);
  const parts = await validate(encRes.body);
  console.log("Enc-vidup success. Servers:", parts.servers);
  
  HEADERS["X-CSRF-Token"] = parts.token;

  console.log("3. Fetching servers");
  const serversEnc = await fetchUrl(parts.servers, 'POST');
  console.log("Servers enc length:", serversEnc.body.length);

  const decServersRes = await fetchUrl(`${API}/dec-vidup`, 'POST', JSON.stringify({text: serversEnc.body}));
  const serversDec = await validate(decServersRes.body);
  console.log(`Decrypted ${serversDec.length} servers`);

  if (!serversDec.length) throw new Error("No servers");
  
  const server = serversDec[0];
  console.log("4. Fetching stream for data:", server.data);
  const streamEnc = await fetchUrl(`${parts.stream}/${server.data}`, 'POST');
  console.log("Stream enc length:", streamEnc.body.length);

  const decStreamRes = await fetchUrl(`${API}/dec-vidup`, 'POST', JSON.stringify({text: streamEnc.body}));
  const streamDec = await validate(decStreamRes.body);

  console.log("STREAM DECRYPTED:", JSON.stringify(streamDec, null, 2));
}

run().catch(console.error);
