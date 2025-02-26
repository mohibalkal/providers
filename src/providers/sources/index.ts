// Export new sources
export * from './uira';
export * from './embed';
export { SlideMoviesScraper } from './slidemovies';
export { VidsrcSuScraper } from './vidsrcsu';
export * from './autoembed';
export * from './ee3';

// Export original sources
export * from './flixhq';
export * from './gomovies';
export * from './goojara';
export * from './hdrezka';
export * from './kissasian';
export * from './lookmovie';
export * from './primewire';
export * from './showbox';
export * from './soapertv';
export * from './vidsrc';
export * from './warezcdn';
export * from './zoechip';

import { makeSourcerer } from '../base';
import { flags } from '../../entrypoint/utils/targets';
import { flixhqScraper } from './flixhq';
import { superStreamScraper } from './superstream';
import { gomoviesScraper } from './gomovies';

export const getBuiltinSources = () => [
  flixhqScraper,
  superStreamScraper,
  gomoviesScraper
];
