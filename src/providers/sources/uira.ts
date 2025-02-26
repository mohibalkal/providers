import { ISourceData, ISource, makeSourcerer } from '../base';
import { flags } from '@/entrypoint/utils/targets';
import fetch from 'node-fetch';
import { load } from 'cheerio';

export const uiraScraper = makeSourcerer({
  id: 'uira',
  name: 'UiraLive',
  rank: 150,
  flags: [flags.CORS_ALLOWED],
  disabled: false,
  async scrapeMovie(ctx) {
    try {
      const url = `https://uira.live/embed/${ctx.media.id}`;
      return {
        embeds: [
          {
            embedId: 'uira',
            url,
          },
        ],
      };
    } catch (error) {
      console.error(`[UiraLive] Error:`, error);
      return {
        embeds: [],
      };
    }
  },
  async scrapeShow(ctx) {
    try {
      const url = `https://uira.live/embed/${ctx.media.id}`;
      return {
        embeds: [
          {
            embedId: 'uira',
            url,
          },
        ],
      };
    } catch (error) {
      console.error(`[UiraLive] Error:`, error);
      return {
        embeds: [],
      };
    }
  },
});
