import { makeEmbed } from '../base';
import { flags } from '@/entrypoint/utils/targets';
import { warezcdnembedMp4Scraper } from './warezcdn/mp4';
import { alphaScraper, deltaScraper } from './nsbx';
import { astraScraper, novaScraper } from './whvx';

export const upcloudScraper = makeEmbed({
  id: 'upcloud',
  name: 'UpCloud',
  rank: 200,
  flags: [flags.CORS_ALLOWED],
  disabled: false,
  async scrape(ctx) {
    try {
      const url = `https://upcloud.video/embed/${ctx.id}`;
      return {
        embedId: 'upcloud',
        url,
      };
    } catch (error) {
      console.error(`[UpCloud] Error:`, error);
      return {
        embedId: 'upcloud',
        url: '',
      };
    }
  },
});

export const vidCloudScraper = makeEmbed({
  id: 'vidcloud',
  name: 'VidCloud',
  rank: 150,
  flags: [flags.CORS_ALLOWED],
  disabled: false,
  async scrape(ctx) {
    try {
      const url = `https://vidcloud.stream/embed/${ctx.id}`;
      return {
        embedId: 'vidcloud',
        url,
      };
    } catch (error) {
      console.error(`[VidCloud] Error:`, error);
      return {
        embedId: 'vidcloud',
        url: '',
      };
    }
  },
});

export const getBuiltinEmbeds = () => [
  warezcdnembedMp4Scraper,
  alphaScraper,
  deltaScraper,
  astraScraper,
  novaScraper
];
