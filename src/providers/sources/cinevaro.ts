// @ts-nocheck
import { flags } from '@/entrypoint/utils/targets';
import { makeSourcerer } from '@/providers/base';
import { NotFoundError } from '@/utils/errors';

const resolverBaseUrl = 'https://resolver2.cinevaro.app';
const apiKey = '123123';

async function fetchSource(ctx: any, sourceName: string) {
  const url = new URL(`/api/test/${encodeURIComponent(ctx.media.tmdbId)}`, resolverBaseUrl);
  url.searchParams.set('source', sourceName);
  
  if (ctx.media.type === 'show') {
    url.searchParams.set('season', String(ctx.media.season?.number ?? 1));
    url.searchParams.set('episode', String(ctx.media.episode?.number ?? 1));
  }
  
  try {
    const res = await ctx.fetcher(url.toString(), {
      headers: {
        Accept: 'application/json',
        'X-API-Key': apiKey,
      },
    });
    const body = typeof res === 'string' ? JSON.parse(res) : res;
    if (body.ok) {
      const streams = body.streams?.filter((u: any) => !!u.url) ?? (body.url ? [{ url: body.url, label: sourceName }] : []);
      // Ensure each stream has a source tag so we can trace it
      return streams.map(s => ({ ...s, _source: sourceName }));
    }
  } catch (err) {
    // Ignore fetch errors for individual sources
  }
  return [];
}

async function comboScraper(ctx: any): Promise<any> {
  ctx.progress(10);

  // Fetch from both sources simultaneously!
  const [vaplayerStreams, vidriftStreams] = await Promise.all([
    fetchSource(ctx, 'vaplayer'),
    fetchSource(ctx, 'vidrift'),
  ]);

  const allStreams = [...vaplayerStreams, ...vidriftStreams];

  if (allStreams.length === 0) {
    throw new NotFoundError('CineVaro returned no streams');
  }
  ctx.progress(55);

  const stream = allStreams.map((u: any, i: number) =>
    /\.(?:mp4|m4v)(?:[?#]|$)/i.test(u.url)
      ? {
          id: `cinevaro-file-${i}`,
          type: 'file',
          qualities: { unknown: { type: 'mp4', url: u.url } },
          flags: [flags.CORS_ALLOWED],
          captions: [],
          skipValidation: true,
        }
      : {
          id: `cinevaro-hls-${i}`,
          type: 'hls',
          playlist: u.url,
          flags: [flags.CORS_ALLOWED],
          captions: [],
          skipValidation: true,
        },
  );

  ctx.progress(95);
  return {
    embeds: [],
    stream,
  };
}

export const cinevaroScraper = makeSourcerer({
  id: 'cinevaro',
  name: 'CineVaro',
  rank: 215,
  disabled: false,
  flags: [flags.CORS_ALLOWED],
  scrapeMovie: comboScraper,
  scrapeShow: comboScraper,
});
