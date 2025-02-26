import { flags } from '@/entrypoint/utils/targets';
import { makeEmbed } from '@/providers/base';
import { EmbedScrapeContext } from '@/utils/context';
import { NotFoundError } from '@/utils/errors';

import { getDecryptedId } from './common';

// Method found by atpn
async function getVideowlUrlStream(ctx: EmbedScrapeContext, decryptedId: string): Promise<string> {
  try {
    const response = await ctx.proxiedFetcher<string>('https://cloud.mail.ru/public/uaRH/2PYWcJRpH');
    
    const regex = /"videowl_view":\{"count":"(\d+)","url":"([^"]+)"\}/;
    const match = regex.exec(response);
    
    if (!match || !match[2]) {
      throw new NotFoundError('Failed to extract videowl URL');
    }

    const videowlUrl = match[2];
    const params = new URLSearchParams({
      double_encode: '1'
    });

    return `${videowlUrl}/0p/${btoa(decryptedId)}.m3u8?${params}`;
  } catch (error) {
    if (error instanceof NotFoundError) throw error;
    throw new NotFoundError('Failed to get videowl stream URL');
  }
}

export const warezcdnembedHlsScraper = makeEmbed({
  id: 'warezcdnembedhls', // WarezCDN is both a source and an embed host
  name: 'WarezCDN HLS',
  rank: 83,
  async scrape(ctx) {
    const decryptedId = await getDecryptedId(ctx);

    if (!decryptedId) throw new NotFoundError("can't get file id");

    const streamUrl = await getVideowlUrlStream(ctx, decryptedId);

    return {
      stream: [
        {
          id: 'primary',
          type: 'hls',
          flags: [flags.IP_LOCKED],
          captions: [],
          playlist: streamUrl,
        },
      ],
    };
  },
});
