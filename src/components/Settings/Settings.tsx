"use client";

import React, { useState, useEffect } from "react";
import { Language, useLanguage } from "../../context/LanguageContext";
import { useTheme } from "../../context/ThemeContext";
import styles from "./Settings.module.scss";
import { SettingsProps } from '@/types';
import { translations } from '@/translations';

const Settings: React.FC<SettingsProps> = ({ onStart }) => {
  const [count, setCount] = useState(5);
  const [range, setRange] = useState(10);
  const [selectedOperators, setSelectedOperators] = useState<string[]>(["+", "-", "*", "/"]);
  const [testType, setTestType] = useState("arithmetic");
  const { language, setLanguage } = useLanguage();
  const { darkMode, setDarkMode } = useTheme();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const savedCount = localStorage.getItem("count");
    const savedRange = localStorage.getItem("range");
    const savedOperators = localStorage.getItem("operators");
    const savedLanguage = localStorage.getItem("language");
    const savedTestType = localStorage.getItem("testType");

    if (savedTheme) {
      setDarkMode(savedTheme === "dark");
    }
    if (savedCount) {
      setCount(parseInt(savedCount));
    }
    if (savedRange) {
      setRange(parseInt(savedRange));
    }
    if (savedOperators) {
      setSelectedOperators(savedOperators.split(","));
    }
    if (savedLanguage) {
      setLanguage(savedLanguage as Language);
    }
    if (savedTestType) {
      setTestType(savedTestType);
    }
  }, [setDarkMode, setLanguage]);

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
    localStorage.setItem("count", count.toString());
    localStorage.setItem("range", range.toString());
    localStorage.setItem("operators", selectedOperators.join(","));
    localStorage.setItem("language", language);
    localStorage.setItem("testType", testType);
  }, [darkMode, count, range, selectedOperators, language, testType]);

  const handleOperatorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedOperators((prev) =>
      event.target.checked ? [...prev, value] : prev.filter((op) => op !== value)
    );
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const encodedOperators = selectedOperators.map(op => encodeURIComponent(op));
    onStart(count, range, encodedOperators, testType);
  };

  const t = translations[language];

  return (
    <div className={styles.settings}>
      <button onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "Светлая тема" : "Темная тема"}
      </button>
      <button onClick={() => setLanguage(language === "en" ? "ru" : "en")}>
        {language === "en" ? "Русский" : "English"}
      </button>
      <form onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label>{t.numberOfQuestions}</label>
          <input
            type="number"
            value={count}
            onChange={(e) => setCount(parseInt(e.target.value))}
            min="1"
            required
          />
        </div>
        <div className={styles.field}>
          <label>{t.rangeOfNumbers}</label>
          <input
            type="number"
            value={range}
            onChange={(e) => setRange(parseInt(e.target.value))}
            min="1"
            required
          />
        </div>
        <div className={styles.field}>
          <label>{t.operators}</label>
          <div>
            {["+", "-", "*", "/"].map((operator) => (
              <label key={operator}>
                <input
                  type="checkbox"
                  value={operator}
                  checked={selectedOperators.includes(operator)}
                  onChange={handleOperatorChange}
                />
                {operator}
              </label>
            ))}
          </div>
        </div>
        <div className={styles.field}>
          <label>{t.testType}</label>
          <div>
            <label>
              <input
                type="radio"
                value="arithmetic"
                checked={testType === "arithmetic"}
                onChange={(e) => setTestType(e.target.value)}
              />
              {t.arithmetic}
            </label>
            <label>
              <input
                type="radio"
                value="multiple_choice"
                checked={testType === "multiple_choice"}
                onChange={(e) => setTestType(e.target.value)}
              />
              {t.multipleChoice}
            </label>
            <label>
              <input
                type="radio"
                value="comparison"
                checked={testType === "comparison"}
                onChange={(e) => setTestType(e.target.value)}
              />
              {t.comparison}
            </label>
          </div>
        </div>
        <button type="submit">{t.startTest}</button>
      </form>
    </div>
  );
};

export default Settings;
