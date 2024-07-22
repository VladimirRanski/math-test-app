import React, { useState } from 'react';
import styles from '../styles/Test.module.scss';

// Определение типов настроек для каждого теста
interface BaseSettings {
  numQuestions: number;
  maxNumber: number;
}

interface ArithmeticSettings extends BaseSettings {
  operations: string[];
}

type TestSettingsType = BaseSettings | ArithmeticSettings;

interface TestSettingsProps {
  onStart: (settings: TestSettingsType) => void;
  testType: 'arithmetic' | 'comparison' | 'multiple-choice';
}

const TestSettings: React.FC<TestSettingsProps> = ({ onStart, testType }) => {
  const [numQuestions, setNumQuestions] = useState(10);
  const [maxNumber, setMaxNumber] = useState(10);
  const [operations, setOperations] = useState<string[]>(['+']);

  const handleStart = () => {
    let settings: TestSettingsType = { numQuestions, maxNumber };

    if (testType === 'arithmetic') {
      settings = { ...settings, operations };
    }

    onStart(settings);
  };

  const handleOperationsChange = (operation: string) => {
    if (operations.includes(operation)) {
      setOperations(operations.filter(op => op !== operation));
    } else {
      setOperations([...operations, operation]);
    }
  };

  return (
    <div className={styles.settings}>
      <h2>Настройки теста</h2>
      <div className={styles.option}>
        <label>Количество вопросов:</label>
        <input
          type="number"
          value={numQuestions}
          onChange={(e) => setNumQuestions(Number(e.target.value))}
          min={1}
        />
      </div>
      <div className={styles.option}>
        <label>Максимальное число:</label>
        <input
          type="number"
          value={maxNumber}
          onChange={(e) => setMaxNumber(Number(e.target.value))}
          min={1}
        />
      </div>
      {testType === 'arithmetic' && (
        <div className={styles.option}>
          <label>Операции:</label>
          <div>
            <label>
              <input
                type="checkbox"
                checked={operations.includes('+')}
                onChange={() => handleOperationsChange('+')}
              />
              +
            </label>
            <label>
              <input
                type="checkbox"
                checked={operations.includes('-')}
                onChange={() => handleOperationsChange('-')}
              />
              -
            </label>
            <label>
              <input
                type="checkbox"
                checked={operations.includes('*')}
                onChange={() => handleOperationsChange('*')}
              />
              *
            </label>
            <label>
              <input
                type="checkbox"
                checked={operations.includes('/')}
                onChange={() => handleOperationsChange('/')}
              />
              /
            </label>
          </div>
        </div>
      )}
      <button className={styles.startButton} onClick={handleStart}>Начать тест</button>
    </div>
  );
};

export default TestSettings;
