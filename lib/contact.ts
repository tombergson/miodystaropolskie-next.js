import { z } from "zod";

// Bez znaków sterujących (w tym CR/LF) – pole trafia do tematu maila
const noControlChars = /^[^\u0000-\u001F\u007F]*$/;

// Treść wiadomości: dozwolone \t, \n, \r, reszta znaków sterujących zablokowana
const messageChars = /^[^\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]*$/;

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Imię musi mieć co najmniej 2 znaki.")
    .max(100, "Imię może mieć maksymalnie 100 znaków.")
    .regex(noControlChars, "Imię zawiera niedozwolone znaki."),
  email: z
    .string()
    .trim()
    .max(254, "Adres e-mail jest zbyt długi.")
    .email("Proszę podać poprawny adres e-mail."),
  message: z
    .string()
    .trim()
    .min(10, "Wiadomość musi mieć co najmniej 10 znaków.")
    .max(5000, "Wiadomość może mieć maksymalnie 5000 znaków.")
    .regex(messageChars, "Wiadomość zawiera niedozwolone znaki."),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;