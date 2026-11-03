import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Case studies: while a [data-paper] section crosses the middle of the screen, the page takes its
 * paper (and ink) colour, usually the background of its image, so the image's edges disappear
 * into the page. The colours fade with the body transition in motion.css.
 */
export function initPaper() {
  const sections = [...document.querySelectorAll<HTMLElement>('[data-paper]')];
  if (!sections.length) return;

  const { style } = document.body;
  const active = new Set<HTMLElement>();
  const apply = () => {
    const current = sections.filter((s) => active.has(s)).pop();
    if (current?.dataset.paper) style.setProperty('--paper', current.dataset.paper);
    else style.removeProperty('--paper');
    if (current?.dataset.ink) style.setProperty('--ink', current.dataset.ink);
    else style.removeProperty('--ink');
  };

  sections.forEach((section) =>
    ScrollTrigger.create({
      trigger: section,
      start: 'top 55%',
      end: 'bottom 55%',
      onToggle: (self) => {
        if (self.isActive) active.add(section);
        else active.delete(section);
        apply();
      },
    }),
  );
}
