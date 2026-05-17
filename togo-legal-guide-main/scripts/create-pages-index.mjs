import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const outDir = join("dist", "client");
const indexPath = join(outDir, "index.html");

if (existsSync(indexPath)) {
  console.log("index.html already exists in dist/client");
  process.exit(0);
}

const manifestPath = join("dist", "server", ".vite", "manifest.json");

let jsEntry = "";
let cssFile = "";

if (existsSync(manifestPath)) {
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  const startEntry = Object.values(manifest).find(
    (entry) => entry && typeof entry === "object" && entry.name === "start" && entry.file,
  );

  if (startEntry && typeof startEntry === "object" && typeof startEntry.file === "string") {
    jsEntry = startEntry.file;
  }

  const allAssets = Object.values(manifest)
    .filter((entry) => entry && typeof entry === "object")
    .flatMap((entry) => (Array.isArray(entry.assets) ? entry.assets : []));

  const cssFromManifest = allAssets.find(
    (asset) => typeof asset === "string" && asset.endsWith(".css"),
  );
  if (typeof cssFromManifest === "string") {
    cssFile = cssFromManifest;
  }
}

if (!jsEntry) {
  const assetsDir = join(outDir, "assets");
  if (!existsSync(assetsDir)) {
    throw new Error("Assets directory not found at dist/client/assets");
  }

  const files = readdirSync(assetsDir);
  const startFile = files.find((name) => /^start-.*\.js$/.test(name));
  const indexFile = files.find((name) => /^index-.*\.js$/.test(name));
  const cssFallback = files.find((name) => /^styles-.*\.css$/.test(name));

  const chosenJs = startFile || indexFile;
  if (!chosenJs) {
    throw new Error("Could not find a start/index JavaScript entry in dist/client/assets");
  }

  jsEntry = `assets/${chosenJs}`;
  if (!cssFile && cssFallback) {
    cssFile = `assets/${cssFallback}`;
  }
}
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
  <script type="module" src="${base}${jsEntry}"></script>
</body>
</html>
`;

writeFileSync(indexPath, html, "utf8");
console.log("Generated dist/client/index.html for GitHub Pages");
