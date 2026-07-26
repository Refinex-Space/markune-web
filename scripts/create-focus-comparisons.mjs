import { mkdir, readFile, writeFile } from "node:fs/promises";
import { PNG } from "pngjs";

const routeKeys = process.argv.slice(2);

if (routeKeys.length === 0) {
  throw new Error("Pass one or more screenshot route keys, for example: about blog--what-we-shipped-in-q1");
}

const root = new URL("../design-qa/", import.meta.url);
const outputDirectory = new URL("focused/", root);
const segmentHeight = 844;
const gutter = 8;

function paste(source, target, offsetX, offsetY, cropTop, cropHeight) {
  PNG.bitblt(source, target, 0, cropTop, source.width, cropHeight, offsetX, offsetY);
}

await mkdir(outputDirectory, { recursive: true });

for (const routeKey of routeKeys) {
  const [source, implementation, difference] = await Promise.all([
    readFile(new URL(`routes/${routeKey}--source--mobile.png`, root)).then(PNG.sync.read),
    readFile(new URL(`routes/${routeKey}--implementation--mobile.png`, root)).then(PNG.sync.read),
    readFile(new URL(`diffs/${routeKey}--mobile.png`, root)).then(PNG.sync.read),
  ]);

  if (source.width !== implementation.width || source.height !== implementation.height) {
    throw new Error(`${routeKey}: source and implementation dimensions differ`);
  }

  const segmentCount = Math.ceil(source.height / segmentHeight);
  for (let index = 0; index < segmentCount; index += 1) {
    const cropTop = index * segmentHeight;
    const cropHeight = Math.min(segmentHeight, source.height - cropTop);
    const comparison = new PNG({
      width: source.width * 3 + gutter * 2,
      height: cropHeight,
      colorType: 6,
    });
    comparison.data.fill(255);

    paste(source, comparison, 0, 0, cropTop, cropHeight);
    paste(implementation, comparison, source.width + gutter, 0, cropTop, cropHeight);
    paste(difference, comparison, (source.width + gutter) * 2, 0, cropTop, cropHeight);

    const filename = `${routeKey}--segment-${String(index + 1).padStart(2, "0")}.png`;
    await writeFile(new URL(filename, outputDirectory), PNG.sync.write(comparison));
  }
}
