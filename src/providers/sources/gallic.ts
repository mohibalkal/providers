import { flags } from '@/entrypoint/utils/targets';
import { SourcererOutput, makeSourcerer } from '@/providers/base';
import { MovieScrapeContext, ShowScrapeContext } from '@/utils/context';
import { NotFoundError } from '@/utils/errors';

const domains = ["https://api.pope-walrus-spiffy.workers.dev", "https://api.sub45kgpuh.workers.dev"];
const serverIds = [1, 2, 3].map(t => `gallic-server${t}`);

async function scrapeMovie(ctx: MovieScrapeContext): Promise<SourcererOutput> {
  const domain = domains[Math.floor(Math.random() * domains.length)];
  const url = `${domain}/movie/${ctx.media.tmdbId}`;
  
  let data;
  try {
    const res = await ctx.fetcher(url);
    data = typeof res === 'string' ? JSON.parse(res) : res;
  } catch (err) {
    throw new NotFoundError("Gallic: Failed to fetch");
  }
  
  if (!data?.streams || !data.streams.length) {
    throw new NotFoundError("Gallic: No stream found");
  }
  
  const embeds = data.streams.slice(0, serverIds.length).map((s: any, b: number) => ({
    embedId: serverIds[b],
    url: s.url
  }));
  
  return { embeds };
}

export const gallicScraper = makeSourcerer({
  id: "gallic",
  name: "Gallic 🇫🇷",
  rank: 879,
  disabled: false,
  flags: [flags.CORS_ALLOWED],
  scrapeMovie,
});
