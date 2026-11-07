// Best-effort per-IP limiter. On serverless each warm instance has its own memory,
// so this stops casual abuse but is not a hard global cap. For a hard cap, back it
// with a shared store (e.g. Vercel KV / Upstash Redis).
const WINDOWS = [
  { ms: 60 * 1000, max: 8 },
  { ms: 60 * 60 * 1000, max: 40 },
];
const hits = new Map();

export function clientIp(req) {
  const fwd = req.headers?.["x-forwarded-for"];
  const first = (Array.isArray(fwd) ? fwd[0] : fwd)?.split(",")[0]?.trim();
  return first || req.socket?.remoteAddress || "unknown";
}

// Returns { ok: true } or { ok: false, retryAfter } (seconds).
export function checkRateLimit(key, now = Date.now()) {
  const longest = WINDOWS[WINDOWS.length - 1].ms;
  const recent = (hits.get(key) ?? []).filter((t) => now - t < longest);

  for (const { ms, max } of WINDOWS) {
    const inWindow = recent.filter((t) => now - t < ms);
    if (inWindow.length >= max) {
      const retryAfter = Math.ceil((inWindow[0] + ms - now) / 1000);
      hits.set(key, recent);
      return { ok: false, retryAfter };
    }
  }

  recent.push(now);
  hits.set(key, recent);

  // keep the map from growing forever
  if (hits.size > 5000) {
    for (const [k, v] of hits) {
      if (now - v[v.length - 1] >= longest) hits.delete(k);
    }
  }
  return { ok: true };
}
