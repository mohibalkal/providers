// @ts-nocheck
import { load } from 'cheerio';

import { SourcererOutput, makeSourcerer } from '@/providers/base';
import { MovieScrapeContext, ShowScrapeContext } from '@/utils/context';
import { NotFoundError } from '@/utils/errors';
import { flags } from '@/entrypoint/utils/targets';

const baseUrl = 'https://wecima.cx';

async function comboScraper(ctx: ShowScrapeContext | MovieScrapeContext): Promise<SourcererOutput> {
  const searchPage = await ctx.proxiedFetcher(`/search/${encodeURIComponent(ctx.media.title)}/`, {
    baseUrl,
  });

  const search$ = load(searchPage);
  const firstResult = search$('.Grid--WecimaPosts .GridItem a').first();
  if (!firstResult.length) throw new NotFoundError('No results found');

  const contentUrl = firstResult.attr('href');
  if (!contentUrl) throw new NotFoundError('No content URL found');
  ctx.progress(30);

  const contentPage = await ctx.proxiedFetcher(contentUrl, { baseUrl });
  const content$ = load(contentPage);

  let embedUrl: string | undefined;

  if (ctx.media.type === 'movie') {
    embedUrl = content$('meta[itemprop="embedURL"]').attr('content');
  } else {
    const seasonLinks = content$('.List--Seasons--Episodes a');
    let seasonUrl: string | undefined;

    for (const element of seasonLinks) {
      const text = content$(element).text().trim();
      if (text.includes(`موسم ${ctx.media.season}`)) {
        seasonUrl = content$(element).attr('href');
        break;
      }
    }

    if (!seasonUrl) throw new NotFoundError(`Season ${ctx.media.season} not found`);

    const seasonPage = await ctx.proxiedFetcher(seasonUrl, { baseUrl });
    const season$ = load(seasonPage);

    const episodeLinks = season$('.Episodes--Seasons--Episodes a');
    for (const element of episodeLinks) {
      const epTitle = season$(element).find('episodetitle').text().trim();
      if (epTitle === `الحلقة ${ctx.media.episode}`) {
        const episodeUrl = season$(element).attr('href');
        if (episodeUrl) {
          const episodePage = await ctx.proxiedFetcher(episodeUrl, { baseUrl });
          const episode$ = load(episodePage);
          embedUrl = episode$('meta[itemprop="embedURL"]').attr('content');
        }
        break;
      }
    }
  }

  // Since the user pasted the new structure, wecima now uses WatchServersList on the content page
  const serverLinks = content$('.WatchServersList li btn');
  const embeds: SourcererOutput['embeds'] = [];

  for (const element of serverLinks) {
    const dataUrl = content$(element).attr('data-url');
    if (dataUrl) {
      // Wecima obfuscates by removing 'aHR0c' (http) and adding '+' signs
      const cleanBase64 = 'aHR0c' + dataUrl.replace(/\+/g, '');
      const decodedUrl = Buffer.from(cleanBase64, 'base64').toString('utf-8');
      
      let embedId = '';
      if (decodedUrl.includes('mixdrop')) embedId = 'mixdrop';
      else if (decodedUrl.includes('dood')) embedId = 'dood';
      else if (decodedUrl.includes('vidsrc')) embedId = 'vidsrc';
      else if (decodedUrl.includes('upstream')) embedId = 'upstream';
      else if (decodedUrl.includes('streamtape')) embedId = 'streamtape';
      else if (decodedUrl.includes('filemoon')) embedId = 'filemoon';
      else if (decodedUrl.includes('voe')) embedId = 'voe';
      else if (decodedUrl.includes('vidmoly')) embedId = 'vidmoly';
      else if (decodedUrl.includes('uqload')) embedId = 'uqload';
      else if (decodedUrl.includes('savefiles')) embedId = 'dood'; // doodstream domain alias

      if (embedId) {
        embeds.push({
          embedId,
          url: decodedUrl,
        });
      }
    }
  }

  if (embeds.length === 0) throw new NotFoundError('No valid servers found');
  ctx.progress(100);

  return {
    embeds,
    stream: [],
  };
}

export const wecimaScraper = makeSourcerer({
  id: 'wecima',
  name: 'Wecima (Arabic)',
  rank: 3,
  disabled: false,
  flags: [flags.CORS_ALLOWED],
  scrapeMovie: comboScraper,
  scrapeShow: comboScraper,
});

