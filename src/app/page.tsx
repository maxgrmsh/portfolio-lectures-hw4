import { Nav } from "@/components/Nav/Nav";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { Process } from "@/components/sections/Process";

// Пункти меню ведуть на якорі секцій: окремих сторінок ще немає (docs/homepage.md).
const navItems = [
  { label: "Як я працюю", href: "#process" },
  { label: "Про мене", href: "#about" },
  { label: "Контакти", href: "#contact" },
];

export default function Home() {
  return (
    <div className="min-h-dvh bg-grid px-4 md:px-8">
      <div className="mx-auto w-full max-w-page">
        <header id="nav">
          <Nav items={navItems} ctaLabel="Написати" ctaHref="#contact" />
        </header>

        {/* Секції по порядку з docs/homepage.md; відстань між ними — токен розкладки section. */}
        <main className="flex flex-col gap-section pb-section">
          <Hero />
          <Process />
          <About />
          <Contact />
        </main>

        <Footer />
      </div>
    </div>
  );
}
