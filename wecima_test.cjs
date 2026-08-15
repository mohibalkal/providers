const https = require('https');
const cheerio = require('cheerio');

const HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
};

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: HEADERS }, (res) => {
      // Follow redirects
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(fetchUrl(res.headers.location));
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ body: data, status: res.statusCode, url: url }));
    }).on('error', reject);
  });
}

async function run() {
  const query = 'Inception';
  const baseUrl = 'https://wecima.cx';
  console.log(`1. Searching for: ${query} on ${baseUrl}`);
  const searchRes = await fetchUrl(`${baseUrl}/search/${encodeURIComponent(query)}/`);
  console.log('Search Status:', searchRes.status);
  
  if (searchRes.status !== 200) {
    console.log("Failed to search. Body snippet:");
    console.log(searchRes.body.substring(0, 500));
    return;
  }

  const $ = cheerio.load(searchRes.body);
  const firstResult = $('.Grid--WecimaPosts .GridItem a').first();
  if (!firstResult.length) {
    console.log("No search results found with selector .Grid--WecimaPosts .GridItem a");
    return;
  }

  const contentUrl = firstResult.attr('href');
  console.log("Found Content URL:", contentUrl);

  console.log("2. Fetching content page...");
  const contentRes = await fetchUrl(contentUrl);
  const c$ = cheerio.load(contentRes.body);

  const embedUrl = c$('meta[itemprop="embedURL"]').attr('content');
  if (!embedUrl) {
    console.log("No embedURL found on content page!");
    return;
  }
  
  console.log("3. Extracting servers from content page...");
  const serverLinks = c$('.WatchServersList li btn');
  
  if (serverLinks.length === 0) {
    console.log("❌ FAILED: No servers found in .WatchServersList");
    return;
  }

  const embeds = [];
  serverLinks.each((i, element) => {
    const dataUrl = c$(element).attr('data-url');
    if (dataUrl) {
      const cleanBase64 = 'aHR0c' + dataUrl.replace(/\+/g, '');
      const decodedUrl = Buffer.from(cleanBase64, 'base64').toString('utf-8');
      
      let embedId = 'unknown';
      if (decodedUrl.includes('mixdrop')) embedId = 'mixdrop';
      else if (decodedUrl.includes('dood')) embedId = 'dood';
      else if (decodedUrl.includes('vidsrc')) embedId = 'vidsrc';
      else if (decodedUrl.includes('upstream')) embedId = 'upstream';
      else if (decodedUrl.includes('streamtape')) embedId = 'streamtape';
      else if (decodedUrl.includes('filemoon')) embedId = 'filemoon';
      else if (decodedUrl.includes('voe.sx')) embedId = 'voe';
      else if (decodedUrl.includes('vidmoly')) embedId = 'vidmoly';
      else if (decodedUrl.includes('uqload')) embedId = 'uqload';
      else if (decodedUrl.includes('savefiles')) embedId = 'dood'; 
      
      embeds.push({ embedId, url: decodedUrl });
    }
  });

  if (embeds.length > 0) {
    console.log(`\n✅ SUCCESS: Found ${embeds.length} external embed servers!`);
    console.table(embeds);
  } else {
    console.log("❌ FAILED: No valid servers parsed.");
  }
}

run().catch(console.error);
