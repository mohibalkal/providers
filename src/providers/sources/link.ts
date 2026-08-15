import { flags } from '@/entrypoint/utils/targets';
import { SourcererOutput, makeSourcerer } from '@/providers/base';
import { MovieScrapeContext, ShowScrapeContext } from '@/utils/context';
import { NotFoundError } from '@/utils/errors';

const baseUrl = "https://link.aether.cx";

async function scrapeLink(ctx: ShowScrapeContext | MovieScrapeContext): Promise<SourcererOutput> {
  const tmdbId = ctx.media.tmdbId;
  let url: string;

  if (ctx.media.type === "movie") {
    url = `${baseUrl}/movie/${tmdbId}`;
  } else {
    url = `${baseUrl}/tv/${tmdbId}/${ctx.media.season?.number ?? 1}/${ctx.media.episode?.number ?? 1}`;
  }

  let data;
  try {
    const res = await ctx.fetcher(url);
    data = typeof res === 'string' ? JSON.parse(res) : res;
  } catch (err) {
    throw new NotFoundError("Link: Failed to fetch stream");
  }

  if (!data || !data.stream) {
    throw new NotFoundError("Link: No stream found");
  }

  return {
    embeds: [],
    stream: [
      {
        id: "primary",
        type: "hls",
        playlist: data.stream,
        flags: [flags.CORS_ALLOWED],
        captions: [],
      },
    ],
  };
}

export const linkScraper = makeSourcerer({
  id: "link",
  name: "Link 🔗",
  rank: 916,
  disabled: false,
  flags: [flags.CORS_ALLOWED],
  scrapeMovie: scrapeLink as any,
  scrapeShow: scrapeLink as any,
});
