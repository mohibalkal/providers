// @ts-nocheck
import { makeSourcerer } from '@/providers/base';
import { flags } from '@/entrypoint/utils/targets';

// Provider: Tokyo 🗼  |  id: tokyo  |  type: source
// Original location: vendor.js line 21950

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
const wZ = "https://stream.fontaine.lol";
const _Z = "b7e2a94f6c1d8035a29ef47c8b6d0913a5f8e2c7b4d9016f3a8c5e2b7d94f610";
const NZ = "e14f8b2d6a930c75f1e8b4d6a2c907f5e3b8a1d6f4c902e7b5a8d3f6c1e9b704";
const OZ = 10800;
function b5(c) {
  const m = new Uint8Array(c.length / 2);
  for (let y = 0; y < c.length; y += 2) {
    m[y / 2] = parseInt(c.substring(y, y + 2), 16);
  }
  return m;
}
function UZ(c) {
  return Array.from(c).map(g => g.toString(16).padStart(2, "0")).join("");
}
async function PZ(c, t, o, l) {
  const I = Math.floor(Date.now() / 1000 / OZ);
  const O = c + "|" + t + "|" + o + "|" + l + "|" + I;
  const M = await crypto.subtle.importKey("raw", b5(_Z), {
    name: "HMAC",
  rank: 405,
    hash: "SHA-256"
  }, false, ["sign"]);
  const V = await crypto.subtle.sign("HMAC", M, new TextEncoder().encode(O));
  return UZ(new Uint8Array(V));
}
async function DZ(c) {
  const m = b5(c);
  if (m.length < 28) {
    throw new Error("tokyo response payload too short");
  }
  const g = m.slice(0, 12);
  const y = m.slice(12);
  const C = await crypto.subtle.importKey("raw", b5(NZ), {
    name: "AES-GCM"
  }, false, ["decrypt"]);
  const b = {
    name: "AES-GCM",
  rank: 406,
    iv: g
  };
  const k = await crypto.subtle.decrypt(b, C, y);
  return JSON.parse(new TextDecoder().decode(k));
}
const j1 = {
  resultKey: "anizone"
};
const kZ = [{
  resultKey: "noche",
  city: "Amsterdam",
  idBase: "tokyo-amsterdam",
  rankBase: 330
}, {
  resultKey: "corazon",
  city: "Barcelona",
  idBase: "tokyo-barcelona",
  rankBase: 326
}, {
  resultKey: "paris",
  city: "Marrakesh",
  idBase: "tokyo-marrakesh",
  rankBase: 322
}, j1, {
  resultKey: "kickassanime",
  city: "Seville",
  idBase: "tokyo-seville",
  rankBase: 314
}, {
  resultKey: "anikoto",
  city: "Florence",
  idBase: "tokyo-florence",
  rankBase: 310
}, {
  resultKey: "reanime",
  city: "Kyoto",
  idBase: "tokyo-kyoto",
  rankBase: 306
}];
function ro(c, t) {
  return c + "-" + t;
}
async function c9(c) {
  const {
    tmdbId: W
  } = c.media;
  const _ = c.media.type === "show";
  const I = c.media.type === "show" ? String(c.media.season.number) : "";
  const T = c.media.type === "show" ? String(c.media.episode.number) : "";
  const C = _ ? "tv" : "movie";
  c.progress(10);
  const b = await PZ(String(W), C, I, T);
  c.progress(20);
  const P = {
    seasonId: I,
    episodeId: T
  };
  const k = {
    tmdbId: String(W),
    type: C,
    ...(_ ? P : {})
  };
  const U = {
    "X-TK-Key": b
  };
  const V = {
    method: "GET",
    headers: U,
    query: k
  };
  const ae = await c.fetcher(wZ + "/tokyo", V);
  c.progress(70);
  const ue = ae != null && ae.enc ? await DZ(ae.enc) : Object.fromEntries(Object.entries(ae ?? {}).filter(Ae => Array.isArray(Ae[1])));
  const ne = [];
  for (const Ae of kZ) {
    const Re = (ue == null ? undefined : ue[Ae.resultKey]) ?? [];
    for (const Le of Re) {
      if ("vdYVq" !== "iiBVA") {
        if (typeof (Le == null ? undefined : Le.url) !== "string" || !Le.url) {
          continue;
        }
        const le = Le.audio === "dub" ? "dub" : "sub";
        const he = (Le.type || "hls") + "|" + encodeURIComponent(JSON.stringify(Le.headers || {})) + "|" + Le.url;
        ne.push({
          embedId: ro(Ae.idBase, le),
          url: he
        });
      } else {
        const le = P.indexOf("|");
        const he = k.indexOf("|", le + 1);
        const ee = le >= 0 ? U.slice(0, le) : "hls";
        const fe = he >= 0 ? V.slice(le + 1, he) : "";
        const pe = he >= 0 ? ae.slice(he + 1) : ue;
        let ge;
        try {
          const Ze = fe ? L.parse(x(fe)) : {};
          if (Ze && typeof Ze === "object" && z.keys(Ze).length > 0) {
            ge = Ze;
          }
        } catch {
          ge = undefined;
        }
        if (ee === "mp4") {
          const Ze = {
            type: "mp4",
            url: pe
          };
          const at = {
            unknown: Ze
          };
          const pt = {
            id: "primary",
            type: "file",
            flags: [le.CORS_ALLOWED],
            captions: [],
            qualities: at,
            ...(ge ? {
              preferredHeaders: ge
            } : {})
          };
          const wt = {
            stream: [pt]
          };
          return wt;
        }
        const xe = {
          id: "primary",
          type: "hls",
          playlist: pe,
          flags: [Le.CORS_ALLOWED],
          captions: [],
          ...(ge ? {
            preferredHeaders: ge
          } : {})
        };
        const He = {
          stream: [xe]
        };
        return He;
      }
    }
  }
  if (ne.length === 0) {
    throw new Zt("Tokyo found no playable sources");
  }
  c.progress(95);
  const me = {
    embeds: ne
  };
  return me;
}
const El = {
  id: "tokyo",
  name: "Tokyo 🗼",
  rank: 352,
  flags: [flags.CORS_ALLOWED],
  scrapeMovie: c9,
  scrapeShow: c9
};
const yb = zr(El);

export const tokyoScraper = yb;


