"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";
import styles from "./MultipleChoiceTest.module.scss";

type Question = {
  num1: number;
  num2: number;
  operator?: string;
  answer: number;
  options: number[];
  userAnswer?: number;
};

type MultipleChoiceTestProps = {
  questions: Question[];
  onComplete: (
    correct: number,
    total: number,
    incorrectQuestions: Question[],
    timeTaken: number
  ) => void;
};

// Переводы для теста с вариантами ответов
const translations = {
  en: {
    question: "Question",
    submit: "Submit",
    next: "Next",
    finish: "Finish",
  },
  ru: {
    question: "Вопрос",
    submit: "Отправить",
    next: "Далее",
    finish: "Завершить",
  },
};

const MultipleChoiceTest: React.FC<MultipleChoiceTestProps> = ({ questions, onComplete }) => {
  const { language } = useLanguage();
  const t = translations[language];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>(Array(questions.length).fill(null));
  const [startTime, setStartTime] = useState<number>(0);

  useEffect(() => {
    setStartTime(Date.now());
  }, []);

  const handleAnswerSelect = (answer: number) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestionIndex] = answer;
    setUserAnswers(updatedAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      const timeTaken = (Date.now() - startTime) / 1000;
      const answeredQuestions = questions.map((q, i) => ({
        ...q,
        userAnswer: userAnswers[i],
      }));
      const incorrectQuestions = answeredQuestions.filter(
        (q) => q.userAnswer !== q.answer
      );
      const correct = questions.length - incorrectQuestions.length;
      onComplete(correct, questions.length, incorrectQuestions, timeTaken);
    }
  };

  return (
    <div className={styles.test}>
      <div className={styles.question}>
        {`${t.question} ${currentQuestionIndex + 1} / ${questions.length}: ${questions[currentQuestionIndex].num1} ${questions[currentQuestionIndex].operator} ${questions[currentQuestionIndex].num2} = ?`}
      </div>
      <div className={styles.options}>
        {questions[currentQuestionIndex].options.map((option, index) => (
          <button key={index} onClick={() => handleAnswerSelect(option)}>
            {option}
          </button>
        ))}
      </div>
      <div className={styles.navigation}>
        {currentQuestionIndex < questions.length - 1 ? (
          <button onClick={handleNext}>
            {t.next}
          </button>
        ) : (
          <button onClick={handleNext}>
            {t.finish}
          </button>
        )}
      </div>
    </div>
  );
};

export default MultipleChoiceTest;
