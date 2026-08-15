import { gatherAllSources, gatherAllEmbeds } from './src/providers/all';

const sources = gatherAllSources();
const embeds = gatherAllEmbeds();

const sRanks = sources.map(s => s.rank);
const eRanks = embeds.map(e => e.rank);

const duplicateSources = sRanks.filter((item, index) => sRanks.indexOf(item) !== index);
const duplicateEmbeds = eRanks.filter((item, index) => eRanks.indexOf(item) !== index);

console.log('Duplicate Source Ranks:', duplicateSources);
console.log('Duplicate Embed Ranks:', duplicateEmbeds);
