import { load } from 'cheerio';
import { unpack } from 'unpacker';

import { flags } from '@/entrypoint/utils/targets';
import { NotFoundError } from '@/utils/errors';

import { makeEmbed } from '../base';
import { Caption, getCaptionTypeFromUrl, labelToLanguageCode } from '../captions';
import { HlsBasedStream } from '../streams';

const referer = 'https://ridomovies.tv/';

export const closeloadScraper = makeEmbed({
  id: 'closeload',
  name: 'Closeload',
  rank: 190,
  flags: [flags.CORS_ALLOWED],
  disabled: false,
  scrape: async ({ url, features }) => {
    const stream: HlsBasedStream = {
      type: 'hls',
      url: url,
      flags: [flags.CORS_ALLOWED],
      headers: {
        Referer: 'https://closeload.com'
      }
    };

    return {
      embedId: 'closeload',
      url,
      stream
    };
  }
});
