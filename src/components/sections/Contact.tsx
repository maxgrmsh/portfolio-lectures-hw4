import { ContactForm } from "./ContactForm";

/**
 * Секція «Заявка» (id: contact). Опис — docs/homepage.md, розділ «Заявка».
 * Уся секція — картка з рамкою ink. 375 і 768: одна колонка, форма під заголовком;
 * 1024 і 1440: заголовок ліворуч, форма праворуч.
 */
export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="grid scroll-mt-8 gap-8 rounded-card border-2 border-ink bg-canvas p-4 md:p-8 lg:grid-cols-2 lg:gap-section"
    >
      <div className="flex flex-col gap-6">
        <p className="flex items-center gap-2 font-mono text-label uppercase text-accent">
          <span className="border-thin border-accent px-2 text-caption">04</span>
          <span>Заявка</span>
        </p>
        <h2 id="contact-title" className="font-mono text-headline text-ink">
          Розкажіть про задачу
        </h2>
        <p className="font-sans text-lead text-ink-muted">
          Можна без готового ТЗ: опишіть, який процес з&apos;їдає час і скільки людей у ньому.
        </p>
      </div>
      <ContactForm />
    </section>
  );
}
