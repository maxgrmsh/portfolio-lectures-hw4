"use client";

import { useActionState, useEffect, useRef } from "react";
import { sendContact, type ContactField, type ContactState } from "@/app/actions/contact";
import { Button } from "@/components/Button/Button";
import { TextField } from "@/components/TextField/TextField";

// Тексти — дослівно з таблиці текстів форми (заняття 7).
const TEXT = {
  name: "Ім'я",
  email: "Ваша пошта",
  message: "Повідомлення",
  messageHint: "до 1000 символів",
  submit: "Надіслати заявку",
  pending: "Надсилаю…",
  responseTime: "Відповідаю протягом одного робочого дня",
  summaryTitle: "Перевірте форму",
  success: "Дякую, заявку отримав. Відповім на вашу пошту протягом одного робочого дня",
  honeypot: "Не заповнюйте це поле",
};

const FIELD_ORDER: ContactField[] = ["name", "email", "message"];
const fieldId = (field: ContactField) => `contact-${field}`;

const initialState: ContactState = {
  status: "idle",
  errors: {},
  values: { name: "", email: "", message: "" },
  attempt: 0,
};

/**
 * Форма заявки: помилки показуються лише після натискання кнопки — зведенням над формою
 * і текстом біля поля. Введене не стирається: сервер повертає значення, поля беруть їх через defaultValue.
 */
export function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContact, initialState);
  const summaryRef = useRef<HTMLDivElement>(null);
  // Блокує повторне надсилання, поки триває попереднє: React ставить повторні сабміти в чергу.
  const submittingRef = useRef(false);

  useEffect(() => {
    submittingRef.current = false;
    if (state.status === "invalid") summaryRef.current?.focus();
  }, [state.attempt, state.status]);

  const errorFields = FIELD_ORDER.filter((field) => state.errors[field]);
  const sent = state.status === "sent";

  return (
    <div className="flex flex-col gap-6">
      {/* Контейнер є на сторінці завжди: так скрінрідер оголосить текст, що з'явиться в ньому. */}
      <div role="status" className="font-sans text-lead text-ink">
        {sent ? TEXT.success : null}
      </div>

      {!sent && (
        <form
          action={formAction}
          noValidate
          onSubmit={(event) => {
            if (submittingRef.current) {
              event.preventDefault();
              return;
            }
            submittingRef.current = true;
          }}
          className="flex flex-col gap-6"
        >
          {state.status === "failed" && state.failure && (
            <p role="alert" className="rounded-card border-2 border-danger bg-surface p-4 font-sans text-body text-danger">
              {state.failure}
            </p>
          )}

          {errorFields.length > 0 && (
            <div
              ref={summaryRef}
              tabIndex={-1}
              aria-labelledby="contact-summary-title"
              className="flex flex-col gap-3 rounded-card border-2 border-danger bg-surface p-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              <h3 id="contact-summary-title" className="font-mono text-title text-danger">
                {TEXT.summaryTitle}
              </h3>
              <ul className="flex flex-col gap-2">
                {errorFields.map((field) => (
                  <li key={field}>
                    <a
                      href={`#${fieldId(field)}`}
                      className="font-sans text-body text-danger underline decoration-2 underline-offset-4 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                    >
                      {state.errors[field]}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* key з номером відповіді: поля перемальовуються й беруть значення, які повернув сервер. */}
          <div key={state.attempt} className="flex flex-col gap-6">
            <TextField
              id={fieldId("name")}
              label={TEXT.name}
              name="name"
              autoComplete="name"
              defaultValue={state.values.name}
              hasError={Boolean(state.errors.name)}
              errorMessage={state.errors.name}
            />
            <TextField
              id={fieldId("email")}
              label={TEXT.email}
              name="email"
              type="email"
              autoComplete="email"
              defaultValue={state.values.email}
              hasError={Boolean(state.errors.email)}
              errorMessage={state.errors.email}
            />
            <TextField
              id={fieldId("message")}
              label={TEXT.message}
              name="message"
              multiline
              hint={TEXT.messageHint}
              defaultValue={state.values.message}
              hasError={Boolean(state.errors.message)}
              errorMessage={state.errors.message}
            />
          </div>

          {/* Пастка для ботів: не видно, не досяжна з клавіатури, прихована від скрінрідера. */}
          <div aria-hidden="true" className="sr-only">
            <label htmlFor="contact-hp">{TEXT.honeypot}</label>
            <input id="contact-hp" name="hp_check" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
          </div>

          <div className="flex flex-col items-stretch gap-3 md:items-start">
            {/* Під час надсилання кнопка вимкнена (Button ставить aria-disabled і type="button"), а onSubmit вище скасовує повторне надсилання. */}
            <Button type="submit" size="lg" disabled={pending}>
              {pending ? TEXT.pending : TEXT.submit}
            </Button>
            <p className="font-sans text-caption text-ink-muted">{TEXT.responseTime}</p>
          </div>
        </form>
      )}
    </div>
  );
}
