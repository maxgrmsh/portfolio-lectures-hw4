/**
 * Секція «Про мене» (id: about). Опис — docs/homepage.md, розділ «Про мене».
 * 375: текст на всю ширину; від 768: ширина тексту обмежена (max-w-xl, 576px).
 */
export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="flex scroll-mt-8 flex-col gap-6">
      <h2 id="about-title" className="font-mono text-heading text-ink">
        Коротко про мене
      </h2>
      <div className="flex flex-col gap-4 font-sans text-lead text-ink md:max-w-xl">
        <p>
          Понад 7 років у дизайні, з них 4 роки дизайнером у Ґвара Медіа, зараз — у GoIT. Тому знаю, як працює
          редакція, зсередини.
        </p>
        <p>
          Чесно: професійно кодити не вмію. Але збираю робочі інструменти з AI та агентами й навчаю цього команди,
          зокрема журналістів на тренінгах ЦЕДЕМ.
        </p>
      </div>
    </section>
  );
}
