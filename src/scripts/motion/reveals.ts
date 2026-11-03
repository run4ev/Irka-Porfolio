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

// data-delay="0.4" holds a reveal back (seconds), e.g. until the page transition has finished
const delayOf = (el: Element) => Number((el as HTMLElement).dataset.delay ?? 0);

export function initReveals() {
  // 1. Lines draw in left → right
  gsap.utils.toArray<HTMLElement>('[data-reveal="line"]').forEach((el) => {
    gsap.set(el, { visibility: 'visible' });
    gsap.from(el, {
      scaleX: 0,
      transformOrigin: '0% 50%',
      duration: motion.line,
      ease: motion.easeLine,
      delay: delayOf(el),
      scrollTrigger: { trigger: el, start, once: true },
    });
  });

  // 2. SVG strokes (construction lines, circles) draw along their path
  gsap.utils.toArray<SVGGeometryElement>('[data-reveal="draw"]').forEach((el) => {
    gsap.set(el, { visibility: 'visible' });
    gsap.from(el, {
      drawSVG: 0,
      duration: motion.line,
      ease: motion.easeLine,
      delay: delayOf(el),
      scrollTrigger: { trigger: el, start, once: true },
    });
  });

  // 3. Images: clip-path mask opens upwards while the image settles (1.06 → 1)
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

  // 4. Text: lines rise out of a mask
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
          delay: delayOf(el),
          scrollTrigger: { trigger: el, start, once: true },
        });
      },
    });
  });
}
