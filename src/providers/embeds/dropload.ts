import { unpack } from 'unpacker';

import { flags } from '@/entrypoint/utils/targets';

import { makeEmbed } from '../base';
import { HlsBasedStream } from '../streams';

const evalCodeRegex = /eval\((.*)\)/g;
const fileRegex = /file:"(.*?)"/g;
const tracksRegex = /\{file:"([^"]+)",kind:"thumbnails"\}/g;

export const droploadScraper = makeEmbed({
  id: 'dropload',
  name: 'Dropload',
  rank: 160,
  flags: [flags.CORS_ALLOWED],
  scrape: async ({ url, features }) => {
    const stream: HlsBasedStream = {
      type: 'hls',
      url: url,
      flags: [flags.CORS_ALLOWED],
      headers: {
        Referer: 'https://dropload.io'
      }
    };

    return {
      embedId: 'dropload',
      url,
      stream
    };
  }
});
