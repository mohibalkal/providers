import { flags } from '@/entrypoint/utils/targets';
import { Embed, makeEmbed } from '../base';

function createValleyEmbed(id: string, name: string, rank: number): Embed {
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

export const valleyAbigailEmbed = createValleyEmbed('valley-abigail', 'Valley Abigail', 840);
export const valleyLinusEmbed = createValleyEmbed('valley-linus', 'Valley Linus', 841);
export const valleyPennyEmbed = createValleyEmbed('valley-penny', 'Valley Penny', 842);
export const valleySebastianEmbed = createValleyEmbed('valley-sebastian', 'Valley Sebastian', 843);
export const valleyHarveyEmbed = createValleyEmbed('valley-harvey', 'Valley Harvey', 844);
