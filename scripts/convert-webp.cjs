const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const roots = [
  path.resolve(__dirname, '../frontend/public/img'),
  path.resolve(__dirname, '../frontend/src/assets/img'),
];

async function convertDir(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const full = path.join(dir, f);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      await convertDir(full);
      continue;
    }
    if (!/(\.jpe?g|\.png)$/i.test(f)) continue;
    const out = full.replace(/\.(jpe?g|png)$/i, '.webp');
    if (fs.existsSync(out)) continue;
    try {
      await sharp(full).webp({ quality: 80 }).toFile(out);
      console.log('Converted:', path.relative(process.cwd(), out));
    } catch (e) {
      console.warn('Failed:', full, e.message);
    }
  }
}

(async () => {
  for (const r of roots) {
    await convertDir(r);
  }
})();


