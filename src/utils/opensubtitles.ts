import { Caption } from '../providers/captions';
import { RunnerOptions } from '../runners/runner';

export interface OpenSubtitlesOptions {
  apiKey: string;
}

export interface OpenSubtitlesCaption extends Caption {
  opensubtitles: boolean;
}

export async function getOpenSubtitlesCaptions(
  imdbId: string,
  ops: RunnerOptions & OpenSubtitlesOptions
): Promise<OpenSubtitlesCaption[]> {
  if (!ops.apiKey) return [];

  const response = await fetch(`https://api.opensubtitles.com/api/v1/subtitles?imdb_id=${imdbId}`, {
    headers: {
      'Api-Key': ops.apiKey
    }
  });

  if (!response.ok) return [];

  const data = await response.json();
  return data.data.map((item: any) => ({
    id: item.id,
    language: item.attributes.language,
    url: item.attributes.url,
    opensubtitles: true
  }));
}

export async function addOpenSubtitlesCaptions(
  captions: Caption[],
  ops: RunnerOptions & OpenSubtitlesOptions,
  imdbId: string
): Promise<Caption[]> {
  const openSubtitlesCaptions = await getOpenSubtitlesCaptions(imdbId, ops);
  return [...captions, ...openSubtitlesCaptions];
}
