import { site } from "@/content/landing";

export const legalMeta = {
  lastUpdated: "28 de agosto de 2026",
  domain: "serprotechno.com",
  company: site.name,
  country: "Guatemala",
} as const;

export const legalLinks = [
  { href: "/politica-de-privacidad", label: "Política de privacidad" },
  { href: "/aviso-de-cookies", label: "Aviso de cookies" },
  { href: "/terminos-y-condiciones", label: "Términos y condiciones" },
] as const;

export type LegalSection = {
  title: string;
  paragraphs: string[];
  list?: string[];
};

export type LegalDocument = {
  slug: string;
  title: string;
  summary: string;
  sections: LegalSection[];
};

export const privacyPolicy: LegalDocument = {
  slug: "politica-de-privacidad",
  title: "Política de privacidad",
  summary:
    "En SerPro Technology respetamos su privacidad. Este documento explica qué datos recopilamos, para qué los usamos y cómo puede ejercer sus derechos.",
  sections: [
    {
      title: "1. Responsable del tratamiento",
      paragraphs: [
        `${legalMeta.company} es responsable del tratamiento de los datos personales que usted nos proporcione a través de nuestro sitio web ${legalMeta.domain}, WhatsApp, teléfono, Facebook u otros medios de contacto.`,
        `Operamos desde ${legalMeta.country} y atendemos consultas comerciales relacionadas con instalaciones tecnológicas, seguridad, redes, soporte y sistemas de punto de venta.`,
      ],
    },
    {
      title: "2. Datos que recopilamos",
      paragraphs: ["Podemos tratar las siguientes categorías de datos, según el canal que utilice:"],
      list: [
        "Datos de identificación y contacto: nombre, teléfono y mensaje enviado mediante el formulario de consulta.",
        "Datos de navegación técnicos: dirección IP, tipo de navegador, páginas visitadas y cookies estrictamente necesarias para el funcionamiento y seguridad del sitio.",
        "Datos derivados de comunicaciones: contenido de mensajes enviados por WhatsApp, llamadas telefónicas o redes sociales cuando usted nos contacta voluntariamente.",
      ],
    },
    {
      title: "3. Finalidad del tratamiento",
      paragraphs: ["Utilizamos sus datos personales únicamente para fines legítimos y vinculados a nuestra actividad:"],
      list: [
        "Responder solicitudes de información, cotizaciones y soporte.",
        "Coordinar visitas, instalaciones y seguimiento comercial.",
        "Mantener la seguridad, disponibilidad y correcto funcionamiento del sitio web.",
        "Cumplir obligaciones legales aplicables en la medida que correspondan.",
      ],
    },
    {
      title: "4. Base y conservación",
      paragraphs: [
        "El tratamiento se basa en su consentimiento al contactarnos, en la ejecución de medidas precontractuales o contractuales, y en nuestro interés legítimo de atender consultas comerciales.",
        "Conservamos los datos el tiempo necesario para atender su solicitud, dar seguimiento comercial razonable o cumplir plazos legales. Cuando dejen de ser necesarios, procuramos eliminarlos o anonimizarlos.",
      ],
    },
    {
      title: "5. Formulario de contacto y WhatsApp",
      paragraphs: [
        "El formulario de esta página no almacena datos en nuestros servidores: al enviar, se abre WhatsApp con la información que usted escribió. A partir de ese momento, el tratamiento ocurre en la plataforma de WhatsApp/Meta y en nuestros canales internos de atención.",
        "Le recomendamos no incluir información sensible (datos bancarios, contraseñas, historiales médicos, etc.) salvo que sea estrictamente necesario para su consulta.",
      ],
    },
    {
      title: "6. Cesión y transferencia",
      paragraphs: [
        "No vendemos ni alquilamos datos personales. Podemos compartir información limitada con proveedores que nos ayudan a operar el sitio o brindar servicios (por ejemplo, hosting, seguridad perimetral o mensajería), siempre bajo obligaciones de confidencialidad.",
        "Al usar WhatsApp, Facebook u otros servicios de terceros, sus datos quedan también sujetos a las políticas de esas plataformas.",
      ],
    },
    {
      title: "7. Seguridad",
      paragraphs: [
        "Aplicamos medidas técnicas y organizativas razonables para proteger la información contra acceso no autorizado, pérdida o uso indebido. Ningún sistema en internet es 100 % infalible; por ello le pedimos usar canales seguros cuando comparta datos.",
      ],
    },
    {
      title: "8. Sus derechos",
      paragraphs: [
        "Usted puede solicitar acceso, rectificación, actualización o eliminación de sus datos, así como oponerse a ciertos tratamientos cuando la ley aplicable lo permita.",
        `Para ejercer estos derechos, contáctenos al PBX ${site.phone}, por WhatsApp al +502 ${site.phone} o mediante nuestros canales publicados en el sitio. Responderemos en un plazo razonable.`,
      ],
    },
    {
      title: "9. Cambios",
      paragraphs: [
        `Podemos actualizar esta política para reflejar cambios legales o de nuestros servicios. Publicaremos la versión vigente en ${legalMeta.domain} e indicaremos la fecha de última actualización.`,
      ],
    },
  ],
};

