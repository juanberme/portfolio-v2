import { tr, type T } from "@/lib/i18n";
import type { AsciiMode } from "@/lib/ascii-engine";
import { ORGS } from "./orgs";
import { COLOR } from "@/lib/tokens";

/*
 * The four case studies, English + Spanish.
 *
 * Every case uses the same template (the Concept Grouping page from the canvas).
 * Markup inside strings:  **bold**   [[still to write]] (shows the orange dashed marker)
 *
 * Source: the case pages of the previous portfolio (Camilo-Bermeo/src/i18n/*.js), checked for
 * contradictions. Spanish copy is taken from that site wherever it existed.
 */

export interface Shot {
  src: string;
  w: number;
  h: number;
  alt: T;
}

export type Block =
  | { type: "p"; text: T }
  | { type: "figure"; shot: Shot; caption: T }
  | { type: "pair"; items: { shot: Shot; caption: T }[] }
  /** before/after of the same screen, with a slider between them */
  | { type: "compare"; before: { shot: Shot; caption: T }; after: { shot: Shot; caption: T } }
  | { type: "quote"; text: T; source?: T }
  | { type: "list"; items: T[] }
  | { type: "metric"; value: string | T; label: T }
  /** `qr`: an image of a QR code for the same link, shown on large screens so people can open it on a phone */
  | { type: "link"; href: string; label: T; qr?: string }
  /** colour chips: each one is filled with its colour */
  | { type: "swatches"; items: { hex: string; name: T }[] }
  /** type specimens, each set in its own typeface (`css` is the font-family) */
  | { type: "typefaces"; items: { name: string; css: string; weights: string; sample: string }[] }
  /** a call to action to try the live work: a coloured card with a screen, a primary button and an optional QR */
  | { type: "tryit"; kicker: T; title: T; body: T; href: string; cta: T; qr?: string; shot: Shot; tone: { bg: string; ink: string; fg: string } };

export interface Section {
  label: T;
  title: T;
  body: Block[];
}

export interface Case {
  slug: string;
  num: string;
  title: T;
  org: T;
  /** small logo shown in the cover tag, if any */
  orgLogo?: string;
  year: string;
  platform: "Web" | "Mobile";
  topic: T;
  /** the slab on the home page */
  slab: { bg: string; ink: string; ascii: { mode: AsciiMode; fg: string } };
  summary: T;
  metric?: { value: string | T; label: T };
  /** two screens: the main one and the one that overlaps it */
  shots: [Shot, Shot];
  /** the cover of the case page */
  cover:
    | { kind: "web"; shot: Shot; crop: { left: string; top: string; width: string } }
    | { kind: "mobile"; shots: [Shot, Shot] };
  tease: T;
  meta: { label: T; value: T }[];
  sections: Section[];
}

/* ---------- shots ---------- */

const S = {
  cgAfter: {
    src: "/images/cases/concept-grouping-suggest.webp",
    w: 1500,
    h: 1083,
    alt: tr(
      "The bank agent detects repeated charges and suggests grouping them; each concept is a chip the user can remove",
      "El agente de bancos detecta cargos repetidos y sugiere agruparlos; cada concepto es un chip que el usuario puede quitar",
    ),
  },
  cgGrouped: {
    src: "/images/cases/concept-grouping-grouped.webp",
    w: 1500,
    h: 1083,
    alt: tr(
      "After grouping: each repeated concept becomes one row marked “Grouped” with the combined total, and the agent offers Undo",
      "Después de agrupar: cada concepto repetido queda en una sola fila marcada “Agrupado” con el total acumulado, y el agente ofrece Deshacer",
    ),
  },
  cgSuggested: {
    src: "/images/cases/concept-grouping-suggested.webp",
    w: 1500,
    h: 1083,
    alt: tr(
      "Each grouped row gets a suggested payment on the Alegra side, marked with a clock until the user accepts it",
      "Cada fila agrupada recibe un pago sugerido del lado de Alegra, marcado con un reloj hasta que el usuario lo acepta",
    ),
  },
  cgBefore: {
    src: "/images/cases/concept-grouping-before.webp",
    w: 1100,
    h: 794,
    alt: tr("Before: each 4×1000 charge is its own unmatched row", "Antes: cada cargo del 4×1000 es su propia fila sin conciliar"),
  },
  bestieHome: {
    src: "/images/cases/bestie-home.webp",
    w: 443,
    h: 900,
    alt: tr("Bestie, entrepreneur side: daily lesson, today's activity and metrics", "Bestie, lado emprendedor: lección del día, actividad de hoy y métricas"),
  },
  bestieProfile: {
    src: "/images/cases/bestie-profile.webp",
    w: 443,
    h: 900,
    alt: tr("Bestie: an entrepreneur's branded profile", "Bestie: perfil de marca de un emprendimiento"),
  },
  appHome: {
    src: "/images/cases/app-redesign-home.webp",
    w: 443,
    h: 900,
    alt: tr("Alegra app prototype: home with sales and quick actions", "Prototipo de la app de Alegra: inicio con ventas y acciones rápidas"),
  },
  appInvoice: {
    src: "/images/cases/app-redesign-invoice.webp",
    w: 443,
    h: 900,
    alt: tr("Alegra app prototype: creating an invoice", "Prototipo de la app de Alegra: creación de una factura"),
  },
  atelierHome: {
    src: "/images/cases/atelier-home.webp",
    w: 1500,
    h: 1308,
    alt: tr("Atelier website home page", "Página de inicio del sitio de Atelier"),
  },
  atelierArticle: {
    src: "/images/cases/atelier-article.webp",
    w: 1100,
    h: 959,
    alt: tr("Atelier website article page", "Página de artículo del sitio de Atelier"),
  },
  spreadWorkspace: {
    src: "/images/cases/atelier-spread-workspace.webp",
    w: 1600,
    h: 1165,
    alt: tr("Spread “Workspaces for a New Era”: yellow page with the headline and a black-and-white portrait", "Spread “Workspaces for a New Era”: página amarilla con el título y un retrato en blanco y negro"),
  },
  spreadGlobal: {
    src: "/images/cases/atelier-spread-global-styles.webp",
    w: 1600,
    h: 1165,
    alt: tr("Spread “Exploring Global Styles”", "Spread “Exploring Global Styles”"),
  },
  spreadVintage: {
    src: "/images/cases/atelier-spread-vintage.webp",
    w: 1600,
    h: 1165,
    alt: tr("Spread “Vintage Fashion”", "Spread “Vintage Fashion”"),
  },
} satisfies Record<string, Shot>;

