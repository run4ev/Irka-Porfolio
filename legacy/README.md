# Iryna Runcheva — Portfolio (exported from Readymag)

Static HTML/CSS/JS copy of the Readymag project "Portfolio" (mag 5015850).
No build step and no dependencies.

## Run locally

Open index.html in a browser, or serve the folder (recommended, so lazy images and fonts load the same way as on a host):

    npx serve .
    # or
    python3 -m http.server 8000

## Pages

| File           | Readymag page        |
|----------------|----------------------|
| index.html     | 1. Home (works list) |
| about.html     | 2. about             |
| pc.html        | 3. 01. P.C.          |
| kebeta.html    | 4. 02. Kebeta        |
| on.html        | 5. 04. ON            |
| salut.html     | 6. 05. Salut         |
| projects.html  | 7. Index             |

## How it works

Every page keeps Readymag's absolute layout: a 1024px desktop canvas and a 320px phone canvas.
assets/js/main.js scales the canvas to the window width (like Readymag's scale mode),
switches to the phone layout below 769px, keeps the header fixed, slides the
"Projects / Index" bar away on scroll and fades in images that had a scroll animation.

- assets/css/style.css: layout engine styles
- assets/css/fonts.css + assets/fonts/: self-hosted Red Hat Display 400/500
- assets/images/: original, full-resolution images (crops are done in CSS)

To edit text, change it directly in the page HTML. Widget positions are inline
left/top/width/height values in canvas pixels.

## Notes

- salut.html has no phone layout in Readymag, so it shows the scaled desktop layout on phones (same as Readymag).
- Links that pointed to other Readymag pages now point to the local .html files.
