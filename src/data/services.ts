// Servicios = páginas PILAR de cada topic cluster (fase 1: tres servicios).
// Cada servicio enlaza a su artículo del blog (cluster) y el artículo enlaza de vuelta a su pilar.
// Cableado estructurado y fibra óptica se mencionan solo en el home, sin página propia en esta fase.

export type Faq = { q: string; a: string };
export type IconName =
  | 'BrickWall' | 'Radar' | 'KeyRound' | 'ShieldCheck' | 'Bug' | 'ScanSearch' | 'Mail' | 'Users'
  | 'TriangleAlert' | 'Flame' | 'Wifi' | 'Cable' | 'Network' | 'Server' | 'ClipboardCheck'
  | 'Wrench' | 'Headset' | 'FileSearch' | 'Gauge' | 'LockKeyhole' | 'Cctv' | 'Router' | 'Zap'
  | 'Fence' | 'BellRing' | 'Siren' | 'Eye' | 'Split' | 'Signal' | 'Activity' | 'IdCard' | 'Store'
  | 'Hospital' | 'Warehouse' | 'Building2' | 'Layers';

export type ServiceSlug = 'ciberseguridad' | 'redes-empresariales' | 'seguridad-electronica';

export type Service = {
  slug: ServiceSlug;
  name: string;
  short: string;
  metaTitle: string;
  metaDescription: string;
  /** Intención de búsqueda que atiende la página (documentación interna). */
  intent: string;
  eyebrow: string;
  h1: string;
  lead: string;
  tldr: string[];
  image: string;
  imageAlt: string;
  image2: string;
  image2Alt: string;
  /** Conversión principal de la página (texto del CTA). */
  cta: string;
  formValue: string;
  risks: { icon: IconName; title: string; text: string }[];
  includes: { icon: IconName; title: string; text: string }[];
  comparison: { caption: string; head: [string, string, string]; rows: [string, string, string][] };
  /** Escenarios de uso / tipos de instalación por sector. */
  scenarios: { icon: IconName; title: string; text: string }[];
  benefits: { title: string; text: string }[];
  process: { title: string; text: string }[];
  faqs: Faq[];
};

