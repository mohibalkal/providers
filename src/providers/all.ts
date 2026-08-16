// import { artemisScraper } from './sources/artemis';
import { warezcdnembedmp4Scraper } from './embeds/warezcdnembedmp4';

import { Sourcerer, Embed } from './base';
import { serverMirrorEmbed } from './embeds/server-mirrors';
import { turbovidScraper } from './embeds/turbovid';
import { fsOnlineScraper } from './sources/fsonline';
import { lookmovieScraper } from './sources/lookmovie';
import { wecimaScraper } from './sources/wecima';
import { youPlexSources } from './sources/youplex';
import { cinevaroScraper } from './sources/cinevaro';

import { gallicScraper } from './sources/gallic';


import { vidupScraper } from './sources/vidup';
import { debridScraper } from './sources/debrid';

export function gatherAllSources(): Array<Sourcerer> {
  return [
    cinevaroScraper,

    gallicScraper,


    wecimaScraper,
    fsOnlineScraper,
    lookmovieScraper,
    vidupScraper,
    debridScraper,

    ...youPlexSources,
  ];
}

import { gallicEmbeds } from './embeds/gallic';

import { doodScraper } from './embeds/dood';

export function gatherAllEmbeds(): Array<Embed> {
  return [
    doodScraper,
    warezcdnembedmp4Scraper,
    serverMirrorEmbed,
    turbovidScraper,
    ...gallicEmbeds,
  ];
}
