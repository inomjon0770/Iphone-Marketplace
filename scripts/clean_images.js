import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const productsDir = 'public/products';
const backupDir = 'public/products/backup';

if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

const targetFiles = [
  'ipad_pro_m4.png',
  'iphone_15_pro_natural.png',
  'iphone_16_base.png',
  'iphone_16_pro_back.png',
  'iphone_16_pro_black.png',
  'iphone_16_pro_desert.png',
  'iphone_16_pro_front.png',
  'iphone_16_pro_natural.png',
  'iphone_16_pro_white.png',
  'macbook_pro_14.png',
  'watch_series_10.png',
  'watch_ultra_2.png'
];

async function processFile(file) {
  const srcPath = path.join(productsDir, file);
  const backupPath = path.join(backupDir, file);

  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(srcPath, backupPath);
  }

  const { data, info } = await sharp(srcPath).raw().toBuffer({ resolveWithObject: true });
  const w = info.width;
  const h = info.height;

  // Flood fill from all 4 borders to remove outer white/off-white background card
  const visited = new Uint8Array(w * h);
  const queue = [];

  for (let x = 0; x < w; x++) {
    queue.push(x, 0);
    queue.push(x, h - 1);
  }
  for (let y = 0; y < h; y++) {
    queue.push(0, y);
    queue.push(w - 1, y);
  }

  while (queue.length > 0) {
    const cy = queue.pop();
    const cx = queue.pop();
    const idx = cy * w + cx;
    if (visited[idx]) continue;
    visited[idx] = 1;

    const p = idx * 4;
    const r = data[p];
    const g = data[p + 1];
    const b = data[p + 2];
    const a = data[p + 3];

    // Background is either already transparent or near-white card
    const isBg = a < 25 || (r > 218 && g > 218 && b > 218);
    if (isBg) {
      data[p + 3] = 0; // set alpha to transparent
      if (cx > 0 && !visited[cy * w + (cx - 1)]) queue.push(cx - 1, cy);
      if (cx < w - 1 && !visited[cy * w + (cx + 1)]) queue.push(cx + 1, cy);
      if (cy > 0 && !visited[(cy - 1) * w + cx]) queue.push(cx, cy - 1);
      if (cy < h - 1 && !visited[(cy + 1) * w + cx]) queue.push(cx, cy + 1);
    }
  }

  // Find tight bounding box of device
  let minX = w, maxX = 0, minY = h, maxY = 0, devicePixels = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const p = (y * w + x) * 4;
      if (data[p + 3] > 25) {
        devicePixels++;
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  if (devicePixels === 0 || minX >= maxX || minY >= maxY) {
    console.warn(`Skipping ${file}: no device pixels detected`);
    return;
  }

  const pad = 12;
  const cropLeft = Math.max(0, minX - pad);
  const cropTop = Math.max(0, minY - pad);
  const cropWidth = Math.min(w - cropLeft, (maxX - minX) + pad * 2);
  const cropHeight = Math.min(h - cropTop, (maxY - minY) + pad * 2);

  // Extract cropped device buffer
  const croppedBuffer = await sharp(data, {
    raw: { width: w, height: h, channels: 4 }
  })
    .extract({ left: cropLeft, top: cropTop, width: cropWidth, height: cropHeight })
    .png()
    .toBuffer();

  // Create an 800x800 high-res transparent canvas and resize device to fill 88%
  const targetCanvasSize = 800;
  const maxDeviceDim = Math.round(targetCanvasSize * 0.88);

  const deviceResized = await sharp(croppedBuffer)
    .resize({
      width: maxDeviceDim,
      height: maxDeviceDim,
      fit: 'inside',
      withoutEnlargement: false
    })
    .toBuffer();

  // Composite onto transparent 800x800
  await sharp({
    create: {
      width: targetCanvasSize,
      height: targetCanvasSize,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
    .composite([{ input: deviceResized, gravity: 'center' }])
    .png()
    .toFile(srcPath);

  console.log(`✓ Processed ${file}: cropped ${cropWidth}x${cropHeight} -> scaled to 800x800 center`);
}

async function run() {
  for (const f of targetFiles) {
    await processFile(f);
  }
  console.log('All targeted product images cleaned and enlarged!');
}

run().catch(console.error);
