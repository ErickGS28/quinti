/** Quiet wash of mint, leaf and sky behind the top of a page. Place it inside a `relative isolate` container. */
export function PageWash() {
  return <div aria-hidden="true" className="page-wash pointer-events-none absolute inset-x-0 top-0 -z-10 h-[56rem]" />;
}
