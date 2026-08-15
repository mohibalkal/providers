import { flags } from '@/entrypoint/utils/targets';
import { Embed, makeEmbed } from '../base';

function createOregonEmbed(id: string, name: string, rank: number): Embed {
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

export const oregonNorthwestEmbed = createOregonEmbed('oregon-northwest', 'Oregon Northwest', 810);
export const oregonCorduroyEmbed = createOregonEmbed('oregon-corduroy', 'Oregon Corduroy', 811);
export const oregonPinesEmbed = createOregonEmbed('oregon-pines', 'Oregon Pines', 812);
export const oregonGleefulEmbed = createOregonEmbed('oregon-gleeful', 'Oregon Gleeful', 813);
