import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { basename, join } from "node:path";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";

const routeDirectory = "design-qa/routes";
const diffDirectory = "design-qa/diffs";
const reportFile = "design-qa/pixelmatch-report.md";

await mkdir(diffDirectory, { recursive: true });

const sourceFiles = (await readdir(routeDirectory))
  .filter((file) => file.includes("--source--") && file.endsWith(".png"))
  .sort();

const rows = [];
for (const sourceFile of sourceFiles) {
  const implementationFile = sourceFile.replace("--source--", "--implementation--");
  const source = PNG.sync.read(await readFile(join(routeDirectory, sourceFile)));
  const implementation = PNG.sync.read(await readFile(join(routeDirectory, implementationFile)));
  const label = basename(sourceFile).replace("--source--", "--").replace(".png", "");

  if (source.width !== implementation.width || source.height !== implementation.height) {
    rows.push({
      label,
      dimensions: `${source.width}x${source.height} vs ${implementation.width}x${implementation.height}`,
      mismatch: null,
      ratio: null,
    });
    continue;
  }

  const diff = new PNG({ width: source.width, height: source.height });
  const mismatch = pixelmatch(source.data, implementation.data, diff.data, source.width, source.height, {
    includeAA: false,
    threshold: 0.1,
  });
  const ratio = mismatch / (source.width * source.height);
  await writeFile(join(diffDirectory, `${label}.png`), PNG.sync.write(diff));
  rows.push({ label, dimensions: `${source.width}x${source.height}`, mismatch, ratio });
}

const report = [
  "# Pixelmatch report",
  "",
  "Pixelmatch uses `threshold: 0.1` and excludes anti-alias-only pixels. Ratios include every visible pixel; no content regions are masked.",
  "",
  "| Route and viewport | Dimensions | Different pixels | Difference ratio |",
  "| --- | ---: | ---: | ---: |",
  ...rows.map((row) => `| ${row.label} | ${row.dimensions} | ${row.mismatch ?? "dimension mismatch"} | ${row.ratio === null ? "n/a" : `${(row.ratio * 100).toFixed(4)}%`} |`),
  "",
];

await writeFile(reportFile, report.join("\n"));

const comparable = rows.filter((row) => row.ratio !== null);
const maximum = comparable.reduce((current, row) => Math.max(current, row.ratio), 0);
const mean = comparable.reduce((sum, row) => sum + row.ratio, 0) / comparable.length;
console.log(`Compared ${comparable.length}/${rows.length} captures. Mean ${(mean * 100).toFixed(4)}%; max ${(maximum * 100).toFixed(4)}%.`);
if (rows.some((row) => row.ratio === null || row.ratio > 0.001)) process.exitCode = 1;