export const services: Service[] = [
  {
    slug: 'ciberseguridad',
    name: 'Ciberseguridad',
    short: 'Defensa perimetral, prevención de intrusos, listas de control de acceso, protección contra malware, hacking ético y análisis de vulnerabilidades.',
    metaTitle: 'Ciberseguridad para empresas en Monterrey | ConneXis',
    metaDescription:
      'Firewall perimetral, IPS, protección de endpoints y análisis de vulnerabilidades para PyMEs en Monterrey. Evaluación inicial y plan en lenguaje claro.',
    intent: 'Comercial-local: "ciberseguridad para empresas Monterrey", "empresa de ciberseguridad PyME".',
    eyebrow: 'Ciberseguridad',
    h1: 'Proteja la información de su empresa antes de que alguien más la encuentre',
    lead:
      'Implementamos dispositivos de defensa perimetral como firewalls, prevención de intrusos (IPS), listas de control de acceso (ACL) y protección contra malware para garantizar la disponibilidad, integridad y confidencialidad de sus datos. Empezamos con un diagnóstico y lo implementamos sin detener su operación.',
    tldr: [
      'Qué es: un servicio integral para proteger red, equipos y datos de su empresa.',
      'Para quién: PyMEs de 5 a 250 usuarios en Monterrey y su área metropolitana.',
      'Cómo empieza: evaluación de seguridad con informe de prioridades claras.',
      'Qué incluye: firewall, IPS, protección de endpoints, vulnerabilidades y pruebas autorizadas.',
      'Resultado: menos riesgo de paros, robo de datos o secuestro de información.',
    ],
    image: 'sala-servidores-cableado-red',
    imageAlt: 'Racks de servidores con cables de red de colores en un cuarto de telecomunicaciones',
    image2: 'panel-led-ciberseguridad',
    image2Alt: 'Circuito iluminado en tonos verde azulado sobre fondo oscuro',
    cta: 'Solicitar evaluación de seguridad',
    formValue: 'Ciberseguridad',
    risks: [
      { icon: 'Mail', title: 'Correos y archivos maliciosos', text: 'Un adjunto o enlace falso basta para instalar malware en un equipo y propagarlo a la red.' },
      { icon: 'KeyRound', title: 'Contraseñas y accesos sin control', text: 'Usuarios compartidos y contraseñas que nunca cambian dejan la puerta abierta a cualquiera.' },
      { icon: 'TriangleAlert', title: 'Red sin defensa perimetral', text: 'Un módem de proveedor no filtra el tráfico: cualquier puerto expuesto es una entrada.' },
    ],
    includes: [
      { icon: 'BrickWall', title: 'Firewall perimetral', text: 'Controla qué entra y qué sale de su red, con VPN para trabajo remoto y sucursales.' },
      { icon: 'Radar', title: 'Prevención de intrusos (IPS)', text: 'Detecta y bloquea ataques conocidos en tiempo real, antes de que lleguen a sus equipos.' },
      { icon: 'ShieldCheck', title: 'Protección contra malware', text: 'Antivirus y antimalware en cada equipo, administrados desde una consola central.' },
      { icon: 'ScanSearch', title: 'Análisis de vulnerabilidades', text: 'Evaluamos sistemas, aplicaciones y dispositivos y le entregamos un informe claro con recomendaciones prácticas.' },
      { icon: 'Bug', title: 'Pruebas de penetración (hacking ético)', text: 'Con autorización por escrito, buscamos los errores que podrían permitir el acceso a su información para corregirlos.' },
      { icon: 'LockKeyhole', title: 'Listas de control de acceso (ACL)', text: 'Definimos quién puede llegar a cada sistema y servicio de su red, y bloqueamos el resto.' },
    ],
    comparison: {
      caption: 'Diferencia entre una red sin protección y una red protegida por ConneXis',
      head: ['Aspecto', 'Red típica de una PyME', 'Red protegida por ConneXis'],
      rows: [
        ['Entrada a internet', 'Módem del proveedor, sin filtrado', 'Firewall con reglas e IPS'],
        ['Accesos', 'Usuarios y contraseñas compartidos', 'Usuario por persona y permisos por área'],
        ['Equipos', 'Antivirus gratuito o vencido', 'Protección de endpoints administrada'],
        ['Riesgos conocidos', 'Nadie los ha revisado', 'Análisis de vulnerabilidades con informe'],
        ['Visibilidad', 'Nadie sabe qué pasa', 'Reportes y alertas periódicas'],
      ],
    },
    scenarios: [
      { icon: 'Building2', title: 'Oficinas corporativas', text: 'Firewall, VPN para trabajo remoto y cuentas por usuario.' },
      { icon: 'Store', title: 'Comercios con sucursales', text: 'Enlaces seguros entre sucursales y punto de venta aislado.' },
      { icon: 'Hospital', title: 'Clínicas y consultorios', text: 'Protección de expedientes y equipos con información sensible.' },
    ],
    benefits: [
      { title: 'Continuidad operativa', text: 'Menos paros por virus, secuestro de datos o caídas de red.' },
      { title: 'Información protegida', text: 'Datos de clientes, nómina y finanzas fuera del alcance de terceros.' },
      { title: 'Decisiones con información', text: 'Un informe claro de riesgos para invertir donde más importa.' },
      { title: 'Un aliado local', text: 'Atención en sitio en Monterrey y soporte cuando lo necesite.' },
    ],
    process: [
      { title: 'Evaluación', text: 'Revisamos su red, equipos y accesos para entender el punto de partida.' },
      { title: 'Propuesta', text: 'Le entregamos un plan priorizado con alcance, tiempos y costos.' },
      { title: 'Implementación', text: 'Instalamos y configuramos sin detener su operación.' },
      { title: 'Acompañamiento', text: 'Monitoreo, ajustes y revisiones después de la entrega.' },
    ],
    faqs: [
      { q: '¿Qué incluye la evaluación de seguridad?', a: 'Revisamos la red, el firewall, los accesos y los equipos de su empresa, y le entregamos un informe con los hallazgos ordenados por prioridad y recomendaciones prácticas en lenguaje claro.' },
      { q: '¿Mi empresa es demasiado pequeña para necesitar ciberseguridad?', a: 'No. Las PyMEs son un blanco frecuente porque suelen tener menos defensas. Un firewall bien configurado, cuentas por usuario y protección de equipos reducen mucho el riesgo con una inversión acotada.' },
      { q: '¿Las pruebas de hacking ético son seguras?', a: 'Sí. Solo se hacen con autorización por escrito, con un alcance y horario acordados, y sin afectar la operación. Al final recibe un informe con lo encontrado y cómo corregirlo.' },
      { q: '¿Tienen que detener mi operación para implementar?', a: 'No. Planeamos los cambios por etapas y los cortes necesarios se hacen fuera de horario para que su equipo siga trabajando.' },
      { q: '¿Cuánto cuesta un proyecto de ciberseguridad?', a: 'Depende del número de usuarios, sucursales y equipos. Después de la evaluación le entregamos una propuesta con costos cerrados por etapa.' },
    ],
  },
  {
    slug: 'redes-empresariales',
    name: 'Redes empresariales',
    short: 'Diseñamos, instalamos y optimizamos redes cableadas e inalámbricas con conectividad estable, rápida y segura.',
    metaTitle: 'Redes empresariales y Wi‑Fi en Monterrey | ConneXis',
    metaDescription:
      'Diseño e instalación de redes cableadas e inalámbricas para empresas en Monterrey: cobertura Wi‑Fi, estabilidad, segmentación y mantenimiento.',
    intent: 'Comercial-local: "redes empresariales Monterrey", "instalación de red wifi para empresa".',
    eyebrow: 'Redes empresariales',
    h1: 'Una red que no se cae, cubre todo el espacio y separa lo que debe ir separado',
    lead:
      'Diseñamos, instalamos y optimizamos redes cableadas e inalámbricas que garantizan una conectividad estable, rápida y segura en oficinas e industrias de Monterrey. Cada dispositivo queda conectado de manera eficiente para maximizar la productividad, porque una empresa bien conectada es más competitiva y tiene mayor potencial de crecimiento.',
    tldr: [
      'Qué es: diseño e instalación de la red cableada y Wi‑Fi de su empresa.',
      'Para quién: empresas con zonas sin señal, caídas frecuentes o que se mudan o crecen.',
      'Qué incluye: estudio de cobertura, switches, puntos de acceso, VLAN y mantenimiento.',
      'Por qué importa: una red mal diseñada frena la operación y abre huecos de seguridad.',
      'Primer paso: diagnóstico de red con mapa de cobertura y cotización.',
    ],
    image: 'cables-utp-patch-panel',
    imageAlt: 'Patch panel numerado con cables de red UTP azules y grises conectados',
    image2: 'fibra-optica-switch-red',
    image2Alt: 'Switch de red en rack con cables de fibra óptica amarillos conectados',
    cta: 'Solicitar diagnóstico de red',
    formValue: 'Redes empresariales',
    risks: [
      { icon: 'Signal', title: 'Zonas sin señal', text: 'Puntos de acceso domésticos o mal ubicados dejan áreas completas sin Wi‑Fi estable.' },
      { icon: 'Gauge', title: 'Caídas y lentitud', text: 'Equipos saturados y sin configuración profesional cortan la red en las horas de más uso.' },
      { icon: 'Split', title: 'Todo en la misma red', text: 'Invitados, cámaras y equipos de oficina mezclados: una falla o intrusión afecta a todos.' },
    ],
    includes: [
      { icon: 'Wifi', title: 'Estudio de cobertura Wi‑Fi', text: 'Medimos el espacio y ubicamos cada punto de acceso donde realmente se necesita.' },
      { icon: 'Network', title: 'Diseño de red', text: 'Topología, switches administrables y capacidad dimensionada para crecer.' },
      { icon: 'Layers', title: 'Segmentación (VLAN)', text: 'Redes separadas para oficinas, invitados, cámaras y punto de venta.' },
      { icon: 'Router', title: 'Red inalámbrica empresarial', text: 'Puntos de acceso administrados desde una consola, con roaming sin cortes.' },
      { icon: 'Activity', title: 'Monitoreo y estabilidad', text: 'Alertas de caídas y saturación para actuar antes de que el equipo lo note.' },
      { icon: 'Wrench', title: 'Mantenimiento', text: 'Actualizaciones, respaldos de configuración y soporte en sitio.' },
    ],
    comparison: {
      caption: 'Red improvisada frente a red empresarial diseñada por ConneXis',
      head: ['Aspecto', 'Red improvisada', 'Red empresarial ConneXis'],
      rows: [
        ['Cobertura', 'Zonas muertas y repetidores', 'Estudio de cobertura y puntos de acceso empresariales'],
        ['Estabilidad', 'Caídas en horas pico', 'Equipos dimensionados y monitoreados'],
        ['Segmentación', 'Una sola red para todo', 'VLAN para oficinas, invitados y cámaras'],
        ['Administración', 'Cada equipo por separado', 'Consola central y respaldos de configuración'],
        ['Mantenimiento', 'Solo cuando algo falla', 'Revisiones programadas'],
      ],
    },
    scenarios: [
      { icon: 'Building2', title: 'Oficinas', text: 'Wi‑Fi estable para salas de juntas, videollamadas y red de invitados aislada.' },
      { icon: 'Warehouse', title: 'Bodegas y naves', text: 'Cobertura para lectores y terminales móviles en pasillos y andenes.' },
      { icon: 'Hospital', title: 'Clínicas', text: 'Red separada para equipos médicos, recepción y pacientes.' },
    ],
    benefits: [
      { title: 'Menos interrupciones', text: 'Una red diseñada y monitoreada elimina la mayoría de las caídas.' },
      { title: 'Cobertura total', text: 'Señal estable en oficinas, bodegas y áreas abiertas.' },
      { title: 'Más seguridad', text: 'La segmentación limita el alcance de cualquier falla o intrusión.' },
      { title: 'Más competitiva', text: 'Una empresa conectada de forma eficiente es más productiva y tiene mayor potencial de crecimiento.' },
    ],
    process: [
      { title: 'Diagnóstico', text: 'Visitamos el sitio, medimos cobertura y revisamos sus equipos actuales.' },
      { title: 'Diseño y cotización', text: 'Topología, equipos, segmentación, tiempos y costo cerrado.' },
      { title: 'Instalación', text: 'Montaje y configuración con mínima interrupción a la operación.' },
      { title: 'Mantenimiento', text: 'Monitoreo, actualizaciones y soporte en sitio.' },
    ],
    faqs: [
      { q: '¿Por qué mi Wi‑Fi se cae aunque tengo buen internet?', a: 'Casi siempre es la red interna, no el proveedor: equipos domésticos saturados, puntos de acceso mal ubicados o interferencia. Un diagnóstico de red identifica la causa exacta.' },
      { q: '¿Qué es segmentar la red?', a: 'Es dividirla en redes virtuales (VLAN) para que invitados, cámaras, punto de venta y oficinas no compartan el mismo espacio. Mejora el rendimiento y limita el daño de cualquier incidente.' },
      { q: '¿Trabajan con mis equipos actuales?', a: 'Sí. Revisamos lo que ya tiene y solo recomendamos reemplazar lo que no cumple o no se puede administrar.' },
      { q: '¿Cuánto tarda la instalación de una red?', a: 'Una oficina mediana suele quedar en una a dos semanas. Bodegas y plantas se planean por etapas.' },
      { q: '¿Ofrecen mantenimiento?', a: 'Sí, con revisiones programadas, respaldos de configuración y soporte en sitio en Monterrey y su área metropolitana.' },
    ],
  },
  {
    slug: 'seguridad-electronica',
    name: 'Seguridad electrónica',
    short: 'Videovigilancia, alarmas, control de acceso, cercos eléctricos y monitoreo inteligente para proteger lo que más le importa.',
    metaTitle: 'Seguridad electrónica para empresas en Monterrey | ConneXis',
    metaDescription:
      'Videovigilancia, alarmas, control de acceso, cercos eléctricos y monitoreo para empresas en Monterrey. Solicite una visita de asesoría.',
    intent: 'Comercial-local: "seguridad electrónica Monterrey", "cámaras de seguridad para empresas", "control de acceso".',
    eyebrow: 'Seguridad electrónica',
    h1: 'Vea, controle y registre quién entra a su empresa, a cualquier hora',
    lead:
      'Instalamos sistemas de videovigilancia, alarmas, control de acceso, cercos eléctricos y monitoreo inteligente para proteger lo que más le importa. Adaptamos cada solución a sus necesidades, ya sea para oficinas, negocios, grandes instalaciones u hogares, porque cuidar su negocio va más allá de cerrar la puerta.',
    tldr: [
      'Qué es: sistemas para vigilar, controlar accesos y recibir alertas en su empresa.',
      'Incluye: videovigilancia IP, alarmas, control de acceso, cercos y monitoreo.',
      'Para quién: oficinas, comercios, clínicas, bodegas, plantas y residenciales.',
      'Diferencia: cámaras en una red segmentada y protegida, no expuestas a internet.',
      'Primer paso: visita de asesoría para levantar accesos y puntos ciegos.',
    ],
    image: 'camaras-videovigilancia',
    imageAlt: 'Dos cámaras de videovigilancia tipo bala montadas en un muro de concreto',
    image2: 'equipo-oficina-escritorios',
    image2Alt: 'Oficina amplia con personas trabajando en sus escritorios frente a computadoras',
    cta: 'Solicitar visita de asesoría',
    formValue: 'Seguridad electrónica',
    risks: [
      { icon: 'Eye', title: 'Puntos ciegos', text: 'Accesos, estacionamientos o almacenes sin cobertura donde nadie ve lo que pasa.' },
      { icon: 'KeyRound', title: 'Llaves compartidas', text: 'Sin registro de quién entró, a qué área y a qué hora.' },
      { icon: 'TriangleAlert', title: 'Cámaras expuestas', text: 'Grabadores con contraseña de fábrica y abiertos a internet: un riesgo de ciberseguridad.' },
    ],
    includes: [
      { icon: 'Cctv', title: 'Videovigilancia IP', text: 'Cámaras de alta definición, grabación y visualización desde el celular.' },
      { icon: 'BellRing', title: 'Alarmas', text: 'Sensores de intrusión, botones de pánico y avisos a su celular.' },
      { icon: 'IdCard', title: 'Control de acceso', text: 'Acceso con tarjeta, huella o código por persona, área y horario.' },
      { icon: 'Fence', title: 'Cercos eléctricos', text: 'Protección perimetral disuasiva con energizador y señalización.' },
      { icon: 'Activity', title: 'Monitoreo inteligente', text: 'Alertas, revisión de eventos y reportes de accesos.' },
      { icon: 'ShieldCheck', title: 'Integración segura', text: 'Cámaras y controles en una red separada, con acceso remoto cifrado.' },
    ],
    comparison: {
      caption: 'Tipos de instalación de seguridad electrónica según el sector',
      head: ['Sector', 'Riesgo principal', 'Instalación recomendada'],
      rows: [
        ['Oficinas', 'Acceso de personas no autorizadas', 'Control de acceso por tarjeta y cámaras en accesos'],
        ['Comercios', 'Robo hormiga y asaltos', 'Videovigilancia en cajas, alarmas y botón de pánico'],
        ['Clínicas', 'Zonas restringidas y farmacia', 'Control de acceso por área y registro de entradas'],
        ['Bodegas y plantas', 'Intrusión perimetral y robo', 'Cercos, alarmas perimetrales y cámaras con visión nocturna'],
        ['Residenciales', 'Accesos vehiculares', 'Control de acceso vehicular y cámaras de lectura de placas'],
      ],
    },
    scenarios: [
      { icon: 'Store', title: 'Comercios', text: 'Cámaras en cajas y accesos, alarmas y botón de pánico.' },
      { icon: 'Hospital', title: 'Clínicas', text: 'Control de acceso a farmacia, archivo y áreas restringidas.' },
      { icon: 'Warehouse', title: 'Bodegas y plantas', text: 'Protección perimetral, cercos y cámaras nocturnas.' },
    ],
    benefits: [
      { title: 'Evidencia y control', text: 'Grabación clara y registro de quién entra a cada área.' },
      { title: 'Prevención', text: 'Las cámaras y cercos visibles disuaden intentos de robo.' },
      { title: 'Desde su celular', text: 'Vea cámaras y reciba alertas donde esté, de forma segura.' },
      { title: 'Todo integrado', text: 'Un solo proveedor para seguridad física, red y ciberseguridad.' },
    ],
    process: [
      { title: 'Visita de asesoría', text: 'Recorremos el sitio y detectamos accesos, puntos ciegos y riesgos.' },
      { title: 'Propuesta', text: 'Equipos, ubicación de cada dispositivo, tiempos y costo cerrado.' },
      { title: 'Instalación', text: 'Montaje, cableado, configuración y pruebas de cada sistema.' },
      { title: 'Capacitación y monitoreo', text: 'Le enseñamos a usarlo y damos seguimiento a eventos y mantenimiento.' },
    ],
    faqs: [
      { q: '¿Puedo ver las cámaras desde mi celular?', a: 'Sí. Configuramos la visualización remota con acceso cifrado y contraseñas propias, sin dejar el grabador expuesto a internet.' },
      { q: '¿Qué control de acceso me conviene: tarjeta, huella o código?', a: 'Depende del número de personas y del nivel de seguridad. La tarjeta es práctica para oficinas; la huella evita préstamos de credenciales; el código sirve para accesos secundarios. En la visita le recomendamos la mejor opción.' },
      { q: '¿Instalan cercos eléctricos?', a: 'Sí, con energizador, señalización y conexión a alarma, cumpliendo las recomendaciones de seguridad para su instalación.' },
      { q: '¿Las cámaras afectan la velocidad de mi red?', a: 'No si se diseñan bien. Las conectamos a una red separada (VLAN) con capacidad suficiente para que no compitan con la operación.' },
      { q: '¿Qué pasa en la visita de asesoría?', a: 'Recorremos sus instalaciones, identificamos accesos, puntos ciegos y riesgos, y después le entregamos una propuesta por escrito con equipos, ubicación y costos.' },
    ],
  },
];

export const getService = (slug: string) => {
  const s = services.find((x) => x.slug === slug);
  if (!s) throw new Error(`Servicio no encontrado: ${slug}`);
  return s;
};

// Servicios que en esta fase solo se mencionan en el home (sin página propia).
export const mentionOnly = [
  { name: 'Cableado estructurado', text: 'Instalaciones profesionales con materiales de alta calidad para máxima velocidad, estabilidad y escalabilidad, y para prevenir incendios por cortocircuito o sobrecalentamiento.' },
  { name: 'Fibra óptica', text: 'Instalación profesional de fibra óptica para enlaces de alta velocidad y desempeño óptimo a largo plazo.' },
];
