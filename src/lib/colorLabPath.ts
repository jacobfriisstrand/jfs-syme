export const COLOR_LAB_PREFIX = "/colortest";

/** Path to render for a color-lab URL, or null when the request is a normal page. */
export function colorLabTarget(pathname: string): string | null {
  if (pathname !== COLOR_LAB_PREFIX && !pathname.startsWith(`${COLOR_LAB_PREFIX}/`)) return null;
  const rest = pathname.slice(COLOR_LAB_PREFIX.length);
  if (rest === "" || rest === "/") return "/";
  return rest.endsWith("/") ? rest.slice(0, -1) : rest;
}

/** Page path used for the current-link state, with the color-lab prefix removed. */
export function pagePath(pathname: string): string {
  const target = colorLabTarget(pathname);
  const path = target ?? pathname;
  return path.replace(/\/$/, "") || "/";
}
