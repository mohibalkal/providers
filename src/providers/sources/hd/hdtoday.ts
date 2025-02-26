import { flags } from '@/entrypoint/utils/targets';
import { SourcererEmbed, makeSourcerer } from '@/providers/base';
import { NotFoundError } from '@/utils/errors';

const BASE_URL = 'https://hdtoday.tv';

export const hdtodayScraper = makeSourcerer({
  id: 'hdtoday',
  name: 'HDToday',
  rank: 190, // High rank for HD content
  flags: [flags.CORS_ALLOWED],
  async scrapeMovie(ctx) {
    const searchUrl = `${BASE_URL}/search/${encodeURIComponent(ctx.media.title)}`;
    // TODO: Implement HD movie search and scraping logic
    const embeds: SourcererEmbed[] = [];
    
    return {
      embeds,
    };
  },
  async scrapeShow(ctx) {
    const searchUrl = `${BASE_URL}/search/${encodeURIComponent(ctx.media.title)}`;
    // TODO: Implement HD show search and scraping logic
    const embeds: SourcererEmbed[] = [];
    
    return {
      embeds,
    };
  },
});
