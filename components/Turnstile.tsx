"use client";

import { useEffect, useRef } from "react";

interface TurnstileProps {
  onSuccess: (token: string) => void;
  onError?: () => void;
  onExpire?: () => void;
}

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement | string, options: {
        sitekey: string;
        callback: (token: string) => void;
        "error-callback"?: () => void;
        "expired-callback"?: () => void;
        theme?: "light" | "dark" | "auto";
      }) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

// Klucz publiczny. W dev testowy klucz Cloudflare (zawsze przechodzi).
const SITE_KEY =
  process.env.NODE_ENV === "development"
    ? "1x00000000000000000000AA"
    : "0x4AAAAAAFCUbXy7QXHMc-Dw";

export default function Turnstile({ onSuccess, onError, onExpire }: TurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  // Najnowsze callbacki w refach: zmiana ich tożsamości nie odtwarza widgetu
  const onSuccessRef = useRef(onSuccess);
  const onErrorRef = useRef(onError);
  const onExpireRef = useRef(onExpire);

  useEffect(() => {
    onSuccessRef.current = onSuccess;
    onErrorRef.current = onError;
    onExpireRef.current = onExpire;
  });

  useEffect(() => {
    if (!document.getElementById("cloudflare-turnstile-script")) {
      const script = document.createElement("script");
      script.id = "cloudflare-turnstile-script";
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }

    const initTurnstile = () => {
      if (window.turnstile && containerRef.current && !widgetIdRef.current) {
        try {
          widgetIdRef.current = window.turnstile.render(containerRef.current, {
            sitekey: SITE_KEY,
            callback: (token: string) => onSuccessRef.current(token),
            "error-callback": () => onErrorRef.current?.(),
            "expired-callback": () => onExpireRef.current?.(),
            theme: "auto",
          });
        } catch (e) {
          console.error("Turnstile render error:", e);
        }
      }
    };

    let interval: ReturnType<typeof setInterval> | null = null;

    if (window.turnstile) {
      initTurnstile();
    } else {
      interval = setInterval(() => {
        if (window.turnstile) {
          if (interval) clearInterval(interval);
          initTurnstile();
        }
      }, 100);
    }

    return () => {
      if (interval) clearInterval(interval);
      if (window.turnstile && widgetIdRef.current) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
          // widget mógł już zostać usunięty
        }
      }
      widgetIdRef.current = null;
    };
  }, []);

  return <div ref={containerRef} className="my-4" />;
}