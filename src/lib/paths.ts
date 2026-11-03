/** Prefix a site-root path with Astro's configured `base` (needed on GitHub Pages). */
export function withBase(path = '/') {
  const suffix = path.startsWith('/') ? path.slice(1) : path;
  return `${import.meta.env.BASE_URL}${suffix}`;
}
