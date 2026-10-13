// Draws a deterministic, hand-written looking signature from a name.

function hash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0 || 1;
}

function seededRandom(seed) {
  let x = seed;
  return () => {
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    return ((x >>> 0) % 10007) / 10007;
  };
}

function signaturePoints(name) {
  const first = (name.trim().split(/\s+/)[0] || "").replace(/[^A-Za-z]/g, "");
  const rand = seededRandom(hash(name.trim().toLowerCase() || "a"));
  const pts = [
    [6, 44],
    [13, 22 + rand() * 3],
    [17, 6],
    [32, 7],
    [33, 17],
    [15, 24],
    [24, 31],
  ];
  let x = 27;
  for (const ch of first.slice(1, 8).toLowerCase()) {
    const w = 6 + rand() * 4;
    const top = "bdfhklt".includes(ch) ? 11 + rand() * 4 : 22 + rand() * 5;
    pts.push([x + w * 0.45, top]);
    if ("gjpqyz".includes(ch)) pts.push([x + w * 0.75, 47 + rand() * 2], [x + w * 0.35, 44]);
    pts.push([x + w, 33 + rand() * 3]);
    x += w;
  }
  pts.push([x + 9, 22 + rand() * 4], [x + 13, 34], [x - 6, 41], [x * 0.4, 43 + rand() * 2], [7, 41]);
  return pts;
}

// Catmull-Rom → cubic Bézier path through the points.
function smoothPath(pts) {
  const f = (n) => String(Math.round(n * 10) / 10);
  let d = "M" + f(pts[0][0]) + " " + f(pts[0][1]);
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    d +=
      " C" +
      [
        p1[0] + (p2[0] - p0[0]) / 6,
        p1[1] + (p2[1] - p0[1]) / 6,
        p2[0] - (p3[0] - p1[0]) / 6,
        p2[1] - (p3[1] - p1[1]) / 6,
        p2[0],
        p2[1],
      ]
        .map(f)
        .join(" ");
  }
  return d;
}

export function signature(name) {
  const pts = signaturePoints(name);
  return { d: smoothPath(pts), width: Math.ceil(Math.max(...pts.map((p) => p[0])) + 6) };
}
