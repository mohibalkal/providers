// @ts-nocheck
import { makeSourcerer } from '@/providers/base';
import { flags } from '@/entrypoint/utils/targets';

// Provider: Artemis [4K] 💫  |  id: artemis  |  type: source
// Original location: vendor.js line 16246

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
let OE = new Uint8Array([62, 211, 145, 167, 69, 70, 44, 106, 207, 83, 211, 14, 190, 118, 3, 39]);
let M3 = new Uint8Array([103, 48, 49, 222, 156, 108, 85, 18, 93, 65, 146, 203, 22, 0, 21, 209, 76, 207, 96, 200, 127, 235, 150, 1, 188, 3, 34, 103, 182, 38, 143, 10]);
let x3 = new Uint8Array([168, 16, 183, 189, 5, 247, 76, 115, 205, 251, 27, 67, 22, 167, 14, 89, 128, 128, 214, 64, 242, 49, 4, 123, 238, 195, 64, 147, 54, 71, 10, 10]);
let UE = new Uint8Array([135, 94, 166, 223, 164, 138, 228, 21, 254, 78, 147, 182, 143, 175, 16, 242]);
let F3 = new Uint8Array([143, 235, 99, 29, 112, 198, 61, 55, 247, 208, 60, 226, 189, 162, 138, 37, 52, 192, 242, 235, 89, 35, 171, 60, 191, 129, 85, 35, 106, 73, 6, 127]);
let B3 = new Uint8Array([84, 61, 198, 94, 231, 222, 128, 91, 201, 29, 206, 58, 124, 23, 182, 235, 189, 81, 54, 46, 149, 186, 0, 174, 192, 159, 251, 48, 170, 105, 156, 37]);
let PE = new Uint8Array([234, 76, 118, 161, 203, 76, 112, 74, 5, 233, 196, 194, 81, 217, 204, 226]);
let DE = new Uint8Array([8, 207, 189, 183, 121, 54, 240, 195, 121, 130, 78, 222, 240, 100, 19, 68, 135, 123, 98, 85, 167, 46, 112, 226]);
let kE = new Uint8Array([111, 22, 102, 223, 162, 245, 52, 34, 230, 19, 63, 90, 74, 224, 194, 212]);
let LE = new Uint8Array([225, 158, 42, 228, 178, 188, 75, 6, 189, 39, 140, 50, 100, 11, 139, 61, 144, 74, 143, 199, 104, 34, 101, 68]);
let K3 = new Uint8Array([83, 40, 223, 41, 100, 241, 219, 239, 198, 171, 238, 133, 119, 109, 214, 170, 152, 21, 201, 47, 9, 199, 242, 95, 226, 14, 75, 10, 207, 18, 173, 200]);
let ME = new Uint8Array([62, 136, 200, 143, 79, 110, 225, 81, 187, 208, 69, 145, 175, 183, 151, 200, 73, 90, 197, 0, 230, 48, 7, 118]);
let G3 = new Uint8Array([46, 227, 67, 215, 133, 108, 31, 234, 124, 236, 147, 47, 72, 207, 30, 187, 97, 253, 88, 222]);
let xE = new Uint8Array([79, 145, 55, 178, 232, 5, 108, 196, 26, 131, 253, 91, 41, 166, 112, 222]);
const X$ = 90;
function eJ() {
  const p = new Uint8Array(F3.length);
  for (let g = 0; g < F3.length; g++) {
    p[g] = F3[g] ^ OE[g % OE.length] ^ DE[g % DE.length];
  }
  return p;
}
function tJ() {
  const l = new Uint8Array(M3.length);
  for (let p = 0; p < M3.length; p++) {
    l[p] = M3[p] ^ kE[p % kE.length] ^ LE[p % LE.length] ^ p * 83 + 17 & 255;
  }
  return l;
}
function nJ() {
  const o = new Uint8Array(x3.length);
  for (let m = 0; m < x3.length; m++) {
    if ("UQkVu" !== "UQkVu") {
      F[S] = J[n] ^ f[d % a.length] ^ B[D % Y.length] ^ R * 83 + 17 & 255;
    } else {
      o[m] = x3[m] ^ UE[m % UE.length] ^ m * 45 + 7 & 255;
    }
  }
  return o;
}
function rJ() {
  const o = new Uint8Array(K3.length);
  for (let m = 0; m < K3.length; m++) {
    if ("pXtay" !== "eEqYC") {
      o[m] = K3[m] ^ ME[m % ME.length] ^ m * 65 + 13 & 255;
    } else {
      h = null;
      m = true;
    }
  }
  return o;
}
function aJ() {
  const o = new Uint8Array(B3.length);
  for (let p = 0; p < B3.length; p++) {
    o[p] = B3[p] ^ PE[p % PE.length] ^ p * 55 + 25 & 255;
  }
  return o;
}
function FC() {
  const o = new Uint8Array(G3.length);
  for (let g = 0; g < G3.length; g++) {
    if ("CevnZ" !== "CevnZ") {
      g().catch(() => {});
    } else {
      o[g] = G3[g] ^ xE[g % xE.length];
    }
  }
  return "https://" + new TextDecoder().decode(o);
}
function oJ(c) {
  const l = new Uint8Array(c.length / 2);
  for (let y = 0; y < c.length; y += 2) {
    l[y / 2] = parseInt(c.substring(y, y + 2), 16);
  }
  return l;
}
function wd(c) {
  let l = "";
  for (let m = 0; m < c.length; m++) {
    l += c[m].toString(16).padStart(2, "0");
  }
  return l;
}
async function sJ(c) {
  const y = oJ(c);
  const W = await crypto.subtle.importKey("raw", eJ(), "AES-GCM", false, ["decrypt"]);
  const _ = await crypto.subtle.decrypt({
    name: "AES-GCM",
    iv: y.slice(0, 12)
  }, W, y.slice(12));
  return JSON.parse(new TextDecoder().decode(_));
}
function uJ(c) {
  if (!c) {
    return "";
  }
  if (/^https?:\/\//i.test(c)) {
    return c;
  }
  return FC() + (c.startsWith("/") ? c : "/" + c);
}
async function cJ(c) {
  const g = await crypto.subtle.importKey("raw", tJ(), {
    name: "HMAC",
    hash: "SHA-256"
  }, false, ["sign"]);
  const _ = await crypto.subtle.sign("HMAC", g, new TextEncoder().encode(c));
  return wd(new Uint8Array(_));
}
async function lJ(c) {
  const {
    ref: p
  } = c;
  const m = c.shelf ?? "";
  const g = c.slot ?? "";
  const y = Math.floor(Date.now() / 1000 / X$);
  const I = await crypto.subtle.importKey("raw", nJ(), {
    name: "HMAC",
    hash: "SHA-256"
  }, false, ["sign"]);
  const O = await crypto.subtle.sign("HMAC", I, new TextEncoder().encode(p + "|" + m + "|" + g + "|" + y));
  const T = wd(new Uint8Array(O));
  const C = crypto.getRandomValues(new Uint8Array(12));
  const b = wd(crypto.getRandomValues(new Uint8Array(16)));
  const P = new TextEncoder().encode(JSON.stringify({
    t: p,
    x: Math.floor(Date.now() / 1000),
    n: b
  }));
  const M = await crypto.subtle.importKey("raw", rJ(), {
    name: "AES-GCM"
  }, false, ["encrypt"]);
  const V = {
    name: "AES-GCM",
    iv: C
  };
  const Q = await crypto.subtle.encrypt(V, M, P);
  const ae = wd(new Uint8Array([...C, ...new Uint8Array(Q)]));
  const ne = await crypto.subtle.importKey("raw", aJ(), {
    name: "HMAC",
    hash: "SHA-256"
  }, false, ["sign"]);
  const me = await crypto.subtle.sign("HMAC", ne, new TextEncoder().encode(p + ":" + y));
  const Ae = wd(new Uint8Array(me)).substring(0, 10);
  const Re = {
    "X-PS-Sig": T
  };
  const Le = {
    _pk: ae,
    z: Ae
  };
  const he = {
    headers: Re,
    params: Le
  };
  return he;
}
const fJ = new Uint8Array([50, 252, 21, 15, 145, 122, 57, 249, 224, 86, 216, 236, 50, 187, 241, 117, 109, 85, 87, 61, 54, 231, 20, 27, 132, 44, 119, 164, 230, 16, 218, 239, 51, 241, 235, 103, 122, 72, 10, 42, 51, 228, 4, 80, 148, 112, 57, 183, 243, 87, 151, 234, 45]);
const dJ = new Uint8Array([90, 136, 97, 127, 226, 64, 22, 214, 131, 62, 185, 128, 94, 222, 159, 18, 8, 38, 121, 94]);
const hJ = new Uint8Array([62, 240, 159, 111, 80, 125, 149, 58, 223, 176, 67, 241, 120, 231, 22, 83, 10, 72, 107, 228, 84, 195, 146, 125]);
const pJ = new Uint8Array([14, 136, 171, 46, 17, 60, 212, 123, 158, 244, 118, 132, 25, 138, 32, 63, 98, 14, 58, 181]);
function BC(c, t) {
  const g = new Uint8Array(c.length);
  for (let y = 0; y < c.length; y++) {
    g[y] = c[y] ^ t[y % t.length];
  }
  return new TextDecoder().decode(g);
}
function I8() {
  return window.turnstile;
}
let W2 = null;
function mJ() {
  if (I8()) {
    return Promise.resolve();
  }
  if (W2) {
    return W2;
  }
  W2 = new Promise((m, g) => {
    const T = document.createElement("script");
    T.src = BC(fJ, dJ);
    T.async = true;
    T.defer = true;
    T.onload = () => m();
    T.onerror = () => g(new Error("pulse script load failed"));
    document.head.appendChild(T);
  });
  return W2;
}
let Bp = null;
let g1 = null;
let Kp = false;
async function KC() {
  await mJ();
  const y = I8();
  if (Bp || !y) {
    return;
  }
  let W = document.getElementById("_qz9");
  if (!W) {
    if ("xBqYI" === "xBqYI") {
      W = document.createElement("div");
      W.id = "_qz9";
      W.style.display = "none";
      document.body.appendChild(W);
    } else {
      h.reset(i);
    }
  }
  Bp = y.render(W, {
    sitekey: BC(hJ, pJ),
    callback: O => {
      g1 = O;
      Kp = true;
    },
    "error-callback": () => {
      g1 = null;
      Kp = true;
    },
    "expired-callback": () => {
      if ("KjOJO" !== "kqPuC") {
        g1 = null;
      } else {
        const M = h == null ? undefined : h.variants.find(Q => Q.fid === M);
        if (!M) {
          return null;
        }
        const V = {
          url: M.url
        };
        return V;
      }
    }
  });
}
async function yJ(c = 20000) {
  try {
    await KC();
  } catch {
    if ("dtJkN" !== "dtJkN") {
      const T = new E(e.length);
      for (let C = 0; C < n.length; C++) {
        T[C] = f[C] ^ d[C % a.length];
      }
      return new J().decode(T);
    } else {
      return null;
    }
  }
  const m = Date.now() + c;
  while (!Kp && Date.now() < m) {
    if ("YJUpE" !== "Vnvwx") {
      await new Promise(T => setTimeout(T, 50));
    } else {
      e[v] = G[F] ^ S[J % n.length] ^ f * 45 + 7 & 255;
    }
  }
  const y = g1;
  g1 = null;
  Kp = false;
  const _ = I8();
  if (_ && Bp) {
    if ("eXVIJ" === "Rhbgp") {
      const T = e.createElement("script");
      T.src = v(G, F);
      T.async = true;
      T.defer = true;
      T.onload = () => T();
      T.onerror = () => T(new a("pulse script load failed"));
      f.head.appendChild(T);
    } else {
      try {
        if ("CAwnf" === "CAwnf") {
          _.reset(Bp);
        } else {
          E[e] = v[G] ^ F[S % J.length];
        }
      } catch {}
    }
  }
  return y;
}
async function WJ(c) {
  const p = 12;
  let W = 250;
  for (let O = 0; O <= p; O++) {
    try {
      const C = await fetch(c, {
        method: "GET",
        cache: "no-store",
        credentials: "omit"
      });
      if (!C.ok) {
        return false;
      }
      const b = await C.text();
      if (/oss_fid\s*not\s*found/i.test(b)) {
        return false;
      }
      if (/#EXTM3U/.test(b)) {
        return true;
      }
      if (/\b403\b/.test(b) && O < p) {
        await new Promise(P => setTimeout(P, W));
        W = Math.min(W * 2, 3000);
        continue;
      }
      return false;
    } catch {
      return false;
    }
  }
  return false;
}
async function IJ(c) {
  for (const p of c) {
    if (p.type === "mp4" || (await WJ(p.url))) {
      return p;
    }
  }
  return null;
}
async function FE(c) {
  z1 = null;
  const {
    tmdbId: p
  } = c.media;
  const m = c.media.type === "show" ? String(c.media.season.number) : "";
  const g = c.media.type === "show" ? String(c.media.episode.number) : "";
  const W = c.media.type === "show";
  c.progress(15);
  const I = await lJ({
    ref: String(p),
    shelf: m,
    slot: g
  });
  c.progress(35);
  const O = {
    seasonId: m,
    episodeId: g
  };
  const T = {
    tmdbId: String(p),
    ...(W ? O : {}),
    ...I.params
  };
  const C = Object.keys(T).sort();
  const b = new URLSearchParams();
  for (const ee of C) {
    b.set(ee, T[ee]);
  }
  const P = b.toString();
  const k = await cJ(P);
  c.progress(50);
  const U = await yJ();
  const M = U ? "&pw=" + encodeURIComponent(U) : "";
  const V = FC() + "/lookup?" + P + M;
  const Q = {
    ...I.headers
  };
  Q["X-AR-Sig"] = k;
  const ae = {
    method: "GET",
    headers: Q
  };
  const ue = await c.fetcher(V, ae);
  if (ue == null || !ue.d) {
    throw new Zt("Artemis: empty response");
  }
  const $ = await sJ(ue.d);
  if ($ == null || !$.variants || $.variants.length === 0) {
    if ("Xswtl" === "lCfzI") {
      Re[le] = c[p] ^ m[g % W.length] ^ I * 55 + 25 & 255;
    } else {
      throw new Zt("Artemis: no variants returned");
    }
  }
  c.progress(80);
  const ne = $.variants.map(ee => ({
    fid: ee.fid,
    name: ee.name,
    size: "",
    size_bytes: 0,
    quality: ee.quality,
    codec: ee.codec || "",
    tag: ee.tag,
    type: ee.type || "hls",
    url: uJ(ee.url)
  }));
  const me = {
    variants: ne
  };
  var z1 = me;
  c.progress(95);
  const Ae = (await IJ(ne)) ?? ne[0];
  if (Ae.type === "mp4") {
    if ("GtcRE" === "GtcRE") {
      const ee = {
        type: "mp4",
        url: Ae.url
      };
      const fe = {
        unknown: ee
      };
      const pe = {
        id: "primary",
        type: "file",
        qualities: fe,
        captions: [],
        flags: [Fn.CORS_ALLOWED]
      };
      const ge = {
        embeds: [],
        stream: [pe]
      };
      return ge;
    } else {
      Re[le] = c[p] ^ m[g % W.length] ^ I * 65 + 13 & 255;
    }
  }
  const Re = {
    id: "primary",
    type: "hls",
    playlist: Ae.url,
    captions: [],
    flags: [Fn.CORS_ALLOWED]
  };
  const le = {
    embeds: [],
    stream: [Re]
  };
  return le;
}
const Zc = {
  id: "artemis",
  name: "Artemis [4K] 💫",
  rank: 300,
  flags: [Fn.CORS_ALLOWED],
  scrapeMovie: FE,
  scrapeShow: FE
};
const EJ = zr(Zc);

export const artemisScraper = EJ;

