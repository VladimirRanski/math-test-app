import React, { useState, useEffect } from 'react';
import styles from '../styles/Test.module.scss';

interface ComparisonTestProps {
  settings: {
    numQuestions: number;
    maxNumber: number;
  };
}

const ComparisonTest: React.FC<ComparisonTestProps> = ({ settings }) => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [firstNumber, setFirstNumber] = useState(0);
  const [secondNumber, setSecondNumber] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    generateQuestion();
  }, [currentQuestion]);

  const generateQuestion = () => {
    const num1 = Math.floor(Math.random() * (settings.maxNumber + 1));
    const num2 = Math.floor(Math.random() * (settings.maxNumber + 1));
    setFirstNumber(num1);
    setSecondNumber(num2);
    setSelectedAnswer(null);
    setIsAnswerCorrect(null);
  };

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    const isCorrect =
      (answer === '<' && firstNumber < secondNumber) ||
      (answer === '=' && firstNumber === secondNumber) ||
      (answer === '>' && firstNumber > secondNumber);

    if (isCorrect) {
      setCorrectAnswers(correctAnswers + 1);
      setIsAnswerCorrect(true);
    } else {
      setIncorrectAnswers(incorrectAnswers + 1);
      setIsAnswerCorrect(false);
    }

        setTimeout(() => {
      if (currentQuestion < settings.numQuestions) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        alert('Тест завершен');
      }
    }, 2000);
  };

  return (
    <div className={styles.test}>
      <h2>Вопрос {currentQuestion}/{settings.numQuestions}</h2>
      <div className={styles.question}>
        <span>{firstNumber}</span>
        <span> ? </span>
        <span>{secondNumber}</span>
      </div>
      <div className={styles.answer}>
        <button onClick={() => handleAnswer('<')}>{'<'}</button>
        <button onClick={() => handleAnswer('=')}>{'='}</button>
        <button onClick={() => handleAnswer('>')}>{'>'}</button>
      </div>
      {isAnswerCorrect !== null && (
        <div className={styles.feedback}>
          {isAnswerCorrect ? 'Правильно!' : 'Неправильно!'}
        </div>
      )}
    </div>
  );
};

export default ComparisonTest;

