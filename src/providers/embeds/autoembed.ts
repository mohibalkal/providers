import { flags } from '@/entrypoint/utils/targets';
import { makeEmbed } from '@/providers/base';

const providers = [
  {
    id: 'autoembed-english',
    rank: 10,
  },
  {
    id: 'autoembed-hindi',
    rank: 9,
  },
  {
    id: 'autoembed-tamil',
    rank: 8,
  },
  {
    id: 'autoembed-telugu',
    rank: 7,
  },
  {
    id: 'autoembed-bengali',
    rank: 6,
  },
];

function embed(provider: { id: string; rank: number }) {
  return makeEmbed({
    id: provider.id,
    name: provider.id.charAt(0).toUpperCase() + provider.id.slice(1),
    rank: provider.rank,
    flags: [flags.CORS_ALLOWED],
    disabled: false,
    async scrape(ctx) {
      return {
        embedId: provider.id,
        url: ctx.url,
      };
    },
  });
}

export const [
  autoembedEnglishScraper,
  autoembedHindiScraper,
  autoembedTamilScraper,
  autoembedTeluguScraper,
  autoembedBengaliScraper,
] = providers.map(embed);
