import PcDefs from './pc/PcDefs.astro';
import PcHero from './pc/PcHero.astro';
import PcFlipbook from './pc/PcFlipbook.astro';

type Piece = (props: any) => any;

/** Hand-built case-study pieces, used by name in a project's `story` (`hero` or `kind: piece`). */
export const pieces: Record<string, Piece> = {
  'pc-mark': PcHero,
  'pc-flipbook': PcFlipbook,
};

/** SVG definitions shared by a project's pieces, rendered once on its page (keyed by project id). */
export const defs: Record<string, Piece> = {
  pc: PcDefs,
};
