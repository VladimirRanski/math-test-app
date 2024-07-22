'use client'

import React, { useState } from 'react';
import TestSettings from '../../components/TestSettings';
import ArithmeticTest from '../../components/ArithmeticTest';
import styles from '../../styles/Test.module.scss';

const Arithmetic: React.FC = () => {
  const [settings, setSettings] = useState({ numQuestions: 10, maxNumber: 10, operations: ['+', '-'] });
  const [isTestStarted, setIsTestStarted] = useState(false);

  const startTest = (newSettings: any) => {
    setSettings(newSettings);
    setIsTestStarted(true);
  };

  return (
    <div className={styles.testPage}>
      {!isTestStarted ? (
        <TestSettings onStart={startTest} testType="arithmetic" />
      ) : (
        <ArithmeticTest settings={settings} />
      )}
    </div>
  );
};

export default Arithmetic;
