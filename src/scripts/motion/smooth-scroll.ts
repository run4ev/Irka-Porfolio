import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/** The running Lenis instance (null when motion is reduced). Other modules can stop/start it. */
export let lenis: Lenis | null = null;

/** Gentle smooth scroll, synced with ScrollTrigger (pattern from the Lenis README). */
export function initSmoothScroll() {
  const instance = new Lenis({ lerp: 0.1 });
  lenis = instance;
  instance.on('scroll', ScrollTrigger.update);

  const tick = (time: number) => instance.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  // "Back to top" and in-page [data-scroll-to] links glide instead of jumping;
  // without JS they still jump natively
  const glide = (event: MouseEvent) => {
    const link = (event.target as Element).closest<HTMLAnchorElement>(
      'a[href="#top"], a[data-scroll-to]',
    );
    if (!link) return;
    const hash = link.getAttribute('href') ?? '';
    const target = hash === '#top' ? null : document.getElementById(hash.slice(1));
    if (hash !== '#top' && !target) return;
    event.preventDefault();
    if (!target) return instance.scrollTo(0);
    // Lenis already honours the target's scroll-margin-top
    instance.scrollTo(target, { onComplete: () => target.focus({ preventScroll: true }) });
  };
  document.addEventListener('click', glide);

  return () => {
    document.removeEventListener('click', glide);
    gsap.ticker.remove(tick);
    instance.destroy();
    lenis = null;
  };
}
