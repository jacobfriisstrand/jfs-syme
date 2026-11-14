import { defineMiddleware } from "astro:middleware";
import { colorLabTarget } from "@/lib/colorLabPath";

export const onRequest = defineMiddleware(async (context, next) => {
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
