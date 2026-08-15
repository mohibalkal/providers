import { makeProviders, makeStandardFetcher, targets } from './src/index';
import { gatherAllSources, gatherAllEmbeds } from './src/providers/all';

const fetcher = makeStandardFetcher(fetch);

const providers = makeProviders({
  fetcher,
  target: targets.ANY,
  consistentIpForRequests: true,
});

async function testAll() {
  const sources = gatherAllSources();
  console.log(`Starting test for ${sources.length} sources...`);
  
  const working = [];
  const failed = [];
  
  const media = {
    type: 'movie' as const,
    title: 'Inception',
    releaseYear: 2010,
    tmdbId: '27205',
    imdbId: 'tt1375666',
  };

  for (const source of sources) {
    if (source.disabled) {
      console.log(`[SKIPPED] ${source.id} (Disabled by default)`);
      // We still consider them failed if they are disabled, because they are disabled for a reason.
      // But wait! turbovid, vidify, vidnest are disabled in their project!
      // If we skip them, we will consider them failed and we DO have updates for them, so we will KEEP them anyway.
      failed.push(source.id);
      continue;
    }
    
    try {
      console.log(`Testing ${source.id}...`);
      const result = await providers.runSourceScraper({
        id: source.id,
        media,
      });
      
      if (result) {
        console.log(`✅ [WORKING] ${source.id}`);
        working.push(source.id);
      } else {
        console.log(`❌ [FAILED] ${source.id} (No result)`);
        failed.push(source.id);
      }
    } catch (err: any) {
      console.log(`❌ [FAILED] ${source.id} (${err.message})`);
      failed.push(source.id);
    }
  }
  
  console.log('\\n--- RESULTS ---');
  console.log(`Working (${working.length}):`, working.join(', '));
  console.log(`Failed (${failed.length}):`, failed.join(', '));
}

testAll();
