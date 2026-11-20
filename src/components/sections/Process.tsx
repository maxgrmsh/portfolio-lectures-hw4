import { SectionHeader } from "./SectionHeader";

const steps = [
  {
    index: "01",
    title: "Розбираю ваш процес",
    text: "Дивлюся, як задача проходить через команду, і шукаю кроки, які щодня повторюються руками.",
  },
  {
    index: "02",
    title: "Збираю пілот з агентами",
    text: "Автоматизую один процес, а не все одразу, щоб команда побачила результат за тиждень-два.",
  },
  {
    index: "03",
    title: "Навчаю й передаю",
    text: "Пояснюю команді, як працює інструмент, і лишаю інструкцію. Рішення лишаються за людьми.",
  },
];

/**
 * Секція «Як я працюю» (id: process). Опис — docs/homepage.md, розділ «Як я працюю».
 * Кроки — рядки один під одним. 375: номер, назва й опис стовпчиком;
 * від 768: номер, назва й опис у рядок.
 */
export function Process() {
  return (
    <section id="process" aria-labelledby="process-title" className="flex scroll-mt-8 flex-col gap-8">
      <SectionHeader id="process-title" index="02" label="Процес" title="Як я працюю">
        Три кроки від першої розмови до інструмента, яким команда користується сама.
      </SectionHeader>
      <ol className="flex flex-col">
        {steps.map((step) => (
          <li
            key={step.index}
            className="group grid gap-3 border-b-2 border-line py-6 transition-colors first:border-t-2 hover:border-ink md:grid-cols-12 md:items-baseline md:gap-6"
          >
            <span className="font-mono text-display text-accent md:col-span-2">{step.index}</span>
            <h3 className="font-mono text-heading text-ink md:col-span-4">{step.title}</h3>
            <p className="font-sans text-lead text-ink-muted md:col-span-6">{step.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
