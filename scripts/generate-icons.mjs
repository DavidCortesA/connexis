// Genera favicon, íconos PWA e imagen Open Graph por defecto a partir del logo.
// Uso: node scripts/generate-icons.mjs
import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'node:fs';
import { ISO_D, CONNE_D, XIS_D, DOT_D } from '../src/data/brand-paths.ts';

const BG = '#0A0D10';
const grad = `<linearGradient id="g" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#5BC8DC"/><stop offset="1" stop-color="#1E6CC4"/></linearGradient>`;
const pub = (f) => new URL(`../public/${f}`, import.meta.url);

// favicon.svg = brand/connexis-isotipo.svg tal cual (fondo transparente)
const favSvg = readFileSync(new URL('../brand/connexis-isotipo.svg', import.meta.url), 'utf8');
writeFileSync(pub('favicon.svg'), favSvg);
const isoPng = (size) => sharp(Buffer.from(favSvg), { density: 600 }).resize(size, size).png();

// Íconos con fondo carbón (apple-touch, PWA)
const padded = (size, pad) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="${346 - pad} ${201 - pad} ${610 + pad * 2} ${610 + pad * 2}"><defs>${grad}</defs><rect x="${346 - pad}" y="${201 - pad}" width="${610 + pad * 2}" height="${610 + pad * 2}" fill="${BG}"/><path fill="url(#g)" d="${ISO_D}"/></svg>`;
await sharp(Buffer.from(padded(180, 70))).png().toFile(new URL('../public/apple-touch-icon.png', import.meta.url).pathname);
await sharp(Buffer.from(padded(192, 90))).png().toFile(pub('icon-192.png').pathname);
await sharp(Buffer.from(padded(512, 90))).png().toFile(pub('icon-512.png').pathname);
await isoPng(32).toFile(pub('favicon-32.png').pathname);

// Open Graph 1200x630
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>${grad}</defs>
  <rect width="1200" height="630" fill="${BG}"/>
  <g transform="translate(790 60) scale(0.9) translate(-346 -201)"><path fill="url(#g)" d="${ISO_D}"/></g>
  <g transform="translate(72 70) scale(0.42) translate(-324 -856)">
    <path fill="#8CD336" d="${CONNE_D}"/><path fill="#FFFFFF" d="${XIS_D}"/><path fill="url(#g)" d="${DOT_D}"/>
  </g>
  <rect x="72" y="250" width="56" height="4" fill="#8CD336"/>
  <text x="72" y="330" font-family="Helvetica, Arial, sans-serif" font-size="58" font-weight="700" fill="#FFFFFF">Ciberseguridad y redes</text>
  <text x="72" y="400" font-family="Helvetica, Arial, sans-serif" font-size="58" font-weight="700" fill="#8CD336">para PyMEs en Monterrey</text>
  <text x="72" y="540" font-family="Helvetica, Arial, sans-serif" font-size="26" fill="#A7B0BC">connexis.mx · +52 8129129134</text>
</svg>`;
await sharp(Buffer.from(og)).jpeg({ quality: 86 }).toFile(pub('og-default.jpg').pathname);
console.log('Íconos y OG generados en /public');

// favicon.ico (contenedor ICO con PNG de 32px embebido) para navegadores que lo piden en la raíz
const png32 = await isoPng(32).toBuffer();
const header = Buffer.alloc(22);
header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(1, 4);
header.writeUInt8(32, 6); header.writeUInt8(32, 7); header.writeUInt8(0, 8); header.writeUInt8(0, 9);
header.writeUInt16LE(1, 10); header.writeUInt16LE(32, 12); header.writeUInt32LE(png32.length, 14); header.writeUInt32LE(22, 18);
writeFileSync(pub('favicon.ico'), Buffer.concat([header, png32]));
