import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const outDir = join("dist", "client");
const indexPath = join(outDir, "index.html");

if (existsSync(indexPath)) {
  console.log("index.html already exists in dist/client");
  process.exit(0);
}

const manifestPath = join("dist", "server", ".vite", "manifest.json");
if (!existsSync(manifestPath)) {
  throw new Error("Manifest not found at dist/server/.vite/manifest.json");
}

const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));

const startEntry = Object.values(manifest).find(
  (entry) => entry && typeof entry === "object" && entry.name === "start" && entry.file,
);

if (!startEntry || typeof startEntry !== "object") {
  throw new Error("Could not find start entry in manifest");
}

const allAssets = Object.values(manifest)
  .filter((entry) => entry && typeof entry === "object")
  .flatMap((entry) => (Array.isArray(entry.assets) ? entry.assets : []));

const cssFile = allAssets.find((asset) => typeof asset === "string" && asset.endsWith(".css"));
const base = "/Challenge-Gemma4/";

const cssTag = cssFile ? `  <link rel="stylesheet" href="${base}${cssFile}">\n` : "";
const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
${cssTag}  <title>Togo Legal Guide</title>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="${base}${startEntry.file}"></script>
</body>
</html>
`;

writeFileSync(indexPath, html, "utf8");
console.log("Generated dist/client/index.html for GitHub Pages");
