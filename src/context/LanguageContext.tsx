"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

// Типы для контекста языка
type Language = "en" | "ru";

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
};

// Создание контекста языка
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Провайдер контекста языка
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("ru");

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Хук для использования контекста языка
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
