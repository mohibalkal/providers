import { flags } from '@/entrypoint/utils/targets';
import { SourcererOutput, makeSourcerer } from '@/providers/base';
import { MovieScrapeContext, ShowScrapeContext } from '@/utils/context';
import { NotFoundError } from '@/utils/errors';

const baseUrl = "https://nebula.aether.cx";

async function scrapeNebula(ctx: ShowScrapeContext | MovieScrapeContext): Promise<SourcererOutput> {
  const tmdbId = ctx.media.tmdbId;
  let url: string;

  if (ctx.media.type === "movie") {
    url = `${baseUrl}/movie/${tmdbId}?ser=cf`;
  } else {
    url = `${baseUrl}/tv/${tmdbId}/${ctx.media.season?.number ?? 1}/${ctx.media.episode?.number ?? 1}?ser=cf`;
  }

  let data;
  try {
    const res = await ctx.fetcher(url);
    data = typeof res === 'string' ? JSON.parse(res) : res;
  } catch (err) {
    throw new NotFoundError("Nebula: Failed to fetch stream");
  }

  const streams = data?.streams
    ?.filter((s: any) => s.type === "hls" && s.url)
    .map((s: any, b: number) => ({
      id: `nebula-${b}`,
      type: "hls",
      playlist: s.url,
      flags: [flags.CORS_ALLOWED],
      captions: [],
    })) ?? [];

  if (streams.length === 0) {
    throw new NotFoundError("Nebula: No stream found");
  }

  return {
    embeds: [],
    stream: streams,
  };
}

export const nebulaScraper = makeSourcerer({
  id: "nebula",
  name: "Nebula 🌌",
  rank: 913,
  disabled: false,
  flags: [flags.CORS_ALLOWED],
  scrapeMovie: scrapeNebula as any,
  scrapeShow: scrapeNebula as any,
});
