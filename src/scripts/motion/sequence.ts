import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Scroll flipbook: [data-sequence] is a tall track with a sticky stage. Scrolling through it
 * cuts between states, one per [data-sequence-label]: the stage gets data-step="1…n" (CSS shows
 * that state) and the current label gets data-current.
 */
export function initSequences() {
  document.querySelectorAll<HTMLElement>('[data-sequence]').forEach((track) => {
    const stage = track.querySelector<HTMLElement>('[data-sequence-stage]');
    const labels = [...track.querySelectorAll<HTMLElement>('[data-sequence-label]')];
    if (!stage || !labels.length) return;

    let current = labels.findIndex((l) => l.hasAttribute('data-current'));
    const show = (i: number) => {
      if (i === current) return;
      labels[current]?.removeAttribute('data-current');
      labels[i].setAttribute('data-current', '');
      stage.dataset.step = String(i + 1);
      current = i;
    };
    const stepAt = (progress: number) =>
      Math.min(labels.length - 1, Math.floor(progress * labels.length));

    const st = ScrollTrigger.create({
      trigger: track,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => show(stepAt(self.progress)),
    });
    show(stepAt(st.progress)); // the page may open mid-track (reload, back button)
  });
}
