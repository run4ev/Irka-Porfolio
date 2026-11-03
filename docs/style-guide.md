# Iryna Runcheva Portfolio: Style, Motion & Project Foundation

Reference for extending the site exported from Readymag (`iryna-runcheva-portfolio`).
Values come from the original Readymag layout. Column positions are rounded to the nearest pixel.

**Part 1: Style & motion guide**: 1. Character · 2. Typography · 3. Colour · 4. Grid · 5. Layout patterns · 6. Components · 7. Do / Don't · 8. Motion system · 9. Drop-in for the legacy export · 10. Performance · 11. Checklist

**Part 2: Project foundation (Astro 7 + GSAP + Lenis)**: 12. Why a new foundation · 13. Stack · 14. Folder structure · 15. Setup · 16. Config files · 17. Tokens & base styles · 18. Content model · 19. Layout & components · 20. Pages · 21. Motion architecture · 22. Media pipeline · 23. Quality · 24. Deploy · 25. Migration roadmap · 26. Leveraging the portfolio · 27. Version notes · 28. Case studies

---

# Part 1: Style & motion guide

## 1. Character

An **editorial index** in the Swiss / International Typographic tradition.

- The interface is a neutral, monochrome frame. **All colour comes from the work.**
- The type is small, there's a lot of white space and everything sits on a strict grid. **Thin black lines are the only decoration.**
- Hierarchy comes from **position and numbering**, not from size or weight.
- The bracketed `[01]` numbers act as the navigation system.
- It should feel like an archive or a printed catalogue: quiet, precise and confident.

---

## 2. Typography

| Property | Value |
|---|---|
| Family | Red Hat Display (self-hosted in `assets/fonts/`) |
| Weight | Regular 400 almost everywhere. Medium 500 is loaded but barely used |
| Size | 9px on the 1024px desktop canvas (about 10.5px at 1200px wide, it scales with the window) |
| Line height | 12px (≈ 1.33) |
| Case | Sentence case. No all-caps |
| Letter-spacing | None |
| Colour | Black on white |
| Links | No underline and no colour change. Hover is a subtle opacity drop |

**Rules**

- Use one type size. If a second is truly needed (for example a project title), use 2× (18px on the canvas) and nothing in between.
- No bold for emphasis. Use position, spacing or a `[NN]` prefix instead.
- Keep paragraphs narrow, 2–3 columns wide (230–350px on the canvas).

---

## 3. Colour

| Role | Value |
|---|---|
| Background | `#FFFFFF` |
| Text | Black |
| Lines | `rgb(0,0,0)`, 0.8px |
| Accent | None in the interface |

Project palettes come from the imagery and are never used in the interface:

| Project | Palette |
|---|---|
| [01] P.C. / Health Assistant | Duotone cobalt blue on pale blue-grey |
| [02] Kebeta / Atelier | Plywood beige, grass green, white |
| [03] Kompany / Social App | Deep navy, lime, cool grey-violet |
| [04] Salut / Bistro | Cream, terracotta red, black |

If an accent is ever needed, borrow it from the current project, and only on hover.

