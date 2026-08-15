import { flags } from '@/entrypoint/utils/targets';
import { SourcererOutput, makeSourcerer } from '@/providers/base';
import { MovieScrapeContext, ShowScrapeContext } from '@/utils/context';
import { NotFoundError } from '@/utils/errors';

const domains = ["https://tiki.aether.cx"];

async function scrapeTiki(ctx: ShowScrapeContext | MovieScrapeContext): Promise<SourcererOutput> {
  const tmdbId = ctx.media.tmdbId;
  
  for (const domain of domains) {
    let url: string;

    if (ctx.media.type === "movie") {
      url = `${domain}/movie/${tmdbId}`;
    } else {
      url = `${domain}/tv/${tmdbId}/${ctx.media.season?.number ?? 1}/${ctx.media.episode?.number ?? 1}`;
    }

    try {
      const res = await ctx.fetcher(url);
      const data = typeof res === 'string' ? JSON.parse(res) : res;

      if (data && data.stream) {
        return {
          embeds: [],
          stream: [
            {
              id: "tiki",
              type: "hls",
              playlist: data.stream,
              flags: [flags.CORS_ALLOWED],
              captions: [],
            },
          ],
        };
      }
    } catch (err) {
      continue;
    }
  }

  throw new NotFoundError("Tiki: No stream found");
}

export const tikiScraper = makeSourcerer({
  id: "tiki",
  name: "Tiki 🗿",
  rank: 911,
  disabled: false,
  flags: [flags.CORS_ALLOWED],
  scrapeMovie: scrapeTiki as any,
  scrapeShow: scrapeTiki as any,
});
