import { flags } from '@/entrypoint/utils/targets';
import { Embed, makeEmbed } from '../base';

function createTikkiEmbed(id: string, name: string, rank: number): Embed {
  return makeEmbed({
    id: id,
    name: name,
    rank: rank,
    flags: [flags.CORS_ALLOWED],
    async scrape(ctx) {
      const url = ctx.url;
      const typeIndex = url.indexOf("|");
      const type = typeIndex >= 0 ? url.slice(0, typeIndex) : "hls";
      const streamUrl = typeIndex >= 0 ? url.slice(typeIndex + 1) : url;

      if (type === "mp4") {
        return {
          stream: [
            {
              id: "primary",
              type: "file",
              flags: [flags.CORS_ALLOWED],
              captions: [],
              qualities: {
                unknown: {
                  type: "mp4",
                  url: streamUrl,
                },
              },
            },
          ],
        };
      }

      return {
        stream: [
          {
            id: "primary",
            type: "hls",
            playlist: streamUrl,
            flags: [flags.CORS_ALLOWED],
            captions: [],
          },
        ],
      };
    },
  });
}

export const tikkiNovaEmbed = createTikkiEmbed('tikki-nova', 'Tikki Nova', 830);
export const tikkiAtlasEmbed = createTikkiEmbed('tikki-atlas', 'Tikki Atlas', 831);
export const tikkiOrionEmbed = createTikkiEmbed('tikki-orion', 'Tikki Orion', 832);
