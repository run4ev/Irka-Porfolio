type SwapEvent = Event & { activation?: { entry?: { url?: string } } | null };

/**
 * The next-project thumbnail morphs into that project's hero, so it needs the hero's
 * view-transition name, but only when that project is the page being opened: Home has the
 * same name on its row and the two would pair up on every other navigation.
 */
export function initNextTransition() {
  const thumb = document.querySelector<HTMLAnchorElement>('[data-vt-next]');
  if (!thumb) return;
  window.addEventListener('pageswap', (event) => {
    const to = (event as SwapEvent).activation?.entry?.url;
    thumb.style.viewTransitionName = to === thumb.href ? (thumb.dataset.vtNext ?? '') : '';
  });
}
