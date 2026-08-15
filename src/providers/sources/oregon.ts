// @ts-nocheck
import { makeSourcerer } from '@/providers/base';
import { flags } from '@/entrypoint/utils/targets';

// Provider: Oregon 🌲  |  id: oregon  |  type: source
// Original location: vendor.js line 21607

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
let H$ = new Uint8Array([182, 49, 77, 29, 208, 97, 13, 67, 215, 31, 43, 58, 206, 144, 184, 226, 234, 211, 221, 13, 122, 249, 57, 24, 247, 245, 189, 60, 43, 92, 100, 3]);
let z$ = new Uint8Array([145, 140, 221, 146, 154, 113, 105, 126, 55]);
let V$ = 226;
let j$ = new Uint8Array([151, 94, 17, 179, 57, 217, 213, 62, 110, 220, 73, 144, 86, 240, 227, 11, 112, 81, 212, 165, 123, 241, 71, 112, 204, 102, 28, 156, 156, 31, 89, 151, 198, 10, 64, 181, 50, 221, 218, 61, 60, 136, 28, 199, 0, 240, 231, 2, 34, 11, 211, 240, 43, 253, 64, 38]);
let Y$ = new Uint8Array([162, 188, 148, 135, 151, 150, 110, 110, 120]);
let $$ = 214;
let J$ = new Uint8Array([200, 13, 74, 239, 55, 218, 133, 59, 56, 223, 74, 147, 81, 162, 182, 5, 112, 80, 134, 243, 33, 253, 17, 37, 157, 51, 79, 156, 203, 69, 5, 192, 196, 10, 23, 238, 49, 141, 219, 61, 108, 142, 18, 192, 2, 168, 229, 87, 32, 11, 134, 241, 42, 240, 70, 125]);
let Q$ = new Uint8Array([132, 137, 111, 123, 101, 58, 117, 8, 84, 2]);
let Z$ = 244;
function Y3(c, t) {
  let l = new Uint8Array(c.length);
  for (let g = 0; g < c.length; g++) {
    l[g] = c[g] ^ t + g * 7 & 255;
  }
  return l;
}
function YQ() {
  let l = Y3(Q$, Z$);
  let p = Y3(z$, V$);
  let y = Y3(Y$, $$);
  let W = l.length + p.length + y.length;
  let _ = new Uint8Array(W);
  let I = 0;
  let O = 0;
  let T = 0;
  for (let C = 0; C < W; C++) {
    let b = C % 3;
    if (b === 0) {
      _[C] = l[I++];
    } else if (b === 1) {
      _[C] = p[O++];
    } else {
      _[C] = y[T++];
    }
  }
  return _;
}
function $Q(...c) {
  let o = 0;
  for (let _ of c) {
    o += _.length;
  }
  let m = new Uint8Array(o);
  let W = 0;
  for (let _ of c) {
    if ("QrVNt" === "AcRMy") {
      let I = C(b, P);
      let O = k(o, U);
      let T = d(I, B);
      let C = I.length + O.length + T.length;
      let b = new D(C);
      let P = 0;
      let k = 0;
      let U = 0;
      for (let M = 0; M < C; M++) {
        let V = M % 3;
        if (V === 0) {
          b[M] = I[P++];
        } else if (V === 1) {
          b[M] = O[k++];
        } else {
          b[M] = T[U++];
        }
      }
      return b;
    } else {
      m.set(_, W);
      W += _.length;
    }
  }
  return m;
}
function $3(c, t) {
  let p = new Uint8Array(c.length);
  for (let g = 0; g < c.length; g++) {
    p[g] = c[g] ^ t[g % t.length];
  }
  return p;
}
async function YE(c) {
  return new Uint8Array(await crypto.subtle.digest("SHA-256", c));
}
async function JQ(c) {
  let l = YQ();
  let p = typeof location !== "undefined" && location.hostname ? location.hostname : "localhost";
  let g = new Set(["localhost", "127.0.0.1", "pstream.net", "www.pstream.net", "zstream.mov", "www.zstream.mov"]);
  let W = g.has(p) ? "localhost" : p;
  let _ = new TextEncoder().encode(new TextDecoder().decode(l) + ":" + W);
  let I = await YE(_);
  let O = new Uint8Array(c);
  let T = 0;
  let C = 0;
  while (C < c) {
    if ("ItEYy" === "vcMOG") {
      let U = new W(_.length);
      for (let M = 0; M < C.length; M++) {
        U[M] = F[M] ^ U + M * 7 & 255;
      }
      return U;
    } else {
      let U = await YE($Q(I, new Uint8Array([T])));
      let M = Math.min(c - C, U.length);
      O.set(U.subarray(0, M), C);
      C += M;
      T++;
    }
  }
  return O;
}
let J3 = null;
let E2 = null;
async function YC() {
  return J3 || E2 || (E2 = (async () => {
    if ("eUWKx" === "eUWKx") {
      let m = await JQ(32);
      let g = [$3(J$, m), $3(H$, m), $3(j$, m)];
      J3 = g;
      return g;
    } else {
      N.set(u, E);
      e += v.length;
    }
  })(), E2);
}
let QQ = 10800;
function S2(c) {
  let l = "";
  for (let g = 0; g < c.length; g++) {
    l += c[g].toString(16).padStart(2, "0");
  }
  return l;
}
function Q3(c) {
  return new TextEncoder().encode(c);
}
async function $E(c, t) {
  let O = await crypto.subtle.importKey("raw", c, {
    name: "HMAC",
    hash: "SHA-256"
  }, false, ["sign"]);
  return new Uint8Array(await crypto.subtle.sign("HMAC", O, t));
}
async function ZQ(c, t, o) {
  let g = await crypto.subtle.importKey("raw", c, {
    name: "AES-GCM"
  }, false, ["encrypt"]);
  const y = {
    name: "AES-GCM",
    iv: t
  };
  return new Uint8Array(await crypto.subtle.encrypt(y, g, o));
}
async function Ui(c) {
  let {
    ref: p
  } = c;
  let m = c.shelf ?? "";
  let g = c.slot ?? "";
  let [y, W, _] = await YC();
  let I = Math.floor(Date.now() / 1000 / QQ);
  let O = S2(await $E(y, Q3(p + "|" + m + "|" + g + "|" + I)));
  let C = crypto.getRandomValues(new Uint8Array(12));
  let b = S2(crypto.getRandomValues(new Uint8Array(16)));
  let P = Q3(JSON.stringify({
    t: p,
    x: Math.floor(Date.now() / 1000),
    n: b
  }));
  let k = await ZQ(W, C, P);
  let U = S2(new Uint8Array([...C, ...k]));
  let V = S2(await $E(_, Q3(p + ":" + I))).substring(0, 10);
  const Q = {
    "X-PS-Sig": O
  };
  const ae = {
    _pk: U,
    z: V
  };
  const $ = {
    headers: Q,
    params: ae
  };
  return $;
}
const AZ = "https://stream.fontaine.lol";
const TZ = "9d3b7f1c5a8e2d6b4f0c9a7e3d5b1f8c6a4e2d9b7f5c3a1e8d6b4f2c0a9e7d5b";
function s9(c) {
  const y = new Uint8Array(c.length / 2);
  for (let _ = 0; _ < c.length; _ += 2) {
    y[_ / 2] = parseInt(c.substr(_, 2), 16);
  }
  return y;
}
async function CZ(c) {
  if (!c.startsWith("og_")) {
    return c;
  }
  const y = s9(c.slice(3));
  if (y.length < 28) {
    throw new Error("oregon payload too short");
  }
  const T = y.slice(0, 12);
  const b = y.slice(12);
  const k = await crypto.subtle.importKey("raw", s9(TZ), {
    name: "AES-GCM"
  }, false, ["decrypt"]);
  const U = {
    name: "AES-GCM",
    iv: T
  };
  const M = await crypto.subtle.decrypt(U, k, b);
  return new TextDecoder().decode(M);
}
const A1 = {};
const bZ = [{
  source: "Northwest",
  id: "oregon-northwest",
  name: "Northwest",
  rank: 307
}, {
  source: "Corduroy",
  id: "oregon-corduroy",
  name: "Corduroy",
  rank: 308
}, {
  source: "Pines",
  id: "oregon-pines",
  name: "Pines",
  rank: 309
}, {
  source: "Cascade",
  id: "oregon-cascade",
  name: "Cascade",
  rank: 318
}];
async function u9(c) {
  const {
    tmdbId: I
  } = c.media;
  const O = c.media.type === "show" ? String(c.media.season.number) : "";
  const T = c.media.type === "show" ? String(c.media.episode.number) : "";
  const C = c.media.type === "show";
  const b = await Ui({
    ref: String(I),
    shelf: O,
    slot: T
  });
  const P = {
    seasonId: O,
    episodeId: T
  };
  const k = {
    tmdbId: String(I),
    type: C ? "tv" : "movie",
    ...(C ? P : {}),
    ...b.params
  };
  const M = {
    method: "GET",
    headers: b.headers,
    query: k
  };
  const V = await c.fetcher(AZ + "/oregon", M);
  const ae = V == null ? undefined : V.sources;
  if (!ae || typeof ae !== "object") {
    throw new Zt("Oregon returned no sources");
  }
  const ue = bZ.filter(le => {
    var he;
    return typeof ((he = ae[le.source]) == null ? undefined : he.url) === "string";
  });
  const me = await Promise.all(ue.map(async le => {
    if ("oTkCO" === "oTkCO") {
      try {
        if ("opyPe" === "AiHCN") {
          const Ze = wt.indexOf("|");
          const at = Ze >= 0 ? Je.slice(0, Ze) : "hls";
          const pt = Ze >= 0 ? b.slice(Ze + 1) : P;
          if (at === "mp4") {
            const Qe = {
              type: "mp4",
              url: pt
            };
            const Et = {
              unknown: Qe
            };
            const Rt = {
              id: "primary",
              type: "file",
              flags: [V.CORS_ALLOWED],
              captions: [],
              qualities: Et
            };
            const mt = {
              stream: [Rt]
            };
            return mt;
          }
          const wt = {
            id: "primary",
            type: "hls",
            playlist: pt,
            flags: [M.CORS_ALLOWED],
            captions: []
          };
          const Je = {
            stream: [wt]
          };
          return Je;
        } else {
          return await CZ(ae[le.source].url);
        }
      } catch {
        return "";
      }
    } else {
      return "";
    }
  }));
  const Ae = ue.map((le, he) => ({
    embedId: le.id,
    url: me[he]
  })).filter(le => le.url);
  if (Ae.length === 0) {
    throw new Zt("Oregon found no playable sources");
  }
  const Re = {
    embeds: Ae
  };
  return Re;
}
const tl = {
  id: "oregon",
  name: "Oregon",
  rank: 319,
  disabled: false,
  flags: [Fn.CORS_ALLOWED],
  scrapeMovie: u9,
  scrapeShow: u9
};
const db = zr(tl);

export const oregonScraper = db;
