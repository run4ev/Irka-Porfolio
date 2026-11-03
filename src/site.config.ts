import { withBase } from './lib/paths';

const name = 'Iryna Runcheva';
const role = ['Brand designer', '& art director']; // line breaks for one-column blocks

export const site = {
  name,
  role,
  title: `${name} — ${role.join(' ')}`,
  description:
    'Brand designer and art director crafting distinctive visual identities and strong brand stories.',
  email: 'irkakratz@gmail.com',
  nav: [
    { label: 'Works', href: withBase('/') },
    { label: 'Sketchbook', href: withBase('/sketchbook/') },
    { label: 'About', href: withBase('/about/') },
  ],
} as const;
