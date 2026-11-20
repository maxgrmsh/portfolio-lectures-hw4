import type { ReactNode } from "react";

export interface SectionHeaderProps {
  /** id заголовка: на нього посилається aria-labelledby секції. */
  id: string;
  /** Номер секції на сторінці («02»), продовжує мітку «01» першого екрана. */
  index: string;
  /** Коротка мітка над заголовком. */
  label: string;
  /** Заголовок секції. */
  title: string;
  /** Підзаголовок: на 1024 і ширше стоїть праворуч від заголовка. */
  children?: ReactNode;
}

/**
 * Шапка секції головної: лінія зверху, номер і мітка моноширинним, великий заголовок.
 * 375 і 768: усе одне під одним; від 1024 підзаголовок праворуч.
 */
export function SectionHeader({ id, index, label, title, children }: SectionHeaderProps) {
  return (
    <div className="flex flex-col gap-6 border-t-2 border-ink pt-6 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
      <div className="flex flex-col gap-4">
        <p className="flex items-center gap-2 font-mono text-label uppercase text-accent">
          <span className="border-thin border-accent px-2 text-caption">{index}</span>
          <span>{label}</span>
        </p>
        <h2 id={id} className="font-mono text-headline text-ink">
          {title}
        </h2>
      </div>
      {children && <div className="font-sans text-lead text-ink-muted lg:max-w-md">{children}</div>}
    </div>
  );
}
