@AGENTS.md

# Портфоліо Максима Гармаша

## Стек

Next.js 16 (App Router) + TypeScript + Tailwind v4. Storybook 10 (`@storybook/nextjs-vite`) для компонентів.
Макет: Figma «HW-1 Example».

## Токени

Єдине джерело значень — блок `@theme` у `src/app/globals.css`. Шрифти — `src/app/fonts.ts` (next/font).
Перегляд усіх токенів: Storybook, `Foundations/Tokens` (`src/design-system/Tokens.mdx`).
Ролі кольору: `canvas`, `surface`, `line`, `accent`, `ink`, `ink-muted`, `danger`. Радіуси `rounded-control`, `rounded-card` (обидва 0). Відступи в компонентах — лише кроки 2, 3, 4, 6, 8. Для розкладки сторінок є ще `max-w-page` (1224px) і `section` (72px: `gap-section`, `pt-section`); у компонентах їх не використовуйте. Повні правила — у скілі `.claude/skills/storybook/SKILL.md`, розділ «Токени системи».

## Правила

- Одна гілка `main`; кожен пуш у `main` публікує сайт.
- Ширини курсу → префікси Tailwind: 375 — без префікса, 768 — md:, 1024 — lg:, 1440 — xl: (діє від 1280). sm: і 2xl: не використовуємо.
- Жодних hex, класів поза `@theme` і значень у квадратних дужках.
- Секції головної — `src/components/sections/`: це частини сторінки, не компоненти системи. Лише в них (і в `src/app`) можна `max-w-page` і `section`.

## Компоненти

Лежать у `src/components/<Назва>/`: компонент і історія `<Назва>.stories.tsx` з описом для docs.

- `Button` — кнопка або посилання-кнопка: `primary` (accent) і `secondary` (межа ink-muted), розміри `md` і `lg`, вимкнений стан з поясненням `disabledReason`.
- `TextField` — текстове поле з підписом над ним: помилка з іконкою й текстом danger (з прихованим префіксом «Помилка:»), підказка, вимкнений стан; `multiline` — багаторядкове, `autoComplete`, власний `id`.
- `WorkCard` — картка роботи: обкладинка, номер і назва, опис; уся картка — посилання.
- `Nav` — навігація: логотип, пункти з активним станом, кнопка праворуч; до 1024px (375 і 768) згортається в «Меню».

## Форма заявки

- Форма — `src/components/sections/ContactForm.tsx` (клієнтський компонент, `useActionState`), секція `#contact`.
- Серверна функція — `src/app/actions/contact.ts` (`sendContact`): перевіряє поля й поле-пастку `hp_check`, повертає введені значення разом із помилками, надсилає лист через Resend (`onboarding@resend.dev`, `replyTo` — пошта відвідувача, простий текст).
- Ключ — у змінній `RESEND_API_KEY`, пошта отримувача — `CONTACT_EMAIL`: обидві в `.env.local` (вставляє власник сам) і на Vercel (Production). Клієнт Resend створюється всередині функції.
- Будь-яка помилка надсилання — повідомлення про збій і `console.error` на сервері, не успіх.
- Файли `.env*` не читаємо й не відкриваємо: ні інструментом читання, ні командами.

## Картинки

Картинки компонентів імпортуються статично з `src/assets/` (`import cover from "@/assets/cases/training.jpg"`). Файли з `public/` у Storybook недоступні: `staticDirs` навмисно вимкнено, бо Storybook збирається в `public/storybook`.

## Скіли проєкту

- `storybook` — історії й документація компонентів, налаштування й збірка Storybook.
- `vercel` — превʼю й продакшн-деплой. Продакшн, пуш і злиття в `main` лише після «так» у чаті.

## Посилання

- План сайту: `docs/plan.html`.
- Опис головної сторінки (секції, `id`, поведінка на 375, 768, 1024, 1440): `docs/homepage.md`.
- Storybook: `/storybook` на живому сайті.
