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
 * 375 і 768: кроки один під одним; 1024 і 1440: три в ряд однакової висоти.
 */
export function Process() {
  return (
    <section id="process" aria-labelledby="process-title" className="flex scroll-mt-8 flex-col gap-6">
      <h2 id="process-title" className="font-mono text-heading text-ink">
        Як я працюю
      </h2>
      <ol className="grid gap-6 lg:grid-cols-3">
        {steps.map((step) => (
          <li key={step.index} className="flex flex-col gap-3 rounded-card border-2 border-line bg-surface p-6">
            <span className="font-mono text-caption text-accent">{step.index}</span>
            <h3 className="font-mono text-title text-ink">{step.title}</h3>
            <p className="font-sans text-body text-ink-muted">{step.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
