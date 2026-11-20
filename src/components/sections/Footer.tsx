/**
 * Футер головної (id: footer). Опис — docs/homepage.md, розділ «Футер».
 * 375: усе одне під одним; від 768: в один рядок.
 */
export function Footer() {
  return (
    <footer
      id="footer"
      className="flex flex-col gap-4 border-t-2 border-line py-6 md:flex-row md:items-center md:justify-between"
    >
      <p className="font-mono text-label uppercase text-ink-muted">maxharmash · © 2026</p>
      {/* Звичайне посилання, не next/link: Storybook — окремі статичні файли, не сторінка Next. */}
      <a
        href="/storybook"
        className="rounded-control font-mono text-label uppercase text-ink-muted underline decoration-2 underline-offset-8 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
      >
        Дизайн-система в Storybook →
      </a>
    </footer>
  );
}
