import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const screenshots = [
  { name: 'portfolio-homepage.png', width: 1440, height: 1000 },
  { name: 'portfolio-projects.png', width: 1152, height: 961 },
  { name: 'portfolio-terminal.png', width: 1152, height: 727 },
];

const projectData = await readFile(resolve('src/data/projects.js'), 'utf8');

for (const screenshot of screenshots) {
  const file = await readFile(resolve('public/projects/portfolio', screenshot.name));
  const isPng = file.subarray(1, 4).toString('ascii') === 'PNG';
  const width = file.readUInt32BE(16);
  const height = file.readUInt32BE(20);

  if (!isPng) throw new Error(`${screenshot.name} is not a valid PNG file.`);
  if (width !== screenshot.width || height !== screenshot.height) {
    throw new Error(
      `${screenshot.name} is ${width}x${height}; expected ${screenshot.width}x${screenshot.height}.`
    );
  }
  if (file.byteLength > 500_000) {
    throw new Error(`${screenshot.name} exceeds the 500 KB portfolio image budget.`);
  }
  if (!projectData.includes(`projects/portfolio/${screenshot.name}`)) {
    throw new Error(`${screenshot.name} is not referenced by the Portfolio Website project.`);
  }
}

console.log(`Validated ${screenshots.length} Portfolio Website screenshots.`);
