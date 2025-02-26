import { makeSourcerer } from '../base';
import { flags } from '@/entrypoint/utils/targets';

export const SlideMoviesScraper = makeSourcerer({
  id: 'slidemovies',
  name: 'SlideMovies',
  rank: 800,
  flags: [flags.CORS_ALLOWED],
  disabled: false,
  async scrapeMovie(ctx) {
    try {
      const url = `https://slidemovies.org/embed/${ctx.media.id}`;
      return {
        embeds: [
          {
            embedId: 'slidemovies',
            url,
          },
        ],
      };
    } catch (error) {
      console.error(`[SlideMovies] Error:`, error);
      return {
        embeds: [],
      };
    }
  },
  async scrapeShow(ctx) {
    try {
      const url = `https://slidemovies.org/embed/${ctx.media.id}`;
      return {
        embeds: [
          {
            embedId: 'slidemovies',
            url,
          },
        ],
      };
    } catch (error) {
      console.error(`[SlideMovies] Error:`, error);
      return {
        embeds: [],
      };
    }
  },
});
