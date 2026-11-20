"use server";

import { Resend } from "resend";

/** Ліміт повідомлення: той самий, що в підказці під полем («до 1000 символів»). */
const MESSAGE_LIMIT = 1000;

/** Поля форми, які бачить людина. Поле-пастка для ботів (hp_check) сюди не входить. */
export type ContactField = "name" | "email" | "message";

export type ContactValues = Record<ContactField, string>;

export type ContactState = {
  /** idle — ще не надсилали; invalid — є помилки полів; sent — успіх; failed — збій надсилання. */
  status: "idle" | "invalid" | "sent" | "failed";
  /** Текст збою з запасною поштою; лише коли status — failed. */
  failure?: string;
  /** Тексти помилок по полях, у порядку полів форми. */
  errors: Partial<Record<ContactField, string>>;
  /** Введені значення: React 19 скидає некеровані поля після action, тож повертаємо їх назад. */
  values: ContactValues;
  /** Лічильник відповідей: форма переводить фокус на зведення лише після нової відповіді. */
  attempt: number;
};

// Тексти — дослівно з таблиці текстів форми (заняття 7).
const ERRORS = {
  nameEmpty: "Введіть ім'я",
  emailEmpty: "Введіть вашу пошту",
  emailFormat: "Введіть пошту у форматі name@example.com",
  messageEmpty: "Напишіть, який процес хочете автоматизувати",
  messageTooLong: "Повідомлення має бути не довшим за 1000 символів",
};

const EMAIL_FORMAT = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function read(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

/** Перевіряє поля. Ті самі перевірки, що бачить людина: сервер не довіряє браузеру. */
function validate(values: ContactValues) {
  const errors: ContactState["errors"] = {};
  if (!values.name) errors.name = ERRORS.nameEmpty;
  if (!values.email) errors.email = ERRORS.emailEmpty;
  else if (!EMAIL_FORMAT.test(values.email)) errors.email = ERRORS.emailFormat;
  if (!values.message) errors.message = ERRORS.messageEmpty;
  else if (values.message.length > MESSAGE_LIMIT) errors.message = ERRORS.messageTooLong;
  return errors;
}

/**
 * Серверна функція форми заявки (секція contact).
 * Перевіряє поля й пастку, потім надсилає лист через Resend.
 * Ключ — RESEND_API_KEY, пошта отримувача — CONTACT_EMAIL (обидві змінні в .env.local і на Vercel).
 */
export async function sendContact(prev: ContactState, formData: FormData): Promise<ContactState> {
  const values: ContactValues = {
    name: read(formData, "name"),
    email: read(formData, "email"),
    message: read(formData, "message"),
  };
  const attempt = prev.attempt + 1;

  // Пастка заповнена — це бот: відповідаємо як на успіх, але нічого не робимо.
  if (read(formData, "hp_check")) {
    return { status: "sent", errors: {}, values: { name: "", email: "", message: "" }, attempt };
  }

  const errors = validate(values);
  if (Object.keys(errors).length > 0) {
    return { status: "invalid", errors, values, attempt };
  }

  const to = process.env.CONTACT_EMAIL;
  // Текст збою — з таблиці текстів форми, із запасною поштою.
  const failure = `Заявка не надіслалась. Спробуйте ще раз або напишіть мені на ${to ?? ""}`;

  // Будь-яка помилка (немає ключа чи пошти, виняток, error у відповіді Resend) — збій, а не успіх.
  try {
    if (!to) throw new Error("Missing CONTACT_EMAIL");
    // Клієнт створюємо тут, а не на рівні файлу: без ключа конструктор кидає виняток,
    // і на рівні файлу це ламало б усю сторінку замість повідомлення про збій.
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: "Портфоліо <onboarding@resend.dev>",
      to,
      replyTo: values.email,
      subject: `Заявка з сайту від ${values.name}`,
      text: `Ім'я: ${values.name}\nПошта: ${values.email}\nПовідомлення: ${values.message}`,
    });
    if (error) {
      console.error("Resend повернув помилку:", error.name, error.message);
      return { status: "failed", failure, errors: {}, values, attempt };
    }
  } catch (err) {
    console.error("Заявка не надіслалась:", err instanceof Error ? err.message : err);
    return { status: "failed", failure, errors: {}, values, attempt };
  }

  return { status: "sent", errors: {}, values: { name: "", email: "", message: "" }, attempt };
}
