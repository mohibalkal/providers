import { Stream } from './streams';
import { FeatureMap } from '../entrypoint/utils/targets';
import { UseableFetcher } from '../fetchers/types';

export interface ScrapeContext {
  url: string;
  features: FeatureMap;
  proxiedFetcher: UseableFetcher;
  fetcher: UseableFetcher;
  progress: (percent: number) => void;
}

export interface EmbedOutput {
  stream?: Stream;
  embedId?: string;
}

export interface SourcererOutput {
  stream?: Stream[];
  sourceId?: string;
  embeds?: { embedId: string; url: string }[];
}

export interface IEmbed {
  id: string;
  name: string;
  rank: number;
  disabled?: boolean;
  scrape: (context: ScrapeContext) => Promise<EmbedOutput>;
}

export interface ISourcerer {
  id: string;
  name: string;
  rank: number;
  disabled?: boolean;
  scrape: (context: ScrapeContext) => Promise<SourcererOutput>;
}

export function makeEmbed(
  id: string,
  name: string,
  rank: number,
  scraper: (ctx: ScrapeContext) => Promise<EmbedOutput>
): IEmbed {
  return { id, name, rank, scrape: scraper };
}

export function makeSourcerer(
  id: string,
  name: string,
  rank: number,
  scraper: (ctx: ScrapeContext) => Promise<SourcererOutput>
): ISourcerer {
  return { id, name, rank, scrape: scraper };
}

export type Embed = IEmbed;
export type Sourcerer = ISourcerer;
export type SourcererEmbed = { embedId: string; url: string };
