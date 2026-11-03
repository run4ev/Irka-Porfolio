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
    const colour = z.string().regex(/^#[0-9a-f]{6}$/i);
    const side = z.enum(['left', 'right']);

    // Case study: numbered sections, each a line + [NN] title + paragraph, then its blocks
    const block = z.discriminatedUnion('kind', [
      media.extend({
        kind: z.literal('image'),
        size: z.enum(['center', 'wide', 'full']).default('center'), // cols 3–6 · 2–7 · 1–8
        blend: z.boolean().default(false), // multiply, so a white background takes the paper colour
        // hairline callouts: a point on the image (% from left / top), label in column 1 or 8
        notes: z
          .array(
            z.object({
              x: z.number().min(0).max(100),
              y: z.number().min(0).max(100),
              side,
              label: z.string(),
            }),
          )
          .default([]),
        // short [NN] lists beside a centred image, e.g. words transcribed from the work
        lists: z
          .array(z.object({ side, title: z.string(), items: z.array(z.string()).min(1) }))
          .default([]),
      }),
      // a hand-built piece from src/components/case/pieces.ts
      z.object({
        kind: z.literal('piece'),
        name: z.string(),
        steps: z.array(z.string()).default([]),
      }),
    ]);
    const story = z.object({
      paper: colour.optional(), // page colour, taken from the work
      hero: z.string().optional(), // a hand-built piece instead of the first gallery image
      sections: z
        .array(
          z.object({
            title: z.string(),
            text: z.string(),
            paper: colour.optional(), // page colour while this section is in view
            ink: colour.optional(),
            blocks: z.array(block).default([]),
          }),
        )
        .min(1),
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
      story: story.optional(),
      draft: z.boolean().default(false),
    });
  },
});

// Sketchbook: one collage page. Coordinates come straight from the Figma frame.
const sketchbook = defineCollection({
  loader: glob({ base: './src/content/sketchbook', pattern: 'index.md' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      labels: z.array(z.string()),
      paper: z.string().default('#FEFBEE'),
      canvas: z.object({ w: z.number(), h: z.number() }),
      pieces: z.array(
        z.object({
          id: z.string(),
          node: z.string().optional(), // Figma node id, for re-exporting
          kind: z.enum(['art', 'notes', 'texture', 'scribble', 'block', 'group']).default('art'),
          src: image().optional(),
          color: z.string().optional(), // for kind: block
          bgShift: z.boolean().default(false),
          alt: z.string().default(''),
          x: z.number(),
          y: z.number(),
          w: z.number(),
          h: z.number(),
          z: z.number().int().default(1),
          speed: z.number().min(0.8).max(1.2).default(1),
          zoom: z.boolean().default(false),
          hold: z.boolean().default(false), // true = only visible in `astro dev`
          phone: z
            .object({
              hidden: z.boolean().default(false),
              w: z.number().optional(), // width on the 320 phone canvas; default 320
              align: z.enum(['start', 'end', 'bleed', 'bleed-start']).default('start'),
              group: z.enum(['block', 'grid-a', 'grid-b']).optional(),
            })
            .default({ hidden: false, align: 'start' }),
        }),
      ),
    }),
});

export const collections = { projects, sketchbook };
