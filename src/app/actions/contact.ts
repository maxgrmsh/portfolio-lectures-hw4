"use server";

/** Ліміт повідомлення: той самий, що в підказці під полем («до 1000 символів»). */
const MESSAGE_LIMIT = 1000;

/** Назва поля-пастки для ботів. Нейтральна, щоб браузер не підставив туди дані автозаповненням. */
export type ContactField = "name" | "email" | "message";

export type ContactValues = Record<ContactField, string>;

export type ContactState = {
  /** idle — ще не надсилали; invalid — є помилки полів; sent — успіх; failed — збій надсилання. */
  status: "idle" | "invalid" | "sent" | "failed";
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
 * Поки лише перевіряє поля й пастку і повертає успіх; лист не надсилає.
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

  return { status: "sent", errors: {}, values: { name: "", email: "", message: "" }, attempt };
}
