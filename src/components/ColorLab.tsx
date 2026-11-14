import { useEffect, useRef, useState } from "react";
import { Palette, RotateCcw, X } from "lucide-react";
import {
  COLOR_LAB_STORAGE_KEY,
  COLOR_TOKENS,
  applyColors,
  clearAppliedColor,
  clearAppliedColors,
  colorsToCss,
  defaultColors,
  hexToRgb,
  readStoredColors,
  rgbToHex,
  writeStoredColors,
} from "@/lib/colorTokens";

const GROUPS = ["Page", "Type", "Night", "Action", "Status"];

interface HexFieldProps {
  name: string;
  rgb: string;
  onChange: (rgb: string) => void;
}

function HexField({ name, rgb, onChange }: HexFieldProps) {
  const [draft, setDraft] = useState(rgbToHex(rgb));
  const focused = useRef(false);

  useEffect(() => {
    if (focused.current) return;
    setDraft(rgbToHex(rgb));
  }, [rgb]);

  function commit(value: string) {
    const rgbValue = hexToRgb(value, true);
    if (!rgbValue) {
      setDraft(rgbToHex(rgb));
      return;
    }
    setDraft(rgbToHex(rgbValue));
    onChange(rgbValue);
  }

  return (
    <input
      aria-label={`${name} hex`}
      spellCheck={false}
      autoCapitalize="off"
      autoCorrect="off"
      placeholder="#000000"
      value={draft}
      onFocus={() => {
        focused.current = true;
      }}
      onBlur={() => {
        focused.current = false;
        commit(draft);
      }}
      onChange={(event) => {
        const next = event.target.value;
        setDraft(next);
        const rgbValue = hexToRgb(next);
        if (rgbValue) onChange(rgbValue);
      }}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          event.currentTarget.blur();
        }
      }}
      className="h-8 w-28 shrink-0 border border-ink/15 bg-baseLight px-2 font-plex text-xs uppercase text-ink outline-none focus-visible:border-ink"
    />
  );
}

export default function ColorLab() {
  const [open, setOpen] = useState(false);
  const [colors, setColors] = useState<Record<string, string>>(defaultColors);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const stored = readStoredColors();
    if (!stored) return;
    setColors(stored);
    applyColors(stored);
  }, []);

  function updateColor(variable: string, rgb: string) {
    const next = { ...colors, [variable]: rgb };
    setColors(next);
    setCopied(false);
    applyColors(next);
    writeStoredColors(next);
  }

  function reset() {
    setColors(defaultColors());
    setCopied(false);
    clearAppliedColors();
    localStorage.removeItem(COLOR_LAB_STORAGE_KEY);
  }

  function resetColor(variable: string) {
    const token = COLOR_TOKENS.find((item) => item.variable === variable);
    if (!token) return;
    const next = { ...colors, [variable]: token.rgb };
    setColors(next);
    setCopied(false);
    clearAppliedColor(variable);
    const untouched = COLOR_TOKENS.every((item) => next[item.variable] === item.rgb);
    if (untouched) {
      localStorage.removeItem(COLOR_LAB_STORAGE_KEY);
      return;
    }
    writeStoredColors(next);
  }

  async function copyCss() {
    try {
      await navigator.clipboard.writeText(colorsToCss(colors));
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  if (!open) {
    return (
      <button
        type="button"
        className="eyebrow fixed bottom-4 right-4 z-[60] inline-flex items-center gap-2 border border-ink/15 bg-paper px-4 py-2 text-ink shadow-header"
        onClick={() => setOpen(true)}
      >
        <Palette className="size-3.5" aria-hidden="true" />
        Colors
      </button>
    );
  }

  return (
    <aside
      className="fixed bottom-4 right-4 z-[60] flex max-h-[70dvh] w-96 max-w-[calc(100vw-2rem)] flex-col border border-ink/15 bg-paper font-inter text-ink shadow-header"
      aria-label="Color tokens"
    >
      <div className="flex items-center justify-between gap-3 border-b border-ink/10 px-4 py-3">
        <p className="eyebrow m-0 text-ink">Colors</p>
        <button type="button" className="text-ink" aria-label="Close colors" onClick={() => setOpen(false)}>
          <X className="size-4" aria-hidden="true" />
        </button>
      </div>
      <div className="flex flex-col gap-4 overflow-y-auto px-4 py-4">
        {GROUPS.map((group) => (
          <div key={group} className="flex flex-col gap-2">
            <p className="caption m-0 text-inkMuted">{group}</p>
            {COLOR_TOKENS.filter((token) => token.group === group).map((token) => {
              const rgb = colors[token.variable] ?? token.rgb;
              const changed = rgb !== token.rgb;
              return (
                <div key={token.variable} className="flex items-center gap-2">
                  <input
                    type="color"
                    aria-label={token.name}
                    value={rgbToHex(rgb)}
                    onChange={(event) => {
                      const rgbValue = hexToRgb(event.target.value);
                      if (rgbValue) updateColor(token.variable, rgbValue);
                    }}
                    className="h-8 w-8 shrink-0 cursor-pointer border border-ink/15 bg-transparent p-0"
                  />
                  <span className="min-w-0 flex-1 truncate text-sm">{token.name}</span>
                  <HexField name={token.name} rgb={rgb} onChange={(rgbValue) => updateColor(token.variable, rgbValue)} />
                  <button
                    type="button"
                    aria-label={`Reset ${token.name}`}
                    disabled={!changed}
                    onClick={() => resetColor(token.variable)}
                    className="shrink-0 text-ink disabled:text-inkFaint"
                  >
                    <RotateCcw className="size-3.5" aria-hidden="true" />
                  </button>
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-ink/10 px-4 py-3">
        <button type="button" className="caption m-0 text-ink underline underline-offset-4" onClick={reset}>
          Reset
        </button>
        <button type="button" className="caption m-0 text-ink underline underline-offset-4" onClick={() => void copyCss()}>
          {copied ? "Copied" : "Copy CSS"}
        </button>
      </div>
    </aside>
  );
}
