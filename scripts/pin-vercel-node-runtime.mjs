import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const functionsDir = fileURLToPath(new URL("../.vercel/output/functions", import.meta.url));
const targetRuntime = "nodejs24.x";
const supportedRuntimes = new Set(["nodejs22.x", "nodejs24.x"]);

async function findFunctionConfigs(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "ENOENT") {
      return [];
    }
    throw error;
  }

  const files = [];
  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await findFunctionConfigs(path)));
    } else if (entry.name === ".vc-config.json") {
      files.push(path);
    }
  }
  return files;
}

const files = await findFunctionConfigs(functionsDir);
if (files.length === 0) {
  console.error("No Vercel function config found under .vercel/output/functions");
  process.exit(1);
}

for (const file of files) {
  const config = JSON.parse(await readFile(file, "utf8"));
  if (typeof config.runtime !== "string" || supportedRuntimes.has(config.runtime)) {
    continue;
  }

  const previous = config.runtime;
  config.runtime = targetRuntime;
  await writeFile(file, `${JSON.stringify(config, null, 2)}\n`);
  console.log(`Set ${file} runtime ${previous} -> ${targetRuntime}`);
}
