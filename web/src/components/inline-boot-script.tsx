/**
 * React 19 / Next App Router–safe inline boot script.
 * Runs as text/javascript during SSR HTML parse; becomes inert text/plain on the client
 * so React does not warn about script tags in the component tree.
 * @see https://nextjs.org/docs/app/guides/preventing-flash-before-hydration
 */
export function InlineBootScript({ id, html }: { id: string; html: string }) {
  return (
    <script
      id={id}
      type={typeof window === 'undefined' ? 'text/javascript' : 'text/plain'}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
