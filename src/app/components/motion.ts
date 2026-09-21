/**
 * Motion constants mirroring the --ease-* / --dur-* tokens in globals.css.
 * Framer needs literal tuples, so the CSS variables can't be read directly.
 *
 * This is the single motion vocabulary for the whole site: sections import
 * from here rather than re-declaring curves, so a timing change lands once.
 */

export const EASE_SNAP: [number, number, number, number] = [0.2, 0, 0, 1];
export const EASE_MECH: [number, number, number, number] = [0.65, 0, 0.35, 1];
export const EASE_EXIT: [number, number, number, number] = [0.4, 0, 1, 1];

export const DUR = {
  d1: 0.12,
  d2: 0.18,
  d3: 0.26,
  d4: 0.38,
} as const;

/** Pads an index to the mono readout's two-digit format. */
export const pad2 = (n: number) => String(n).padStart(2, '0');

/**
 * The registration entrance for list items, as viewport-triggered props.
 *
 * Translate-only by design: content must ship legible in the static HTML. The
 * previous sitewide pattern started every item at `opacity: 0`, so a slow or
 * failed hydration left real copy invisible — measured at 14 such nodes on
 * /about alone. An item now ships readable and merely sits low.
 *
 * Under reduced motion this returns nothing at all, so the element renders at
 * its resting position instead of running a near-zero-duration animation.
 */
export const registerIn = (
  reduced: boolean,
  distance = 14,
  delay = 0,
  axis: 'x' | 'y' = 'y',
) => {
  if (reduced) return {};

  return {
    initial: axis === 'x' ? { x: distance } : { y: distance },
    whileInView: axis === 'x' ? { x: 0 } : { y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: DUR.d3, ease: EASE_SNAP, delay },
  };
};
