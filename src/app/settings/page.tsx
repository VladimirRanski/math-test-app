'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../../styles/Settings.module.scss';

const Settings: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('ru');

  const handleDarkModeChange = () => setDarkMode(!darkMode);
  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => setLanguage(event.target.value);

  return (
    <div className={styles.settings}>
      <h2>Настройки</h2>
      <div className={styles.option}>
        <label>Темная тема:</label>
        <input type="checkbox" checked={darkMode} onChange={handleDarkModeChange} />
      </div>
      <div className={styles.option}>
        <label>Язык:</label>
        <select value={language} onChange={handleLanguageChange}>
          <option value="ru">Русский</option>
          <option value="en">Английский</option>
        </select>
      </div>
      <Link href="/">Назад</Link>
    </div>
  );
};

export default Settings;
