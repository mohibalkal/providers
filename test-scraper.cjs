const { makeProviders } = require('./lib/index.umd.cjs');

async function run() {
  const providers = makeProviders({
    fetcher: async (url, init) => {
      console.log(`[Fetcher] ${init.method || 'GET'} ${url}`);
      if (init.headers) console.log(`[Fetcher] Headers:`, init.headers);
      if (init.headers) console.log(`[Fetcher] Headers:`, init.headers);
      const res = await fetch(url, init);
      const text = await res.text();
      console.log(`[Fetcher] Response:`, text);
      try { return JSON.parse(text); } catch { return text; }
    },
    target: 'browser'
  });

  const media = {
    type: 'movie',
    title: 'Deadpool & Wolverine',
    releaseYear: 2024,
    tmdbId: '533535',
    imdbId: 'tt6263850'
  };

  console.log("Running Vienna...");
  try {
    const result = await providers.runSourceScraper({
      id: 'vienna',
      media: media
    });
    console.log("Vienna Result:", JSON.stringify(result, null, 2));
  } catch (err) {
    console.error("Vienna Error:", err.message);
  }
}

run();
