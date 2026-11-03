# Iryna Runcheva — Portfolio

Static portfolio site built with Astro 7, GSAP + Lenis for motion, and native View Transitions.
It reproduces the Readymag layout on a real 8-column grid, with one Markdown file per project.

Design rules, tokens and the motion system are in [`docs/style-guide.md`](docs/style-guide.md).
The original Readymag export lives in `legacy/` as the visual reference. It is not part of the build.

## Requirements

- Node.js 24 LTS (see `.nvmrc`; anything ≥ 22.23.4 works)
- ffmpeg, only if you convert new GIFs (`brew install ffmpeg`)

## Commands

| Command               | What it does                                                          |
| --------------------- | --------------------------------------------------------------------- |
| `npm install`         | Install dependencies                                                  |
| `npm run dev`         | Dev server at http://localhost:4321 (drafts are visible)              |
| `npm run build`       | Type-check, then build the static site into `dist/`                   |
| `npm run preview`     | Serve the production build locally                                    |
| `npm run format`      | Format code with Prettier                                             |
| `npm run media:video` | Convert `media/gifs/*.gif` to MP4 + WebM in `public/video/`           |
| `npm run test:visual` | Playwright screenshots (first run: `npx playwright install chromium`) |

To view the legacy export next to the new site: `python3 -m http.server 8000 -d legacy`.

## Structure

```
src/
  content/projects/   one NN-slug.md per project + a folder with its images
  content/sketchbook/ index.md (collage positions from Figma) + pieces/ (exported artwork)
  components/         Header, Footer, LabelBlock, Media, ProjectRow, NextProject;
                      case/ (case-study sections, images with notes, hand-built pieces);
                      sketchbook/ (collage parts)
  layouts/Base.astro  <head>, meta/OG, header, footer, motion script
  pages/              /, /about/, /projects/, /projects/<slug>/, /sketchbook/
  scripts/motion/     GSAP reveals, Lenis, header bar, Index cursor preview, Sketchbook, lightbox
  styles/             tokens, grid, base, fonts, motion
  site.config.ts      name, role, description, e-mail, nav
media/gifs/           source GIFs (not shipped)
public/video/         generated looping videos (shipped)
public/fonts/         Red Hat Display
legacy/               Readymag export (reference only)
```

## Adding or editing a project

1. Create `src/content/projects/NN-slug.md` and a `slug/` folder for its images.
2. Fill in the frontmatter (see `01-pc.md`). Thumbnails are `portrait` (1 column) or `landscape`
   (2 columns), up to 7 columns per row. Every image needs real `alt` text.
3. The text below the frontmatter is the intro paragraph on the project page.
4. For an animation, put the GIF in `media/gifs/`, run `npm run media:video`, copy its first frame
   from `media/posters/` into the project folder, and add `video: '<name>'` to that item.
5. `draft: true` hides a project from the production build (it still shows in `npm run dev`).
6. For a full case study, add a `story` (numbered sections with text, images, notes and the page
   colour taken from the work). `01-pc.md` is the example; the format is in section 28 of the style
   guide. Without a `story`, the project page stays a simple image stack.

`03-kompany.md` and `06-soil-mix.md` are drafts because they had no project page in Readymag.

## Before publishing

- [ ] Set the real domain in `astro.config.mjs` (`site`); canonical URLs and the sitemap use it
- [ ] Add a favicon and an Open Graph image (`public/`, then reference them in `Base.astro`)
- [ ] Decide whether Kompany and Soil Mix should be published (`draft: false`)
- [ ] Sketchbook: clear the rights for the poster and "Hot Mess!" (`hold: true` keeps them out of
      the build), credit the children's drawings in the intro, and write the final intro text in
      `src/content/sketchbook/index.md`
- [ ] `npm run build` passes and `npm run preview` looks right at desktop and phone widths

## Deploy

The build output is a plain static folder, so any host works. Build command `npm run build`,
output directory `dist/`, Node 24.

- **Netlify / Vercel / Cloudflare Pages**: connect the git repository and use the settings above.
- **Your own server** (nginx, Apache, shared hosting): run `npm run build` and upload the contents
  of `dist/`. Pages are `folder/index.html`, so clean URLs like `/about/` work with default settings.
