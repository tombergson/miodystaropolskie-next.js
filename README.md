# Miodystaropolskie.pl 🍯🌿

Oficjalny projekt nowoczesnej, performatywnej i w pełni responsywnej platformy internetowej **Miodystaropolskie.pl**. Strona łączy tradycyjne rzemiosło pszczelarskie z nowoczesnymi technologiami webowymi, oferując szybkie działanie, płynne animacje oraz system zarządzania treścią oparty na plikach Markdown.

<p align="left">
  <img src="https://img.shields.io/badge/Next.js-16.3.5-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19.2.8-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Framer_Motion-13.4.1-EF4444?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/Resend-API-000000?style=for-the-badge&logo=resend&logoColor=white" alt="Resend" />
</p>

---

## 🛠️ Stos Technologiczny

Projekt bazuje na sprawdzonych rozwiązaniach w ekosystemie JavaScript/TypeScript:

*   **Core:** 
    *   **Next.js (`v16.3.5`)** – framework React z architekturą App Router, SSR (Server-Side Rendering) i optymalizacją SEO.
    *   **React (`v19.2.8`)** – biblioteka interfejsu użytkownika.
    *   **TypeScript (`v5`)** – pełne bezpieczeństwo typów.
*   **Stylizacja i Interfejs:**
    *   **Tailwind CSS (`v4`)** z nowym procesorem `@tailwindcss/postcss` – szybkie, responsywne stylowanie.
    *   **Framer Motion (`v13.4.1`)** – zaawansowane animacje interfejsu, wejścia elementów oraz płynne przejścia.
*   **Zarządzanie treścią (Markdown CMS):**
    *   **Gray Matter (`v4.0.3`)** – parsowanie nagłówków frontmatter z plików `.md`.
    *   **React Markdown (`v10.1.0`)** wraz z wtyczkami *Remark* – renderowanie artykułów i opisów.
*   **Zabezpieczenia i Usługi:**
    *   **Cloudflare Turnstile** – ochrona formularzy przed botami.
    *   **Resend (`v6.28.1`)** – nowoczesne API do obsługi formularza kontaktowego i wysyłki powiadomień e-mail.
    *   **Sharp (`v0.35.4`)** – ultraszybkie narzędzie do przetwarzania i optymalizacji grafik.

---

## 📂 Architektura Projektu (Struktura katalogów)

```text
miodystaropolskie.pl/
├── 📁 app/                   # Routing aplikacji (Next.js App Router)
│   ├── 📁 [slug]/            # Dynamiczne podstrony ładowane z treści
│   ├── 📁 actions/           # Server Actions (logika formularzy i akcji backendowych)
│   ├── 📁 api/               # Endpointy API (np. obsługa wysyłki maili / Turnstile)
│   ├── 📁 kontakt/           # Strona kontaktowa z formularzem
│   ├── 📁 miody/             # Sekcja prezentacji miodów i produktów
│   ├── 📁 wydarzenia/        # Podstrona z aktualnościami i wydarzeniami pasiecznymi
│   ├── globals.css           # Globalne style i zmienne Tailwind
│   ├── layout.tsx            # Główny layout (SEO, Open Graph, ikony, ScrollToTop)
│   └── page.tsx              # Strona główna
├── 📁 components/            # Komponenty wielokrotnego użytku
│   ├── About.tsx             # Sekcja o pasiece
│   ├── Bees.tsx              # Sekcja dedykowana pszczołom / naturze
│   ├── ContactForm.tsx       # Formularz kontaktowy z walidacją
│   ├── ContactIcons.tsx      # Ikony kontaktowe / media społecznościowe
│   ├── CookieBanner.tsx      # Baner informacyjny o plikach cookies
│   ├── FavoriteSites.tsx     # Sekcja polecanych miejsc / linków
│   ├── Footer.tsx            # Stopka strony
│   ├── Header.tsx            # Pasek nawigacji głównej
│   ├── Hero.tsx              # Sekcja powitalna (Hero) z płynnym ładowaniem tła
│   ├── InitialLoader.tsx     # Płynny loader startowy aplikacji
│   ├── OrderBanner.tsx       # Baner zachęcający do zakupu miodu
│   ├── Products.tsx          # Prezentacja oferty miodów
│   ├── ScrollToTop.tsx       # Pływający przycisk powrotu na górę strony
│   ├── Socials.tsx           # Odnośniki społecznościowe
│   └── Turnstile.tsx         # Zabezpieczenie Cloudflare Turnstile
├── 📁 content/               # Źródła danych tekstowych (Markdown)
│   ├── 📁 honeys/            # Pliki .md z opisami poszczególnych miodów
│   ├── 📁 pages/             # Pliki .md dla podstron statycznych
│   └── 📁 posts/             # Pliki .md dla wpisów na blogu/wydarzeń
├── 📁 lib/                   # Logika pomocnicza i parsowanie danych
│   ├── 📁 validations/       # Schematy walidacji danych (np. Zod)
│   ├── honeys.ts             # Logika wczytywania i filtrowania miodów
│   ├── pages.ts              # Logika wczytywania podstron statycznych
│   ├── posts.ts              # Logika wczytywania artykułów
│   └── rateLimit.ts          # Zabezpieczenie przed nadużyciami (rate limiting)
└── 📁 public/                # Zasoby statyczne (favicons, grafika OG dla social mediów)
```

---

## ⚙️ Konfiguracja i Zmienne Środowiskowe

Aby projekt działał poprawnie lokalnie, utwórz plik **`.env.local`** w głównym katalogu projektu:

```env
# Klucz API do serwisu Resend (obsługa wysyłki maili)
RESEND_API_KEY=re_twoj_klucz_api_tutaj

# Adres e-mail odbiorcy wiadomości z formularza
CONTACT_RECIPIENT_EMAIL=kontakt@miodystaropolskie.pl

# Publiczny URL strony
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## 🚀 Uruchomienie projektu krok po kroku

1. **Sklonuj repozytorium** i przejdź do folderu z projektem.
2. **Zainstaluj wymagane zależności:**
   ```bash
   npm install
   ```
3. **Uruchom serwer deweloperski:**
   ```bash
   npm run dev
   ```
4. Otwórz w przeglądarce adres: **[http://localhost:3000](http://localhost:3000)**.

---

## 📦 Skrypty dostępne w package.json

*   `npm run dev` – Uruchamia aplikację w trybie deweloperskim z aktywnym Hot-Reloadingiem.
*   `npm run build` – Optymalizuje i buduje aplikację w wersji produkcyjnej.
*   `npm run start` – Uruchamia serwer produkcyjny na podstawie zbudowanych plików.
*   `npm run lint` – Sprawdza kod pod kątem błędów z użyciem ESLint.

---

## 🌐 Wdrożenie (Deployment)

Projekt jest w pełni przystosowany do szybkiego wdrożenia na platformie **Vercel**:
1. Połącz swoje repozytorium GitHub z kontem Vercel.
2. Zdefiniuj zmienne środowiskowe (`RESEND_API_KEY` itp.) w panelu Vercel w zakładce *Environment Variables*.
3. Vercel automatycznie wykryje ustawienia Next.js i przeprowadzi proces budowania (`npm run build`).