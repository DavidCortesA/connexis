// Datos del negocio. Todo lo que aparece en schema, footer, CTAs y llms.txt sale de aquí.
// ⚠️ Los campos marcados "CONFIRMAR" vienen de la propuesta o son supuestos razonables:
// valídalos con ConneXis antes de publicar.

export const SITE = {
  name: 'ConneXis',
  legalName: 'ConneXis', // CONFIRMAR razón social para el aviso de privacidad
  url: (import.meta.env.PUBLIC_SITE_URL || 'https://connexis.mx').replace(/\/$/, ''),
  locale: 'es_MX',
  lang: 'es-MX',
  tagline: 'Ciberseguridad, redes y seguridad electrónica para PyMEs en Monterrey',
  description:
    'Soluciones de ciberseguridad, redes y seguridad electrónica para pequeñas y medianas empresas en Monterrey y su área metropolitana.',
  phone: '+52 8129129134',
  phoneHref: 'tel:+528129129134',
  whatsapp: '528129129134', // CONFIRMAR que el número tiene WhatsApp Business
  whatsappText: 'Hola ConneXis, me interesa una evaluación de ciberseguridad para mi empresa.',
  email: 'contacto@connexis.mx',
  address: {
    street: 'De la Carreta 606, Residencial Talaverna',
    locality: 'San Nicolás de los Garza',
    region: 'Nuevo León',
    regionCode: 'N.L.',
    postalCode: '66473',
    country: 'MX',
  },
  // CONFIRMAR coordenadas exactas (se usan en el schema LocalBusiness)
  geo: { lat: 25.7417, lng: -100.2895 },
  // CONFIRMAR horario
  hours: [{ days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '18:00' }],
  hoursLabel: 'Lunes a viernes, 9:00 a 18:00',
  areaServed: ['Monterrey', 'San Nicolás de los Garza', 'San Pedro Garza García', 'Apodaca', 'Guadalupe', 'Escobedo', 'Santa Catarina'],
  responseTime: '1 día hábil', // CONFIRMAR tiempo de respuesta que se promete en formularios
  // Deja vacío lo que no exista; el footer y el schema solo muestran lo que tenga URL.
  social: {
    linkedin: 'https://www.linkedin.com/company/connexis-mx/',
    facebook: 'https://www.facebook.com/share/14GhoWJVgx4/',
    instagram: '', // pendiente
  },
} as const;

export const whatsappUrl = (text: string = SITE.whatsappText) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;

export const fullAddress = `${SITE.address.street}, C.P. ${SITE.address.postalCode}, ${SITE.address.locality}, ${SITE.address.regionCode}`;

export const NAV = [
  { label: 'Servicios', href: '/servicios' },
  // ETAPA 2 · { label: 'Casos de éxito', href: '/casos-exito' },
  // ETAPA 3 · { label: 'Blog', href: '/blog' },
  { label: 'Contacto', href: '/contacto' },
] as const;

// Variables de entorno públicas (ver .env.example)
export const ENV = {
  ga4: import.meta.env.PUBLIC_GA4_ID || '',
  adsId: import.meta.env.PUBLIC_GADS_ID || '',
  adsLabel: import.meta.env.PUBLIC_GADS_CONVERSION_LABEL || '',
  gscVerification: import.meta.env.PUBLIC_GSC_VERIFICATION || '',
  formEndpoint: import.meta.env.PUBLIC_FORM_ENDPOINT || '',
};

/** Normaliza la ruta (build.format 'file' entrega /index.html, /blog.html…). */
export const cleanPath = (pathname: string) => {
  const p = pathname.replace(/\.html$/, '').replace(/\/index$/, '/').replace(/(.)\/$/, '$1');
  return p === '' ? '/' : p;
};

/** Redes con URL definida (el footer, el header y el schema solo muestran estas). */
export const socialLinks = () =>
  ([
    { name: 'LinkedIn', href: SITE.social.linkedin, icon: 'LinkedIn' },
    { name: 'Facebook', href: SITE.social.facebook, icon: 'Facebook' },
    { name: 'Instagram', href: SITE.social.instagram, icon: 'Instagram' },
  ] as const).filter((s) => s.href) as { name: string; href: string; icon: 'LinkedIn' | 'Facebook' | 'Instagram' }[];
