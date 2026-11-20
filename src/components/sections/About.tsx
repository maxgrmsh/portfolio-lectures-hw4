import { SectionHeader } from "./SectionHeader";

const facts = [
  { value: "7+ років", label: "у дизайні" },
  { value: "4 роки", label: "дизайнером у Ґвара Медіа" },
  { value: "ЦЕДЕМ", label: "тренер з автоматизації для журналістів" },
  { value: "Зараз", label: "GoIT" },
];

/**
 * Секція «Про мене» (id: about). Опис — docs/homepage.md, розділ «Про мене».
 * 375 і 768: текст, під ним факти; від 1024: текст ліворуч, факти праворуч.
 */
export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="flex scroll-mt-8 flex-col gap-8">
      <SectionHeader id="about-title" index="03" label="Про мене" title="Коротко про мене" />
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-section">
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
        <dl className="grid grid-cols-2 border-t-2 border-line">
          {facts.map((fact) => (
            // Підпис — термін (dt), число — значення (dd); візуально число зверху.
            <div key={fact.value} className="flex flex-col-reverse justify-end gap-2 border-b-2 border-line py-4 pr-4">
              <dt className="font-sans text-body text-ink-muted">{fact.label}</dt>
              <dd className="font-mono text-heading text-ink">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
