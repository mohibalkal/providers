import { makeEmbed } from '../base';
import { flags } from '@/entrypoint/utils/targets';
import { FileBasedStream } from '../streams';

export const bflixScraper = makeEmbed({
  id: 'bflix',
  name: 'BFlix',
  rank: 180,
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
        Referer: 'https://bflix.to'
      }
    };

    return {
      embedId: 'bflix',
      url,
      stream
    };
  }
});
