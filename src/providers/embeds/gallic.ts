import { flags } from '@/entrypoint/utils/targets';
import { makeEmbed } from '@/providers/base';

export const gallicEmbeds = [1, 2, 3].map((t) =>
  makeEmbed({
    id: `gallic-server${t}`,
    name: `Gallic ${t}`,
    rank: 173 + t,
    disabled: false,
    flags: [flags.CORS_ALLOWED],
    async scrape(ctx) {
      return {
        stream: [
          {
            id: 'primary',
            type: 'hls',
            playlist: ctx.url,
            flags: [flags.CORS_ALLOWED],
            captions: [],
          },
        ],
      };
    },
  })
);
