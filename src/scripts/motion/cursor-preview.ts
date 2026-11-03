import { gsap } from 'gsap';

/** Index page: a thumbnail of the hovered project follows the cursor. */
export function initCursorPreview() {
  const list = document.querySelector<HTMLElement>('[data-index-list]');
  const preview = document.querySelector<HTMLElement>('[data-cursor-preview]');
  const img = preview?.querySelector('img');
  if (!list || !preview || !img || !matchMedia('(hover: hover)').matches) return;

  gsap.set(preview, { xPercent: 12, yPercent: -50 });
  const xTo = gsap.quickTo(preview, 'x', { duration: 0.45, ease: 'power3' });
  const yTo = gsap.quickTo(preview, 'y', { duration: 0.45, ease: 'power3' });

  const onMove = (e: PointerEvent) => {
    xTo(e.clientX);
    yTo(e.clientY);
  };
  const show = (e: Event) => {
    img.src = (e.currentTarget as HTMLElement).dataset.preview ?? '';
    gsap.to(preview, { autoAlpha: 1, duration: 0.25, overwrite: 'auto' });
  };
  const hide = () => gsap.to(preview, { autoAlpha: 0, duration: 0.25, overwrite: 'auto' });

  const links = list.querySelectorAll<HTMLElement>('[data-preview]');
  window.addEventListener('pointermove', onMove);
  links.forEach((a) => {
    a.addEventListener('pointerenter', show);
    a.addEventListener('pointerleave', hide);
  });

  return () => {
    window.removeEventListener('pointermove', onMove);
    links.forEach((a) => {
      a.removeEventListener('pointerenter', show);
      a.removeEventListener('pointerleave', hide);
    });
  };
}
