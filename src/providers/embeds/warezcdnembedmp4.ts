// @ts-nocheck
import { makeEmbed } from '@/providers/base';
import { flags } from '@/entrypoint/utils/targets';

// Provider: WarezCDN MP4  |  id: warezcdnembedmp4  |  type: embed
// Original location: vendor.js line 17100

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
const z3 = "https://warezcdn.link/player";
const KJ = "https://workerproxy.warezcdn.workers.dev";
function GJ(c) {
  let o = atob(c);
  o = o.trim();
  o = o.split("").reverse().join("");
  let l = o.slice(-5);
  l = l.split("").reverse().join("");
  o = o.slice(0, -5);
  return "" + o + l;
}
async function qJ(c) {
  var t;
  const l = await c.proxiedFetcher("/player.php", {
    baseUrl: z3,
    headers: {
      Referer: z3 + "/getEmbed.php?" + new URLSearchParams({
        id: c.url,
        sv: "warezcdn"
      })
    },
    query: {
      id: c.url
    }
  });
  const p = (t = l.match(/let allowanceKey = "(.*?)";/)) == null ? undefined : t[1];
  if (!p) {
    throw new Zt("Failed to get allowanceKey");
  }
  const m = await c.proxiedFetcher("/functions.php", {
    baseUrl: z3,
    method: "POST",
    body: new URLSearchParams({
      getVideo: c.url,
      key: p
    })
  });
  const g = JSON.parse(m);
  if (!g.id) {
    throw new Zt("can't get stream id");
  }
  const y = GJ(g.id);
  if (!y) {
    throw new Zt("can't get file id");
  }
  return y;
}
const HJ = [50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64];
async function zJ(c, t) {
  for (const l of HJ) {
    const p = "https://cloclo" + l + ".cloud.mail.ru/weblink/view/" + t;
    if ((await c.proxiedFetcher.full(p, {
      method: "GET",
      headers: {
        Range: "bytes=0-1"
      }
    })).statusCode === 206) {
      return p;
    }
  }
  return null;
}
const VJ = oi({
  id: "warezcdnembedmp4",
  name: "WarezCDN MP4",
  rank: 301,
  flags: [],
  disabled: false,
  async scrape(c) {
    const o = await qJ(c);
    if (!o) {
      throw new Zt("can't get file id");
    }
    const l = await zJ(c, o);
    if (!l) {
      throw new Zt("can't get stream id");
    }
    return {
      stream: [{
        id: "primary",
        captions: [],
        qualities: {
          unknown: {
            type: "mp4",
            url: KJ + "/?" + new URLSearchParams({
              url: l
            })
          }
        },
        type: "file",
        flags: [Fn.CORS_ALLOWED]
      }]
    };
  }
});

export const warezcdnembedmp4Scraper = VJ;

