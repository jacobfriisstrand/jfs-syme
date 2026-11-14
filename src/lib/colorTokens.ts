export interface ColorToken {
  name: string;
  variable: `--${string}`;
  rgb: string;
  group: string;
}

export const COLOR_LAB_STORAGE_KEY = "forma-color-lab";

export const COLOR_TOKENS: readonly ColorToken[] = [
  { group: "Page", name: "Base light", variable: "--base-light-rgb", rgb: "248 248 248" },
  { group: "Page", name: "Paper", variable: "--paper-rgb", rgb: "255 255 255" },
  { group: "Page", name: "Base light gray", variable: "--base-light-gray-rgb", rgb: "217 217 217" },
  { group: "Type", name: "Ink", variable: "--ink-rgb", rgb: "30 30 30" },
  { group: "Type", name: "Ink muted", variable: "--ink-muted-rgb", rgb: "77 75 75" },
  { group: "Type", name: "Ink faint", variable: "--ink-faint-rgb", rgb: "143 143 143" },
  { group: "Type", name: "Base dark", variable: "--base-dark-rgb", rgb: "37 37 37" },
  { group: "Type", name: "Base dark gray", variable: "--base-dark-gray-rgb", rgb: "61 61 61" },
  { group: "Night", name: "Canvas night", variable: "--canvas-night-rgb", rgb: "0 0 0" },
  { group: "Night", name: "Canvas ink", variable: "--canvas-ink-rgb", rgb: "15 15 13" },
  { group: "Night", name: "Panel", variable: "--panel-rgb", rgb: "16 16 13" },
  { group: "Action", name: "CTA", variable: "--cta-rgb", rgb: "12 11 9" },
  { group: "Action", name: "CTA hover", variable: "--cta-hover-rgb", rgb: "42 41 38" },
  { group: "Action", name: "Link", variable: "--link-rgb", rgb: "0 108 255" },
  { group: "Status", name: "Success", variable: "--success-rgb", rgb: "173 235 179" },
  { group: "Status", name: "Error", variable: "--error-rgb", rgb: "255 0 0" },
];

export const COLOR_TOKEN_KEYS: readonly string[] = COLOR_TOKENS.map((token) => token.variable);

const RGB_PATTERN = /^(?:[0-9]{1,3} ){2}[0-9]{1,3}$/;

export function isRgb(value: string): boolean {
  if (!RGB_PATTERN.test(value)) return false;
  return value.split(" ").every((channel) => Number(channel) <= 255);
}

export function defaultColors(): Record<string, string> {
  return Object.fromEntries(COLOR_TOKENS.map((token) => [token.variable, token.rgb]));
}

export function rgbToHex(rgb: string): string {
  const channels = rgb.split(" ").map((channel) => Number(channel));
  return `#${channels.map((channel) => channel.toString(16).padStart(2, "0")).join("")}`;
}

export function hexToRgb(hex: string, shorthand = false): string | null {
  const trimmed = hex.trim().replace(/^#/, "");
  let digits = trimmed;
  if (/^[0-9a-f]{6}$/i.test(trimmed)) {
    digits = trimmed;
  } else if (shorthand && /^[0-9a-f]{3}$/i.test(trimmed)) {
    digits = [...trimmed].map((channel) => `${channel}${channel}`).join("");
  } else {
    return null;
  }
  const red = Number.parseInt(digits.slice(0, 2), 16);
  const green = Number.parseInt(digits.slice(2, 4), 16);
  const blue = Number.parseInt(digits.slice(4, 6), 16);
  return `${red} ${green} ${blue}`;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function readStoredColors(): Record<string, string> | null {
  try {
    const raw = localStorage.getItem(COLOR_LAB_STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (!isRecord(parsed)) return null;

    const next = defaultColors();
    let found = false;
    for (const token of COLOR_TOKENS) {
      const value = parsed[token.variable];
      if (typeof value === "string" && isRgb(value)) {
        next[token.variable] = value;
        found = true;
      }
    }
    return found ? next : null;
  } catch {
    return null;
  }
}

export function writeStoredColors(colors: Record<string, string>): void {
  const payload: Record<string, string> = {};
  for (const token of COLOR_TOKENS) {
    const value = colors[token.variable];
    if (value && isRgb(value)) payload[token.variable] = value;
  }
  localStorage.setItem(COLOR_LAB_STORAGE_KEY, JSON.stringify(payload));
}

export function applyColors(colors: Record<string, string>): void {
  for (const token of COLOR_TOKENS) {
    const value = colors[token.variable];
    if (value && isRgb(value)) {
      document.documentElement.style.setProperty(token.variable, value);
    }
  }
}

export function clearAppliedColor(variable: string): void {
  document.documentElement.style.removeProperty(variable);
}

export function clearAppliedColors(): void {
  for (const token of COLOR_TOKENS) {
    clearAppliedColor(token.variable);
  }
}

export function colorsToCss(colors: Record<string, string>): string {
  const lines = COLOR_TOKENS.map((token) => `  ${token.variable}: ${colors[token.variable] ?? token.rgb};`);
  return `:root {\n${lines.join("\n")}\n}`;
}
