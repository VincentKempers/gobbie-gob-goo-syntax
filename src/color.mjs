// Tiny color helpers that mirror Less's lighten()/darken() (HSL lightness,
// absolute percentage points), so derived colors match the Atom theme exactly.

function hexToRgb(hex) {
  const h = hex.replace("#", "");
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
}

function rgbToHex(rgb) {
  return (
    "#" +
    rgb
      .map((v) =>
        Math.round(Math.min(1, Math.max(0, v)) * 255)
          .toString(16)
          .padStart(2, "0"),
      )
      .join("")
  );
}

function rgbToHsl([r, g, b]) {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h;
  if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
  else if (max === g) h = (b - r) / d + 2;
  else h = (r - g) / d + 4;
  return [h / 6, s, l];
}

function hslToRgb([h, s, l]) {
  if (s === 0) return [l, l, l];
  const hue = (p, q, t) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  return [hue(p, q, h + 1 / 3), hue(p, q, h), hue(p, q, h - 1 / 3)];
}

function shiftLightness(hex, amount) {
  const [h, s, l] = rgbToHsl(hexToRgb(hex));
  return rgbToHex(hslToRgb([h, s, Math.min(1, Math.max(0, l + amount / 100))]));
}

export const lighten = (hex, pct) => shiftLightness(hex, pct);
export const darken = (hex, pct) => shiftLightness(hex, -pct);

// Append an alpha channel: alpha("#ffffff", 0.5) -> "#ffffff80"
export const alpha = (hex, a) =>
  hex.slice(0, 7) +
  Math.round(a * 255)
    .toString(16)
    .padStart(2, "0");

// Mix a color over a background, for editors without alpha support (Vim):
// blend("#ffffff", "#000000", 0.25) -> "#404040"
export const blend = (hex, bg, a) => {
  const fg = hexToRgb(hex);
  const base = hexToRgb(bg);
  return rgbToHex(fg.map((v, i) => v * a + base[i] * (1 - a)));
};

// Nearest xterm-256 color index, used as the cterm fallback in Vim.
const cubeLevels = [0, 95, 135, 175, 215, 255];
const xterm = [
  ...Array.from({ length: 216 }, (_, i) => [
    cubeLevels[Math.floor(i / 36)],
    cubeLevels[Math.floor(i / 6) % 6],
    cubeLevels[i % 6],
  ]),
  ...Array.from({ length: 24 }, (_, i) => [8 + i * 10, 8 + i * 10, 8 + i * 10]),
];

export const toXterm256 = (hex) => {
  const [r, g, b] = hexToRgb(hex).map((v) => v * 255);
  let best = 0;
  let bestDist = Infinity;
  xterm.forEach(([xr, xg, xb], i) => {
    const dist = (r - xr) ** 2 + (g - xg) ** 2 + (b - xb) ** 2;
    if (dist < bestDist) [best, bestDist] = [i, dist];
  });
  return best + 16;
};
