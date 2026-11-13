// ETAPA 2 · DESACTIVADA en la Etapa 1. Sin uso hasta activar src/pages/_casos-exito.
// Casos de éxito. Archivo .mjs para que astro.config.mjs pueda leerlo (sitemap/noindex).
// ⚠️ Los tres casos son EJEMPLOS de formato tomados de la propuesta. Mientras `ejemplo: true`,
// la página lleva noindex, no entra al sitemap y muestra la etiqueta "Caso de ejemplo".
// Al tener un caso real autorizado: cambia el contenido y pon `ejemplo: false`.

/**
 * @typedef {Object} Case
 * @property {string} slug
 * @property {boolean} ejemplo
 * @property {string} title
 * @property {string} sector
 * @property {'ciberseguridad'|'redes-empresariales'|'seguridad-electronica'} service
 * @property {string} serviceLabel
 * @property {string} location
 * @property {string} duration
 * @property {string} image  nombre del archivo en src/assets/images (sin extensión)
 * @property {string} imageAlt
 * @property {string} challenge
 * @property {string} solution
 * @property {string} result
 * @property {string} context
 * @property {string[]} steps
 * @property {{value:string,label:string}[]} metrics
 */

/** @type {Case[]} */
export const cases = [
  {
    slug: 'distribuidora-norte',
    ejemplo: true,
    title: 'Red protegida para una distribuidora con tres sucursales',
    sector: 'Distribución',
    service: 'ciberseguridad',
    serviceLabel: 'Ciberseguridad',
    location: 'Monterrey, N.L.',
    duration: '3 semanas',
    image: 'almacen-centro-distribucion',
    imageAlt: 'Pasillo de un centro de distribución con estanterías altas llenas de cajas',
    challenge: 'Equipos infectados y accesos compartidos entre sucursales.',
    solution: 'Firewall perimetral, segmentación de red y protección de equipos.',
    result: 'Red segmentada y accesos controlados por usuario.',
    context:
      'Distribuidora regional con tres sucursales conectadas a un mismo servidor de inventario. Cada sucursal compartía una sola contraseña de acceso y los equipos de mostrador no tenían protección centralizada.',
    steps: [
      'Diagnóstico de la red de las tres sucursales y del servidor central.',
      'Instalación de firewall perimetral con VPN entre sucursales.',
      'Segmentación: punto de venta, oficinas e invitados en redes separadas.',
      'Protección de equipos con consola central y cuentas por usuario.',
    ],
    metrics: [
      { value: '3', label: 'sucursales conectadas por VPN' },
      { value: '100%', label: 'de accesos con usuario propio' },
      { value: '0', label: 'contraseñas compartidas' },
    ],
  },
  {
    slug: 'videovigilancia-clinica',
    ejemplo: true,
    title: 'Videovigilancia y control de acceso en una clínica',
    sector: 'Salud',
    service: 'seguridad-electronica',
    serviceLabel: 'Seguridad electrónica',
    location: 'San Nicolás de los Garza, N.L.',
    duration: '2 semanas',
    image: 'recepcion-clinica-hospital',
    imageAlt: 'Recepción iluminada de una clínica con mostrador y señalización',
    challenge: 'Áreas sin vigilancia y llaves compartidas para zonas restringidas.',
    solution: 'Cámaras en accesos y control de acceso por persona.',
    result: 'Registro de entradas por persona y por área.',
    context:
      'Clínica de especialidades con farmacia y archivo clínico. El acceso a zonas restringidas dependía de llaves físicas que circulaban entre el personal de cada turno.',
    steps: [
      'Levantamiento de accesos, puntos ciegos y zonas restringidas.',
      'Instalación de cámaras IP en accesos, farmacia y estacionamiento.',
      'Control de acceso con tarjeta por persona y por horario.',
      'Capacitación al personal y reporte mensual de accesos.',
    ],
    metrics: [
      { value: '12', label: 'cámaras IP instaladas' },
      { value: '4', label: 'zonas con acceso restringido' },
      { value: '24/7', label: 'registro de entradas' },
    ],
  },
  {
    slug: 'red-inalambrica-planta',
    ejemplo: true,
    title: 'Red inalámbrica y segmentación para una planta industrial',
    sector: 'Industria',
    service: 'redes-empresariales',
    serviceLabel: 'Redes empresariales',
    location: 'Apodaca, N.L.',
    duration: '4 semanas',
    image: 'planta-industrial-produccion',
    imageAlt: 'Piso de producción de una planta industrial con maquinaria y tuberías',
    challenge: 'Zonas sin señal y una sola red para todo en la planta.',
    solution: 'Rediseño de la red Wi‑Fi, switches administrables y segmentación por VLAN.',
    result: 'Cobertura completa en el piso de producción.',
    context:
      'Planta de manufactura con terminales de captura en piso. La red había crecido sin plan, todo compartía la misma red y las zonas de producción perdían señal Wi‑Fi en los cambios de turno.',
    steps: [
      'Estudio de cobertura Wi‑Fi y levantamiento de la red existente.',
      'Diseño de topología con switches administrables y puntos de acceso empresariales.',
      'Segmentación: producción, oficinas, cámaras e invitados en VLAN separadas.',
      'Monitoreo de la red y entrega de diagramas y configuración respaldada.',
    ],
    metrics: [
      { value: '14', label: 'puntos de acceso Wi‑Fi' },
      { value: '4', label: 'redes segmentadas por VLAN' },
      { value: '100%', label: 'del piso con cobertura' },
    ],
  },
];
