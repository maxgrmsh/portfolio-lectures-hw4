import { ContactForm } from "./ContactForm";

/**
 * Секція «Заявка» (id: contact). Опис — docs/homepage.md, розділ «Заявка».
 * 375 і 768: одна колонка, форма під заголовком; 1024 і 1440: заголовок ліворуч, форма праворуч.
 */
export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="grid scroll-mt-8 gap-8 lg:grid-cols-2">
      <div className="flex flex-col gap-4">
        <h2 id="contact-title" className="font-mono text-heading text-ink">
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
