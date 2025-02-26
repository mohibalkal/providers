import { ISourceData, ISource, makeSourcerer } from '../base';
import { flags } from '@/entrypoint/utils/targets';

export const embedScraper = makeSourcerer({
  id: 'embed',
  name: 'Embed.su',
  rank: 200,
  flags: [flags.CORS_ALLOWED],
  disabled: false,
  async scrapeMovie(ctx) {
    try {
      const url = `https://embed.su/video/${ctx.media.id}`;
      return {
        embeds: [
          {
            embedId: 'embed',
            url,
          },
        ],
      };
    } catch (error) {
      console.error(`[Embed.su] Error:`, error);
      return {
        embeds: [],
      };
    }
  },
  async scrapeShow(ctx) {
    try {
      const url = `https://embed.su/video/${ctx.media.id}`;
      return {
        embeds: [
          {
            embedId: 'embed',
            url,
          },
        ],
      };
    } catch (error) {
      console.error(`[Embed.su] Error:`, error);
      return {
        embeds: [],
      };
    }
  },
});
