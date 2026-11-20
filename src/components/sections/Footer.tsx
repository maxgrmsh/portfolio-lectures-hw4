const links = [
  { label: "Як я працюю", href: "#process" },
  { label: "Про мене", href: "#about" },
  { label: "Заявка", href: "#contact" },
];

const linkClass =
  "rounded-control font-mono text-label uppercase text-ink-muted underline-offset-8 decoration-2 hover:text-ink hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

/**
 * Футер головної (id: footer). Опис — docs/homepage.md, розділ «Футер».
 * 375: усе одне під одним; від 768: логотип і рік зліва, посилання в рядок справа.
 */
export function Footer() {
  return (
    <footer
      id="footer"
      className="flex flex-col gap-6 border-t-2 border-ink py-8 md:flex-row md:items-center md:justify-between"
    >
      <p className="flex items-center gap-2">
        <span className="font-mono text-heading text-ink">maxharmash</span>
        <span aria-hidden="true" className="h-5 w-3 bg-accent" />
        <span className="font-mono text-label uppercase text-ink-muted">© 2026</span>
      </p>
      <nav aria-label="Посилання у футері">
        <ul className="flex flex-col gap-4 md:flex-row md:gap-6">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className={linkClass}>
                {link.label}
              </a>
            </li>
          ))}
          <li>
            {/* Звичайне посилання, не next/link: Storybook — окремі статичні файли, не сторінка Next. */}
            <a href="/storybook" className={`${linkClass} underline`}>
              Дизайн-система в Storybook →
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  );
}
