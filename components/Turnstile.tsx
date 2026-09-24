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

export default function Turnstile({ onSuccess, onError, onExpire }: TurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  // Tutaj wpisujemy klucz publiczny bezpośrednio – jest bezpieczny, bo to klucz publiczny
  const siteKey = "0x4AAAAAAFCUbXy7QXHMc-Dw";

  useEffect(() => {
    if (!siteKey) {
      console.error("TurnstileError: Missing sitekey parameter.");
      return;
    }

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
            sitekey: siteKey,
            callback: (token: string) => onSuccess(token),
            "error-callback": () => onError?.(),
            "expired-callback": () => onExpire?.(),
            theme: "auto",
          });
        } catch (e) {
          console.error("Turnstile render error:", e);
        }
      }
    };

    let interval: NodeJS.Timeout | null = null;

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
          widgetIdRef.current = null;
        } catch (e) {}
      }
    };
  }, [siteKey, onSuccess, onError, onExpire]);

  return <div ref={containerRef} className="my-4" />;
}