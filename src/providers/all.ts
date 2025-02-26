import { Sourcerer, Embed } from './base';

// Import sources
import {
  uiraScraper,
  embedScraper,
  SlideMoviesScraper,
  VidsrcSuScraper,
  autoembedScraper,
  ee3Scraper,
} from './sources';

// Import flixhq sources
import {
  flixhqScraper,
} from './sources/flixhq';

// Import embeds
import {
  upcloudScraper,
  vidCloudScraper,
} from './embeds/index';

export const sources: Sourcerer[] = [
  uiraScraper,
  embedScraper,
  SlideMoviesScraper,
  VidsrcSuScraper,
  autoembedScraper,
  ee3Scraper,
  flixhqScraper,
];

export const embeds: Embed[] = [
  upcloudScraper,
  vidCloudScraper,
];

export function gatherAllSources(): Sourcerer[] {
  return sources;
}

export function gatherAllEmbeds(): Embed[] {
  return embeds;
}