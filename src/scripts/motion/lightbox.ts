import { Flip } from 'gsap/Flip';
import { lenis } from './smooth-scroll';

/** Click a painting → it grows into a full-screen view (GSAP Flip). Esc, click or scroll closes it. */
export function initLightbox() {
  const dialog = document.querySelector<HTMLDialogElement>('[data-lightbox]');
  const big = dialog?.querySelector<HTMLImageElement>('[data-lightbox-img]');
  if (!dialog || !big) return;

  const motionOK = () => matchMedia('(prefers-reduced-motion: no-preference)').matches;
  let source: HTMLImageElement | null = null;

  const open = (button: HTMLElement) => {
    source = button.querySelector('img');
    if (!source) return;
    source.dataset.flipId = 'zoom';
    big.dataset.flipId = 'zoom';
    big.alt = source.alt;
    big.src = button.dataset.full ?? source.currentSrc;

    const state = motionOK() ? Flip.getState(source) : null;
    lenis?.stop();
    dialog.showModal();
    if (state)
      Flip.from(state, { targets: big, duration: 0.6, ease: 'power3.inOut', absolute: true });
  };

  const close = () => {
    if (!dialog.open) return;
    const state = motionOK() && source ? Flip.getState(big) : null;
    dialog.close(); // focus returns to the button that opened it
    if (state && source) {
      Flip.from(state, {
        targets: source,
        duration: 0.5,
        ease: 'power3.inOut',
        absolute: true,
        zIndex: 50,
      });
    }
    lenis?.start();
  };

  document.addEventListener('click', (e) => {
    const button = (e.target as Element).closest<HTMLElement>('[data-zoom]');
    if (button) open(button);
  });
  dialog.addEventListener('click', close);
  dialog.addEventListener('wheel', close, { passive: true });
  dialog.addEventListener('cancel', (e) => {
    e.preventDefault(); // Esc: animate out instead of closing instantly
    close();
  });
}
