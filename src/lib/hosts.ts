/** Public hostnames. /colortest is not served on these. */
const CORE_HOSTS = new Set(["formaintl.com", "www.formaintl.com", "syme.app", "www.syme.app"]);

export function isCoreHost(hostname: string): boolean {
  return CORE_HOSTS.has(hostname.toLowerCase());
}
