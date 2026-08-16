// import { artemisScraper } from './sources/artemis';
import { asperaScraper } from './sources/aspera';
// import { tikkiScraper } from './sources/tikki';
import { veloraScraper } from './sources/velora';
import { vaultScraper } from './sources/vault';
import { oregonScraper } from './sources/oregon';
// import { tokyoScraper } from './sources/tokyo';
import { chaseScraper } from './sources/chase';
import { tikkiScraper } from './sources/tikki';
import { valleyScraper } from './sources/valley';
import { sidoniaScraper } from './sources/sidonia';
import { nesterovScraper } from './sources/nesterov';
import { viennaScraper } from './sources/vienna';
import { nekoScraper } from './sources/neko';
import { oregonNorthwestEmbed, oregonCorduroyEmbed, oregonPinesEmbed, oregonGleefulEmbed } from './embeds/oregon';
import { chaseSaturnEmbed, chaseMercuryEmbed, chaseMarsEmbed, chaseVenusEmbed } from './embeds/chase';
import { tikkiNovaEmbed, tikkiAtlasEmbed, tikkiOrionEmbed } from './embeds/tikki';
import { valleyAbigailEmbed, valleyLinusEmbed, valleyPennyEmbed, valleySebastianEmbed, valleyHarveyEmbed } from './embeds/valley';
import { sidoniaTheiaEmbed, sidoniaCriusEmbed, sidoniaHadesEmbed } from './embeds/sidonia';
import { warezcdnembedmp4Scraper } from './embeds/warezcdnembedmp4';
import { veloraYoruEmbed, veloraNeonEmbed } from './embeds/velora';
import { vaultQuartzEmbed, vaultAndesiteEmbed } from './embeds/vault';

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
    nekoScraper,
    viennaScraper,
    sidoniaScraper,
    valleyScraper,
    chaseScraper,
    tikkiScraper,
    nesterovScraper,
    // tokyoScraper,
    oregonScraper,
    vaultScraper,
    veloraScraper,
    // tikkiScraper,
    asperaScraper,
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
    vaultQuartzEmbed,
    vaultAndesiteEmbed,
    veloraYoruEmbed,
    veloraNeonEmbed,
    oregonNorthwestEmbed,
    oregonCorduroyEmbed,
    oregonPinesEmbed,
    oregonGleefulEmbed,
    chaseSaturnEmbed,
    chaseMercuryEmbed,
    chaseMarsEmbed,
    chaseVenusEmbed,
    tikkiNovaEmbed,
    tikkiAtlasEmbed,
    tikkiOrionEmbed,
    valleyAbigailEmbed,
    valleyLinusEmbed,
    valleyPennyEmbed,
    valleySebastianEmbed,
    valleyHarveyEmbed,
    sidoniaTheiaEmbed,
    sidoniaCriusEmbed,
    sidoniaHadesEmbed,
    ...gallicEmbeds,
  ];
}
