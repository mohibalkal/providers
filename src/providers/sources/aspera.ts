// @ts-nocheck
import { flags } from '@/entrypoint/utils/targets';
import { makeSourcerer } from '@/providers/base';
import { NotFoundError } from '@/utils/errors';

// Crypto functions for fontaine.lol
let H$ = new Uint8Array([182, 49, 77, 29, 208, 97, 13, 67, 215, 31, 43, 58, 206, 144, 184, 226, 234, 211, 221, 13, 122, 249, 57, 24, 247, 245, 189, 60, 43, 92, 100, 3]);
let z$ = new Uint8Array([145, 140, 221, 146, 154, 113, 105, 126, 55]);
let V$ = 226;
let j$ = new Uint8Array([151, 94, 17, 179, 57, 217, 213, 62, 110, 220, 73, 144, 86, 240, 227, 11, 112, 81, 212, 165, 123, 241, 71, 112, 204, 102, 28, 156, 156, 31, 89, 151, 198, 10, 64, 181, 50, 221, 218, 61, 60, 136, 28, 199, 0, 240, 231, 2, 34, 11, 211, 240, 43, 253, 64, 38]);
let Y$ = new Uint8Array([162, 188, 148, 135, 151, 150, 110, 110, 120]);
let $$ = 214;
let J$ = new Uint8Array([200, 13, 74, 239, 55, 218, 133, 59, 56, 223, 74, 147, 81, 162, 182, 5, 112, 80, 134, 243, 33, 253, 17, 37, 157, 51, 79, 156, 203, 69, 5, 192, 196, 10, 23, 238, 49, 141, 219, 61, 108, 142, 18, 192, 2, 168, 229, 87, 32, 11, 134, 241, 42, 240, 70, 125]);
let Q$ = new Uint8Array([132, 137, 111, 123, 101, 58, 117, 8, 84, 2]);
let Z$ = 244;
function Y3(c: any, t: any) {
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
function $Q(...c: any[]) {
  let o = 0;
  for (let _ of c) {
    o += _.length;
  }
  let m = new Uint8Array(o);
  let W = 0;
  for (let _ of c) {
    if ("QrVNt" === "AcRMy") {
      let I: any;
      let O: any;
      let T: any;
      let C = I.length + O.length + T.length;
      let b = new Uint8Array(C);
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
function $3(c: any, t: any) {
  let p = new Uint8Array(c.length);
  for (let g = 0; g < c.length; g++) {
    p[g] = c[g] ^ t[g % t.length];
  }
  return p;
}
async function YE(c: any) {
  return new Uint8Array(await crypto.subtle.digest("SHA-256", c));
}
async function JQ(c: any) {
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
      let U = new Uint8Array(_.length);
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
let J3: any = null;
let E2: any = null;
async function YC() {
  return J3 || E2 || (E2 = (async () => {
    if ("eUWKx" === "eUWKx") {
      let m = await JQ(32);
      let g = [$3(J$, m), $3(H$, m), $3(j$, m)];
      J3 = g;
      return g;
    } else {
    }
  })(), E2);
}
let QQ = 10800;
function S2(c: any) {
  let l = "";
  for (let g = 0; g < c.length; g++) {
    l += c[g].toString(16).padStart(2, "0");
  }
  return l;
}
function Q3(c: any) {
  return new TextEncoder().encode(c);
}
async function $E(c: any, t: any) {
  let O = await crypto.subtle.importKey("raw", c, {
    name: "HMAC",
    hash: "SHA-256"
  }, false, ["sign"]);
  return new Uint8Array(await crypto.subtle.sign("HMAC", O, t));
}
async function ZQ(c: any, t: any, o: any) {
  let g = await crypto.subtle.importKey("raw", c, {
    name: "AES-GCM"
  }, false, ["encrypt"]);
  const y = {
    name: "AES-GCM",
    iv: t
  };
  return new Uint8Array(await crypto.subtle.encrypt(y, g, o));
}
async function Ui(c: any) {
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

// Aspera provider - Clean TypeScript Version
const ASPERA_BASE_URL = "https://stream.fontaine.lol";
const ASPERA_KEY_HEX = "c1e5a938f6d2b70493ac8e1f5d0b7c2946af3e8d1c5b0947e2d8a4f1c6b3907a";

/**
 * Convert hexadecimal string to Uint8Array.
 */
function hexToBytes(hex: string): Uint8Array {
  if (hex.length % 2 !== 0) {
    throw new Error("Invalid hexadecimal string");
  }
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    const value = Number.parseInt(hex.slice(i, i + 2), 16);
    if (Number.isNaN(value)) {
      throw new Error(`Invalid hexadecimal value at position ${i}`);
    }
    bytes[i / 2] = value;
  }
  return bytes;
}

/**
 * Decode an Aspera payload.
 */
async function decryptAsperaPayload(payload: string): Promise<string> {
  if (!payload.startsWith("as_")) {
    return payload;
  }
  const encryptedData = hexToBytes(payload.slice(3));
  if (encryptedData.length < 28) {
    throw new Error("Aspera payload too short");
  }
  const iv = encryptedData.slice(0, 12);
  const ciphertext = encryptedData.slice(12);

  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    hexToBytes(ASPERA_KEY_HEX),
    {
      name: "AES-GCM",
    },
    false,
    ["decrypt"],
  );

  const plaintext = await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv,
    },
    cryptoKey,
    ciphertext,
  );

  return new TextDecoder().decode(plaintext);
}

/**
 * Fetch data from Aspera using context.fetcher
 */
async function requestAspera(
  context: any,
  params: any,
  headers: Record<string, string> = {},
): Promise<any> {
  const url = `${ASPERA_BASE_URL}/aspera`;
  
  const response = await context.fetcher(url, {
    method: "GET",
    headers,
    query: params
  });
  
  if (!response) {
    throw new Error(`Aspera request failed`);
  }
  return response;
}

/**
 * Decode an Aspera playlist.
 */
async function decodePlaylist(
  playlist: string,
): Promise<any> {
  const decoded = await decryptAsperaPayload(playlist);
  if (!decoded) {
    throw new Error("Aspera: empty decoded playlist");
  }
  return {
    id: "primary",
    type: "hls",
    playlist: decoded,
    captions: [],
    flags: [flags.CORS_ALLOWED],
  };
}

/**
 * Decode Aspera qualities.
 */
async function decodeQualities(
  qualities: Record<string, string>,
): Promise<any> {
  const decodedQualities: Record<string, { type: "mp4"; url: string; }> = {};
  const entries = Object.entries(qualities);
  await Promise.all(
    entries.map(async ([quality, encryptedUrl]) => {
      try {
        const url = await decryptAsperaPayload(encryptedUrl);
        if (url) {
          decodedQualities[quality] = {
            type: "mp4",
            url,
          };
        }
      } catch {
        // Ignore invalid quality
      }
    }),
  );

  if (Object.keys(decodedQualities).length === 0) {
    throw new Error("Aspera: no decodable qualities");
  }

  return {
    id: "primary",
    type: "file",
    qualities: decodedQualities,
    captions: [],
    flags: [flags.CORS_ALLOWED],
  };
}

/**
 * Main Aspera scraper.
 */
async function scrapeAspera(context: any): Promise<any> {
  const media = context.media;
  const isShow = media.type === "show";
  const seasonId = isShow ? String(media.season?.number ?? "") : "";
  const episodeId = isShow ? String(media.episode?.number ?? "") : "";

  context.progress(20);

  // Generate cryptographic signatures!
  const requestInfo = await Ui({
    ref: String(media.tmdbId),
    shelf: seasonId,
    slot: episodeId,
  });

  const params: any = {
    tmdbId: String(media.tmdbId),
    type: isShow ? "tv" : "movie",
    ...(isShow ? { seasonId, episodeId } : {}),
    ...requestInfo.params,
  };

  context.progress(50);

  const response = await requestAspera(context, params, requestInfo.headers as Record<string, string>);

  context.progress(80);

  if (!response) {
    throw new NotFoundError("Aspera: empty response");
  }

  // Server returned an encrypted HLS playlist.
  if (response.playlist) {
    const stream = await decodePlaylist(response.playlist);
    context.progress(100);
    return {
      embeds: [],
      stream: [stream],
    };
  }

  // Server returned encrypted MP4 qualities.
  if (response.qualities) {
    const stream = await decodeQualities(response.qualities);
    context.progress(100);
    return {
      embeds: [],
      stream: [stream],
    };
  }

  throw new NotFoundError("Aspera returned no playlist or qualities");
}

export const asperaScraper = makeSourcerer({
  id: "aspera",
  name: "Aspera",
  rank: 350,
  flags: [flags.CORS_ALLOWED],
  scrapeMovie: scrapeAspera as any,
  scrapeShow: scrapeAspera as any,
});
