export const site = {
  name: "SerPro Technology",
  tagline: "Soluciones tecnológicas empresariales",
  phone: "5722-7118",
  phoneTel: "50257227118",
  whatsappNumber: "50257227118",
  whatsapp:
    "https://wa.me/50257227118?text=Hola%20SerPro%20Technology%2C%20me%20interesa%20conocer%20sus%20servicios",
  whatsappPos:
    "https://wa.me/50257227118?text=Hola%20SerPro%20Technology%2C%20quiero%20información%20sobre%20sistemas%20de%20punto%20de%20venta",
  facebook: "https://www.facebook.com/profile.php?id=61581072575279",
  footer: "Soluciones tecnológicas profesionales para empresas en Guatemala.",
} as const;

export const nav = [
  { href: "#servicios", label: "Servicios" },
  { href: "#punto-de-venta", label: "Punto de Venta" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#contacto", label: "Contacto" },
] as const;

export const hero = {
  title: "Infraestructura confiable para empresas que exigen",
  highlight: "resultados",
  description:
    "SerPro Technology diseña, instala y mantiene sistemas de seguridad, conectividad, soporte técnico y punto de venta para organizaciones que necesitan operar con continuidad y control.",
} as const;

export const stats = [
  { value: "8+", label: "Años de experiencia" },
  { value: "100+", label: "Proyectos implementados" },
  { value: "24/7", label: "Soporte técnico" },
  { value: "100%", label: "Compromiso garantizado" },
] as const;

export const brands = {
  title: "Marcas que instalamos y damos soporte",
  description:
    "Equipos originales adquiridos a través de distribuidores mayoristas autorizados en Guatemala. Las marcas mencionadas son propiedad de sus respectivos titulares.",
  names: [
    "Hikvision",
    "Dahua",
    "HiLook",
    "IMOU",
    "Ezviz",
    "Ajax",
    "Avigilon",
    "ZKTeco",
    "Yale",
    "Sprywire",
    "Yonusa",
    "TP-Link",
    "Ubiquiti",
    "MikroTik",
    "Starlink",
    "Cambium",
    "Belden",
    "Mimosa",
    "Yealink",
    "Fanvil",
    "Honeywell",
    "Bosch",
    "Sonoff",
    "Vertiv",
    "Epson",
    "Zebra",
    "HP",
    "Dell",
    "Lenovo",
  ],
} as const;

export const brandRows = [
  brands.names.slice(0, 10),
  brands.names.slice(10, 20),
  brands.names.slice(20),
] as const;

export const pos = {
  label: "Nuevo servicio",
  title: "Sistemas de punto de venta para modernizar su comercio",
  description:
    "Implementamos soluciones POS completas que optimizan ventas, inventario y toma de decisiones. Ideal para retail, restaurantes, farmacias, ferreterías y negocios en crecimiento.",
  bullets: [
    "Hardware y software integrados",
    "Lectores de código de barras e impresoras térmicas",
    "Integración con cajón de dinero y terminal de pago",
    "Respaldo de información y soporte técnico local",
  ],
  features: [
    {
      title: "Control de inventario en tiempo real",
      description:
        "Registre entradas, salidas y existencias con precisión desde cualquier terminal.",
    },
    {
      title: "Facturación y comprobantes",
      description:
        "Emisión de tickets, facturas y reportes fiscales adaptados a su operación comercial.",
    },
    {
      title: "Reportes de ventas y rentabilidad",
      description:
        "Analice desempeño por producto, cajero, sucursal y periodo con dashboards claros.",
    },
    {
      title: "Multiusuario y permisos",
      description: "Defina roles, accesos y auditoría para equipos de distintos tamaños.",
    },
    {
      title: "Multi-sucursal",
      description: "Centralice la información de varias tiendas en una sola plataforma.",
    },
    {
      title: "Capacitación e implementación",
      description: "Instalación, configuración y entrenamiento para su equipo de trabajo.",
    },
  ],
} as const;

export const services = {
  label: "Portafolio de servicios",
  title: "Soluciones integrales para cada área de su operación",
  description:
    "Desde la protección de activos hasta la conectividad y el soporte técnico, acompañamos el ciclo completo de su infraestructura tecnológica.",
  groups: [
    {
      title: "Seguridad electrónica",
      description: "Protección integral para hogares, comercios e industria.",
      items: [
        { title: "Videovigilancia", description: "Cámaras análogas, IP, solares 4G y WiFi." },
        { title: "Alarmas de movimiento", description: "Detección y notificaciones en tiempo real." },
        { title: "Detectores de humo", description: "Sensores certificados contra incendios." },
        { title: "Videoporteros", description: "Control de accesos inteligente." },
      ],
    },
    {
      title: "Infraestructura y conectividad",
      description: "Redes confiables para operaciones sin interrupciones.",
      items: [
        { title: "Cableado estructurado", description: "Redes LAN y datos con estándares profesionales." },
        { title: "Internet satelital Starlink", description: "Instalación y configuración especializada." },
      ],
    },
    {
      title: "Soporte y equipamiento",
      description: "Mantenimiento, reparación y suministro de tecnología.",
      items: [
        { title: "Reparación de computadoras", description: "Diagnóstico y servicio para todas las marcas." },
        { title: "Reparación de impresoras", description: "Impresoras y equipos multifuncionales." },
        { title: "Mantenimiento preventivo", description: "Planes programados para equipos y sistemas." },
        { title: "Repuestos y accesorios", description: "Componentes y equipos originales." },
        { title: "Soporte técnico especializado", description: "Acompañamiento continuo con garantía." },
      ],
    },
  ],
} as const;

export const projects = {
  label: "Portafolio",
  title: "Proyectos realizados",
  description:
    "Instalaciones profesionales en comercios, oficinas, industria y hogares a nivel nacional.",
  items: [
    {
      title: "Sistema de videovigilancia IP",
      category: "Seguridad",
      location: "Comercio — Ciudad de Guatemala",
      image: "/projects/videovigilancia.jpg",
    },
    {
      title: "Cableado estructurado de red",
      category: "Infraestructura",
      location: "Oficinas corporativas",
      image: "/projects/cableado.jpg",
    },
    {
      title: "Implementación POS",
      category: "Punto de venta",
      location: "Retail — Guatemala",
      image: "/projects/pos.jpg",
    },
    {
      title: "Instalación Starlink",
      category: "Conectividad",
      location: "Zona rural — Cobertura nacional",
      image: "/projects/starlink.jpg",
    },
    {
      title: "Alarmas y sensores",
      category: "Seguridad",
      location: "Residencial",
      image: "/projects/alarmas.jpg",
    },
    {
      title: "Soporte y mantenimiento",
      category: "Soporte técnico",
      location: "Empresas varias",
      image: "/projects/soporte.jpg",
    },
  ],
} as const;

export const testimonials = {
  label: "Testimonios",
  title: "Lo que dicen nuestros clientes",
  description:
    "Empresas de distintos sectores confían en SerPro Technology para sus proyectos tecnológicos.",
  items: [
    {
      name: "Carlos Méndez",
      business: "Farmacia San Rafael",
      service: "Sistema de punto de venta",
      quote:
        "Implementaron nuestro POS en menos de una semana. El inventario quedó organizado y el equipo aprendió rápido con la capacitación incluida.",
    },
    {
      name: "María López",
      business: "Distribuidora La Central",
      service: "Videovigilancia IP",
      quote:
        "Instalaron 12 cámaras con acceso remoto desde el celular. Trabajo limpio, profesional y con garantía. Muy recomendados.",
    },
    {
      name: "Roberto García",
      business: "Restaurante El Buen Sabor",
      service: "Cableado estructurado",
      quote:
        "Renovaron toda nuestra red interna. Desde entonces no hemos tenido caídas de internet en el local. Excelente servicio postventa.",
    },
    {
      name: "Ana Villagrán",
      business: "Oficinas Corporativas MG",
      service: "Internet Starlink",
      quote:
        "Necesitábamos conectividad estable en zona sin fibra óptica. SerPro nos instaló Starlink y quedó funcionando perfectamente.",
    },
  ],
} as const;

export const about = {
  label: "Quiénes somos",
  title: "Experiencia técnica con enfoque empresarial",
  paragraphs: [
    "SerPro Technology es una firma guatemalteca especializada en implementación de tecnología para empresas. Combinamos ingeniería de campo, equipos certificados y atención personalizada para entregar proyectos sólidos, medibles y sostenibles.",
    "Nuestro compromiso es ser un aliado estratégico: no solo instalamos equipos, sino que aseguramos que cada solución funcione correctamente dentro de su operación diaria.",
  ],
  values: [
    "Personal técnico certificado",
    "Proyectos llave en mano",
    "Garantía en instalación y equipos",
    "Asesoría comercial sin costo",
    "Cobertura a nivel nacional",
  ],
  highlight: {
    title: "Respuesta ágil",
    description: "Atención comercial y soporte técnico cuando lo necesite.",
  },
} as const;

export const process = {
  label: "Metodología de trabajo",
  title: "Un proceso claro, de principio a fin",
  description:
    "Cada proyecto sigue una metodología estructurada que reduce riesgos, optimiza tiempos y garantiza resultados alineados a sus objetivos.",
  steps: [
    { step: "01", title: "Diagnóstico", description: "Evaluamos su entorno, necesidades operativas y objetivos del proyecto." },
    { step: "02", title: "Propuesta técnica", description: "Presentamos una solución estructurada con alcance, tiempos y presupuesto." },
    { step: "03", title: "Implementación", description: "Ejecutamos con personal certificado, equipos de calidad y pruebas de validación." },
    { step: "04", title: "Soporte continuo", description: "Brindamos mantenimiento, capacitación y atención postventa permanente." },
  ],
} as const;

export const contact = {
  label: "Contacto",
  title: "Conversemos sobre su próximo proyecto",
  description:
    "Complete el formulario o contáctenos directamente. Atendemos consultas sobre seguridad, redes, soporte técnico y sistemas de punto de venta.",
  formNote:
    "Al enviar, se abrirá WhatsApp con su mensaje prellenado. Responderemos a la brevedad.",
  serviceOptions: [
    "Sistema de punto de venta (POS)",
    "Videovigilancia y cámaras",
    "Alarmas y seguridad",
    "Cableado estructurado",
    "Internet Starlink",
    "Reparación de equipos",
    "Mantenimiento preventivo",
    "Otro servicio",
  ],
} as const;
