"use client";

import { useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";

export default function LocaleWrapper({ children }) {
  const { locale, switchLocale } = useLanguage(); // This should work if wrapped by LanguageProvider

  // Sync locale with URL for manual routing
  useEffect(() => {
    const pathLocale = window.location.pathname.split("/")[1];
    if (pathLocale === "ar" || pathLocale === "en") {
      switchLocale(pathLocale);
    }
  }, []);

  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html dir={dir} lang={locale}>
      {children}
    </html>
  );
}