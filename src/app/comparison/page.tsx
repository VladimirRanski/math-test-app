'use client'

import React, { useState } from 'react';
import TestSettings from '../../components/TestSettings';
import ComparisonTest from '../../components/ComparisonTest';
import styles from '../../styles/Test.module.scss';

const Comparison: React.FC = () => {
  const [settings, setSettings] = useState({ numQuestions: 10, maxNumber: 10 });
  const [isTestStarted, setIsTestStarted] = useState(false);

  const startTest = (newSettings: any) => {
    setSettings(newSettings);
    setIsTestStarted(true);
  };

  return (
    <div className={styles.testPage}>
      {!isTestStarted ? (
        <TestSettings onStart={startTest} testType="comparison" />
      ) : (
        <ComparisonTest settings={settings} />
      )}
    </div>
  );
};

export default Comparison;
