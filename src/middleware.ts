import { defineMiddleware } from "astro:middleware";
import { colorLabTarget } from "@/lib/colorLabPath";
import { isCoreHost } from "@/lib/hosts";

export const onRequest = defineMiddleware(async (context, next) => {
  const target = colorLabTarget(context.url.pathname);
  if (!target) {
    // A rewrite re-enters middleware on the target path. Keep the flag set by the first pass.
    if (context.locals.colorLab !== true) context.locals.colorLab = false;
    return next();
  }

  if (isCoreHost(context.url.hostname)) {
    const response = await context.rewrite("/404");
    return new Response(response.body, {
      status: 404,
      statusText: "Not Found",
      headers: response.headers,
    });
  }

  context.locals.colorLab = true;
  const url = new URL(target, context.url);
  url.search = context.url.search;
  return context.rewrite(url);
});
