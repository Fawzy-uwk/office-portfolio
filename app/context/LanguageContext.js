"use client";

import { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [locale, setLocale] = useState("en");

  const switchLocale = () => {

    setLocale(locale==="ar"? "en" : "ar");
  };

  return (
    <LanguageContext.Provider value={{ locale, switchLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);