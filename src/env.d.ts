/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly DATOCMS_TOKEN: string;
  readonly APIFY_TOKEN: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