export const cookiePolicy: LegalDocument = {
  slug: "aviso-de-cookies",
  title: "Aviso de cookies",
  summary:
    "Este sitio utiliza cookies y tecnologías similares para funcionar de forma segura y recordar sus preferencias de navegación.",
  sections: [
    {
      title: "1. ¿Qué son las cookies?",
      paragraphs: [
        "Las cookies son pequeños archivos de texto que un sitio web guarda en su navegador. Permiten recordar preferencias, mantener sesiones técnicas o ayudar a proteger el sitio contra abusos.",
      ],
    },
    {
      title: "2. Cookies que utilizamos",
      paragraphs: ["En la versión actual de nuestro sitio utilizamos principalmente:"],
      list: [
        "Cookies técnicas y de seguridad: necesarias para la entrega del sitio, protección contra bots y tráfico malicioso (por ejemplo, cookies de Cloudflare como __cf_bm).",
        "Preferencia de consentimiento: guardamos en su navegador (localStorage) si aceptó este aviso, para no mostrarlo en cada visita.",
      ],
    },
    {
      title: "3. Cookies de terceros",
      paragraphs: [
        "Si accede a WhatsApp, Facebook u otros enlaces externos desde nuestro sitio, esas plataformas pueden instalar sus propias cookies conforme a sus políticas. SerPro Technology no controla directamente esas cookies.",
        "Actualmente no utilizamos cookies de publicidad personalizada ni herramientas de analítica de marketing en este sitio. Si esto cambia, actualizaremos este aviso.",
      ],
    },
    {
      title: "4. Cómo gestionar o rechazar cookies",
      paragraphs: [
        "Puede configurar su navegador para bloquear o eliminar cookies. Tenga en cuenta que desactivar cookies técnicas puede afectar el funcionamiento o la seguridad del sitio.",
        "Al hacer clic en “Aceptar” en el banner de cookies, usted consiente el uso de cookies descritas en este documento. Puede retirar su consentimiento eliminando cookies y datos del sitio desde la configuración de su navegador.",
      ],
    },
    {
      title: "5. Más información",
      paragraphs: [
        "Para dudas sobre privacidad o cookies, consulte también nuestra Política de privacidad o contáctenos por los medios publicados en el sitio.",
      ],
    },
  ],
};

export const termsAndConditions: LegalDocument = {
  slug: "terminos-y-condiciones",
  title: "Términos y condiciones",
  summary:
    "Al utilizar el sitio web de SerPro Technology usted acepta estas condiciones de uso. Léalas antes de solicitar información o servicios.",
  sections: [
    {
      title: "1. Objeto",
      paragraphs: [
        `Estos términos regulan el acceso y uso del sitio ${legalMeta.domain}, operado por ${legalMeta.company}. El sitio tiene fines informativos y comerciales: presentar servicios, proyectos y canales de contacto.`,
      ],
    },
    {
      title: "2. Uso permitido",
      paragraphs: ["Usted se compromete a utilizar el sitio de forma lícita y respetuosa. Queda prohibido:"],
      list: [
        "Intentar acceder sin autorización a sistemas, datos o áreas restringidas.",
        "Introducir malware, realizar scraping abusivo o interferir con la disponibilidad del sitio.",
        "Utilizar el contenido con fines ilícitos o que vulneren derechos de terceros.",
      ],
    },
    {
      title: "3. Información y cotizaciones",
      paragraphs: [
        "La información publicada (precios orientativos, descripciones, imágenes de proyectos, marcas, etc.) es referencial y puede cambiar sin previo aviso.",
        "Las cotizaciones formales, plazos, garantías y alcances de trabajo se confirman por escrito o por acuerdo comercial directo, no únicamente por el contenido de esta página.",
      ],
    },
    {
      title: "4. Propiedad intelectual",
      paragraphs: [
        "El diseño, textos, logotipos, imágenes y demás contenidos del sitio son propiedad de SerPro Technology o se usan con autorización. Las marcas de terceros mencionadas pertenecen a sus respectivos titulares.",
        "No está permitida la reproducción, distribución o modificación del contenido sin autorización previa por escrito, salvo uso personal y no comercial.",
      ],
    },
    {
      title: "5. Enlaces externos",
      paragraphs: [
        "El sitio puede incluir enlaces a WhatsApp, Facebook u otros sitios. No somos responsables del contenido, políticas o prácticas de sitios de terceros.",
      ],
    },
    {
      title: "6. Limitación de responsabilidad",
      paragraphs: [
        "Procuramos mantener el sitio disponible y actualizado, pero no garantizamos ausencia total de errores, interrupciones o inexactitudes.",
        `${legalMeta.company} no será responsable por daños indirectos derivados del uso del sitio, salvo disposición legal imperativa en contrario.`,
      ],
    },
    {
      title: "7. Protección de datos",
      paragraphs: [
        "El tratamiento de datos personales se rige por nuestra Política de privacidad y, cuando aplique, por el Aviso de cookies.",
      ],
    },
    {
      title: "8. Ley aplicable",
      paragraphs: [
        `Estos términos se interpretan conforme a las leyes de ${legalMeta.country}, sin perjuicio de normas imperativas que resulten aplicables.`,
      ],
    },
    {
      title: "9. Contacto",
      paragraphs: [
        `Para consultas sobre estos términos: PBX ${site.phone}, WhatsApp +502 ${site.phone} o los canales indicados en la sección de contacto del sitio.`,
      ],
    },
  ],
};

export const legalDocuments = {
  privacy: privacyPolicy,
  cookies: cookiePolicy,
  terms: termsAndConditions,
} as const;
