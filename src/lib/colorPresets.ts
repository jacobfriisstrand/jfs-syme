import { defaultColors } from "@/lib/colorTokens";

export const COLOR_PRESET_IDS = ["color1", "color2", "color3", "color4"] as const;

export type ColorPresetId = (typeof COLOR_PRESET_IDS)[number];

export interface ColorPreset {
  id: ColorPresetId;
  label: string;
  colors: Record<string, string>;
}

const espresso = "42 36 32";
const lighterEspresso = "78 67 60";
const beige = "231 225 216";
const blush = "201 163 154";
const sky = "142 197 255";

function palette(overrides: Record<string, string>): Record<string, string> {
  return { ...defaultColors(), ...overrides };
}

export const COLOR_PRESETS: Record<ColorPresetId, ColorPreset> = {
  color1: {
    id: "color1",
    label: "Color 1 · Espresso and beige",
    colors: palette({
      "--base-light-rgb": beige,
      "--paper-rgb": beige,
      "--base-light-gray-rgb": "213 203 191",
      "--ink-rgb": espresso,
      "--ink-muted-rgb": "140 129 120",
      "--ink-faint-rgb": "176 166 156",
      "--base-dark-rgb": espresso,
      "--base-dark-gray-rgb": "74 66 60",
      "--canvas-night-rgb": espresso,
      "--canvas-ink-rgb": espresso,
      "--panel-rgb": espresso,
      "--cta-rgb": espresso,
      "--cta-hover-rgb": "68 60 54",
      "--link-rgb": espresso,
    }),
  },
  color2: {
    id: "color2",
    label: "Color 2 · Lighter espresso, beige, and blush",
    colors: palette({
      "--base-light-rgb": beige,
      "--paper-rgb": lighterEspresso,
      "--base-light-gray-rgb": "214 196 188",
      "--ink-rgb": lighterEspresso,
      "--ink-muted-rgb": "138 123 114",
      "--ink-faint-rgb": "179 165 156",
      "--base-dark-rgb": lighterEspresso,
      "--base-dark-gray-rgb": "98 86 78",
      "--canvas-night-rgb": lighterEspresso,
      "--canvas-ink-rgb": blush,
      "--panel-rgb": lighterEspresso,
      "--cta-rgb": blush,
      "--cta-hover-rgb": "184 144 136",
      "--link-rgb": "143 95 88",
    }),
  },
  color3: {
    id: "color3",
    label: "Color 3 · Lighter espresso, beige, and sky",
    colors: palette({
      "--base-light-rgb": beige,
      "--paper-rgb": lighterEspresso,
      "--base-light-gray-rgb": "213 203 191",
      "--ink-rgb": lighterEspresso,
      "--ink-muted-rgb": "138 123 114",
      "--ink-faint-rgb": "179 165 156",
      "--base-dark-rgb": lighterEspresso,
      "--base-dark-gray-rgb": "98 86 78",
      "--canvas-night-rgb": lighterEspresso,
      "--canvas-ink-rgb": sky,
      "--panel-rgb": lighterEspresso,
      "--cta-rgb": sky,
      "--cta-hover-rgb": "116 180 247",
      "--link-rgb": "46 108 173",
    }),
  },
  color4: {
    id: "color4",
    label: "Color 4 · Light blue buttons and details",
    colors: palette({
      "--base-light-rgb": beige,
      "--paper-rgb": beige,
      "--base-light-gray-rgb": "213 203 191",
      "--ink-rgb": espresso,
      "--ink-muted-rgb": "140 129 120",
      "--ink-faint-rgb": "176 166 156",
      "--base-dark-rgb": espresso,
      "--base-dark-gray-rgb": "74 66 60",
      "--canvas-night-rgb": espresso,
      "--canvas-ink-rgb": espresso,
      "--panel-rgb": espresso,
      "--cta-rgb": sky,
      "--cta-hover-rgb": "116 180 247",
      "--link-rgb": sky,
    }),
  },
};

function isColorPresetId(id: string): id is ColorPresetId {
  return (COLOR_PRESET_IDS as readonly string[]).includes(id);
}

export function colorPresetTarget(pathname: string): { id: ColorPresetId; target: string } | null {
  const match = pathname.match(/^\/(color[1-4])(\/.*)?$/);
  if (!match) return null;
  const id = match[1];
  if (!isColorPresetId(id)) return null;
  let rest = match[2] ?? "";
  if (rest.length > 1 && rest.endsWith("/")) rest = rest.slice(0, -1);
  return { id, target: rest === "" || rest === "/" ? "/" : rest };
}

export function colorPresetById(id: string | null): ColorPreset | null {
  if (!id || !isColorPresetId(id)) return null;
  return COLOR_PRESETS[id];
}

export function serveColorPreset(astro: {
  url: URL;
  locals: { colorPreset: string | null };
  rewrite: (path: string) => Response | Promise<Response>;
}): Response | Promise<Response> {
  const preset = colorPresetTarget(astro.url.pathname);
  if (!preset) return astro.rewrite("/404");
  astro.locals.colorPreset = preset.id;
  return astro.rewrite(preset.target);
}

export function colorPresetStyle(preset: ColorPreset): string {
  return Object.entries(preset.colors)
    .map(([variable, rgb]) => `${variable}: ${rgb}`)
    .join("; ");
}
