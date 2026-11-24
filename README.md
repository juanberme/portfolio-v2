# Portfolio · Camilo Bermeo

My design portfolio: four case studies (bank reconciliation with AI, a mobile app redesign,
an editorial brand and website, and a research project), in English and Spanish.

I designed it and built it myself with **Claude Code**, using **Next.js, React and TypeScript**.

**Live:** [camilo-bermeo.vercel.app](https://camilo-bermeo.vercel.app)

### What's inside

- **Static, bilingual pages.** Every page is generated at build time; both languages ship in the
  HTML and a button switches between them.
- **ASCII backgrounds** drawn on canvas (`src/lib/ascii-engine.ts`): one shared animation loop
  that pauses off screen and respects "reduce motion".
- **Design tokens** for colour, type, spacing and radius in `src/app/globals.css`, used through
  CSS Modules.
- **Accessible components:** keyboard-friendly tabs and lightbox, visible focus, checked with axe.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000, live reload while you edit
```

To check the real production build:

```bash
npm run build
npm start          # http://localhost:3000
```

## Where things live

| What | File |
| --- | --- |
| **All home copy (EN + ES)** | `src/content/home.ts` |
| **The four case studies (EN + ES)** | `src/content/cases.ts` |
| Links: email, LinkedIn, GitHub, Behance, CV | `src/lib/site.ts` |
| Colours, type, spacing (tokens) | `src/app/globals.css` (`:root`) |
| Images | `public/images/` |
| Home sections | `src/components/home/` |
| Case template | `src/components/case/` + `src/app/work/[slug]/page.tsx` |
| Shared pieces | `src/components/` (`AsciiField`, `Widget`, `LanguageSwitch`, `ContactBlock`, `TrackedLink`) |
| Link previews (LinkedIn/WhatsApp image) | `src/lib/og.tsx` |

### Writing copy

Every piece of text is a pair: `tr("English", "Español")`.
Inside a string:

- `**bold**`
- `[[still to write]]` shows the orange dashed marker. Replace it with the real text and
  remove the brackets; once none are left, nothing orange shows.

To find everything still pending: search the project for `[[`.

### Replacing an image

Drop the new file in `public/images/cases/` with the same name, or change `src` in
`src/content/cases.ts` (update `w` and `h` to the new image's pixel size).

### Adding a case

Add an entry to `CASES` in `src/content/cases.ts`. The home slab, the case page, the link
preview and the "Next case" loop pick it up automatically.

## Language

Both languages are in the HTML; a button shows one. The site opens in the visitor's browser
language the first time, then remembers their choice. `?lang=es` (or `?lang=en`) at the end of
any URL forces a language — useful when you send the link to someone.

## Analytics (Vercel)

`@vercel/analytics` (page views) and `@vercel/speed-insights` (real load speed) are installed
and start working once the site is on Vercel and both are enabled in the project's dashboard.
Locally they do nothing (the 404s for `/_vercel/...` in the console are expected).

Click events (Email me, Download CV, View case, language switch) are already wired but **off**:
custom events need Vercel Pro. To turn them on, set `CUSTOM_EVENTS_ENABLED = true` in
`src/lib/analytics.ts`.

## Performance notes

- Every page is static HTML generated at build time.
- IBM Plex is self-hosted (no request to Google).
- The ASCII backgrounds start after the page has loaded, share one animation loop, pause
  off screen, run slower on phones, and become a still frame with "reduce motion".
- Images are WebP and served resized by Next/Vercel.
