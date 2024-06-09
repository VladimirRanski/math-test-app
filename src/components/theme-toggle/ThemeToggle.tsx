"use client";

import React, { useState, useEffect } from 'react';
import styles from './ThemeToggle.module.scss';

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // При монтировании проверяем сохраненную тему
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme); // Сохраняем тему
  };

  return (
    <button onClick={toggleTheme} className={styles.toggleButton}>
      Toggle Theme
    </button>
  );
};

export default ThemeToggle;
