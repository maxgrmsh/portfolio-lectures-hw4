import Image from "next/image";
import { Button } from "@/components/Button/Button";
import arrow from "@/assets/home/arrow.svg";
import portrait from "@/assets/home/portrait.jpg";

/** Перший екран головної (id: hero). Опис — docs/homepage.md, розділ «Перший екран». */
export function Hero() {
  return (
    <section id="hero" className="flex scroll-mt-8 flex-col gap-8 pt-8 md:pt-section lg:flex-row lg:gap-section">
      <div className="flex min-w-0 flex-1 flex-col gap-6">
        <p className="flex items-start gap-2 font-mono text-label uppercase text-accent">
          <span className="shrink-0 border-thin border-accent px-2 text-caption">01</span>
          <span>AI-автоматизація · медіа й команди</span>
        </p>

        <h1 className="font-mono text-display text-ink">
          Автоматизую рутинні процеси медіа й невеликих команд з AI та агентами
        </h1>

        <p className="max-w-xl font-sans text-lead text-ink-muted">
          Щоб люди ставили задачі й ухвалювали рішення, а рутину робили агенти.
        </p>

        {/* 375: кнопки на всю ширину одна під одною; від 768 — в рядок. */}
        <div className="grid gap-4 md:flex md:flex-wrap">
          <Button href="#contact" size="lg">
            Розказати про задачу →
          </Button>
          <Button href="#process" variant="secondary" size="lg">
            Як я працюю
          </Button>
        </div>
      </div>

      {/* До 1024px фото на всю ширину в горизонтальному кадрі, ширше — вертикальна колонка праворуч. */}
      <div className="relative w-full shrink-0 lg:w-xs lg:pt-4">
        <Image
          src={portrait}
          alt="Максим Гармаш у горах, у капелюсі й сонцезахисних окулярах"
          sizes="(min-width: 1024px) 320px, 100vw"
          placeholder="blur"
          priority
          className="aspect-4/3 w-full object-cover md:aspect-video lg:aspect-portrait"
        />

        {/* Рукописна нотатка зі стрілкою: лише на широкому екрані, де вона вміщається між текстом і фото. */}
        <div aria-hidden="true" className="absolute top-1/2 right-full mr-2 hidden flex-col items-start gap-2 lg:flex">
          <Image src={arrow} alt="" unoptimized />
          <span className="-rotate-6 font-hand text-hand whitespace-nowrap text-accent">це головне!</span>
        </div>
      </div>
    </section>
  );
}