**Case pages are the one place the page itself changes colour** (like the Sketchbook's red block): the page takes the background of the work, either for the whole case (`story.paper`) or while a section is in view (`paper`, and `ink` when the paper is dark). The colour must be the image's background as the browser renders it, so the image's edges disappear into the page (see section 28). Type and lines stay black, or switch to the paper's light colour on dark paper. Nothing else in the interface takes colour.

---

## 4. Grid

### Desktop (1024px canvas, scaled to the window width)

| Token | Value |
|---|---|
| Outer margin | 21px left and right |
| Columns | 8 × ~105px |
| Gutter | ~21px |
| Column x-positions | 21 · 145 · 270 · 396 · 522 · 648 · 774 · 900 |
| Content width | 983px (21 → 1004) |

### Phone (320px canvas, used below 769px)

| Token | Value |
|---|---|
| Outer margin | 10px |
| Label zone | x 10, ~104px wide |
| Image zone | x 114, 196px wide |
| Full-width images | 300px (10 → 310) |

**Rule:** every element starts on a column edge. Nothing is centred freely except the project-page image stack.

---

## 5. Layout patterns

### Header (fixed)

- Name **Iryna Runcheva** in column 1, top 8px.
- **Works**, **Sketchbook** and **About** sit in columns 6, 7 and 8, aligned to the right edge of each column, so About meets the right page margin.
- On the phone they are hidden; the right edge shows the e-mail, or **Close** on project pages.
- A white bar sits under the header so content scrolls beneath it.
- **Projects / Index** sub-header at about y 72. It slides up under the header when you scroll.

### Home: project rows

```
───────────────────────────────────────────────────────── 0.8px line, full width
[01] Health Assistant   ▢ ▢ ▢ ▢   ○□
[01] Art Direction
[01] Digital Branding
[01] UI Concept

                                       (generous empty space below)
───────────────────────────────────────────────────────── next row
```

- One project = one row, separated by a full-width line.
- The label block (`[NN] Name` and then `[NN] Discipline` × 2–3) sits in column 1, about 19px below the line.
- Thumbnails start at column 2 and are top-aligned with the labels.
- Thumbnails are **portrait 105×142** (1 column, about 3:4) or **landscape about 230×142** (2 columns). All thumbnails in a row share one height.
- Leave the empty space below each row (about 190–230px row pitch). It's part of the look.

### Index page (`projects.html`)

- A plain list: `[NN] Project` in column 1, one per row, with a full-width line between rows (about 43px pitch).
- The list is centred vertically between the sub-header and the footer.

### Project page

- Intro paragraph starting at column 4, about 350px wide, at the top.
- Images 480px wide (about 4 columns, x ≈ 274), stacked vertically with about 20px gaps.
- No captions and no extra text between images.

### Case-study page (projects with a `story`)

```
[01] P.C.              intro paragraph (cols 4–6)            [01] Mark
[01] Art Direction                                           [02] Motion   ← section index
[01] Digital Branding                                        [03] …
──────────────────────────────── the mark between two lines (cover) ─────
───────────────────────────────────────────────────────── 0.8px line
[01] Mark              paragraph (cols 4–6)
                       image(s): centre (3–6), wide (2–7) or full (1–8)
[01] Blind emboss ───────────────●                      ●──────── [02] Serif   ← notes
───────────────────────────────────────────────────────── next section …
Next project  ▢                                         (Home-style row)
```

- The label block (`[NN] Name` + disciplines) is the visible `h1`. The section index in columns 7–8 links to the sections.
- Each section: a full-width line, `[NN] Title` in column 1, one paragraph in columns 4–6, then its blocks.
- Images keep their own crop and backgrounds; the page takes their background colour (section 3) instead of putting them in boxes.
- Notes are hairlines from a label in column 1 (or 8) to a point on the image. Keep them few (3–4), and never let two sit almost on one line: either exactly on one line (on purpose) or clearly apart.
- Short `[NN]` lists can sit beside a centred image (column 1–2 and 7–8), sharing one top line.
- On the phone, a **Close** link in the header returns to Home (on desktop, **Works** does).

### About

- One paragraph in columns 2–3 (x 145, 230px wide) near the top. Nothing else.

### Footer (every page)

```
───────────────────────────────────────────────────────── 0.8px line, full width
Iryna Runcheva   [01] Health Assistant          irkakratz@gmail.com         Works    Back to top
Brand designer   [02] Atelier                                      Sketchbook
& art director   [04] Bistro                                            About
                 [05] Interior Designer                                 Index
© 2026
```

- Same type, line and grid as the rest of the page: name and role in column 1, the project list in
  column 2 (under the thumbnails), the e-mail in column 5. The link column is right-aligned in
  column 7 (under Works) and Back to top is right-aligned in column 8 (under About).
- It sits at the bottom of the window on short pages (About, Index).
- On the phone it folds into three rows of label zone + media zone: name / projects,
  links / e-mail, © / Back to top.

---

## 6. Components

| Component | Spec |
|---|---|
| Line | `<svg>` path, stroke black, `stroke-width: .8`, full content width |
| Label block | 3–4 lines, `[NN] Text`, 9/12px, column 1 |
| Thumbnail | `object-fit: cover` crop, 3:4 or about 1.6:1, no border, no radius |
| Paragraph | 9/12px, 230–350px wide, left-aligned, ragged right |
| Nav link | Plain text, opacity hover |

**Never:** shadows, rounded corners, gradients, icons, buttons with fills, coloured UI, card containers.

---

## 7. Do / Don't

| Do | Don't |
|---|---|
| Snap to the 8 columns | Free-floating or centred elements |
| Use `[NN]` numbering for every list | Bullet points or icons |
| Separate content with 0.8px black lines | Boxes, cards or background fills |
| Crop images to consistent ratios per row | Mixed heights in one row |
| Leave large empty areas | Fill every gap |
| Let the work carry the colour | Add interface accent colours |

---

## 8. Motion system

### Principles

- **Slow and precise**, like an index being drawn and revealed. Never bouncy.
- Animate **once, on entry**. Nothing loops except the project GIFs.
- The GIFs already move, so everything around them stays still.
- Always honour `prefers-reduced-motion`.

### Tokens

```css
:root {
  --ease-out:  cubic-bezier(.22, 1, .36, 1);   /* reveals, text */
  --ease-line: cubic-bezier(.65, 0, .35, 1);   /* line draw */
  --dur-hover: 200ms;
  --dur-text:  600ms;
  --dur-img:   900ms;
  --dur-line:  1000ms;
  --stagger:   60ms;
}
```

### Recommended animations

| Element | Animation | Timing |
|---|---|---|
| Lines | Draw in from left to right (`scaleX 0 → 1`) on entering the viewport | 1s, `--ease-line` |
| Thumbnails and images | Reveal upwards with a clip-path mask while the image settles from 1.06 to 1.0 scale. Stagger left to right within a row | 0.9s, `--ease-out`, about 60ms between items |
| `[NN]` labels and paragraphs | Fade in and rise 6px | 0.6s, `--ease-out` |
| Home rows (hover) | Hovering a project fades the other rows to 25% opacity | 200ms ease |
| Index page (hover) | A small thumbnail of the hovered project follows the cursor | 250ms fade, position eased |
| Page change | Cross-page View Transition: a quick fade, with the clicked thumbnail growing into the 480px image on the project page | 350–450ms |
| Header | The "Projects / Index" bar slides up under the name on scroll | Already built |
| Case cover | Construction lines draw along their path (DrawSVG) after the page transition; the mark itself stays still | 1s each, `--ease-line`, delays from 0.4s |
| Case paper | The page fades to the colour of the section in view | 600ms (`--dur-paper`) |
| Flipbook | A logo animation laid out as a sticky stage; scrolling cuts between its states (hard cuts, like the GIF) and the `[NN]` list marks the current one | One state per ~24% of the screen height |

### Avoid

Parallax (the one exception is the Sketchbook collage on desktop, where each piece's `speed` in `src/content/sketchbook/index.md` sets its depth), rotation, bounce or elastic easing, scaling past 1.06, text-scramble effects, custom cursors on every link, and looping decorative motion.

---

## 9. Implementation for the legacy export (drop-in)

> This section only applies to the static Readymag export. For the new project, use the motion architecture in section 21.

### CSS (add to the end of `assets/css/style.css`)

```css
:root { --ease-out: cubic-bezier(.22,1,.36,1); --ease-line: cubic-bezier(.65,0,.35,1); }

@media (prefers-reduced-motion: no-preference) {
  /* Lines */
  .reveal-line svg { transform: scaleX(0); transform-origin: 0 50%;
    transition: transform 1s var(--ease-line) var(--d, 0s); }
  .reveal-line.is-in svg { transform: none; }

  /* Images */
  .reveal-img { clip-path: inset(100% 0 0 0);
    transition: clip-path .9s var(--ease-out) var(--d, 0s); }
  .reveal-img img { transform: scale(1.06);
    transition: transform 1.2s var(--ease-out) var(--d, 0s); }
  .reveal-img.is-in { clip-path: inset(0); }
  .reveal-img.is-in img { transform: none; }

  /* Text */
  .reveal-text { opacity: 0; transform: translateY(6px);
    transition: opacity .6s var(--ease-out), transform .6s var(--ease-out); }
  .reveal-text.is-in { opacity: 1; transform: none; }

  /* Cross-page transitions (Chrome, Safari 18.2+; others load normally) */
  @view-transition { navigation: auto; }
  ::view-transition-old(root),
  ::view-transition-new(root) { animation-duration: .35s; }
}
```

### JS (add to the end of `assets/js/main.js`)

```js
document.querySelectorAll('.rm-layout').forEach(function (L) {
  var W = +L.dataset.w;
  L.querySelectorAll('.w-shape').forEach(function (el) { el.classList.add('reveal-line'); });
  L.querySelectorAll('.w-text').forEach(function (el) { el.classList.add('reveal-text'); });
  L.querySelectorAll('.w-pic:not(.anim-fade)').forEach(function (el) {
    el.classList.add('reveal-img');
    // left-to-right stagger inside a row
    el.style.setProperty('--d', (parseFloat(el.style.left) / W * 0.35).toFixed(2) + 's');
  });
});

var io = new IntersectionObserver(function (entries) {
  entries.forEach(function (e) {
    if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
  });
}, { rootMargin: '0px 0px -10% 0px' });

document.querySelectorAll('.reveal-line, .reveal-img, .reveal-text')
  .forEach(function (el) { io.observe(el); });
```

### Thumbnail-to-hero morph

Give the home thumbnail and the first image on the matching project page the same name:

```html
<!-- index.html -->
<a class="w w-pic" href="pc.html" style="...; view-transition-name: pc-hero">…</a>

<!-- pc.html -->
<div class="w w-pic" style="...; view-transition-name: pc-hero">…</div>
```

Each name must be unique on a page (for example `pc-hero`, `kebeta-hero`, `on-hero`).

---

## 10. Performance notes

- About 71 MB of the project is GIFs. Converting them to looping, muted MP4 or WebM video makes pages load much faster and keeps motion smooth:

  ```html
  <video autoplay muted loop playsinline src="assets/video/pc-logo.mp4"></video>
  ```

- Keep `loading="lazy"` on images below the first screen.
- Animate only `transform`, `opacity` and `clip-path`. Never animate `top`, `left`, `width` or `height`.

---

## 11. Checklist for new pages or projects

- [ ] Everything starts on one of the 8 column edges (x 21 · 145 · 270 · 396 · 522 · 648 · 774 · 900)
- [ ] Text is Red Hat Display 400, 9/12px, black, sentence case
- [ ] Lists use `[NN]` numbering
- [ ] Sections are separated by full-width 0.8px black lines
- [ ] Thumbnails in a row share one height (3:4 or about 1.6:1)
- [ ] No interface colour, shadows, radii or icons
- [ ] Phone layout built on the 320 canvas (10px margins, 114px image zone)
- [ ] Entry animations only, with `prefers-reduced-motion` respected

---

# Part 2: Project foundation

Sections 1–11 describe the look. This part describes the project you build it in, so the portfolio can grow: new projects, case studies, motion, SEO and fast loading.

All code below was compiled with `astro check` and `astro build` (0 errors), then checked in a headless browser at 1200px and 390px. The layout lands on the same pixel positions as the Readymag original. Versions were current at the end of October 2026.

---

## 12. Why a new foundation

The Readymag export works, but it can't grow. Every element is absolutely positioned on a scaled canvas, there's no content model, and each page is one hand-made HTML file.

The foundation keeps **the exact look** (same grid, type and lines, scaled with the window the same way) and rebuilds it on:

- **A real CSS grid.** The 8-column system from section 4 lives in CSS, so new pages snap to it automatically.
- **A content model.** Each project is one Markdown file with images next to it. Adding a project means adding a file, not designing a page.
- **Components.** The header, lines, label blocks, project rows and media are each written once.
- **A motion layer.** GSAP + ScrollTrigger + SplitText, Lenis smooth scroll and native View Transitions, all switched off for `prefers-reduced-motion`.
- **A build pipeline.** AVIF/WebP images with `srcset`, GIF → MP4/WebM, sitemap, type checks and visual tests.

The export stays in `legacy/` as the visual reference until the rebuild matches it (see section 25).

---

## 13. Stack

| Layer | Choice | Version (Oct 2026) | Why |
|---|---|---|---|
| Framework | **Astro** (static output) | 7.4 | Ships zero JS by default, has content collections, image optimisation and View Transitions built in. Perfect for a portfolio |
| Runtime | **Node.js** | 24 LTS (Astro 7 needs ≥ 22.23.4; odd versions aren't supported) | |
| Language | **TypeScript** (strict) | 6.x | `@astrojs/check` supports TS 5–6. Don't install TS 7 yet |
| Styling | **Plain modern CSS**: custom properties, Grid + subgrid, `:has()` | — | Tokens map 1:1 to the style guide, with no framework to fight |
| Animation | **GSAP** + ScrollTrigger + SplitText | 3.15 | Now 100% free (Webflow), including SplitText. Best-in-class timing control |
| Smooth scroll | **Lenis** | 1.3.27 | Light and calm, with an official ScrollTrigger sync |
| Page transitions | **Native cross-document View Transitions** (`@view-transition`) | browser | No router JS. Chrome, Edge and Safari 18.2+, and other browsers just navigate |
| Images | **astro:assets** (`<Image>`, `getImage`, sharp) | built in | AVIF/WebP, `srcset`, lazy loading, no layout shift |
| Video | **ffmpeg** (GIF → MP4 H.264 + WebM VP9) | any | About 10× smaller than GIFs |
| Content | **Astro content collections** + Zod schema (`astro/zod`) | built in | Typed frontmatter; a missing image fails the build |
| SEO | **@astrojs/sitemap** + meta/OG in the layout | 3.7 | |
| Quality | `astro check`, **Prettier** + `prettier-plugin-astro`, **Playwright** visual tests | 3.9 / 1.1 / 1.64 | |
| Hosting | Netlify, Vercel or Cloudflare Pages (static `dist/`) | — | Free tier is enough |
| Optional later | Keystatic or Decap CMS (git-based), Plausible analytics, `@astrojs/mdx` for rich case studies | — | See section 26 |

---

## 14. Folder structure

```
iryna-portfolio/
├─ legacy/                       # the Readymag export, untouched (visual reference)
├─ media/
│  ├─ gifs/                      # source GIFs (not shipped)
│  └─ posters/                   # first frames generated by the GIF script
├─ public/
│  ├─ fonts/                     # Red Hat Display .woff2 (copied from legacy/assets/fonts)
│  └─ video/                     # generated .mp4 + .webm
├─ scripts/
│  └─ gif-to-video.sh
├─ src/
│  ├─ components/
│  │  ├─ Header.astro            # fixed header + "Projects / Index" bar
│  │  ├─ LabelBlock.astro        # [NN] Title / [NN] Discipline …
│  │  ├─ Media.astro             # image (astro:assets) or looping video
│  │  └─ ProjectRow.astro        # one Home row: line + labels + thumbnails
│  ├─ content/
│  │  └─ projects/
│  │     ├─ 01-pc.md             # one file per project, "NN-slug.md"
│  │     ├─ pc/                  # its images
│  │     └─ …
│  ├─ layouts/
│  │  └─ Base.astro              # <head>, meta/OG, header, motion script
│  ├─ lib/
│  │  └─ projects.ts             # getProjects(): sorted, drafts hidden in production
│  ├─ pages/
│  │  ├─ index.astro             # Home (Works)
│  │  ├─ about.astro
│  │  └─ projects/
│  │     ├─ index.astro          # Index list with cursor preview
│  │     └─ [slug].astro         # project page
│  ├─ scripts/
│  │  └─ motion/
│  │     ├─ index.ts             # entry: registers plugins, reduced-motion gate
│  │     ├─ tokens.ts            # durations / easings (mirror of CSS tokens)
│  │     ├─ smooth-scroll.ts     # Lenis ⇄ ScrollTrigger
│  │     ├─ reveals.ts           # lines, images, text
│  │     ├─ header.ts            # sub-header slide-away
│  │     └─ cursor-preview.ts    # Index hover thumbnail
│  ├─ styles/
│  │  ├─ tokens.css              # all design tokens (desktop + phone canvas)
│  │  ├─ fonts.css
│  │  ├─ base.css
│  │  ├─ grid.css                # 8-col grid + .rule
│  │  └─ motion.css              # initial states, view transitions, CSS-only hovers
│  ├─ content.config.ts          # project schema
│  └─ site.config.ts             # name, e-mail, nav
├─ tests/
│  └─ visual.spec.ts
├─ astro.config.mjs
├─ playwright.config.ts
├─ tsconfig.json
├─ .prettierrc
└─ package.json
```

URLs: `/`, `/about/`, `/projects/` (Index) and `/projects/<slug>/`.

---

## 15. Setup, step by step

```bash
# 1. Scaffold (official minimal starter)
npm create astro@latest iryna-portfolio -- --template minimal
cd iryna-portfolio

# 2. Dependencies
npm i gsap lenis @astrojs/sitemap
npm i -D @astrojs/check typescript@^6 prettier prettier-plugin-astro @playwright/test

# 3. Keep the export as reference + reuse its fonts
mkdir -p legacy public/fonts media/gifs
cp -R ~/Downloads/iryna-runcheva-portfolio/* legacy/
cp legacy/assets/fonts/*.woff2 public/fonts/

# 4. Create the files from sections 16–20, then:
npm run dev        # http://localhost:4321
npm run build      # astro check + static build into dist/
```

Then move the images out of `legacy/assets/images/` into `src/content/projects/<slug>/`, and the GIFs into `media/gifs/` (see section 22).

---

## 16. Config files

**`package.json`**

```json
{
  "name": "iryna-runcheva-portfolio",
  "type": "module",
  "private": true,
  "engines": {
    "node": ">=22.23.4"
  },
  "scripts": {
    "dev": "astro dev",
    "build": "astro check && astro build",
    "preview": "astro preview",
    "check": "astro check",
    "format": "prettier --write .",
    "media:video": "bash scripts/gif-to-video.sh",
    "test:visual": "playwright test"
  },
  "dependencies": {
    "@astrojs/sitemap": "^3.7.4",
    "astro": "^7.4.4",
    "gsap": "^3.15.0",
    "lenis": "^1.3.27"
  },
  "devDependencies": {
    "@astrojs/check": "^0.9.12",
    "@playwright/test": "^1.64.1",
    "prettier": "^3.9.10",
    "prettier-plugin-astro": "^1.1.2",
    "typescript": "^6.0.3"
  }
}
```

**`astro.config.mjs`**

```js
// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://example.com', // ← replace with the real domain (needed for sitemap + OG URLs)
  integrations: [sitemap()],
  // Astro 7 defaults to 'jsx', which can drop spaces between inline elements.
  // `true` keeps normal HTML whitespace rules (important for small editorial text).
  compressHTML: true,
});
```

**`tsconfig.json`**

```json
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist", "legacy"]
}
```

**`.prettierrc`**

```json
{
  "singleQuote": true,
  "printWidth": 100,
  "plugins": ["prettier-plugin-astro"],
  "overrides": [{ "files": "*.astro", "options": { "parser": "astro" } }]
}
```

**`src/site.config.ts`**

```ts
export const site = {
  name: 'Iryna Runcheva',
  title: 'Iryna Runcheva — Brand designer & art director',
  description:
    'Brand designer and art director crafting distinctive visual identities and strong brand stories.',
  email: 'hello@example.com', // ← replace
  nav: [
    { label: 'Works', href: '/' },
    { label: 'About', href: '/about/' },
  ],
} as const;
```

---

## 17. Design tokens & base styles

The core idea: **everything is written in canvas pixels × `--u`**, where `--u` is `100vw / 1024` on desktop and `100vw / 320` on phones. That's exactly how Readymag scales, so values can be copied straight from the style guide. `calc(145 * var(--u))` means "145px on the canvas".

**`src/styles/tokens.css`**

```css
/* ─────────────────────────────────────────────────────────────
   Design tokens
   Everything is designed in "canvas px" (1024 desktop / 320 phone)
   and multiplied by --u, so the layout scales with the window exactly
   like the Readymag original.
   ───────────────────────────────────────────────────────────── */
:root {
  --canvas: 1024;
  --u: calc(100vw / var(--canvas));

  /* Colour: the UI is monochrome, colour comes from the work */
  --ink: #000;
  --paper: #fff;

  /* Type */
  --font: 'Red Hat Display', ui-sans-serif, system-ui, sans-serif;
  --fs: calc(9 * var(--u));
  --lh: calc(12 * var(--u));
  --fs-l: calc(18 * var(--u)); /* the only allowed second size */

  /* Grid */
  --cols: 8;
  --margin: calc(21 * var(--u));
  --gutter: calc(21 * var(--u));
  --rule: max(0.5px, calc(0.8 * var(--u)));

  /* Layout */
  --header-h: calc(30 * var(--u));
  --header-pad: calc(8 * var(--u));
  --subheader-top: calc(64 * var(--u));
  --subheader-h: calc(30 * var(--u));
  --content-top: calc(99 * var(--u)); /* first line on Home */
  --row-h: calc(195 * var(--u));
  --row-pad: calc(8 * var(--u));
  --thumb-h: calc(142 * var(--u));
  --index-row-h: calc(43 * var(--u));
  --intro-top: calc(42 * var(--u));
  --gallery-top: calc(44 * var(--u));

  /* Motion (mirrored in src/scripts/motion/tokens.ts) */
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1); /* easeOutQuint  ≈ GSAP power4.out  */
  --ease-line: cubic-bezier(0.65, 0, 0.35, 1); /* easeInOutCubic ≈ GSAP power2.inOut */
  --dur-hover: 200ms;
  --dur-text: 600ms;
  --dur-img: 900ms;
  --dur-line: 1000ms;
}

/* Phone canvas: below 769px, same breakpoint as Readymag */
@media (max-width: 768.98px) {
  :root {
    --canvas: 320;
    --margin: calc(10 * var(--u));
    --gutter: calc(10 * var(--u));
    --label-w: calc(104 * var(--u));
    --header-h: calc(71 * var(--u));
    --header-pad: calc(35 * var(--u));
    --subheader-top: calc(71 * var(--u));
    --subheader-h: calc(24 * var(--u));
    --content-top: calc(105 * var(--u));
    --row-pad: calc(13 * var(--u));
    --intro-top: calc(98 * var(--u));
    --gallery-top: calc(20 * var(--u));
  }
}
```

**`src/styles/grid.css`**

```css
/* 8-column desktop grid (x = 21 · 145 · 270 · 396 · 522 · 648 · 774 · 900 on the canvas) */
.grid {
  display: grid;
  grid-template-columns: repeat(var(--cols), minmax(0, 1fr));
  column-gap: var(--gutter);
  padding-inline: var(--margin);
}

/* Phone: two zones, labels (104) + media (196) */
@media (max-width: 768.98px) {
  .grid {
    grid-template-columns: var(--label-w) minmax(0, 1fr);
    column-gap: 0;
  }
}

/* The only ornament: a 0.8px black line across the content width */
.rule {
  grid-column: 1 / -1;
  width: 100%;
  height: var(--rule);
  margin: 0;
  border: 0;
  background: var(--ink);
  transform-origin: 0 50%;
}
```

**`src/styles/base.css`**

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  -webkit-text-size-adjust: 100%;
  overflow-x: clip;
}

body {
  margin: 0;
  background: var(--paper);
  color: var(--ink);
  font: 400 var(--fs) / var(--lh) var(--font);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

h1, h2, h3, p, ol, ul, li, figure {
  margin: 0;
  padding: 0;
  font: inherit;
}
ol, ul {
  list-style: none;
}

a {
  color: inherit;
  text-decoration: none;
}
.link {
  transition: opacity var(--dur-hover) ease;
}
.link:hover {
  opacity: 0.6;
}

img,
video {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

:focus-visible {
  outline: var(--rule) solid var(--ink);
  outline-offset: calc(3 * var(--u));
}

.visually-hidden {
  position: absolute !important;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

.skip-link {
  position: fixed;
  top: 0;
  left: var(--margin);
  z-index: 1000;
  padding: var(--header-pad) 0;
  background: var(--paper);
  transform: translateY(-100%);
}
.skip-link:focus {
  transform: none;
}

.main {
  padding-top: var(--content-top);
  padding-bottom: calc(120 * var(--u));
}
.main--center {
  min-height: 100svh;
  display: grid;
  align-content: center;
  padding-block: var(--header-h);
}
```

**`src/styles/fonts.css`**

```css
/* Red Hat Display (SIL Open Font License), self-hosted.
   Copy the .woff2 files from legacy/assets/fonts/ to public/fonts/.
   For Latin Extended, copy the extra @font-face blocks from legacy/assets/css/fonts.css
   and change their url() paths to /fonts/…  */
@font-face {
  font-family: 'Red Hat Display';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('/fonts/red-hat-display-400-latin.woff2') format('woff2');
}
@font-face {
  font-family: 'Red Hat Display';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url('/fonts/red-hat-display-500-latin.woff2') format('woff2');
}
```

**`src/styles/motion.css`**

```css
@media (prefers-reduced-motion: no-preference) {
  /* Hide elements that GSAP will reveal, only when JS is running (html.js is set in <head>) */
  .js [data-reveal] {
    visibility: hidden;
  }

  /* Native cross-document page transitions (Chrome, Edge, Safari 18.2+; others just navigate) */
  @view-transition {
    navigation: auto;
  }
  ::view-transition-old(root),
  ::view-transition-new(root) {
    animation-duration: 0.35s;
    animation-timing-function: var(--ease-out);
  }
  ::view-transition-group(*) {
    animation-duration: 0.45s;
    animation-timing-function: var(--ease-out);
  }
}

/* Home: hovering a project dims the other rows (pure CSS, no JS) */
@media (hover: hover) {
  .row {
    transition: opacity var(--dur-hover) ease;
  }
  .rows:has(.row:hover) .row:not(:hover) {
    opacity: 0.25;
  }
}
```

---

## 18. Content model

One Markdown file per project. Its frontmatter is validated at build time, so a missing image or a wrong field stops the build with a clear error. The body of the file is the intro paragraph on the project page.

**`src/content.config.ts`**

```ts
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({
    base: './src/content/projects',
    pattern: '*.md',
    // "01-pc.md" → id "pc" → URL /projects/pc/
    generateId: ({ entry }) => entry.replace(/^\d+-/, '').replace(/\.md$/, ''),
  }),
  schema: ({ image }) => {
    // Every media item has a still image (also used as the video poster).
    // `video` is the base name of /public/video/<name>.mp4 + .webm (converted from GIFs).
    const media = z.object({
      src: image(),
      alt: z.string(),
      video: z.string().optional(),
    });

    return z.object({
      number: z.string().regex(/^\d{2}$/), // "01"
      name: z.string(), // "P.C."            → project page title
      title: z.string(), // "Health Assistant" → label on Home / Index
      disciplines: z.array(z.string()).min(1),
      year: z.number().int().optional(),
      thumbs: z
        .array(media.extend({ ratio: z.enum(['portrait', 'landscape']).default('portrait') }))
        .min(1),
      gallery: z.array(media).min(1),
      draft: z.boolean().default(false),
    });
  },
});

export const collections = { projects };
```

**`src/content/projects/01-pc.md`** (example)

```markdown
---
number: '01'
name: 'P.C.'
title: 'Health Assistant'
disciplines: ['Art Direction', 'Digital Branding', 'UI Concept']
year: 2024
thumbs:
  - { src: './pc/logo.png', alt: 'P.C. logo on pale blue', ratio: portrait }
  - { src: './pc/cards.png', alt: 'P.C. business cards', ratio: portrait }
  - { src: './pc/pattern.png', alt: 'P.C. pattern and portrait', ratio: portrait }
  - { src: './pc/app.png', alt: 'P.C. app on a phone', ratio: portrait }
  - { src: './pc/logo-anim.png', alt: 'Animated P.C. logo', ratio: portrait, video: 'pc-logo-anim' }
gallery:
  - { src: './pc/logo.png', alt: 'P.C. logo on pale blue' }
  - { src: './pc/cards.png', alt: 'P.C. business cards' }
  - { src: './pc/pattern.png', alt: 'P.C. pattern and portrait' }
  - { src: './pc/app.png', alt: 'P.C. app on a phone' }
  - { src: './pc/logo-anim.png', alt: 'Animated P.C. logo', video: 'pc-logo-anim' }
---

P.C. The rebranding of the health assistant app embraces a minimalist approach, using clean lines
and simple shapes to create a streamlined and intuitive user experience. The visual identity is
defined by a duotone blue color palette, adding depth and sophistication while maintaining a sense
of calm and clarity.
```

**`src/lib/projects.ts`**

```ts
import { getCollection } from 'astro:content';

/** Published projects sorted by their [NN] number. Drafts are visible in `astro dev` only. */
export async function getProjects() {
  const projects = await getCollection('projects', ({ data }) => import.meta.env.DEV || !data.draft);
  return projects.sort((a, b) => a.data.number.localeCompare(b.data.number));
}
```

### Suggested project files

| File | `number` | `title` (Home label) | `name` (project page) | Readymag page |
|---|---|---|---|---|
| `01-pc.md` | 01 | Health Assistant | P.C. | 01. P.C. |
| `02-kebeta.md` | 02 | Atelier | Kebeta | 02. Kebeta |
| `03-kompany.md` | 03 | Social App | Kompany | none yet (`draft: true`) |
| `04-salut.md` | 04 | Bistro | Salut | 05. Salut (check) |
| `05-on.md` | 05 | Interior Designer | ON | 04. ON (check) |
| `06-soil-mix.md` | 06 | Soil Mix | — | none yet (`draft: true`) |

Drafts appear in `npm run dev` but not in the production build.

### Adding a project

1. Create `src/content/projects/NN-slug.md` and a `slug/` folder for its images.
2. Fill the frontmatter: thumbnails are `portrait` (1 column) or `landscape` (2 columns), with up to 7 columns per row.
3. For animated pieces, put the GIF in `media/gifs/`, run `npm run media:video`, and add `video: '<name>'` to the item, using the poster PNG as its `src`.
4. Run `npm run dev`. The project appears on Home, on Index and at `/projects/slug/`.

---

## 19. Layout & components

**`src/layouts/Base.astro`**

```astro
---
import '../styles/fonts.css';
import '../styles/tokens.css';
import '../styles/base.css';
import '../styles/grid.css';
import '../styles/motion.css';
import Header from '../components/Header.astro';
import { site } from '../site.config';

interface Props {
  title?: string;
  description?: string;
  subheader?: boolean; // "Projects / Index" bar
  close?: boolean; // "Close" instead of the e-mail (project pages)
  center?: boolean; // vertically centred content (Index page)
  phoneTitle?: string; // replaces the name in the phone header, e.g. "[01] P.C."
}

const {
  title,
  description = site.description,
  subheader = false,
  close = false,
  center = false,
  phoneTitle,
} = Astro.props;
const pageTitle = title ? `${title} — ${site.name}` : site.title;
const canonical = new URL(Astro.url.pathname, Astro.site);
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{pageTitle}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonical} />
    <meta property="og:type" content="website" />
    <meta property="og:title" content={pageTitle} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={canonical} />
    <link rel="sitemap" href="/sitemap-index.xml" />
    <link
      rel="preload"
      href="/fonts/red-hat-display-400-latin.woff2"
      as="font"
      type="font/woff2"
      crossorigin
    />
    <script is:inline>
      document.documentElement.classList.add('js');
    </script>
  </head>
  <body>
    <a class="skip-link link" href="#main">Skip to content</a>
    <Header subheader={subheader} close={close} phoneTitle={phoneTitle} />
    <main id="main" class:list={['main', { 'main--center': center }]}>
      <slot />
    </main>
    <script>
      import '../scripts/motion';
    </script>
  </body>
</html>
```

**`src/components/Header.astro`**

```astro
---
import { site } from '../site.config';

interface Props {
  subheader?: boolean;
  close?: boolean;
  phoneTitle?: string;
}
const { subheader = false, close = false, phoneTitle } = Astro.props;
const path = Astro.url.pathname;
---

<header class="header">
  <div class="header__bar grid">
    <a class="header__name link" href="/">
      <span class:list={['name', { 'name--has-alt': phoneTitle }]}>{site.name}</span>
      {phoneTitle && <span class="name-alt">{phoneTitle}</span>}
    </a>
    <nav class="header__nav" aria-label="Main">
      {
        site.nav.map((item) => (
          <a class="link" href={item.href} aria-current={path === item.href ? 'page' : undefined}>
            {item.label}
          </a>
        ))
      }
    </nav>
    {
      close ? (
        <a class="header__end link" href="/">
          Close
        </a>
      ) : (
        <a class="header__end header__mail link" href={`mailto:${site.email}`}>
          {site.email}
        </a>
      )
    }
  </div>
  {
    subheader && (
      <div class="subheader grid" data-subheader>
        <p class="subheader__crumbs">
          <a class="link" href="/">Projects</a> / <a class="link" href="/projects/">Index</a>
        </p>
      </div>
    )
  }
</header>

<style>
  .header {
    position: fixed;
    inset: 0 0 auto;
    z-index: 100;
  }
  .header__bar {
    position: relative;
    z-index: 2;
    height: var(--header-h);
    padding-top: var(--header-pad);
    background: var(--paper);
  }
  .header__name {
    grid-column: 1 / span 2;
  }
  .name-alt {
    display: none;
  }
  .header__nav {
    grid-column: 5 / span 2;
    display: grid;
    grid-template-columns: subgrid;
  }
  .header__end {
    grid-column: 8;
    justify-self: end;
  }
  .header__mail {
    display: none; /* desktop: e-mail lives on About */
  }
  .subheader {
    position: absolute;
    top: var(--subheader-top);
    left: 0;
    right: 0;
    z-index: 1;
    height: var(--subheader-h);
    padding-top: calc(8.5 * var(--u));
    background: var(--paper);
  }
  .subheader__crumbs {
    grid-column: 1 / span 2;
  }

  @media (max-width: 768.98px) {
    .header__name {
      grid-column: 1;
    }
    .name--has-alt {
      display: none;
    }
    .name-alt {
      display: inline;
    }
    .header__nav {
      display: none;
    }
    .header__end {
      grid-column: 2;
    }
    .header__mail {
      display: inline;
    }
    .subheader {
      padding-top: calc(6 * var(--u));
    }
  }
</style>
```

**`src/components/LabelBlock.astro`**

```astro
---
interface Props {
  number: string;
  title: string;
  disciplines?: string[];
  href?: string;
}
const { number, title, disciplines = [], href } = Astro.props;
---

<p class="label" data-reveal="text">
  {
    href ? (
      <a class="link" href={href}>
        [{number}] {title}
      </a>
    ) : (
      <span>
        [{number}] {title}
      </span>
    )
  }
  {
    disciplines.map((d) => (
      <>
        <br />[{number}] {d}
      </>
    ))
  }
</p>
```

**`src/components/Media.astro`**

```astro
---
// Still image via astro:assets (AVIF/WebP + srcset), or a looping video
// (converted from the original GIF) that uses the still image as its poster.
import { Image, getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';

interface Props {
  src: ImageMetadata;
  alt: string;
  video?: string; // base name in /public/video/
  widths: number[];
  sizes: string;
  eager?: boolean;
}
const { src, alt, video, widths, sizes, eager = false } = Astro.props;
const poster = video ? await getImage({ src, width: 960, format: 'webp' }) : null;
---

{
  video && poster ? (
    <video
      autoplay
      muted
      loop
      playsinline
      preload={eager ? 'auto' : 'metadata'}
      poster={poster.src}
      aria-label={alt}
    >
      <source src={`/video/${video}.webm`} type="video/webm" />
      <source src={`/video/${video}.mp4`} type="video/mp4" />
    </video>
  ) : (
    <Image
      src={src}
      alt={alt}
      widths={widths}
      sizes={sizes}
      loading={eager ? 'eager' : 'lazy'}
      fetchpriority={eager ? 'high' : 'auto'}
    />
  )
}
```

**`src/components/ProjectRow.astro`**

```astro
---
import type { CollectionEntry } from 'astro:content';
import LabelBlock from './LabelBlock.astro';
import Media from './Media.astro';

interface Props {
  project: CollectionEntry<'projects'>;
  eager?: boolean;
}
const { project, eager = false } = Astro.props;
const { number, title, disciplines, thumbs } = project.data;
const href = `/projects/${project.id}/`;
---

<li class="row grid">
  <hr class="rule" data-reveal="line" />
  <LabelBlock number={number} title={title} disciplines={disciplines} href={href} />
  <a class="thumbs" href={href} tabindex="-1" aria-hidden="true">
    {
      thumbs.map((t, i) => (
        <div
          class:list={['thumb', `thumb--${t.ratio}`]}
          data-reveal="img"
          style={i === 0 ? `view-transition-name: ${project.id}-hero` : undefined}
        >
          <Media
            src={t.src}
            alt={t.alt}
            video={t.video}
            widths={[240, 480, 720]}
            sizes="(max-width: 768px) 62vw, 24vw"
            eager={eager}
          />
        </div>
      ))
    }
  </a>
</li>

<style>
  .row {
    min-height: var(--row-h);
    align-content: start;
  }
  .row :global(.label) {
    grid-column: 1;
    padding-top: var(--row-pad);
  }
  .thumbs {
    grid-column: 2 / -1;
    display: grid;
    grid-template-columns: subgrid;
    align-items: start;
    padding-top: var(--row-pad);
  }
  .thumb {
    height: var(--thumb-h);
    overflow: hidden;
  }
  .thumb--portrait {
    grid-column: span 1;
  }
  .thumb--landscape {
    grid-column: span 2;
  }

  @media (max-width: 768.98px) {
    .row {
      min-height: 0;
      padding-bottom: calc(40 * var(--u));
    }
    .thumbs {
      grid-column: 2;
      grid-template-columns: minmax(0, 1fr);
      row-gap: var(--gutter);
    }
    .thumb,
    .thumb--landscape,
    .thumb--portrait {
      grid-column: 1;
      height: auto;
      aspect-ratio: 196 / 147;
    }
    .thumb:nth-child(n + 4) {
      display: none; /* phone: first three thumbnails only */
    }
  }
</style>
```

---

## 20. Pages

**`src/pages/index.astro`** (Home)

```astro
---
import Base from '../layouts/Base.astro';
import ProjectRow from '../components/ProjectRow.astro';
import { getProjects } from '../lib/projects';

const projects = await getProjects();
---

<Base subheader>
  <h1 class="visually-hidden">Works</h1>
  <ol class="rows">
    {projects.map((project, i) => <ProjectRow project={project} eager={i < 2} />)}
  </ol>
</Base>
```

**`src/pages/projects/index.astro`** (Index with cursor preview)

```astro
---
import { getImage } from 'astro:assets';
import Base from '../../layouts/Base.astro';
import { getProjects } from '../../lib/projects';

const projects = await getProjects();
// Small optimised previews for the cursor-follow thumbnail
const previews = await Promise.all(
  projects.map((p) => getImage({ src: p.data.thumbs[0].src, width: 400, format: 'webp' })),
);
---

<Base title="Index" subheader center>
  <h1 class="visually-hidden">Index</h1>
  <ol class="index" data-index-list>
    {
      projects.map((p, i) => (
        <li>
          <hr class="rule" data-reveal="line" />
          <a class="index__link link" href={`/projects/${p.id}/`} data-preview={previews[i].src}>
            [{p.data.number}] {p.data.title}
          </a>
        </li>
      ))
    }
    <li aria-hidden="true"><hr class="rule" data-reveal="line" /></li>
  </ol>
  <div class="cursor-preview" data-cursor-preview aria-hidden="true">
    <img alt="" />
  </div>
</Base>

<style>
  .index {
    padding-inline: var(--margin);
  }
  .index__link {
    display: block;
    height: calc(var(--index-row-h) - var(--rule));
    padding-top: calc(7 * var(--u));
  }
  .cursor-preview {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 50;
    width: calc(105 * var(--u));
    aspect-ratio: 105 / 142;
    pointer-events: none;
    visibility: hidden;
    opacity: 0;
  }
</style>
```

**`src/pages/projects/[slug].astro`** (project page)

```astro
---
import { render, type CollectionEntry } from 'astro:content';
import Base from '../../layouts/Base.astro';
import Media from '../../components/Media.astro';
import { getProjects } from '../../lib/projects';

export async function getStaticPaths() {
  const projects = await getProjects();
  return projects.map((project) => ({ params: { slug: project.id }, props: { project } }));
}

type Props = { project: CollectionEntry<'projects'> };
const { project } = Astro.props;
const { Content } = await render(project);
const { number, name, gallery } = project.data;
---

<Base title={name} close phoneTitle={`[${number}] ${name}`}>
  <article class="project grid">
    <h1 class="visually-hidden">[{number}] {name}</h1>
    <div class="project__intro" data-reveal="text">
      <Content />
    </div>
    <div class="project__gallery">
      {
        gallery.map((m, i) => (
          <figure
            class="project__media"
            data-reveal="img"
            style={i === 0 ? `view-transition-name: ${project.id}-hero` : undefined}
          >
            <Media
              src={m.src}
              alt={m.alt}
              video={m.video}
              widths={[480, 960, 1440]}
              sizes="(max-width: 768px) 94vw, 47vw"
              eager={i === 0}
            />
          </figure>
        ))
      }
    </div>
  </article>
</Base>

<style>
  .project {
    margin-top: calc(var(--intro-top) - var(--content-top));
  }
  .project__intro {
    grid-column: 4 / span 3;
  }
  .project__gallery {
    grid-column: 3 / span 4;
    display: grid;
    row-gap: var(--gutter);
    margin-top: var(--gallery-top);
  }
  .project__media :global(img),
  .project__media :global(video) {
    height: auto;
  }

  @media (max-width: 768.98px) {
    .project__intro,
    .project__gallery {
      grid-column: 1 / -1;
    }
  }
</style>
```

**`src/pages/about.astro`**

```astro
---
import Base from '../layouts/Base.astro';
import { site } from '../site.config';
---

<Base title="About">
  <section class="about grid">
    <h1 class="visually-hidden">About</h1>
    <p class="about__text" data-reveal="text">
      Hi, I'm Iryna — a brand designer and art director crafting distinctive visual identities and
      strong brand stories. A multi-disciplinary mindset and a Kyiv–Barcelona–Kyiv journey shaped a
      unique perspective, translating into branding that is strategic, refined, and memorable.
    </p>
    <p class="about__contact">
      <a class="link" href={`mailto:${site.email}`}>{site.email}</a>
    </p>
  </section>
</Base>

<style>
  .about {
    margin-top: calc(63 * var(--u) - var(--content-top));
  }
  .about__text,
  .about__contact {
    grid-column: 2 / span 2;
  }
  .about__contact {
    margin-top: var(--lh);
  }
  @media (max-width: 768.98px) {
    .about {
      margin-top: calc(112 * var(--u) - var(--content-top));
    }
    .about__text,
    .about__contact {
      grid-column: 1 / -1;
      max-width: calc(230 * var(--u));
    }
  }
</style>
```

---

## 21. Motion architecture

### How it's layered

| Layer | Tool | What it does |
|---|---|---|
| Initial state | CSS (`motion.css`) | `.js [data-reveal] { visibility: hidden }`, only when JS runs and motion is allowed, so there's no flash and no hidden content if JS fails or motion is reduced |
| Scroll engine | Lenis → GSAP ticker → ScrollTrigger | One clock drives smooth scroll and every scroll-based animation |
| Entry reveals | GSAP + ScrollTrigger (+ SplitText) | `data-reveal="line" \| "img" \| "text"` on any element is all a component needs |
| Header | ScrollTrigger `scrub` | The "Projects / Index" bar slides up under the name |
| Hovers | CSS only | Row dimming with `:has()`, link opacity |
| Index preview | `gsap.quickTo` | A cursor-following thumbnail |
| Page transitions | Native View Transitions | Cross-fade, with the first thumbnail morphing into the project hero (`view-transition-name: <slug>-hero`) |
| Accessibility gate | `gsap.matchMedia('(prefers-reduced-motion: no-preference)')` | With reduced motion nothing animates and everything is visible |

### Rules for new motion

- Add `data-reveal="line|img|text"` in markup. Don't write one-off animations in components.
- New durations and easings go into **both** `tokens.css` and `tokens.ts`.
- Animate only `transform`, `opacity` and `clip-path`.
- Everything runs inside `mm.add(...)` in `index.ts` so reduced motion is respected and cleanup is automatic.
- Native View Transitions are a full page load, so scripts simply run again on every page with no re-init code. If you ever switch to Astro's `<ClientRouter />` (from `astro:transitions`), you must re-initialise motion on the `astro:page-load` event and destroy Lenis/ScrollTrigger on `astro:before-swap`.

**`src/scripts/motion/index.ts`**

```ts
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { initSmoothScroll } from './smooth-scroll';
import { initReveals } from './reveals';
import { initHeader } from './header';
import { initCursorPreview } from './cursor-preview';

gsap.registerPlugin(ScrollTrigger, SplitText);

// Everything runs only when the visitor allows motion.
// gsap.matchMedia() reverts all animations created inside if the preference changes.
const mm = gsap.matchMedia();
mm.add('(prefers-reduced-motion: no-preference)', () => {
  const destroyScroll = initSmoothScroll();
  initReveals();
  initHeader();
  const destroyCursor = initCursorPreview();

  return () => {
    destroyScroll();
    destroyCursor?.();
  };
});
```

**`src/scripts/motion/tokens.ts`**

```ts
// Mirrors the CSS motion tokens in src/styles/tokens.css
export const motion = {
  easeOut: 'power4.out', // ≈ cubic-bezier(.22, 1, .36, 1)
  easeLine: 'power2.inOut', // ≈ cubic-bezier(.65, 0, .35, 1)
  text: 0.6,
  img: 0.9,
  line: 1,
  stagger: 0.06,
  revealAt: 0.92, // a reveal fires when the element's top reaches 92% of the viewport
} as const;
```

**`src/scripts/motion/smooth-scroll.ts`**

```ts
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/** Gentle smooth scroll, synced with ScrollTrigger (pattern from the Lenis README). */
export function initSmoothScroll() {
  const lenis = new Lenis({ lerp: 0.1 });
  lenis.on('scroll', ScrollTrigger.update);

  const tick = (time: number) => lenis.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  // "Back to top" glides instead of jumping; without JS, #top still jumps natively
  const toTop = (event: MouseEvent) => {
    if (!(event.target as Element).closest('a[href="#top"]')) return;
    event.preventDefault();
    lenis.scrollTo(0);
  };
  document.addEventListener('click', toTop);

  return () => {
    document.removeEventListener('click', toTop);
    gsap.ticker.remove(tick);
    lenis.destroy();
  };
}
```

**`src/scripts/motion/reveals.ts`**

```ts
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { motion } from './tokens';

// Capped at the end of the page: blocks that can never rise to 92% of the viewport
// (the footer on tall screens) fire once the page is scrolled to the bottom.
const start = (self: ScrollTrigger) =>
  Math.min(
    (self.trigger as Element).getBoundingClientRect().top +
      window.scrollY -
      window.innerHeight * motion.revealAt,
    ScrollTrigger.maxScroll(window) - 1,
  );

export function initReveals() {
  // 1. Lines draw in left → right
  gsap.utils.toArray<HTMLElement>('[data-reveal="line"]').forEach((el) => {
    gsap.set(el, { visibility: 'visible' });
    gsap.from(el, {
      scaleX: 0,
      transformOrigin: '0% 50%',
      duration: motion.line,
      ease: motion.easeLine,
      scrollTrigger: { trigger: el, start, once: true },
    });
  });

  // 2. Images: clip-path mask opens upwards while the image settles (1.06 → 1)
  const imgs = gsap.utils.toArray<HTMLElement>('[data-reveal="img"]');
  gsap.set(imgs, { visibility: 'visible', clipPath: 'inset(100% 0% 0% 0%)' });
  ScrollTrigger.batch(imgs, {
    start,
    once: true,
    onEnter: (batch) => {
      gsap.to(batch, {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: motion.img,
        ease: motion.easeOut,
        stagger: motion.stagger,
      });
      gsap.fromTo(
        batch.map((el) => el.querySelector('img, video')).filter(Boolean),
        { scale: 1.06 },
        { scale: 1, duration: motion.img + 0.3, ease: motion.easeOut, stagger: motion.stagger },
      );
    },
  });

  // 3. Text: lines rise out of a mask
  gsap.utils.toArray<HTMLElement>('[data-reveal="text"]').forEach((el) => {
    gsap.set(el, { visibility: 'visible' });
    SplitText.create(el, {
      type: 'lines',
      mask: 'lines',
      autoSplit: true, // re-splits after fonts load / on resize
      onSplit(self) {
        return gsap.from(self.lines, {
          yPercent: 100,
          duration: motion.text,
          ease: motion.easeOut,
          stagger: 0.04,
          scrollTrigger: { trigger: el, start, once: true },
        });
      },
    });
  });
}
```

**`src/scripts/motion/header.ts`**

```ts
import { gsap } from 'gsap';

/** "Projects / Index" bar slides up under the header as you scroll (like the original). */
export function initHeader() {
  const bar = document.querySelector<HTMLElement>('[data-subheader]');
  if (!bar) return;
  gsap.to(bar, {
    y: () => -bar.offsetTop,
    ease: 'none',
    scrollTrigger: {
      start: 0,
      end: () => `+=${bar.offsetTop}`,
      scrub: true,
      invalidateOnRefresh: true,
    },
  });
}
```

**`src/scripts/motion/cursor-preview.ts`**

```ts
import { gsap } from 'gsap';

/** Index page: a thumbnail of the hovered project follows the cursor. */
export function initCursorPreview() {
  const list = document.querySelector<HTMLElement>('[data-index-list]');
  const preview = document.querySelector<HTMLElement>('[data-cursor-preview]');
  const img = preview?.querySelector('img');
  if (!list || !preview || !img || !matchMedia('(hover: hover)').matches) return;

  gsap.set(preview, { xPercent: 12, yPercent: -50 });
  const xTo = gsap.quickTo(preview, 'x', { duration: 0.45, ease: 'power3' });
  const yTo = gsap.quickTo(preview, 'y', { duration: 0.45, ease: 'power3' });

  const onMove = (e: PointerEvent) => {
    xTo(e.clientX);
    yTo(e.clientY);
  };
  const show = (e: Event) => {
    img.src = (e.currentTarget as HTMLElement).dataset.preview ?? '';
    gsap.to(preview, { autoAlpha: 1, duration: 0.25, overwrite: 'auto' });
  };
  const hide = () => gsap.to(preview, { autoAlpha: 0, duration: 0.25, overwrite: 'auto' });

  const links = list.querySelectorAll<HTMLElement>('[data-preview]');
  window.addEventListener('pointermove', onMove);
  links.forEach((a) => {
    a.addEventListener('pointerenter', show);
    a.addEventListener('pointerleave', hide);
  });

  return () => {
    window.removeEventListener('pointermove', onMove);
    links.forEach((a) => {
      a.removeEventListener('pointerenter', show);
      a.removeEventListener('pointerleave', hide);
    });
  };
}
```

### Motion ideas for later (same language)

| Idea | How |
|---|---|
| Numbers count in (`[01]` → `[06]`) on Index | A GSAP `textContent` tween with `snap: 1`, run once |
| Thumbnail hover on Home: slight zoom inside the mask | CSS `.thumb img { transition: transform .6s var(--ease-out) } .thumb:hover img { transform: scale(1.03) }` |
| Project page: images reveal as you scroll | Already covered by `data-reveal="img"` |
| "Next project" link at the end of each case study | A full-width line + `[NN] Next title`, morphing into the next hero with a View Transition |

---

## 22. Media pipeline

**Images.** Keep originals in `src/content/projects/<slug>/`. `<Image>` generates AVIF/WebP in several widths with a `srcset`. Crops are done with CSS (`object-fit: cover` in fixed-ratio boxes), so you never export cropped copies.

**GIFs → video.** About 71 MB of the export is GIFs. Convert them once:

**`scripts/gif-to-video.sh`**

```bash
#!/usr/bin/env bash
# Converts every GIF in media/gifs/ to MP4 (H.264) + WebM (VP9) in public/video/,
# and saves the first frame as a PNG poster you can put in src/content/projects/<slug>/.
# Requires ffmpeg (macOS: brew install ffmpeg).
set -euo pipefail
IN="media/gifs"
OUT="public/video"
mkdir -p "$OUT" media/posters

for gif in "$IN"/*.gif; do
  name="$(basename "$gif" .gif)"
  echo "→ $name"
  # even dimensions are required by H.264
  ffmpeg -loglevel error -y -i "$gif" -movflags +faststart -pix_fmt yuv420p \
    -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" -c:v libx264 -crf 23 -an "$OUT/$name.mp4"
  ffmpeg -loglevel error -y -i "$gif" -c:v libvpx-vp9 -b:v 0 -crf 34 -an "$OUT/$name.webm"
  ffmpeg -loglevel error -y -i "$gif" -frames:v 1 "media/posters/$name.png"
done
echo "Done. Reference a video in frontmatter with:  video: '<name>'"
```

The `Media` component plays the video muted and looping, uses the poster as a still image (and for reduced data), and falls back to MP4 where WebM isn't supported.

**Budgets:** keep the first image on a page under 200 KB, keep any video loop under 1.5 MB, and keep total page weight on first load under 1.5 MB.

---

## 23. Quality

| Check | Command | When |
|---|---|---|
| Types + Astro diagnostics | `npm run check` | Before every commit (also part of `build`) |
| Formatting | `npm run format` | Before every commit |
| Visual regression | `npm run test:visual` (first run: `npx playwright install chromium`, then `-- --update-snapshots`) | After layout changes |
| Lighthouse | Chrome DevTools → Lighthouse (aim for 95+ on Performance, Accessibility, Best Practices and SEO) | Before release |

**`playwright.config.ts`**

```ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'tests',
  webServer: { command: 'npm run preview', url: 'http://localhost:4321', reuseExistingServer: true },
  use: { baseURL: 'http://localhost:4321' },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1200, height: 913 } } },
    { name: 'phone', use: { ...devices['iPhone 13'] } },
  ],
});
```

**`tests/visual.spec.ts`**

```ts
import { test, expect } from '@playwright/test';

const pages = ['/', '/about/', '/projects/', '/projects/pc/'];

for (const path of pages) {
  test(`visual: ${path}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' }); // static, deterministic screenshots
    await page.goto(path);
    await page.evaluate(() => document.fonts.ready);
    await expect(page).toHaveScreenshot({ fullPage: true, maxDiffPixelRatio: 0.01 });
  });
}
```

**Accessibility checklist:** every image has real `alt` text in frontmatter; there's one `h1` per page (visually hidden where the design has none); there's a skip link and a visible `:focus-visible` outline; links are real `<a>` elements; reduced motion is honoured; and text contrast is black on white.

**Rebuild vs. legacy:** open `legacy/index.html` and `http://localhost:4321/` side by side at 1200px and 390px. Positions should match (for example, the first Home thumbnail starts at x ≈ 170, y ≈ 125 at 1200px wide).

---

## 24. Deploy

| Host | Build command | Output | Notes |
|---|---|---|---|
| Netlify | `npm run build` | `dist` | Set `NODE_VERSION=24` |
| Vercel | `npm run build` | `dist` | Detects Astro automatically |
| Cloudflare Pages | `npm run build` | `dist` | Set the Node version to 24 |

Set `site` in `astro.config.mjs` to the real domain, so canonical URLs, Open Graph and the sitemap are correct.

If the old export was ever online, redirect its URLs (Netlify `public/_redirects` shown below):

```
/index.html      /                  301
/about.html      /about/            301
/projects.html   /projects/         301
/pc.html         /projects/pc/      301
/kebeta.html     /projects/kebeta/  301
/on.html         /projects/on/      301
/salut.html      /projects/salut/   301
```

---

## 25. Migration roadmap

**Phase 1: Foundation (½ day)**
- [ ] Scaffold, install, add the config files (sections 15–16)
- [ ] Tokens, grid, base, fonts, motion CSS (section 17)
- [ ] `Base`, `Header`, an empty Home with the header matching the legacy one

**Phase 2: Content (1 day)**
- [ ] Move images into `src/content/projects/<slug>/` and convert the GIFs (section 22)
- [ ] Write `01`–`06` project files with real alt text (drafts for unfinished ones)
- [ ] Home rows, Index, project pages and About match legacy at 1200px and 390px

**Phase 3: Motion (½ day)**
- [ ] `motion/*` scripts, `data-reveal` on lines, images and text
- [ ] Thumbnail → hero View Transition, Index cursor preview
- [ ] Test with "Reduce motion" turned on in the OS

**Phase 4: Launch (½ day)**
- [ ] Real domain in `site`, OG image, favicon
- [ ] Playwright baselines, Lighthouse 95+
- [ ] Deploy, redirects, delete `legacy/` from the deployed build (keep it in git history)

---

## 26. Leveraging the portfolio (next features)

| Feature | Why it helps | How |
|---|---|---|
| **Case-study sections** | Clients and studios hire on thinking, not only images | Built without MDX: a `story` in the project's frontmatter (section 28). [01] P.C. is the first one |
| **Filter by discipline** on Index | Lets art-direction or UI recruiters find the relevant work fast | Disciplines already exist in the schema. Add `[All] [Branding] [UI]` links and hide rows with CSS/JS |
| **"Next project"** at the end of each case study | Keeps visitors moving through the work | Use `getProjects()` and take the next item |
| **Open Graph image per project** | Better previews when shared on LinkedIn, Telegram or Behance | Add an `og` image field to the schema and use it in `Base.astro` |
| **Contact / availability line** | Turns visits into enquiries | One line in the header or About: `[Open for projects — 2027]` |
| **Analytics** (Plausible or Umami) | See which projects get attention | One script tag, no cookie banner needed |
| **CMS** (Keystatic or Decap) | Add projects without touching code | Both work on the same Markdown files in git |
| **Languages** (EN / UA / ES) | Kyiv–Barcelona audience | Astro i18n routing: `/ua/…`, `/es/…` |

---

## 27. Version notes & gotchas

- **Astro 7** uses a stricter Rust compiler, so **every HTML tag must be closed**, with no auto-fixing of invalid markup.
- **Astro 7** changed `compressHTML` to `'jsx'` by default, which can remove spaces between inline elements. This project sets `compressHTML: true`.
- **Zod 4:** import `z` from `astro/zod` (not `astro:content`). `z.string().email()` is now `z.email()`.
- **Content collections:** `render(entry)` from `astro:content` (entries have no `.render()` method), and `entry.id` (not `slug`).
- **TypeScript:** stay on 6.x until `@astrojs/check` supports 7.
- **GSAP** 3.13+ includes SplitText in the public `gsap` package (`gsap/SplitText`), free for all use.
- **Lenis:** import `lenis/dist/lenis.css`, and keep `gsap.ticker.lagSmoothing(0)` so scroll animations don't lag.
- **Fonts:** until `public/fonts/` has the `.woff2` files, the build warns that `/fonts/...woff2 didn't resolve`. That's expected and harmless.
- **View Transitions** are progressive: in browsers without support, links simply navigate.

---

## 28. Case studies (`story`)

A project with a `story` in its frontmatter gets the case-study page (section 5); without one it keeps the simple image stack. Everything is data in `src/content/projects/NN-slug.md`, so the text can be edited there.

```yaml
story:
  paper: '#EBF1F7'          # page colour for the whole case (the work's background)
  hero: 'pc-mark'           # optional hand-built cover; default: the first gallery image
  sections:
    - title: 'Print'        # → "[04] Print", anchor #print
      text: >-
        One paragraph.
      paper: '#C3CED8'      # optional: page colour while this section is in view
      ink: '#EBF1F7'        # optional: text and line colour on dark paper
      blocks:
        - kind: image       # src, alt, video like the gallery
          src: './pc/cards.png'
          alt: '…'
          size: wide        # center (cols 3–6, default) · wide (2–7) · full (1–8)
          blend: false      # true: multiply, so a white background takes the paper colour
          notes:            # hairline callouts: x / y in % of the image, label in col 1 or 8
            - { x: 29.4, y: 37.1, side: left, label: 'Blind emboss' }
          lists:            # beside a centred image
            - { side: left, title: 'Handwriting', items: ['Take care', 'Approved'] }
        - kind: piece       # hand-built, registered in src/components/case/pieces.ts
          name: 'pc-flipbook'
          steps: ['Circle and square', '…']
```

**Building blocks**

| Piece | File | What it does |
|---|---|---|
| Section | `components/case/CaseSection.astro` | Line + `[NN] Title` + paragraph, then the blocks; carries `data-paper` / `data-ink` |
| Image | `components/case/Plate.astro` | One image or looping video with notes and lists; on phones notes become a list under it |
| Next project | `components/NextProject.astro` | Home-style row at the end of every project page |
| P.C. mark | `components/case/pc/PcMark.astro` | The logo as live SVG in the 552 × 264 space of the original artwork, with all nine states of its animation and optional construction lines. Glyphs traced from the original PNG (`pc/glyphs.ts`); handwriting and portrait come from `pattern.png`, the ear from `pc/ear.png` (a frame of the GIF) |
| P.C. cover / flipbook | `components/case/pc/PcHero.astro`, `PcFlipbook.astro` | The cover drawing; the scroll flipbook with a static storyboard for reduced motion |

**Motion hooks** (all in `src/scripts/motion/`)

| Attribute | Module | Effect |
|---|---|---|
| `data-reveal="draw"` | `reveals.ts` | SVG stroke draws along its path (DrawSVG). Use `vector-effect: non-scaling-stroke` + `stroke-width: var(--rule)` for 0.8px lines |
| `data-delay="0.4"` | `reveals.ts` | Holds a `line`, `draw` or `text` reveal back, e.g. until the page transition is over |
| `data-paper` / `data-ink` | `paper.ts` | Recolours the page while the section crosses the middle of the screen. Runs with or without motion (it's colour, not movement) |
| `data-sequence` | `sequence.ts` | Tall track with a sticky `[data-sequence-stage]`; sets `data-step="1…n"` on the stage and `data-current` on the matching `[data-sequence-label]` |
| `data-vt-next` | `transitions.ts` | Gives the next-project thumbnail its hero's view-transition name only when that project is being opened |
| `data-scroll-to` | `smooth-scroll.ts` | In-page link that glides with Lenis and moves focus to its target |

**Rules of thumb**

- **Match the paper to the rendered image**, not the PNG: WebP can shift a flat background by a level (P.C.'s pattern is `#F5F5F5` in the file and `#F6F6F6` on screen). Check with a screenshot.
- **Respect the source resolution.** Images from the original Readymag layouts are small; enlarge a vector (like the P.C. mark) rather than a raster. The flipbook mark stays 2 columns wide because its photo fills are only about 230px.
- **Write what the work shows.** Describe what is visible in the images; keep interpretation to a light touch and check claims with Iryna.
- A new hand-built piece goes in `src/components/case/<project>/`, is registered in `pieces.ts`, and gets its motion from the attributes above, never from a one-off script.
