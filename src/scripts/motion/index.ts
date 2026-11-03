import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { Flip } from 'gsap/Flip';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { initSmoothScroll } from './smooth-scroll';
import { initReveals } from './reveals';
import { initHeader } from './header';
import { initCursorPreview } from './cursor-preview';
import { initSketchbook } from './sketchbook';
import { initLightbox } from './lightbox';
import { initPaper } from './paper';
import { initSequences } from './sequence';
import { initNextTransition } from './transitions';

gsap.registerPlugin(ScrollTrigger, SplitText, Flip, DrawSVGPlugin);

// Everything runs only when the visitor allows motion.
// gsap.matchMedia() reverts all animations created inside if the preference changes.
const mm = gsap.matchMedia();
mm.add('(prefers-reduced-motion: no-preference)', () => {
  const destroyScroll = initSmoothScroll();
  initReveals();
  initHeader();
  initSequences();
  const destroyCursor = initCursorPreview();

  return () => {
    destroyScroll();
    destroyCursor?.();
  };
});

// Sketchbook: desktop collage (with parallax) and phone stack are separate layouts
mm.add('(prefers-reduced-motion: no-preference) and (min-width: 769px)', () =>
  initSketchbook('[data-collage]', { parallax: true }),
);
mm.add('(prefers-reduced-motion: no-preference) and (max-width: 768.98px)', () =>
  initSketchbook('[data-stack]', { parallax: false }),
);

// The lightbox works with or without motion (it just skips the Flip animation)
initLightbox();
// Case pages take each section's paper colour with or without motion (it's colour, not movement)
initPaper();
// Page transitions themselves are switched off by CSS when motion is reduced
initNextTransition();
