# Polityka Bezpieczeństwa (Security Policy) – miodystaropolskie.pl
aktualizaja dokumentacji: 15.11.2026

Dokument ten opisuje wdrożone środki bezpieczeństwa, mechanizmy ochrony przed nadużyciami oraz konfigurację nagłówków HTTP w projekcie `miodystaropolskie.pl`.

---

## 1. Ochrona formularza kontaktowego i Server Actions

### Weryfikacja Cloudflare Turnstile
- **Walidacja po stronie serwera:** Token Turnstile jest weryfikowany w akcji serwerowej (`app/actions/contact.ts`) przez zapytanie do `https://challenges.cloudflare.com/turnstile/v0/siteverify`.
- **Kontrola domen (Hostname Management):** Serwer weryfikuje pole `hostname` zwracane przez Cloudflare na podstawie zmiennej środowiskowej `TURNSTILE_ALLOWED_HOSTNAMES`. Zapobiega to użyciu tokena wygenerowanego na innej domenie.
- **Jednorazowość tokenów:** Po każdej próbie wysyłki formularza stan tokena jest czyszczony, a widget Turnstile jest montowany ponownie (`key={turnstileKey}`), co zapobiega ponownemu wykorzystaniu tego samego tokena.
- **Stabilne callbacki:** Komponent `Turnstile.tsx` wykorzystuje referencje (`useRef`) dla callbacków, eliminując pętle renderowania i miganie widgetu.

### Ograniczenie liczby żądań (Rate Limiting)
- Każde żądanie wysłania formularza przechodzi przez kontrolę rate limit na podstawie adresu IP klienta (odczytywanego z nagłówków Cloudflare `cf-connecting-ip` lub `x-forwarded-for`).

### Walidacja i Sanityzacja Danych (Zod + Escaping)
- **Zod:** Dane wejściowe (`name`, `email`, `message`) są rygorystycznie walidowane przy użyciu schematu Zod przed jakimkolwiek zewnętrznym wywołaniem API.
- **Sanityzacja HTML:** Pola tekstowe w szablonach wiadomości e-mail (HTML) przechodzą przez funkcję `escapeHtml`, co zabezpiecza przed wstrzykiwaniem kodu w powiadomieniach e-mail.
- **Bezpieczny temat:** Nagłówek tematu wiadomości jest filtrowany pod kątem znaków końca linii (`\r\n`) w celu uniknięcia nagłówkowego injection (CRLF).

---

## 2. Ochrona przed Path Traversal i kontrola tras

- **Walidacja slugów (`lib/slug.ts`):** Wszystkie dynamiczne parametry wejściowe używane w loaderach treści (`getHoneyBySlug`, `getPageBySlug`, `getPostBySlug`) są weryfikowane pod kątem bezpiecznego wzorca (`/^[A-Za-z0-9][A-Za-z0-9_-]*$/`) o maksymalnej długości 100 znaków. Próby manipulacji ścieżką (np. `../`) są natychmiast odrzucane (`notFound()` / `null`).
- **Wyłączenie dynamicznych parametrów:** W dynamicznych trasach ustawiono `export const dynamicParams = false;`, co gwarantuje, że Next.js renderuje wyłącznie predefiniowane, znane slugi i odrzuca żądania dla nieznanych adresów, zwracając kod `404`.

---

## 3. Nagłówki bezpieczeństwa i polityka CSP

W pliku `next.config.ts` skonfigurowano rygorystyczne nagłówki HTTP:
- **Content-Security-Policy (CSP):** Ogranicza źródła skryptów i ramek wyłącznie do domeny własnej oraz oficjalnych zasobów Cloudflare Turnstile (`challenges.cloudflare.com`).
- **Strict-Transport-Security (HSTS):** Wymusza szyfrowane połączenie HTTPS przez rok (`max-age=31536000; includeSubDomains`).
- **Cross-Origin-Opener-Policy (COOP):** Ustawione na `same-origin` w celu izolacji kontekstu przeglądarki.
- **Ukrycie informacji o serwerze:** Usunięto nagłówek `X-Powered-By: Next.js`.

---

## 4. Zgłaszanie podatności (Security Disclosure)

Zgodnie z RFC 9116 pod adresem `/.well-known/security.txt` udostępniono dynamicznie generowany plik kontaktowy dla badaczy bezpieczeństwa. Wszelkie zauważone podatności prosimy zgłaszać bezpośrednio na adres kontaktowy wskazany w pliku.

aktualizaja dokumentacji: 15.11.2026
