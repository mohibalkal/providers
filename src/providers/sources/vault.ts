// @ts-nocheck
import { makeSourcerer } from '@/providers/base';
import { flags } from '@/entrypoint/utils/targets';

// Provider: Vault 🔐  |  id: vault  |  type: source
// Original location: vendor.js line 21306

function zr(c) {
  const o = [];
  if (c.scrapeMovie) {
    o.push("movie");
  }
  if (c.scrapeShow) {
    o.push("show");
  }
  return {
    ...c,
    type: "source",
    disabled: c.disabled ?? false,
    externalSource: c.externalSource ?? false,
    mediaTypes: o
  };
}
function oi(c) {
  return {
    ...c,
    type: "embed",
    disabled: c.disabled ?? false,
    mediaTypes: undefined
  };
}

class Zt extends Error {
  constructor(t) {
    super("Couldn't find a stream: " + (t ?? "not found"));
    this.name = "NotFoundError";
  }
}
const Fn = {
  CORS_ALLOWED: "cors-allowed",
  IP_LOCKED: "ip-locked",
  CF_BLOCKED: "cf-blocked",
  PROXY_BLOCKED: "proxy-blocked"
};
const EZ = "https://stream.fontaine.lol";
const SZ = [{
  source: "Quartz",
  id: "vault-quartz",
  name: "Quartz",
  rank: 304
}, {
  source: "Andesite",
  id: "vault-andesite",
  name: "Andesite",
  rank: 305
}];
async function o9(c) {
  const o = c.media.imdbId;
  if (!o) {
    throw new Zt("Vault requires an IMDb id");
  }
  const {
    tmdbId: l
  } = c.media;
  const p = c.media.type === "show";
  const m = c.media.type === "show" ? String(c.media.season.number) : "";
  const g = c.media.type === "show" ? String(c.media.episode.number) : "";
  c.progress(20);
  const y = {
    tmdbId: String(l),
    imdbId: o,
    type: p ? "tv" : "movie",
    ...(p ? {
      seasonId: m,
      episodeId: g
    } : {})
  };
  const W = await c.fetcher(EZ + "/vault", {
    method: "GET",
    query: y
  });
  c.progress(70);
  const _ = (W == null ? undefined : W.sources) ?? {};
  const I = SZ.filter(O => {
    var T;
    return typeof ((T = _[O.source]) == null ? undefined : T.url) == "string";
  }).map(O => ({
    embedId: O.id,
    url: _[O.source].url
  }));
  if (I.length === 0) {
    throw new Zt("Vault found no playable sources");
  }
  c.progress(95);
  return {
    embeds: I
  };
}
const ub = zr({
  id: "vault",
  name: "Vault 🔐",
  rank: 306,
  flags: [Fn.CORS_ALLOWED],
  scrapeMovie: o9,
  scrapeShow: o9
});

export const vaultScraper = ub;

