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
