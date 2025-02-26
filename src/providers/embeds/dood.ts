import { makeEmbed } from '../base';
import { flags } from '@/entrypoint/utils/targets';
import { FileBasedStream } from '../streams';

export const doodScraper = makeEmbed({
  id: 'dood',
  name: 'DoodStream',
  rank: 170,
  flags: [flags.CORS_ALLOWED],
  scrape: async ({ url, features }) => {
    const stream: FileBasedStream = {
      type: 'file',
      qualities: {
        unknown: {
          type: 'mp4',
          url: url
        }
      },
      headers: {
        Referer: 'https://dood.to'
      }
    };

    return {
      embedId: 'dood',
      url,
      stream
    };
  }
});
