import { tr, type T } from "@/lib/i18n";
import { ORGS } from "./orgs";

/*
 * Home copy, English + Spanish.
 * Markup inside strings:  **bold**   [[still to write]] (shows the orange dashed marker)
 */

export const nav = {
  work: tr("work", "proyectos"),
  contact: tr("contact", "contacto"),
  home: tr("Go to home", "Ir al inicio"),
  allWork: tr("← All work", "← Todos los proyectos"),
};

export const hero = {
  hi: tr("Product Designer at", "Product Designer en"),
  title: tr("Camilo Bermeo", "Camilo Bermeo"),
  body: tr(
    "3 years in design and front-end. Today I design and build the Banks module experience: bank connections, reconciliation, wallets, gateways and payment links.",
    "3 años de experiencia en diseño y front-end. Hoy diseño y desarrollo la experiencia del módulo de Bancos: conexiones bancarias, conciliación, billeteras, pasarelas y links de pago.",
  ),
  email: tr("Email me", "Escríbeme"),
  seeWork: tr("See work", "Ver proyectos"),
};

export const work = {
  title: tr("Selected work", "Proyectos destacados"),
  count: tr("04 cases · web + mobile", "04 casos · web + móvil"),
  cta: tr("View case", "Ver caso"),
};

export const about = {
  title: tr("About", "Sobre mí"),
  lead: tr(
    "Product Designer with a front-end background. I combine research, technical fluency and AI prototyping to find insights, propose solutions and test them in production.",
    "Product Designer con background en front-end. Combino research, fluidez técnica y prototipado con IA para identificar insights, proponer soluciones y testearlas en producción.",
  ),
  /* the logos between the names are added by the component */
  beforeLead: tr("Before", "Antes de"),
  beforePre: tr(", I built interfaces at", ", desarrollé interfaces en"),
  beforeAnd: tr("and", "y"),
  beforePost: tr(
    ", where I learned to build what I design and to work with multicultural teams.",
    ", donde aprendí a desarrollar lo que diseño y a trabajar con equipos multiculturales.",
  ),
  mapAlt: tr("Map of Bogotá centred on where I work", "Mapa de Bogotá centrado en donde trabajo"),
  github: {
    perDay: tr("1 square = 1 day", "1 cuadro = 1 día"),
    less: tr("Less", "Menos"),
    more: tr("More", "Más"),
    total: tr("contributions in the last year", "contribuciones en el último año"),
    live: tr("Live", "En vivo"),
    loading: tr("Loading contributions…", "Cargando contribuciones…"),
    error: tr("Couldn't load contributions right now.", "No se pudieron cargar las contribuciones."),
    aria: tr("GitHub contributions over the last year", "Contribuciones en GitHub del último año"),
    days: [tr("Mon", "Lun"), tr("Wed", "Mié"), tr("Fri", "Vie")],
    months: tr("Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec", "Ene Feb Mar Abr May Jun Jul Ago Sep Oct Nov Dic"),
  },
  toolsTitle: tr("What I build with", "Con qué construyo"),
  /* `logo`: a file in public/images/logos; `icon`: a built-in icon (src/components/Icons.tsx) */
  tools: [
    { name: "Figma", logo: "/images/logos/Figma.svg", role: tr("design", "diseño") },
    { name: "React", icon: "react", role: tr("code", "código") },
    { name: "Claude Code", logo: "/images/logos/Claude.svg", role: tr("AI coding", "código con IA") },
    { name: "Next.js", icon: "code", role: tr("framework", "framework") },
    { name: "TypeScript", icon: "code", role: tr("code", "código") },
    { name: "Heatmaps", icon: "heatmap", role: tr("research", "investigación") },
    { name: "Amplitude", logo: "/images/logos/Amplitude.svg", role: tr("analytics", "analítica") },
    { name: "Linear", logo: "/images/logos/Linear.svg", role: tr("planning", "planeación") },
  ] as { name: string; role: T; logo?: string; icon?: string }[],
};

export const trajectory = {
  title: tr("Trajectory", "Trayectoria"),
  total: tr("3 years of experience", "3 años de experiencia"),
  current: {
    years: tr("Apr 2025 → now", "Abr 2025 → hoy"),
    role: tr("Product Designer", "Product Designer"),
    org: ORGS.alegra.name,
    body: tr(
      "I find insights and improve the user experience of Alegra's Banks module: user interviews, business metrics analysis, flow design and front-end development.",
      "Identifico insights y mejoro la experiencia de usuario del módulo de Bancos de Alegra: entrevistas a usuarios, análisis de métricas del negocio, diseño de flujos y desarrollo front-end.",
    ),
    badge: tr("Current role", "Rol actual"),
  },
  past: [
    {
      year: tr("May → Dec 2024", "May → dic 2024"),
      org: ORGS.bees.name,
      logo: ORGS.bees.logo,
      body: tr(
        "Responsible for designing and building interactive apps and websites for Colombian and international clients.",
        "Encargado de diseñar y desarrollar apps y páginas web interactivas para clientes colombianos e internacionales.",
      ),
    },
    {
      year: tr("Dec 2023 → Apr 2024", "Dic 2023 → abr 2024"),
      org: ORGS.lakuna.name,
      logo: ORGS.lakuna.logo,
      body: tr(
        "Responsible for visual design at a consultancy, later acquired by Empathy.la.",
        "Encargado del diseño visual en una consultora, que luego compró Empathy.la.",
      ),
    },
    {
      year: tr("Aug → Dec 2023", "Ago → dic 2023"),
      org: ORGS.bluepixel.name,
      logo: ORGS.bluepixel.logo,
      body: tr(
        "Responsible for the UI design of websites for clients in Latin America and abroad.",
        "Encargado del diseño UI de páginas web para clientes de América Latina e internacionales.",
      ),
    },
  ],
  education: {
    year: "2018",
    logo: ORGS.icesi.logo,
    title: tr("Interactive Media Design", "Diseño de Medios Interactivos"),
    body: tr("Universidad Icesi. Where design and code first met.", "Universidad Icesi. Donde el diseño y el código se encontraron por primera vez."),
  },
};

export const contact = {
  label: tr("Contact", "Contacto"),
  title: tr("Let's work together.", "Trabajemos juntos."),
  cv: tr("Download CV", "Descargar CV"),
  footer: tr("© 2026 · Made by Camilo Bermeo and Claude", "© 2026 · Hecho por Camilo Bermeo y Claude"),
};
