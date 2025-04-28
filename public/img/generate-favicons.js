const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

async function generateFavicons() {
  const svgBuffer = await fs.readFile(path.join(__dirname, 'favicon.svg'));
  await sharp(svgBuffer)
    .resize(32, 32)
    .png()
    .toFile(path.join(__dirname, 'favicon-32x32.png'));
}

generateFavicons().catch(console.error);