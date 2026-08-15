import { artemisScraper } from './src/providers/sources/artemis';

const tmdbId = '27205'; // Inception
const title = 'Inception';
const releaseYear = 2010;

const ctx = {
  media: {
    type: 'movie',
    title,
    releaseYear,
    tmdbId,
    imdbId: 'tt1375666'
  },
  proxiedFetcher: async (url, options) => {
    console.log(`[Proxied Fetch] ${url}`);
    const fetchOptions = {
        ...options,
        headers: {
            ...options?.headers,
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
    };
    const res = await fetch(url, fetchOptions);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.text();
  },
  fetcher: async (url, options) => {
    console.log(`[Direct Fetch] ${url}`);
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.text();
  },
  progress: (val) => {
    console.log(`Progress: ${val}%`);
  }
};

async function run() {
  console.log(`Testing Artemis Scraper for: ${title}`);
  try {
    const result = await artemisScraper.scrapeMovie(ctx);
    console.log('\n--- SUCCESS ---');
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('\n--- ERROR ---');
    console.error(error.message);
  }
}

run();
