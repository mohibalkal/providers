import { makeSourcerer } from '../base';
import { flags } from '@/entrypoint/utils/targets';
import fetch from 'node-fetch';
import { load } from 'cheerio';

export const VidsrcSuScraper = makeSourcerer({
  id: 'vidsrcsu',
  name: 'Vidsrc.su',
  rank: 300,
  flags: [flags.CORS_ALLOWED],
  disabled: false,
  async scrapeMovie(ctx) {
    try {
      const url = `https://vidsrc.su/embed/${ctx.media.id}`;
      const response = await fetch(url);
      const html = await response.text();
      const $ = load(html);
      
      return {
        embeds: [
          {
            embedId: 'vidsrcsu',
            url,
            quality: 'unknown',
          },
        ],
      };
    } catch (error) {
      console.error(`[Vidsrc.su] Error:`, error);
      return {
        embeds: [],
      };
    }
  },
  async scrapeShow(ctx) {
    try {
      const url = `https://vidsrc.su/embed/${ctx.media.id}`;
      const response = await fetch(url);
      const html = await response.text();
      const $ = load(html);
      
      return {
        embeds: [
          {
            embedId: 'vidsrcsu',
            url,
            quality: 'unknown',
          },
        ],
      };
    } catch (error) {
      console.error(`[Vidsrc.su] Error:`, error);
      return {
        embeds: [],
      };
    }
  },
});
