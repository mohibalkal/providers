import { flags } from '@/entrypoint/utils/targets';
import { SourcererOutput, makeSourcerer } from '@/providers/base';
import { MovieScrapeContext, ShowScrapeContext } from '@/utils/context';
import { NotFoundError } from '@/utils/errors';
import { getSetCookieHeader, parseSetCookie } from '@/utils/cookie';

const baseUrl = 'https://vidup.to';
const API = 'https://enc-dec.app/api';

async function comboScraper(ctx: MovieScrapeContext | ShowScrapeContext): Promise<SourcererOutput> {
  const tmdbId = ctx.media.tmdbId;
  let url: string;

  if (ctx.media.type === 'movie') {
    url = `${baseUrl}/movie/${tmdbId}`;
  } else {
    url = `${baseUrl}/tv/${tmdbId}/${ctx.media.season?.number ?? 1}/${ctx.media.episode?.number ?? 1}`;
  }

  const headers: Record<string, string> = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36',
    'Referer': 'https://vidup.to/',
    'X-Requested-With': 'XMLHttpRequest',
  };

  const pageRes = await ctx.proxiedFetcher.full(url, { headers });
  
  const cookieStr = getSetCookieHeader(pageRes.headers);
  const parsedCookies = parseSetCookie(cookieStr);
  let text = parsedCookies['page_id']?.value;
  
  if (!text) {
    const body = pageRes.body as any as string;
    const match = body?.match ? (body.match(/\\"(?:en|token)\\":\\"(.*?)\\"/) || body.match(/"(?:en|token)":"([^"]+)"/)) : null;
    if (match) text = match[1];
  }

  if (!text) throw new NotFoundError('Token not found in page or cookies');

  const encRes = await ctx.proxiedFetcher<any>(`${API}/enc-vidup?text=${text}`);
  if (encRes.status !== 200) throw new Error('Failed to get enc-vidup');
  
  const parts = encRes.result;
  headers['X-CSRF-Token'] = parts.token;

  const serversEncrypted = await ctx.proxiedFetcher<string>(parts.servers, {
    method: 'POST',
    headers,
  });

  const decServersRes = await ctx.proxiedFetcher<any>(`${API}/dec-vidup`, {
    method: 'POST',
    body: JSON.stringify({ text: serversEncrypted }),
    headers: { 'Content-Type': 'application/json' },
  });
  if (decServersRes.status !== 200) throw new Error('Failed to decrypt servers');
  
  const serversDecrypted = decServersRes.result;
  if (!serversDecrypted || serversDecrypted.length === 0) throw new NotFoundError('No servers found');

  const server = serversDecrypted[0];
  const streamUrl = `${parts.stream}/${server.data}`;
  
  const streamEncrypted = await ctx.proxiedFetcher<string>(streamUrl, {
    method: 'POST',
    headers,
  });

  const decStreamRes = await ctx.proxiedFetcher<any>(`${API}/dec-vidup`, {
    method: 'POST',
    body: JSON.stringify({ text: streamEncrypted }),
    headers: { 'Content-Type': 'application/json' },
  });
  
  if (decStreamRes.status !== 200) throw new Error('Failed to decrypt stream');
  
  const streamData = decStreamRes.result;
  
  let playlist = '';
  if (typeof streamData === 'string') {
    playlist = streamData;
  } else if (streamData && streamData.url) {
    playlist = streamData.url;
  } else if (streamData && streamData.sources && streamData.sources.length > 0) {
    playlist = streamData.sources[0].file;
  } else if (Array.isArray(streamData) && streamData.length > 0) {
    playlist = streamData[0].file || streamData[0];
  } else {
    playlist = JSON.stringify(streamData);
  }

  // Ensure the playlist is a valid URL before returning
  if (!playlist || playlist.startsWith('{')) {
    throw new Error('Failed to extract valid HLS playlist URL from decrypted data');
  }

  return {
    embeds: [],
    stream: [
      {
        id: 'primary',
        playlist: playlist,
        type: 'hls',
        flags: [flags.CORS_ALLOWED],
        captions: [],
      }
    ]
  };
}

export const vidupScraper = makeSourcerer({
  id: 'vidup',
  name: 'VidUp',
  rank: 185,
  disabled: false,
  flags: [flags.CORS_ALLOWED],
  scrapeMovie: comboScraper,
  scrapeShow: comboScraper,
});
