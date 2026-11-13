import type { ImageMetadata } from 'astro';

// Todas las fotos viven en src/assets/images con nombre descriptivo (SEO) y Astro las
// convierte a WebP/AVIF con tamaños responsivos en el build.
// Origen: Unsplash (licencia Unsplash, uso comercial gratuito). Ver CREDITOS-IMAGENES.md
const files = import.meta.glob<{ default: ImageMetadata }>('../assets/images/*.jpg', { eager: true });

export function img(name: string): ImageMetadata {
  const file = files[`../assets/images/${name}.jpg`];
  if (!file) throw new Error(`Imagen no encontrada: ${name}.jpg`);
  return file.default;
}
