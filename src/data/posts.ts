// ETAPA 3 · DESACTIVADA en la Etapa 1. Sin uso hasta activar src/pages/_blog.
// Artículos del blog = contenido de cluster. Fase 1: tres artículos, uno por pilar.
// Cada uno enlaza a su pilar (servicio) y el pilar enlaza de vuelta al artículo.
import type { ServiceSlug } from './services';

export type Post = {
  slug: string;
  pillar: ServiceSlug;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  /** Texto corto para enlaces (footer, relacionados). */
  label: string;
  excerpt: string;
  /** Intención de búsqueda que atiende el artículo. */
  intent: string;
  image: string;
  imageAlt: string;
  published: string; // ISO
  updated: string; // ISO
  readingMinutes: number;
};

export const posts: Post[] = [
  {
    slug: 'evaluacion-vulnerabilidades',
    pillar: 'ciberseguridad',
    metaTitle: 'Evaluación de vulnerabilidades: qué incluye y cómo se hace',
    metaDescription:
      'Qué revisa una evaluación de vulnerabilidades, cuánto dura, qué entregables recibe y en qué se diferencia de una prueba de penetración.',
    h1: 'Evaluación de vulnerabilidades: qué incluye, cuánto dura y qué recibe',
    label: 'Evaluación de vulnerabilidades',
    excerpt: 'Cómo se encuentran los puntos débiles de su red antes que un atacante.',
    intent: 'Informacional-comercial: "evaluación de vulnerabilidades qué incluye", "análisis de vulnerabilidades empresa".',
    image: 'panel-led-ciberseguridad',
    imageAlt: 'Circuito iluminado en tonos verde azulado sobre fondo oscuro',
    published: '2026-11-13',
    updated: '2026-11-13',
    readingMinutes: 7,
  },
  {
    slug: 'segmentacion-red-empresarial',
    pillar: 'redes-empresariales',
    metaTitle: 'Segmentación de red con VLAN: guía para empresas',
    metaDescription:
      'Qué es segmentar la red con VLAN, qué redes separar en una empresa (invitados, cámaras, punto de venta) y cómo mejora la seguridad y la velocidad.',
    h1: '¿Qué es segmentar la red de una empresa y qué conviene separar?',
    label: 'Segmentación de red con VLAN',
    excerpt: 'Por qué invitados, cámaras y oficinas no deberían compartir la misma red.',
    intent: 'Informacional: "segmentación de red", "qué es una VLAN", "separar red de invitados empresa".',
    image: 'cables-red-azules-conectados',
    imageAlt: 'Cables de red azules organizados conectados a la parte trasera de un rack',
    published: '2026-11-13',
    updated: '2026-11-13',
    readingMinutes: 6,
  },
  {
    slug: 'videovigilancia-empresas',
    pillar: 'seguridad-electronica',
    metaTitle: 'Videovigilancia para empresas: cómo elegir el sistema',
    metaDescription:
      'Cámaras IP o analógicas, cuántos días grabar, dónde colocarlas y cómo verlas desde el celular sin exponer su red. Guía para empresas en Monterrey.',
    h1: 'Cómo elegir un sistema de videovigilancia para su empresa',
    label: 'Cómo elegir videovigilancia',
    excerpt: 'Cámaras, grabación, ubicación y acceso remoto seguro, explicado sin tecnicismos.',
    intent: 'Informacional-comercial: "cámaras de seguridad para empresas", "cámaras IP vs analógicas", "videovigilancia empresarial".',
    image: 'almacen-centro-distribucion',
    imageAlt: 'Pasillo de un centro de distribución con estanterías altas llenas de cajas',
    published: '2026-11-13',
    updated: '2026-11-13',
    readingMinutes: 6,
  },
];

export const getPost = (slug: string) => {
  const p = posts.find((x) => x.slug === slug);
  if (!p) throw new Error(`Artículo no encontrado: ${slug}`);
  return p;
};

export const postsByPillar = (pillar: ServiceSlug) => posts.filter((p) => p.pillar === pillar);
