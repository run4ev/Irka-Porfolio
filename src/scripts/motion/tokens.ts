// Mirrors the CSS motion tokens in src/styles/tokens.css
export const motion = {
  easeOut: 'power4.out', // ≈ cubic-bezier(.22, 1, .36, 1)
  easeLine: 'power2.inOut', // ≈ cubic-bezier(.65, 0, .35, 1)
  text: 0.6,
  img: 0.9,
  line: 1,
  paper: 0.6,
  stagger: 0.06,
  revealAt: 0.92, // a reveal fires when the element's top reaches 92% of the viewport
} as const;
