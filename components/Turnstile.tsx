"use client";

import { useEffect, useRef } from "react";

interface TurnstileProps {
  siteKey: string;
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
    };
  }
}

export default function Turnstile({ siteKey, onSuccess, onError, onExpire }: TurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Ładowanie skryptu Cloudflare Turnstile, jeśli jeszcze nie ma go na stronie
    if (!document.getElementById("cloudflare-turnstile-script")) {
      const script = document.createElement("script");
      script.id = "cloudflare-turnstile-script";
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }

    let widgetId: string | null = null;

    const initTurnstile = () => {
      if (window.turnstile && containerRef.current && !widgetId) {
        widgetId = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          callback: (token: string) => onSuccess(token),
          "error-callback": () => onError?.(),
          "expired-callback": () => onExpire?.(),
          theme: "auto",
        });
      }
    };

    if (window.turnstile) {
      initTurnstile();
    } else {
      const interval = setInterval(() => {
        if (window.turnstile) {
          clearInterval(interval);
          initTurnstile();
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, [siteKey, onSuccess, onError, onExpire]);

  return <div ref={containerRef} className="my-4" />;
}