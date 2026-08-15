// @ts-nocheck
import { makeSourcerer } from '@/providers/base';
import { flags } from '@/entrypoint/utils/targets';

// Provider: Velora 🚀  |  id: velora  |  type: source
// Original location: vendor.js line 21199

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
const mZ = "https://stream.fontaine.lol";
const gZ = "7a2c9f4e1d6b8035c7f92a4e6d1b8305c9f7a2e4d6b1830c5f9a7e2d4b6183f0";
function i9(c) {
  const l = new Uint8Array(c.length / 2);
  for (let g = 0; g < c.length; g += 2) {
    l[g / 2] = parseInt(c.substr(g, 2), 16);
  }
  return l;
}
async function yZ(c) {
  if (!c.startsWith("vl_")) {
    return c;
  }
  const y = i9(c.slice(3));
  if (y.length < 28) {
    throw new Error("velora payload too short");
  }
  const W = y.slice(0, 12);
  const I = y.slice(12);
  const P = await crypto.subtle.importKey("raw", i9(gZ), {
    name: "AES-GCM"
  }, false, ["decrypt"]);
  const k = {
    name: "AES-GCM",
    iv: W
  };
  const M = await crypto.subtle.decrypt(k, P, I);
  return new TextDecoder().decode(M);
}
const V1 = {
  source: "Yoru",
  id: "velora-yoru"
};
const WZ = [V1, {
  source: "Neon",
  id: "velora-neon",
  name: "Neon",
  scrapeMovie: a9,
  scrapeShow: a9,
  rank: 303
}];
async function a9(c) {
  const {
    tmdbId: y
  } = c.media;
  const W = c.media.type === "show" ? String(c.media.season.number) : "";
  const _ = c.media.type === "show" ? String(c.media.episode.number) : "";
  const I = c.media.type === "show";
  const O = await Ui({
    ref: String(y),
    shelf: W,
    slot: _
  });
  const T = {
    seasonId: W,
    episodeId: _
  };
  const P = {
    tmdbId: String(y),
    type: I ? "tv" : "movie",
    ...(I ? T : {}),
    ...O.params
  };
  const k = {
    method: "GET",
    headers: O.headers,
    query: P
  };
  const M = await c.fetcher(mZ + "/velora", k);
  const Q = M == null ? undefined : M.sources;
  if (!Q || typeof Q !== "object") {
    throw new Zt("Velora returned no sources");
  }
  const ae = WZ.filter(Ae => {
    var Re;
    return typeof ((Re = Q[Ae.source]) == null ? undefined : Re.url) === "string";
  });
  const ue = await Promise.all(ae.map(async Ae => {
    if ("lGfnO" !== "xXZww") {
      try {
        return await yZ(Q[Ae.source].url);
      } catch {
        return "";
      }
    } else {
      const pe = He.indexOf("|");
      const ge = pe >= 0 ? Ze.slice(0, pe) : "hls";
      const xe = pe >= 0 ? O.slice(pe + 1) : T;
      if (ge === "mp4") {
        const at = {
          type: "mp4",
          url: xe
        };
        const pt = {
          unknown: at
        };
        const wt = {
          id: "primary",
          type: "file",
          flags: [M.CORS_ALLOWED],
          captions: [],
          qualities: pt
        };
        const Je = {
          stream: [wt]
        };
        return Je;
      }
      const He = {
        id: "primary",
        type: "hls",
        playlist: xe,
        flags: [k.CORS_ALLOWED],
        captions: []
      };
      const Ze = {
        stream: [He]
      };
      return Ze;
    }
  }));
  const ne = ae.map((Ae, Re) => ({
    embedId: Ae.id,
    url: ue[Re]
  })).filter(Ae => Ae.url);
  if (ne.length === 0) {
    throw new Zt("Velora found no playable sources");
  }
  const me = {
    embeds: ne
  };
  return me;
}
const Il = {
  id: "velora",
  name: "Velora",
  rank: 362,
  flags: [flags.CORS_ALLOWED],
  scrapeMovie: a9,
  scrapeShow: a9
};
const ib = zr(Il);

export const veloraScraper = ib;