const label = (n: string, en: string, es: string) => tr(`${n} · ${en}`, `${n} · ${es}`);

/* ---------- cases ---------- */

export const CASES: Case[] = [
  /* ------------------------------------------------------------------ 01 */
  {
    slug: "concept-grouping",
    num: "01",
    title: tr("Concept Grouping", "Agrupación de conceptos"),
    org: tr("Alegra", "Alegra"),
    orgLogo: ORGS.alegra.logo,
    year: "2025",
    platform: "Web",
    topic: tr("Bank reconciliation", "Conciliación bancaria"),
    slab: { bg: COLOR.blue, ink: COLOR.ink, ascii: { mode: "drift", fg: COLOR.asciiBlue } },
    summary: tr(
      "Adoption of automatic bank reconciliation was stuck at 6%. User interviews showed us why.",
      "La adopción de la conciliación bancaria automática estaba estancada en un 6%. Gracias a entrevistas con usuarios identificamos el porqué.",
    ),
    metric: { value: "6% → 25%", label: tr("increase in automatic reconciliation adoption", "aumento de la adopción de la conciliación automática") },
    shots: [S.cgAfter, S.cgBefore],
    cover: { kind: "web", shot: S.cgAfter, crop: { left: "-25.42%", top: "-33.33%", width: "127.12%" } },
    tease: tr(
      "I designed and built an AI grouping for Alegra's bank reconciliation: repeated charges, like the 4×1000 tax, are matched once.",
      "Diseñé y desarrollé una agrupación con IA para la conciliación bancaria de Alegra: los cargos repetidos, como el 4×1000, se concilian una sola vez.",
    ),
    meta: [
      { label: tr("Role", "Rol"), value: tr("Product Designer · research, UX and front-end", "Product Designer · research, UX y front-end") },
      { label: tr("Team", "Equipo"), value: tr("1 PO · 2 devs · me", "1 PO · 2 devs · yo") },
      { label: tr("Timeline", "Tiempo"), value: tr("Oct → Dec 2025 (launch)", "Oct → dic 2025 (lanzamiento)") },
      { label: tr("Platform", "Plataforma"), value: tr("Web · Alegra", "Web · Alegra") },
      { label: tr("Research", "Investigación"), value: tr("5 user interviews, Amplitude", "5 entrevistas con usuarios, Amplitude") },
      { label: tr("Tools", "Herramientas"), value: tr("Figma, Amplitude, front-end code", "Figma, Amplitude, código front-end") },
    ],
    sections: [
      {
        label: label("01", "Problem", "Problema"),
        title: tr("The real problem.", "El verdadero problema."),
        body: [
          {
            type: "p",
            text: tr(
              "**My role:** I ran the user interviews and the Amplitude analysis, found the insights, defined the flow and built the front-end.",
              "**Mi rol:** hice las entrevistas con usuarios y el análisis en Amplitude, identifiqué los insights, definí el flujo y desarrollé el front-end.",
            ),
          },
          {
            type: "p",
            text: tr(
              "The team had invested in building automatic reconciliation, but adoption stayed flat at 6%. Before redesigning the interface, we interviewed users to understand what manual reconciliation was still giving them.",
              "El equipo había invertido en desarrollar la conciliación automática, pero la adopción seguía estancada en 6%. Antes de rediseñar la interfaz, entrevistamos usuarios para entender qué les seguía dando la conciliación manual.",
            ),
          },
          {
            type: "p",
            text: tr(
              "In Amplitude we found the users who had tried automatic reconciliation and gone back to manual. A recruiting team contacted them. With those who agreed we held 5 video-call interviews, transcribed with their permission. All 5 described the same workaround: in manual reconciliation they could group repeated charges.",
              "En Amplitude buscamos a los usuarios que habían probado la conciliación automática y volvieron a la manual. Un equipo de reclutamiento los contactó. Con quienes aceptaron hicimos 5 entrevistas por videollamada, transcritas con su autorización. Las 5 describieron el mismo atajo: en la conciliación manual podían agrupar los cargos repetidos.",
            ),
          },
          {
            type: "p",
            text: tr(
              "The issue was not confusion. It was speed. Repeated bank charges, like Colombia's 4×1000 tax, appeared transaction by transaction. In the manual flow, accountants could add them up and create one payment. In the automatic flow, each charge required its own payment entry.",
              "El problema no era confusión. Era velocidad. Los cargos bancarios repetidos, como el impuesto 4×1000 en Colombia, aparecían transacción por transacción. En el flujo manual, los contadores podían sumarlos y crear un solo pago. En el flujo automático, cada cargo exigía su propio registro.",
            ),
          },
          {
            type: "quote",
            text: tr(
              "I don't use automatic reconciliation because in the manual one I add up all the 4×1000 charges and create a single payment.",
              "Yo no uso la conciliación automática porque en la manual yo sumo todos los 4×1000 y creo un solo pago.",
            ),
            /* the name is a pseudonym: interviewees aren't named */
            source: tr("Andrés Ramírez · Accountant · user interview", "Andrés Ramírez · Contador · entrevista de usuario"),
          },
          {
            type: "p",
            text: tr(
              "That quote reframed the project: automatic reconciliation was not missing more explanation. It was missing the capability users had created for themselves.",
              "Esa frase replanteó el proyecto: a la conciliación automática no le faltaba más explicación. Le faltaba la capacidad que los usuarios ya habían creado por su cuenta.",
            ),
          },
          { type: "figure", shot: S.cgBefore, caption: tr("Before · each repeated charge is its own row", "Antes · cada cargo repetido es su propia fila") },
        ],
      },
      {
        label: label("02", "Data", "Datos"),
        title: tr("What the data said.", "Lo que decían los datos."),
        body: [
          {
            type: "p",
            text: tr(
              "Amplitude showed how big the gap was. Of the users who reconcile, only **6%** used automatic reconciliation; the other 94% stayed with manual, even though the team had invested in the automatic flow.",
              "Amplitude mostró el tamaño de la brecha. De los usuarios que concilian, solo el **6%** usaba la conciliación automática; el otro 94% seguía con la manual, aunque el equipo había invertido en el flujo automático.",
            ),
          },
          {
            type: "p",
            text: tr(
              "The data and the interviews pointed to the same blocker: repeated charges turned an automatic task into a repetitive one. A statement with 30 recurring charges meant 30 separate entries.",
              "Los datos y las entrevistas apuntaban al mismo bloqueo: los cargos repetidos convertían una tarea automática en una tarea repetitiva. Un estado de cuenta con 30 cargos recurrentes significaba 30 registros separados.",
            ),
          },
        ],
      },
      {
        label: label("03", "Decision", "Decisión"),
        title: tr("The hard decision.", "La decisión difícil."),
        body: [
          {
            type: "p",
            text: tr(
              "We explored two AI-supported approaches. The riskier one surfaced the recommendation proactively inside the flow, only when there was something useful to group. The safer one gave users a visible button to invoke the agent.",
              "Exploramos dos enfoques apoyados en IA. El más arriesgado mostraba la recomendación proactivamente dentro del flujo, solo cuando había algo útil que agrupar. El más seguro le daba al usuario un botón visible para invocar al agente.",
            ),
          },
          {
            type: "list",
            items: [
              tr(
                "**Option A · Proactive in-flow accordion (chosen).** The AI analyzes the movements on the bank's side, finds the ones that are alike and, inside the reconciliation flow, opens an accordion that suggests how to group them. The user confirms. It removed the extra step at the exact moment users needed help. The tradeoff was trust: it had to feel useful, contextual and easy to ignore.",
                "**Opción A · Acordeón proactivo dentro del flujo (elegida).** La IA analiza los movimientos del lado del banco, encuentra los que son similares y, dentro del flujo de conciliación, abre un acordeón que sugiere cómo agruparlos. El usuario confirma. Eliminaba el paso extra justo cuando el usuario necesitaba ayuda. El riesgo era la confianza: tenía que sentirse útil, contextual y fácil de ignorar.",
              ),
              tr(
                "**Option B · On-demand agent panel.** A button invokes the AI agent and opens a side panel with the detected charges. More control, but it depends on users noticing the button and choosing to start another action.",
                "**Opción B · Panel de agente bajo demanda.** Un botón invoca al agente de IA y abre un panel lateral con los cargos detectados. Da más control, pero depende de que el usuario note el botón y decida iniciar otra acción.",
              ),
            ],
          },
          {
            type: "p",
            text: tr(
              "We chose the proactive path because the job of the AI was not to add a new tool. It was to remove the repeated work that made automatic reconciliation more effort than manual for repeated charges.",
              "Elegimos el camino proactivo porque el trabajo de la IA no era sumar una nueva herramienta. Era eliminar la repetición que hacía que, con cargos repetidos, la conciliación automática costara más trabajo que la manual.",
            ),
          },
        ],
      },
      {
        label: label("04", "Before & after", "Antes y después"),
        title: tr("One component, no new screen.", "Un componente, ninguna pantalla nueva."),
        body: [
          {
            type: "p",
            text: tr(
              "The final design added one component to the existing flow, built with Alegra's design system. No new screen, no onboarding, and no change when there was nothing to group.",
              "El diseño final agregó un componente al flujo existente, construido con el sistema de diseño de Alegra. Sin nueva pantalla, sin onboarding y sin cambios cuando no había nada que agrupar.",
            ),
          },
          {
            type: "figure",
            shot: S.cgAfter,
            caption: tr("The suggestion · each concept is a chip the user can remove", "La sugerencia · cada concepto es un chip que el usuario puede quitar"),
          },
          {
            type: "p",
            text: tr(
              "The user decides what gets grouped. The suggested concepts appear as selected chips: if the AI suggests one that doesn't belong, the user removes it before confirming, or dismisses the suggestion. If there is nothing to group, the accordion doesn't appear.",
              "El usuario decide qué se agrupa. Los conceptos sugeridos aparecen como chips seleccionados: si la IA sugiere uno que no corresponde, el usuario lo quita antes de confirmar, o descarta la sugerencia. Si no hay nada que agrupar, el acordeón no aparece.",
            ),
          },
          {
            type: "compare",
            before: { shot: S.cgBefore, caption: tr("Before · one payment per charge", "Antes · un pago por cargo") },
            after: { shot: S.cgGrouped, caption: tr("After · one row per concept", "Después · una fila por concepto") },
          },
          {
            type: "p",
            text: tr(
              "Once confirmed, each concept's movements collapse into a single row marked “Grouped”, with the combined total; expanding it shows every transaction included. If the user changes their mind, they can undo the grouping from the same accordion.",
              "Al confirmar, los movimientos de cada concepto se colapsan en una sola fila marcada como “Agrupado”, con el total acumulado; al expandirla se ven todos los movimientos incluidos. Si el usuario se arrepiente, puede deshacer la agrupación desde el mismo acordeón.",
            ),
          },
          {
            type: "figure",
            shot: S.cgSuggested,
            caption: tr("The suggested payment · the user accepts it or not", "El pago sugerido · el usuario decide si lo acepta"),
          },
          {
            type: "p",
            text: tr(
              "Then the system suggests a payment for each grouped row, ready to match the bank movement. The user reviews it and chooses whether to accept it; when they do, the row is reconciled. The core behavior changed from “create one payment per charge” to “confirm once, the system handles the rest.”",
              "Después, el sistema le sugiere un pago para cada fila agrupada, listo para cruzar con el movimiento del banco. El usuario lo revisa y escoge si lo acepta; al aceptarlo, la fila queda conciliada. El comportamiento central cambió de “crear un pago por cargo” a “confirmar una vez, el sistema hace el resto”.",
            ),
          },
          {
            type: "p",
            text: tr(
              "I wrote the accordion's copy (“We noticed that the following charges repeat…”, “Group now”, “Undo”) with Alegra's UX writing assistant: it gave me options and I chose the ones that best explained the grouping.",
              "Escribí los textos del acordeón (“Notamos que…”, “Agrupar ahora”, “Deshacer”) con el asistente de UX writing de Alegra: me dio opciones y elegí las que mejor explicaban la agrupación.",
            ),
          },
        ],
      },
      {
        label: label("05", "Result", "Resultado"),
        title: tr("4.2× the adoption.", "4,2 veces la adopción."),
        body: [
          { type: "metric", value: "6% → 25%", label: tr("users who reconcile automatically · Amplitude · Dec 2025 → Apr 2026", "usuarios que concilian en automático · Amplitude · dic 2025 → abr 2026") },
          {
            type: "p",
            text: tr(
              "The grouping launched in December 2025, with automatic reconciliation stuck at 6%. We measure adoption as the share of users who, when reconciling, use automatic reconciliation: by April 2026 it reached 25%. The lift happened without changing the core flow, onboarding users or launching a communication push.",
              "La agrupación salió en diciembre de 2025, con la conciliación automática estancada en 6%. Medimos la adopción como el porcentaje de usuarios que, al conciliar, usan la automática: en abril de 2026 llegó al 25%. El crecimiento ocurrió sin cambiar el flujo principal, sin onboarding y sin lanzar una comunicación activa.",
            ),
          },
        ],
      },
      {
        label: label("06", "What I learned", "Qué aprendí"),
        title: tr("What I would keep doing.", "Lo que seguiría haciendo."),
        body: [
          {
            type: "list",
            items: [
              tr(
                "**Look for the workaround, not the complaint.** The quote did not describe a vague pain point. It described the exact behavior the product needed to support.",
                "**Busca lo que el usuario ya resolvió por su cuenta, no la queja.** La frase no describía un dolor vago. Describía exactamente el comportamiento que el producto necesitaba soportar.",
              ),
              tr(
                "**Make AI earn its place.** As the first AI touchpoint in the workflow, it had to be proactive only when useful and invisible the rest of the time.",
                "**Haz que la IA se gane su lugar.** Como era el primer punto de contacto con IA en el flujo, tenía que ser proactiva solo cuando fuera útil e invisible el resto del tiempo.",
              ),
            ],
          },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ 02 */
  {
    slug: "app-redesign",
    num: "02",
    title: tr("App Redesign", "Rediseño de la app"),
    org: tr("Alegra", "Alegra"),
    orgLogo: ORGS.alegra.logo,
    year: "2025",
    platform: "Mobile",
    topic: tr("Mobile app", "App móvil"),
    slab: { bg: COLOR.orange, ink: COLOR.ink, ascii: { mode: "pulse", fg: COLOR.asciiOrange } },
    summary: tr(
      "I prototyped, with AI and code, a possible simplification of the app's 4 main flows.",
      "Prototipé con IA y código una posible simplificación de los 4 flujos principales de la app.",
    ),
    shots: [S.appHome, S.appInvoice],
    cover: { kind: "mobile", shots: [S.appHome, S.appInvoice] },
    tease: tr(
      "Usage data showed where time was really lost in Alegra's most-used tasks, and shaped a prototype of the four core flows built to be tested with real users.",
      "Los datos de uso mostraron dónde se perdía realmente el tiempo en las tareas más usadas de Alegra, y dieron forma a un prototipo de los cuatro flujos principales construido para validarse con usuarios reales.",
    ),
    meta: [
      { label: tr("Role", "Rol"), value: tr("Product Designer & Frontend Developer", "Product Designer & Frontend Developer") },
      { label: tr("Team", "Equipo"), value: tr("Just me", "Solo yo") },
      { label: tr("Timeline", "Tiempo"), value: tr("2025", "2025") },
      { label: tr("Platform", "Plataforma"), value: tr("Mobile · Alegra app", "Móvil · app de Alegra") },
      { label: tr("Research", "Investigación"), value: tr("Amplitude", "Amplitude") },
      { label: tr("Tools", "Herramientas"), value: tr("Figma, Amplitude, AI-assisted code", "Figma, Amplitude, código con IA") },
    ],
    sections: [
      {
        label: label("01", "Problem", "Problema"),
        title: tr("The real problem.", "El verdadero problema."),
        body: [
          {
            type: "p",
            text: tr(
              "Alegra's app supports the everyday work of SMEs, and four creation tasks sit at the center of it. Invoices, quotes, items and contacts were the most-used features, but invoices and quotes were where users lost the most time.",
              "La app de Alegra acompaña el día a día de las pymes, y en el centro de ese trabajo hay cuatro tareas de creación. Facturas, cotizaciones, ítems y contactos eran las funcionalidades más usadas, pero facturas y cotizaciones eran donde más se demoraban los usuarios.",
            ),
          },
          {
            type: "p",
            text: tr(
              "Since these flows are so essential, I couldn't test changes directly in the live app, so I built a separate app to run exploratory tests, free from the constraints of the live product.",
              "Al ser flujos tan esenciales, no los podía probar directamente en la app en producción, así que construí una app aparte para hacer pruebas exploratorias, libres de las restricciones del producto en vivo.",
            ),
          },
        ],
      },
      {
        label: label("02", "Data", "Datos"),
        title: tr("The average told the real story.", "El promedio contaba la historia real."),
        body: [
          {
            type: "p",
            text: tr(
              "With Amplitude I measured how long users took to complete the four main flows: creating an invoice, a quote, an item and a contact.",
              "Con Amplitude medí cuánto se demoraban los usuarios en completar los cuatro flujos principales: crear una factura, una cotización, un ítem y un contacto.",
            ),
          },
          {
            type: "p",
            text: tr(
              "The cost was concentrated in invoices and quotes. Quotes had the highest median of all, about 6.3 minutes. Items and contacts were already quick, under two minutes for most users.",
              "El costo se concentraba en facturas y cotizaciones. Las cotizaciones tenían la mediana más alta de todas, unos 6,3 minutos. Ítems y contactos ya eran rápidos, menos de dos minutos para la mayoría de usuarios.",
            ),
          },
          {
            type: "metric",
            value: "~4 vs ~59 min",
            label: tr("invoices · median vs. average time to complete", "facturas · tiempo mediano vs. promedio para completar"),
          },
          {
            type: "p",
            text: tr(
              "The median alone hid the problem. Invoices took about 4 minutes at the median but about 59 on average: a long tail of users leaving them open for hours or days. The issue was abandonment, not just speed — and it piled up exactly where items and contacts are needed, inside invoices and quotes.",
              "La mediana sola escondía el problema. Las facturas tomaban unos 4 minutos en la mediana pero unos 59 en promedio: una cola larga de usuarios que las dejaban abiertas por horas o días. El problema era el abandono, no solo la lentitud — y se acumulaba justo donde se necesitan ítems y contactos, dentro de facturas y cotizaciones.",
            ),
          },
        ],
      },
      {
        label: label("03", "Approach", "Enfoque"),
        title: tr("The ideal app.", "La app ideal."),
        body: [
          {
            type: "p",
            text: tr(
              "Instead of fixing the existing screens one by one, I reimagined the four flows from scratch: an “ideal app” built on simplicity, a version I could put in front of users to learn what actually helped. Three principles guided every decision:",
              "En vez de arreglar las pantallas existentes una por una, reimaginé los cuatro flujos desde cero: una “app ideal” construida sobre la simplicidad, una versión que pudiera poner frente a los usuarios para aprender qué realmente ayudaba. Tres principios guiaron cada decisión:",
            ),
          },
          {
            type: "list",
            items: [
              tr("**Fewer steps** to reach the primary action.", "**Menos pasos** para llegar a la acción principal."),
              tr("**Smart defaults** for the fields users almost always repeat, so they type less.", "**Valores predeterminados inteligentes** en los campos que el usuario casi siempre repite, para que escriba menos."),
              tr(
                "**Connected flows**: add an item or a contact without leaving the invoice.",
                "**Flujos conectados**: agregar un ítem o un contacto sin salir de la factura.",
              ),
            ],
          },
          {
            type: "pair",
            items: [
              { shot: S.appHome, caption: tr("Prototype · home", "Prototipo · inicio") },
              { shot: S.appInvoice, caption: tr("Prototype · new invoice", "Prototipo · nueva factura") },
            ],
          },
          {
            type: "p",
            text: tr(
              "Items and contacts stayed lightweight on their own: the goal was never to slow down what was already fast, but to make it reachable from the moment it was needed.",
              "Ítems y contactos se mantuvieron livianos por su cuenta: la meta nunca fue frenar lo que ya era rápido, sino hacerlo alcanzable desde el momento en que se necesitaba.",
            ),
          },
          {
            type: "p",
            text: tr(
              "Instead of Figma, I prototyped directly in code with AI. That way it felt like the real app, and I could cover the complete flow and its edge cases without drawing every state by hand. I also defined the prototype's components.",
              "En vez de Figma, prototipé directamente en código con IA. Así se sentía como la app real, y pude cubrir el flujo completo y sus casos límite sin dibujar cada estado a mano. También definí los componentes del prototipo.",
            ),
          },
        ],
      },
      {
        label: label("04", "Where it stands", "En qué quedó"),
        title: tr("Ready to test, built on hypotheses.", "Listo para probar, construido sobre hipótesis."),
        body: [
          {
            type: "p",
            text: tr(
              "The prototype was left complete and ready for usability testing. When I joined the Banks team, I handed it to the designer who took over the project, so they could test it and move toward a redesign of the Alegra app. It is built on clear, testable hypotheses:",
              "El prototipo quedó completo y listo para pruebas de usabilidad. Cuando pasé al equipo de Bancos, se lo entregué al diseñador que tomó el proyecto, para que pudieran probarlo y avanzar hacia el rediseño de la app de Alegra. Está construido sobre hipótesis claras y comprobables:",
            ),
          },
          {
            type: "list",
            items: [
              tr(
                "**Fewer steps, less time.** Reducing the steps in each task should measurably cut the time spent on invoices, quotes, items and contacts.",
                "**Menos pasos, menos tiempo.** Reducir los pasos de cada tarea debería disminuir de forma medible el tiempo en facturas, cotizaciones, ítems y contactos.",
              ),
              tr(
                "**Connected flows reduce drop-off.** Creating an item or contact without leaving the invoice should remove the moments where users abandon it.",
                "**Flujos conectados reducen el abandono.** Crear un ítem o contacto sin salir de la factura debería eliminar los momentos donde el usuario la abandona.",
              ),
              tr(
                "**Speed drives perception.** A faster core experience should make the whole app feel more capable and modern.",
                "**La velocidad impulsa la percepción.** Una experiencia principal más rápida debería hacer que toda la app se sienta más capaz y moderna.",
              ),
            ],
          },
          {
            type: "tryit",
            kicker: tr("Try the prototype", "Prueba el prototipo"),
            title: tr("The four flows, working.", "Los cuatro flujos, funcionando."),
            body: tr(
              "Create an invoice, a quote, an item or a contact, the way I imagined it. It's built for a phone.",
              "Crea una factura, una cotización, un ítem o un contacto, como lo imaginé. Está hecho para el celular.",
            ),
            href: "https://new-mobile-app.vercel.app/",
            cta: tr("Open the prototype", "Abrir el prototipo"),
            qr: "/images/qr/app-prototype.svg",
            shot: S.appHome,
            tone: { bg: COLOR.orange, ink: COLOR.ink, fg: COLOR.asciiOrange },
          },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ 03 */
  {
    slug: "atelier",
    num: "03",
    title: tr("Atelier", "Atelier"),
    org: tr("Personal project", "Proyecto personal"),
    year: "2024",
    platform: "Web",
    topic: tr("Brand, editorial and web", "Marca, editorial y web"),
    slab: { bg: COLOR.page, ink: COLOR.ink, ascii: { mode: "drift", fg: COLOR.asciiBeige } },
    summary: tr(
      "Brand, editorial and website for a fashion magazine designed for young people.",
      "Marca, editorial y sitio web para una revista de moda pensada para jóvenes.",
    ),
    shots: [S.atelierHome, S.atelierArticle],
    cover: { kind: "web", shot: S.atelierHome, crop: { left: "0%", top: "0%", width: "100%" } },
    tease: tr(
      "A fashion and lifestyle magazine for Gen Z needed a visual identity from zero: logo, color, type, print editorial and a full web experience.",
      "Una revista de moda y lifestyle para la Gen Z necesitaba una identidad visual desde cero: logo, color, tipografía, editorial impreso y una experiencia web completa.",
    ),
    meta: [
      { label: tr("Role", "Rol"), value: tr("Brand, editorial & web design · front-end", "Diseño de marca, editorial y web · front-end") },
      { label: tr("Team", "Equipo"), value: tr("Just me", "Solo yo") },
      { label: tr("Type", "Tipo"), value: tr("Personal project", "Proyecto personal") },
      { label: tr("Year", "Año"), value: tr("2024", "2024") },
      { label: tr("Deliverables", "Entregables"), value: tr("Print · Web · Brand", "Impreso · Web · Marca") },
      { label: tr("Tools", "Herramientas"), value: tr("Figma, front-end code", "Figma, código front-end") },
    ],
    sections: [
      {
        label: label("01", "Brief", "Brief"),
        title: tr("Bold without being loud.", "Audaz sin ser ruidoso."),
        body: [
          {
            type: "p",
            text: tr(
              "The challenge: build something that feels authentically contemporary without chasing trends. Gen-Z design often overcorrects into maximalism — busy grids, clashing colors, constant motion. The decision here was the opposite: reduce the palette to three colors, commit to two typefaces and let contrast do the work.",
              "El reto: construir algo que se sienta auténticamente contemporáneo sin perseguir tendencias. El diseño Gen Z suele corregir hacia el maximalismo — grillas recargadas, colores chocantes, movimiento constante. La decisión aquí fue la contraria: reducir la paleta a tres colores, comprometerse con dos tipografías y dejar que el contraste haga el trabajo.",
            ),
          },
          { type: "quote", text: tr("Where Style Meets Your Vibe.", "Where Style Meets Your Vibe."), source: tr("Atelier · brand tagline", "Atelier · eslogan de marca") },
        ],
      },
      {
        label: label("02", "Brand system", "Sistema de marca"),
        title: tr("Three colors, two typefaces.", "Tres colores, dos tipografías."),
        body: [
          {
            type: "p",
            text: tr(
              "The system had to work across a magazine spread, a web article and a social post without modification.",
              "El sistema tenía que funcionar en un spread de revista, en un artículo web y en una publicación de redes sin modificaciones.",
            ),
          },
          {
            type: "swatches",
            items: [
              { hex: "#FFFFFF", name: tr("White · paper", "Blanco · papel") },
              { hex: "#000000", name: tr("Black · ink", "Negro · tinta") },
              { hex: "#FFEB3B", name: tr("Yellow · energy", "Amarillo · energía") },
            ],
          },
          {
            type: "p",
            text: tr(
              "Yellow was the decisive choice: unexpected in fashion, where the default is black, white and a muted third color. It says the magazine takes style seriously, but not itself.",
              "El amarillo fue la elección decisiva: inesperado en moda, donde lo habitual es negro, blanco y un tercer color apagado. Dice que la revista se toma el estilo en serio, pero no a sí misma.",
            ),
          },
          {
            type: "typefaces",
            items: [
              { name: "Playfair Display", css: "'Playfair Display', Georgia, serif", weights: "SemiBold · Bold · Bold Italic", sample: "Where Style Meets Your Vibe" },
              { name: "Raleway", css: "Raleway, 'Helvetica Neue', Arial, sans-serif", weights: "Regular · SemiBold · Bold", sample: "Fashion, lifestyle and culture for Gen Z" },
            ],
          },
          {
            type: "p",
            text: tr(
              "Playfair brings editorial authority to headings; Raleway handles UI, body copy and navigation. I chose them for the tension between a classic editorial serif and a modern geometric sans.",
              "Playfair aporta autoridad editorial a los títulos; Raleway maneja la interfaz, el texto y la navegación. Las elegí por la tensión entre una serif editorial clásica y una sans geométrica moderna.",
            ),
          },
        ],
      },
      {
        label: label("03", "Editorial design", "Diseño editorial"),
        title: tr("Three spreads to stress-test the system.", "Tres spreads para poner a prueba el sistema."),
        body: [
          {
            type: "p",
            text: tr(
              "A lifestyle article, a fashion editorial and a vintage guide. The layouts use yellow sparingly — as a background page, an accent or a typographic highlight — against black-and-white photography, which amplifies its impact when it appears. The split layout, yellow and black on one side, image and white on the other, became the signature editorial pattern.",
              "Un artículo de lifestyle, un editorial de moda y una guía vintage. Los layouts usan el amarillo con moderación — como fondo de página, acento o resaltado tipográfico — contra fotografía en blanco y negro, lo que amplifica su impacto cuando aparece. El layout dividido, amarillo y negro de un lado, imagen y blanco del otro, se convirtió en el patrón editorial característico.",
            ),
          },
          { type: "figure", shot: S.spreadWorkspace, caption: tr("Spread 01 · Workspaces for a New Era", "Spread 01 · Workspaces for a New Era") },
          { type: "figure", shot: S.spreadGlobal, caption: tr("Spread 02 · Exploring Global Styles", "Spread 02 · Exploring Global Styles") },
          { type: "figure", shot: S.spreadVintage, caption: tr("Spread 03 · Vintage Fashion", "Spread 03 · Vintage Fashion") },
        ],
      },
      {
        label: label("04", "Web design", "Diseño web"),
        title: tr("From print to an editorial website.", "Del impreso a un sitio editorial."),
        body: [
          {
            type: "p",
            text: tr(
              "I designed the site and built it myself. The same colors and typefaces carry over, but the interaction model is built for scanning and discovery, not deep reading. On the web, yellow appears only as a section indicator and hover state, never as a background.",
              "Diseñé el sitio y lo desarrollé yo mismo. Se mantienen los mismos colores y tipografías, pero el modelo de interacción está construido para escanear y descubrir, no para lectura profunda. En web, el amarillo aparece solo como indicador de sección y estado hover, nunca como fondo.",
            ),
          },
          { type: "figure", shot: S.atelierHome, caption: tr("Home", "Inicio") },
          { type: "figure", shot: S.atelierArticle, caption: tr("Article", "Artículo") },
          {
            type: "p",
            text: tr(
              "The article page keeps the print hierarchy almost entirely. The only digital concessions are the breadcrumb and section tags above the headline: orientation that web readers need and magazine readers don't.",
              "La página de artículo conserva la jerarquía del impreso casi por completo. Las únicas concesiones digitales son el breadcrumb y los tags de sección sobre el título: la orientación que el lector web necesita y el de revista no.",
            ),
          },
          {
            type: "tryit",
            kicker: tr("Website", "Sitio web"),
            title: tr("Atelier, live.", "Atelier, en vivo."),
            body: tr(
              "I designed and built the magazine's website. Browse the home page and the articles.",
              "Diseñé y desarrollé el sitio de la revista. Recorre el inicio y los artículos.",
            ),
            href: "https://atelier-one-taupe.vercel.app/",
            cta: tr("Visit Atelier", "Visitar Atelier"),
            shot: S.atelierHome,
            tone: { bg: "#FFEB3B", ink: COLOR.ink, fg: "#C9B400" },
          },
        ],
      },
      {
        label: label("05", "Learnings", "Aprendizajes"),
        title: tr("What I took from it.", "Lo que me llevé."),
        body: [
          {
            type: "list",
            items: [
              tr(
                "**Constraint produces identity.** The three-color system felt like a limitation at the start and a superpower by the end: no decision could be arbitrary.",
                "**La restricción produce identidad.** El sistema de tres colores parecía una limitación al inicio y una superpotencia al final: ninguna decisión podía ser arbitraria.",
              ),
              tr(
                "**Print and web share a language, not a layout.** Designing for both at once forced a cleaner system than designing for either alone.",
                "**Impreso y web comparten un lenguaje, no un layout.** Diseñar para ambos a la vez forzó un sistema más limpio que diseñar para cualquiera por separado.",
              ),
              tr(
                "**The accent color is the whole personality.** Making yellow the single unexpected element in an otherwise classical system is what made it a brand, not a color choice.",
                "**El color de acento es toda la personalidad.** Hacer del amarillo el único elemento inesperado en un sistema por lo demás clásico es lo que lo convirtió en una marca, no en una elección de color.",
              ),
            ],
          },
        ],
      },
    ],
  },
  /* ------------------------------------------------------------------ 04 */
  /* Source: the Bestie presentation for Bancoomeva (UX Lab ICESI, 2022), screenshots shared by Camilo. */
  {
    slug: "bestie",
    num: "04",
    title: tr("Bestie", "Bestie"),
    org: tr("Bancoomeva × UX Lab ICESI", "Bancoomeva × UX Lab ICESI"),
    orgLogo: ORGS.icesi.logo,
    year: "2022",
    platform: "Mobile",
    topic: tr("Finances for young entrepreneurs", "Finanzas para jóvenes emprendedores"),
    slab: { bg: COLOR.navy, ink: COLOR.paper, ascii: { mode: "fade", fg: COLOR.asciiNavy } },
    summary: tr(
      "Young people's ventures couldn't grow into businesses because they had no access to banking. We designed an app to manage their finances and share that record with banks to get credit.",
      "Los emprendimientos de jóvenes no lograban consolidarse como empresas porque no estaban bancarizados. Diseñamos una app para gestionar las finanzas del negocio y compartir esa información con los bancos para acceder a créditos.",
    ),
    metric: {
      value: "41%",
      label: tr("finding: cash is the most used way to pay young ventures", "hallazgo: el efectivo es el pago más usado en emprendimientos"),
    },
    shots: [S.bestieHome, S.bestieProfile],
    cover: { kind: "mobile", shots: [S.bestieHome, S.bestieProfile] },
    tease: tr(
      "An app where young entrepreneurs manage their business finances, sell to their customers and build the financial record they need to get credit. Designed for Bancoomeva at UX Lab ICESI.",
      "Una app donde jóvenes emprendedores manejan las finanzas de su negocio, venden a sus clientes y construyen el historial que necesitan para acceder a crédito. Diseñada para Bancoomeva en el UX Lab ICESI.",
    ),
    meta: [
      { label: tr("Role", "Rol"), value: tr("UX Designer · research", "UX Designer · research") },
      { label: tr("Type", "Tipo"), value: tr("University–industry project, real client", "Proyecto universidad–empresa, cliente real") },
      { label: tr("Team", "Equipo"), value: tr("Scrum team · UX Lab ICESI", "Equipo Scrum · UX Lab ICESI") },
      { label: tr("Timeline", "Tiempo"), value: tr("2022 · Universidad Icesi", "2022 · Universidad Icesi") },
      { label: tr("Client", "Cliente"), value: tr("Bancoomeva", "Bancoomeva") },
      { label: tr("Tools", "Herramientas"), value: tr("Figma", "Figma") },
      { label: tr("Research", "Investigación"), value: tr("3 interviews, survey of 63, focus group, benchmark", "3 entrevistas, encuesta a 63, focus group, benchmark") },
    ],
    sections: [
      {
        label: label("01", "Challenge", "Reto"),
        title: tr("A bank that couldn't reach young people.", "Un banco que no lograba llegar a los jóvenes."),
        body: [
          {
            type: "p",
            text: tr(
              "Bancoomeva came to UX Lab ICESI wanting to win over 18 to 25-year-olds. They didn't understand this audience and didn't know how to talk to them.",
              "Bancoomeva llegó al UX Lab ICESI con un objetivo: atraer a jóvenes de 18 a 25 años. No entendía a este público ni sabía cómo comunicarse con él.",
            ),
          },
          {
            type: "quote",
            text: tr(
              "We want to win over young users because we don't understand them and communicating with them is complex.",
              "Deseamos cautivar a usuarios jóvenes porque no los entendemos y comunicarnos con ellos es complejo.",
            ),
            source: tr("Bancoomeva team · design brief", "Equipo de Bancoomeva · brief de diseño"),
          },
        ],
      },
      {
        label: label("02", "Research", "Investigación"),
        title: tr("They buy from local ventures, in cash.", "Compran a emprendimientos, en efectivo."),
        body: [
          {
            type: "p",
            text: tr(
              "We ran 3 interviews, a survey, a focus group and a benchmark. The survey reached 63 people aged 16 to 32 in Cali, Colombia. 19 of them had their own venture.",
              "Hicimos 3 entrevistas, una encuesta, un focus group y un benchmark. La encuesta llegó a 63 personas de 16 a 32 años en Cali, Colombia. 19 de ellas tenían su propio emprendimiento.",
            ),
          },
          {
            type: "p",
            text: tr(
              "Almost everyone (95%) already bought from local ventures. But cash was the most used way to pay them:",
              "Casi todos (95%) ya compraban en emprendimientos. Pero el efectivo era la forma más usada de pagarles:",
            ),
          },
          { type: "metric", value: "41%", label: tr("cash: the most used way to pay ventures · survey of 63", "efectivo: el método más usado para pagar a emprendimientos · encuesta a 63") },
          {
            type: "p",
            text: tr(
              "**The finding:** people buy from and support young ventures, but this niche isn't banked. Without bank records, a venture has no credit history.",
              "**El hallazgo:** las personas compran y apoyan a los emprendimientos, pero este nicho no está bancarizado. Sin movimientos en un banco, un emprendimiento no tiene historial crediticio.",
            ),
          },
          {
            type: "quote",
            text: tr(
              "I want my venture to grow, and for that I need money I don't have. But banks won't lend it to me.",
              "Deseo que mi emprendimiento crezca y sea exitoso, para esto necesito hacer una inversión alta de dinero que no tengo, pero los bancos no me prestan ese dinero.",
            ),
            /* the name is a pseudonym: interviewees aren't named */
            source: tr("Santiago Morales · Entrepreneur · user interview", "Santiago Morales · Emprendedor · entrevista de usuario"),
          },
          {
            type: "list",
            items: [
              tr(
                "**Entrepreneurs** kept their accounts in spreadsheets they forgot to update, and jumped between many apps to sell and get paid.",
                "**Los emprendedores** llevaban sus cuentas en un Excel que olvidaban actualizar y saltaban entre muchas apps para vender y cobrar.",
              ),
              tr(
                "**Customers** wanted to buy local, but couldn't find nearby ventures when they needed them.",
                "**Los clientes** querían comprar local, pero no encontraban emprendimientos cercanos cuando los necesitaban.",
              ),
            ],
          },
        ],
      },
      {
        label: label("03", "The solution", "La solución"),
        title: tr("One app for both sides.", "Una app para los dos lados."),
        body: [
          {
            type: "p",
            text: tr(
              "Bestie, “your financial best friend”, brings entrepreneurs and their customers together in one app.",
              "Bestie, “tu mejor amigo financiero”, reúne en una sola app a los emprendedores y a sus clientes.",
            ),
          },
          {
            type: "list",
            items: [
              tr(
                "**For entrepreneurs:** a profile to show and sell their products, with several payment methods and a wallet whose sales history becomes the record they need to get credit.",
                "**Para emprendedores:** un perfil para mostrar y vender sus productos, con varios métodos de pago y una billetera cuyo historial de ventas se convierte en el respaldo para acceder a crédito.",
              ),
              tr(
                "**For customers:** a feed of nearby ventures, reviews, stickers and their own wallet to manage their money in one place.",
                "**Para clientes:** un feed de emprendimientos cercanos, reseñas, stickers y su propia billetera para manejar su dinero en un solo lugar.",
              ),
            ],
          },
          {
            type: "pair",
            items: [
              { shot: S.bestieHome, caption: tr("Entrepreneur · home and metrics", "Emprendedor · inicio y métricas") },
              { shot: S.bestieProfile, caption: tr("Entrepreneur · branded profile", "Emprendedor · perfil de marca") },
            ],
          },
        ],
      },
      {
        label: label("04", "Process & result", "Proceso y resultado"),
        title: tr("Four sprints, tested with users.", "Cuatro sprints, probados con usuarios."),
        body: [
          {
            type: "p",
            text: tr(
              "**My role:** I was the UX designer, focused on research. I ran the user interviews, found the insights, defined the app's flow and shared the findings with the team.",
              "**Mi rol:** fui el UX designer, enfocado en la investigación. Hice las entrevistas con usuarios, identifiqué los insights, definí el flujo de la app y compartí los hallazgos con el equipo.",
            ),
          },
          {
            type: "p",
            text: tr(
              "After research and a co-creation session, we built Bestie in 4 Scrum sprints: MVP, visual design, development and beta. Each sprint ended with user testing and feedback from Bancoomeva.",
              "Después de la investigación y una sesión de co-creación, construimos Bestie en 4 sprints de Scrum: MVP, diseño visual, programación y beta. Cada sprint cerró con pruebas de usuario y retroalimentación de Bancoomeva.",
            ),
          },
          {
            type: "p",
            text: tr(
              "**The result:** Bancoomeva kept the research to understand how to win young people as customers. It took away three things: the unbanked-niche finding, how people pay young ventures, and the entrepreneur and customer profiles.",
              "**El resultado:** Bancoomeva se quedó con la investigación para entender cómo atraer a jóvenes como clientes. Se llevó tres cosas: el hallazgo del nicho no bancarizado, cómo les pagan a los emprendimientos y los perfiles de emprendedor y cliente.",
            ),
          },
        ],
      },
      {
        label: label("05", "Learnings", "Aprendizajes"),
        title: tr("What I took from it.", "Lo que me llevé."),
        body: [
          {
            type: "list",
            items: [
              tr(
                "**The niche defines the product.** The opportunity wasn't “young people”: it was a market of ventures that already existed, paid in cash.",
                "**El nicho define el producto.** La oportunidad no era “los jóvenes”: era un mercado de emprendimientos que ya existía y se pagaba en efectivo.",
              ),
              tr(
                "**A marketplace needs both sides from day one.** Designing only for entrepreneurs would have left customers with no reason to join.",
                "**Un marketplace necesita a sus dos lados desde el inicio.** Diseñar solo para emprendedores habría dejado a los clientes sin razón para entrar.",
              ),
            ],
          },
        ],
      },
    ],
  },

];

/** How each platform is written on screen. */
export const PLATFORM: Record<Case["platform"], T> = {
  Web: tr("Web", "Web"),
  Mobile: tr("Mobile", "Móvil"),
};

export const getCase = (slug: string) => CASES.find((c) => c.slug === slug);

/** Next case, in a circle: the last one leads back to the first. */
export const nextCase = (slug: string) => {
  const i = CASES.findIndex((c) => c.slug === slug);
  return CASES[(i + 1) % CASES.length];
};

export const prevCase = (slug: string) => {
  const i = CASES.findIndex((c) => c.slug === slug);
  return CASES[(i - 1 + CASES.length) % CASES.length];
};
