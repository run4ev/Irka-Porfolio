import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from './tokens';

/**
 * Sketchbook collage motion, scoped to one layout root
 * ('[data-collage]' on desktop, '[data-stack]' on phones).
 */
export function initSketchbook(rootSelector: string, opts: { parallax: boolean }) {
  const root = document.querySelector<HTMLElement>(rootSelector);
  if (!root) return;

  // 1. Pieces are "laid down": settle from a small tilt, 24px lower, fading in
  const layIn = (els: HTMLElement[], stagger = 0, delay = 0) =>
    gsap.fromTo(
      els,
      { autoAlpha: 0, y: 24, rotation: () => gsap.utils.random(-2, 2) },
      { autoAlpha: 1, y: 0, rotation: 0, duration: 0.9, ease: 'power3.out', stagger, delay },
    );

  root.querySelectorAll<HTMLElement>('[data-lay="art"], [data-lay="notes"]').forEach((el) => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      // notes arrive a beat later, as if just written
      onEnter: () => layIn([el], 0, el.dataset.lay === 'notes' ? 0.35 : 0),
    });
  });

  // grouped pieces (children's drawings) arrive together, staggered
  ScrollTrigger.batch(root.querySelectorAll<HTMLElement>('[data-lay="group"]'), {
    start: 'top 88%',
    once: true,
    onEnter: (batch) => layIn(batch as HTMLElement[], motion.stagger + 0.02),
  });

  // 2. Page background shifts to the block colour while the block is in view
  root.querySelectorAll<HTMLElement>('[data-bg-shift]').forEach((block) => {
    ScrollTrigger.create({
      trigger: block,
      start: 'top 60%',
      end: 'bottom 40%',
      onToggle: (self) => {
        document.body.style.setProperty('--shift', block.dataset.bgShift ?? '');
        document.body.classList.toggle('is-shifted', self.isActive);
      },
    });
  });

  // 3. Parallax (desktop only): each piece moves at its data-speed × scroll speed while it
  //    crosses the screen, and sits exactly at its Figma position when centred in the viewport.
  //    Lower layers are slower, pieces on top faster, so overlaps separate in depth.
  if (opts.parallax) {
    root.querySelectorAll<HTMLElement>('[data-speed]').forEach((el) => {
      const travel = () => (1 - Number(el.dataset.speed)) * (window.innerHeight + el.offsetHeight);
      gsap.fromTo(
        el,
        { y: () => -travel() / 2 },
        {
          y: () => travel() / 2,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
            invalidateOnRefresh: true,
          },
        },
      );
    });
  }

  return () => document.body.classList.remove('is-shifted');
}
