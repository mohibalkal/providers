import { FeatureFlags } from '../../../entrypoint/utils/targets';
import { IEmbed } from '../../../providers/base';
import { warezcdnWorkerProxy } from './common';

export const warezcdnembedMp4Scraper: IEmbed = {
  id: 'warezcdn-mp4',
  name: 'WarezCDN MP4',
  rank: 200,
  async scrape({ url, features }) {
    const proxyUrl = await warezcdnWorkerProxy(url);
    return {
      embedId: 'warezcdn-mp4',
      url: proxyUrl,
      flags: ['cors-allowed' as FeatureFlags]
    };
  }
};
