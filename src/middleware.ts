import { defineMiddleware } from "astro:middleware";
import { colorLabTarget } from "@/lib/colorLabPath";
import { colorPresetTarget } from "@/lib/colorPresets";

export const onRequest = defineMiddleware(async (context, next) => {
  const preset = colorPresetTarget(context.url.pathname);
  if (preset) {
    context.locals.colorPreset = preset.id;
    const presetUrl = new URL(preset.target, context.url);
    presetUrl.search = context.url.search;
    return context.rewrite(presetUrl);
  }

  // A rewrite re-enters middleware on the target path. Keep a preset set by the first pass.
  if (context.locals.colorPreset == null) context.locals.colorPreset = null;

  const target = colorLabTarget(context.url.pathname);
  if (!target) {
    // A rewrite re-enters middleware on the target path. Keep the flag set by the first pass.
    if (context.locals.colorLab !== true) context.locals.colorLab = false;
    return next();
  }

  context.locals.colorLab = true;
  const url = new URL(target, context.url);
  url.search = context.url.search;
  return context.rewrite(url);
});
