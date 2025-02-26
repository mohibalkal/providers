export type CommonMedia = {
  title: string;
  releaseYear: number;
  imdbId?: string;
  tmdbId: string;
};

export type MediaTypes = 'show' | 'movie';

export interface MovieMedia {
  type: 'movie';
  title: string;
  releaseYear: number;
  tmdbId: string;
}

export interface ShowMedia {
  type: 'show';
  title: string;
  releaseYear: number;
  tmdbId: string;
  season: number;
  episode: number;
}

export type ScrapeMedia = MovieMedia | ShowMedia;

export function makeStandardFetcher(proxyUrl?: string) {
  return async (url: string, options: RequestInit = {}) => {
    const finalUrl = proxyUrl ? `${proxyUrl}${url}` : url;
    const response = await fetch(finalUrl, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response;
  };
}
