import React, { useState, useEffect } from 'react';
import styles from '../styles/Test.module.scss';

// Определение типа настроек для теста по арифметике
interface ArithmeticTestProps {
  settings: {
    numQuestions: number;
    maxNumber: number;
    operations: string[];
  };
}

const ArithmeticTest: React.FC<ArithmeticTestProps> = ({ settings }) => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [question, setQuestion] = useState<string>('');
  const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    generateQuestion();
  }, [currentQuestion]);

  const generateQuestion = () => {
    const num1 = Math.floor(Math.random() * (settings.maxNumber + 1));
    const num2 = Math.floor(Math.random() * (settings.maxNumber + 1));
    const operation = settings.operations[Math.floor(Math.random() * settings.operations.length)];
    let question = `${num1} ${operation} ${num2}`;
    let answer;

    switch (operation) {
      case '+':
        answer = num1 + num2;
        break;
      case '-':
        answer = num1 - num2;
        break;
      case '*':
        answer = num1 * num2;
        break;
      case '/':
        answer = num2 !== 0 ? num1 / num2 : 0;
        question = `${num1} ${operation} ${num2 !== 0 ? num2 : 1}`;
        break;
      default:
        answer = 0;
    }

    setQuestion(question);
    setCorrectAnswer(answer);
    setUserAnswer('');
    setIsAnswerCorrect(null);
  };

  const handleAnswer = () => {
    const answer = parseFloat(userAnswer);
    const isCorrect = answer === correctAnswer;

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
        <span>{question}</span>
      </div>
      <div className={styles.answer}>
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
        />
        <button onClick={handleAnswer}>Ответить</button>
      </div>
      {isAnswerCorrect !== null && (
        <div className={styles.feedback}>
          {isAnswerCorrect ? 'Правильно!' : 'Неправильно!'}
        </div>
      )}
    </div>
  );
};

export default ArithmeticTest;
