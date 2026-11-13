// Extrae los trazos del logo oscuro a un módulo TS reutilizable por los componentes.
import { readFileSync, writeFileSync } from 'node:fs';
const svg = readFileSync(new URL('../brand/connexis-logo-oscuro.svg', import.meta.url), 'utf8');
const paths = [...svg.matchAll(/<path fill="([^"]+)" d="([^"]+)"/g)].map((m) => ({ fill: m[1], d: m[2] }));
const [iso, conne, xis, dot] = paths;
const out = `// Generado por scripts/extract-brand.mjs a partir de brand/connexis-logo-oscuro.svg. No editar a mano.
export const ISO_D = ${JSON.stringify(iso.d)};
export const CONNE_D = ${JSON.stringify(conne.d)};
export const XIS_D = ${JSON.stringify(xis.d)};
export const DOT_D = ${JSON.stringify(dot.d)};
`;
writeFileSync(new URL('../src/data/brand-paths.ts', import.meta.url), out);
console.log('paths:', paths.length);
